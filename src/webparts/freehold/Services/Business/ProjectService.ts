import { WebPartContext } from "@microsoft/sp-webpart-base";
import formatDate from "../../hooks/dateFormat";
import SPService, { SPServiceType } from "../Core/SPService";
import _ from 'lodash';

const ProjectService = () => {
    const spServiceInstance: SPServiceType = SPService;

    //project upload with meta data
    const updateProjectDocumentMetadata = async (libraryName: string, file: any, DMSTags: any) => {
        if (spServiceInstance) {
            const response = await spServiceInstance.uploadDocumentMetaData(libraryName, file, DMSTags);
            console.log(response, "response-metaData")
            return response;
        }

    };

    const getFolderItemsRecursive = async (spContext: WebPartContext, baseURL: string, serverRelativeUrl: string, camlQry: string, libname: string) => {
        if (spServiceInstance) {
            const results: any = await spServiceInstance.getFoldernFilesRecurs(
                spContext, baseURL, serverRelativeUrl, camlQry, libname);
            console.log(results, "results");

            const docList: any[] = [];

            _.forEach(results.value, function (value) {
                docList.push({
                    Title: value.FieldValuesAsText.FileLeafRef,
                    FileDirRef: value.FileDirRef,
                    FileSystemObjectType: value.FileSystemObjectType,
                    DMSTag: value.DMS_x0020_Tags
                });
            });
            return docList;
        }
    };

    const getFolderItems = async (spContext: WebPartContext, baseURL: string, serverRelativeUrl: string, libname: string) => {
        if (spServiceInstance) {
            const results: any = await spServiceInstance.getDocumentsFromUrl(
                spContext, libname, serverRelativeUrl, baseURL);
            console.log(results, "results");

            const docList: any[] = [];

            _.forEach(results.value, function (value) {

                if (value.FileSystemObjectType === 0) {
                    docList.push({
                        Id: value.Id,
                        Created: value.Created,
                        FileLeafRef: value.FieldValuesAsText.FileLeafRef,
                        FileRef: value.FieldValuesAsText.FileRef,
                        FileDirRef: value.FileDirRef,
                        Editor: { Title: value.FieldValuesAsText.Author },
                        DMS_x0020_Tags: value.DMS_x0020_Tags
                    });
                }
            });
            return docList;
        }
    };

    const getProject = async (ListName: string) => {
        if (spServiceInstance) {
            const results = await spServiceInstance.getAllListItems(ListName);
            return results;
        }
    };

    const addClient = async (ListName: string, itemData: any) => {
        if (spServiceInstance) {
            const results = await spServiceInstance.addListItem(ListName, itemData);
            return results.data;
        }
    };

    const getProjectExpand = async (ListName: string, select: string, filter: string, expand: string, order: any) => {
        if (spServiceInstance) {
            const results = await spServiceInstance.getListItemsByFilter(ListName, select, expand, filter, order);

            const updatedResults = await Promise.all(results.map(async (item: any) => {
                const clientDetails = item?.AssignClient && item?.AssignClient.length > 0 && item?.AssignClient.map((client: any) => {

                    console.log(client, "clientDetails")
                    return (
                        {
                            Id: client?.Id,
                            Name: client?.Title
                        }
                    )
                })
                console.log(item, "UpdatedResult")
                return {
                    // name: item.Title,
                    projectName: item.Title,
                    projectNumber: item.ProjectNumber,
                    location: item.Location,
                    developer: item.Developer,
                    modifiedDate: formatDate(item.Modified),
                    modifiedBy: item.Editor.Title,
                    Staff: item.AssignedStaff,
                    contact: item.ClientContact,
                    GUID: item.ProjectLibraryGUID,
                    webURL: item.ProjectLibraryPath,
                    Author: {
                        Name: item.Author.Title,
                        Email: item.Author.EMail
                    },
                    Id: item.Id,
                    assignClient: (item?.AssignClient || []).map((client: any) => client.Title).join(', ') || '',
                    assignClientId: (item?.AssignClient || []).map((client: any) => client.Id).join(', ') || '',
                    clientDetails,
                    ClientGUID: item?.AssignClient ? item.AssignClient.ClientLibraryGUID : null

                };
            }));


            const TableData: any = results.map((tableItem: any) => ({
                Id: tableItem.Id,
                projectName: tableItem.Title,
                projectNumber: tableItem.ProjectNumber,
                location: tableItem.Location,
                developer: tableItem.Developer,
                modifiedDate: formatDate(tableItem.Modified),
                modifiedBy: tableItem.Editor.Title,
                GUID: tableItem.ProjectLibraryGUID,
                webURL: tableItem.ProjectLibraryPath,
                assignClient: (tableItem?.AssignClient || []).map((client: any) => client.Title).join(', ') || '',
                assignClientId: (tableItem?.AssignClient || []).map((client: any) => client.Id).join(', ') || '',
                clientDetails: tableItem?.AssignClient ? tableItem.AssignClient : null,
                ClientGUID: tableItem?.AssignClient ? tableItem.AssignClient.ClientLibraryGUID : null
            }));
            console.log(updatedResults, TableData, "updatedResults");

            return { updatedResults, TableData };
        }
    };

    const getfilteredProjectExpand = async (ListName: string, select: string, filter: string, expand: string, order: any, currentUserEmail: string) => {
        if (spServiceInstance) {

            const cselect = '*,AssignedStaff/Title,AssignedStaff/EMail,AssignedStaff/Id';
            const cexpand = 'AssignedStaff';
            const cfilter = `AssignedStaff/EMail eq '${currentUserEmail}'`;

            const corderBy = 'Modified';

            const clientResults = await spServiceInstance.getListItemsByFilter('Client_Informations', cselect, cexpand, cfilter, corderBy);
            //console.log("Client results : ", results);
            const clientArr: string[] = [];

            _.forEach(clientResults, function (citem) {
                clientArr.push(citem.ID);
            });

            const results = await spServiceInstance.getListItemsByFilter(ListName, select, expand, filter, order);

            const filteredResults: any[] = [];

            _.forEach(results, function (pitem) {

                const match = _.intersection(clientArr, pitem.AssignClientId);
                if (match.length > 0) {

                    let assignedClientArr: any[] = [];

                    _.forEach(pitem.AssignClient, function (aitem, index: number) {
                        if (_.indexOf(match, aitem.Id) > -1) {
                            assignedClientArr.push(aitem);
                        }
                    });
                    pitem.AssignClient = assignedClientArr;

                    filteredResults.push(pitem);
                }
            });

            const updatedResults = await Promise.all(filteredResults.map(async (item: any) => {
                const clientDetails = item?.AssignClient && item?.AssignClient.length > 0 && item?.AssignClient.map((client: any) => {

                    console.log(client, "clientDetails")
                    return (
                        {
                            Id: client?.Id,
                            Name: client?.Title
                        }
                    )
                })
                console.log(item, "UpdatedResult")
                return {
                    // name: item.Title,
                    projectName: item.Title,
                    projectNumber: item.ProjectNumber,
                    location: item.Location,
                    developer: item.Developer,
                    modifiedDate: formatDate(item.Modified),
                    modifiedBy: item.Editor.Title,
                    Staff: item.AssignedStaff,
                    contact: item.ClientContact,
                    GUID: item.ProjectLibraryGUID,
                    webURL: item.ProjectLibraryPath,
                    Author: {
                        Name: item.Author.Title,
                        Email: item.Author.EMail
                    },
                    Id: item.Id,
                    assignClient: (item?.AssignClient || []).map((client: any) => client.Title).join(', ') || '',
                    assignClientId: (item?.AssignClient || []).map((client: any) => client.Id).join(', ') || '',
                    clientDetails,
                    ClientGUID: item?.AssignClient ? item.AssignClient.ClientLibraryGUID : null

                };
            }));

            const TableData: any = filteredResults.map((tableItem: any) => ({
                Id: tableItem.Id,
                projectName: tableItem.Title,
                projectNumber: tableItem.ProjectNumber,
                location: tableItem.Location,
                developer: tableItem.Developer,
                modifiedDate: formatDate(tableItem.Modified),
                modifiedBy: tableItem.Editor.Title,
                GUID: tableItem.ProjectLibraryGUID,
                webURL: tableItem.ProjectLibraryPath,
                assignClient: (tableItem?.AssignClient || []).map((client: any) => client.Title).join(', ') || '',
                assignClientId: (tableItem?.AssignClient || []).map((client: any) => client.Id).join(', ') || '',
                clientDetails: tableItem?.AssignClient ? tableItem.AssignClient : null,
                ClientGUID: tableItem?.AssignClient ? tableItem.AssignClient.ClientLibraryGUID : null
            }));
            console.log(updatedResults, TableData, "updatedResults");

            return { updatedResults, TableData };
        }
    };

    const updateProject = async (ListName: string, itemId: number, itemData: any) => {
        if (spServiceInstance) {
            const results = await spServiceInstance.updateListItem(
                ListName,
                itemId,
                itemData);
            console.log(results, "results");
            return results;
        }
    };

    const addProject = async (ListName: string, itemData: any) => {
        if (spServiceInstance) {
            const results = await spServiceInstance.addListItem(ListName, itemData);
            return results.data;
        }
    };

    const deleteProject = async (ListName: string, itemId: number) => {

        if (spServiceInstance) {
            const results = await spServiceInstance.deleteListItem(ListName, itemId);
            console.log(results, "results");
            return results;
        }

    };

    const deleteClient = async (ListName: string, itemId: number) => {

        if (spServiceInstance) {
            const results = await spServiceInstance.deleteListItem(ListName, itemId);
            console.log(results, "results");
            return results;
        }

    };

    const deleteFile = async (libraryGuid: any, fileId: any) => {
        if (spServiceInstance) {
            const files = await spServiceInstance.deleteFile(libraryGuid, fileId);
            //console.log('Retrieved files:', files);
            return files;
        }
    };

    const deleteLibrary = async (LibraryName: string) => {

        if (spServiceInstance) {
            const results = await spServiceInstance.deleteLibrary(LibraryName);
            console.log(results, "results");
            return results;
        }

    };

    const deleteFolder = async (libraryName: string) => {

        if (spServiceInstance) {
            const results = await spServiceInstance.deleteFolder(libraryName);
            console.log(results, "results");
            return results;
        }

    };

    const deleteAssignedClient = async (listName: string, itemId: number) => {
        if (spServiceInstance) {
            const deleteAssignedStaff = await spServiceInstance.deleteAssignedClient(listName, itemId);
            console.log(deleteAssignedStaff, "results");
            return deleteAssignedStaff;
        }
    }

    const getDocumentsFromFolder = async (libraryGuid: string): Promise<any> => {
        if (spServiceInstance) {
            const files = await spServiceInstance.getDocumentsFromFolder(libraryGuid);
            console.log('Retrieved files:', files);
            return files;
        }
    };

    const getPersonByEmail = async (email: string) => {

        if (spServiceInstance) {
            const results = await spServiceInstance.getPersonByEmail(email);
            console.log(results, "results");
            return results;
        }
    };

    const getPersonById = async (id: number) => {

        if (spServiceInstance) {
            const results = await spServiceInstance.getPersonById(id);
            console.log(results, "resultsgetPersonById");
            return results.Email;
        }
    };

    //Create a document library

    const createLibrary = async (LibraryName: string, libraryDescription?: string) => {
        if (spServiceInstance) {
            const results = await spServiceInstance.createLibrary(LibraryName, libraryDescription);
            console.log(results, "libraryResponselibraryResponse")
            return results;
        }
    };

    // Create a folder in the library

    const createFolder = async (libraryGuid: string, folderName: string) => {
        if (spServiceInstance) {
            const results = await spServiceInstance.createFolder(libraryGuid, folderName);
            return results;
        }
    };

    const addDocumentsToFolder = async (libraryGuid: string, file: any) => {

        if (spServiceInstance) {
            const results = await spServiceInstance.uploadDocument(libraryGuid, file);
            console.log(results, "results");
        }
    };

    const copyDocuments = async (destinationLibraryUrl: string, files: any[], DMStags: any) => {

        if (spServiceInstance) {
            const results = await spServiceInstance.copyDocuments(destinationLibraryUrl, files, DMStags);
            console.log(results, "results");
            return results;
        }
    };

    const getListCounts = async (listName: string) => {
        if (spServiceInstance) {
            const response = await spServiceInstance.getListCounts(listName);
            return response;

        }
    }

    const createFolderInLibrary = async (libraryName: string, folderName: string): Promise<any> => {
        if (spServiceInstance) {
            const results = await spServiceInstance.createFolderInLibrary(libraryName, folderName);
            return results;
        }
    };
    const getFolderInLibrary = async (libraryName: string, folderName: string): Promise<any> => {
        if (spServiceInstance) {
            const results = await spServiceInstance.getFolderInLibrary(libraryName, folderName);
            return results;
        }
    };
    const getAllFoldersInLibrary = async (libraryName: string): Promise<any> => {
        if (spServiceInstance) {
            const results = await spServiceInstance.getAllFoldersInLibrary(libraryName);
            return results;
        }
    };

    return {
        getProject,
        updateProject,
        getProjectExpand,
        addProject,
        getPersonByEmail,
        getDocumentsFromFolder,
        deleteProject,
        deleteFile,
        getPersonById,
        copyDocuments,
        createFolder,
        createFolderInLibrary,
        getFolderInLibrary,
        getAllFoldersInLibrary,
        // uploadDocument,
        deleteLibrary,
        deleteClient,
        addClient,
        addDocumentsToFolder,
        createLibrary,
        getListCounts,
        updateProjectDocumentMetadata,
        deleteFolder,
        deleteAssignedClient,
        getFolderItemsRecursive,
        getFolderItems,
        getfilteredProjectExpand
    };
};

export default ProjectService;
