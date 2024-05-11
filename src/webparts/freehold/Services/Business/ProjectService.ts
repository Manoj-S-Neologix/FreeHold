import formatDate from "../../hooks/dateFormat";
import SPService, { SPServiceType } from "../Core/SPService";



const ProjectService = () => {
    const spServiceInstance: SPServiceType = SPService;


    // const uploadDocument = async (libraryName: string, file: any, listName: any, Id: any) => {
    //     if (spServiceInstance) {
    //         const response = await spServiceInstance.createLibrary(libraryName);
    //         await spServiceInstance.uploadDocument(libraryName, file);
    //         console.log(response, "ClientLibraryGUIDClientLibraryGUID");
    //         const results = await spServiceInstance.updateListItem(listName, Id,
    //             {
    //                 ClientLibraryGUID: response.data.Id,
    //                 ClientLibraryPath: response.data.ParentWebUrl+"/"+libraryName
    //             }
    //         );
    //         return results;

    //     }
    // };

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


    const getProjectExpand = async (ListName: string, select: string, expand: string,order: any) => {
        if (spServiceInstance) {
            const results = await spServiceInstance.getListItemsByFilter(ListName, select, expand, "",order);

            const updatedResults = await Promise.all(results.map(async (item: any) => {
                const clientDetails = item?.AssignClient && item?.AssignClient.length > 0 && item?.AssignClient.map((client: any) => {
                    // const clientData = {
                    //     Id: client?.Id,
                    //     Name: client?.Title
                    // }
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
                    modifiedBy: item.Author.Title,
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
                modifiedBy: tableItem.Author.Title,
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

    const deleteLibrary = async (LibraryName: string) => {

        if (spServiceInstance) {
            const results = await spServiceInstance.deleteLibrary(LibraryName);
            console.log(results, "results");
            return results;
        }

    };

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

    const copyDocuments = async (destinationLibraryUrl: string, files: any[]) => {

        if (spServiceInstance) {
            const results = await spServiceInstance.copyDocuments(destinationLibraryUrl, files);
            console.log(results, "results");
            return results;
        }
    };

    const getListCounts = async (listName: string) =>{
        if (spServiceInstance) {
            const response = await spServiceInstance.getListCounts(listName);
            return response;

        }
    }


    //         const addDocumentsToFolder = async (libraryGuid: string, file: any) => {

    //             if (spServiceInstance) {
    //                 const results = await spServiceInstance.uploadDocument(libraryGuid, file);
    //                 console.log(results, "results");
    //             }
    //         };

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
        getListCounts

        // addDocumentsToFolder
    };
};

export default ProjectService;
