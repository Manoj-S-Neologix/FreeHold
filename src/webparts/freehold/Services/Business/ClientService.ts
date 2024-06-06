import _ from "lodash";
import formatDate from "../../hooks/dateFormat";
import SPService, { SPServiceType } from "../Core/SPService";
import { Web as SP } from "sp-pnp-js";


export const updatedData = async (siteUrl: string, listName: string, Id: number, items: any): Promise<any> => {
    try {
        const web = new SP(siteUrl);
        const data = await web.lists.getByTitle(listName).items.getById(Id).update(items);
        return data;
    } catch (error) {
        console.error('Error fetching data from SharePoint list:', error);
        return [];
    }
};

// Add list items
export const addListItem = async (siteUrl: string, listName: string, listData: any): Promise<any> => {
    try {
        const web = new SP(siteUrl);
        const addedItem = await web.lists.getByTitle(listName).items.add(listData);
        return addedItem;
    } catch (error) {
        console.error("Error adding client:", error);
        throw error;
    }
};

const ClientService = () => {
    const spServiceInstance: SPServiceType = SPService;

    const uploadDocument = async (libraryName: string, file: any, listName?: any, Id?: any) => {
        if (spServiceInstance) {
            const response = await spServiceInstance.createLibrary(libraryName);
            //await spServiceInstance.uploadDocument(libraryName, file);
            //console.log(response, "ClientLibraryGUIDClientLibraryGUID");
            return response;

        }
    };

    //UpdateLibraryName
    const updateLibraryName = async (GUIDID: any, updatedlibraryName: string) => {
        if (spServiceInstance) {
            const response = await spServiceInstance.updateLibraryName(GUIDID, updatedlibraryName);
            return response;
        }
    };

    //uploadDocumentInLibrary
    const uploadDocumentInLibrary = async (libraryName: string, file: any, listName?: any, Id?: any) => {
        if (spServiceInstance) {
            const response = await spServiceInstance.uploadDocument(libraryName, file);

            //console.log(response, "ClientLibraryGUIDClientLibraryGUID");
            return response;

        }
    };

    // //Meta Data
    const updateClientDocumentMetadata = async (libraryName: string, file: any, DMSTags: any) => {
        if (spServiceInstance) {
            const response = await spServiceInstance.uploadDocumentMetaData(libraryName, file, DMSTags);
            // console.log(response, "response-metaData")
            return response;
        }
    };

    const getClient = async (ListName: string) => {

        if (spServiceInstance) {
            const results = await spServiceInstance.getAllListItems(ListName);
            return results;
        }
    };

    const getClientbyID = async (ListName: string, select: string, expand: string, filter: string, orderBy: any, id?: string | number | undefined) => {

        if (spServiceInstance) {
            const results = await spServiceInstance.getListItemsByFilter(ListName, select, expand, filter, orderBy);

            const updatedResults: any[] = [];

            const pselect = '*,AssignClient/Title,AssignClient/ClientLibraryGUID,AssignClient/Id';
            const pexpand = 'AssignClient';
            const porderBy = 'Modified';
            const pfilter = `AssignClient/Id eq '${id}'`;

            const projectResults = await spServiceInstance.getListItemsByFilter('Project_Informations', pselect, pexpand, pfilter, porderBy);

            const projectDetails: any = projectResults?.length > 0 && projectResults?.map((project: any) => {
                return (
                    {
                        Id: project?.Id,
                        Name: project?.Title
                    }
                )
            });

            const sortedProjectDetails = _.sortBy(projectDetails,
                [function (o: any) { return o.Name; }]);

            _.forEach(results, function (item) {

                const assignedStaffDetails = (item.AssignedStaff !== undefined) ? (item.AssignedStaff).map((staff: any) => {
                    const staffDetails = {
                        Id: staff.Id,
                        Name: staff.Title,
                        Email: staff.EMail
                    };
                    return staffDetails;
                }) : [];

                const assignedStaff = assignedStaffDetails;

                updatedResults.push({
                    name: item.Title,
                    Title: item.Title,
                    email: item.ClientEmail,
                    modifiedDate: formatDate(item.Modified),
                    modifiedBy: item.Editor.Title,
                    Staff: item.AssignedStaff,
                    assignStaff: (item.AssignedStaff || []).map((staff: any) => staff.Title).join(', ') || '',
                    contact: item.ClientContact,
                    GUID: item.ClientLibraryGUID,
                    webURL: item.ClientLibraryPath,
                    Author: {
                        Name: item.Author.Title,
                        Email: item.Author.EMail
                    },
                    assignedStaff,
                    Id: item.Id,
                    projectDetails: sortedProjectDetails,
                    Editor: item?.Editor
                });
            });

            const tableData = updatedResults.map((item: any) => {
                return {
                    Id: item.Id,
                    name: item.name,
                    email: item.email,
                    contact: item.contact,
                    modifiedDate: item.modifiedDate,
                    modifiedBy: item.modifiedBy,
                    assignStaff: item.assignStaff,
                    assignedStaff: item.assignedStaff,
                    ProjectId: item.ProjectId,
                    projectDetails: sortedProjectDetails,
                    Editor: item?.Editor
                };
            });
            // console.log(updatedResults, tableData, "updatedResults");
            return { updatedResults, tableData };
        }
    };

    const getListCounts = async (listName: string) => {
        if (spServiceInstance) {
            const response = await spServiceInstance.getListCounts(listName);
            return response;
        }
    }

    const getfilteredListCounts = async (listName: string, filter: string) => {
        if (spServiceInstance) {
            const response = await spServiceInstance.getfilteredListCounts(listName, filter);
            return response;
        }
    }

    const getClientExpand = async (ListName: string, select: string, expand: string, orderBy: any, id?: string | number | undefined) => {
        if (spServiceInstance) {
            const results = await spServiceInstance.getListItemsByFilter(ListName, select, expand, orderBy, id);
            // console.log(results, 'client result,,,')
            const updatedResults = await Promise.all(results.map(async (item: any) => {
                const assignedStaffDetails = await Promise.all((item.AssignedStaff || []).map(async (staff: any) => {
                    const staffDetails = {
                        Id: staff.Id,
                        Name: staff.Title,
                        Email: staff.Id && await getPersonById(staff.Id)
                    };
                    return staffDetails;
                }));

                const projectDetails = item?.ProjectId && item?.ProjectId.length > 0 && item?.ProjectId.map((project: any) => {
                    return (
                        {
                            Id: project?.Id,
                            Name: project?.Title
                        }
                    )
                })

                const assignedStaff = assignedStaffDetails;
                // console.log(item, projectDetails, 'itemresult')

                return {
                    name: item.Title,
                    email: item.ClientEmail,
                    modifiedDate: formatDate(item.Modified),
                    modifiedBy: item.Editor.Title,
                    Staff: item.AssignedStaff,
                    assignStaff: (item.AssignedStaff || []).map((staff: any) => staff.Title).join(', ') || '',
                    contact: item.ClientContact,
                    GUID: item.ClientLibraryGUID,
                    webURL: item.ClientLibraryPath,
                    Author: {
                        Name: item.Author.Title,
                        Email: item.Author.EMail
                    },
                    assignedStaff,
                    Id: item.Id,
                    projectDetails,
                    Editor: item?.Editor
                    // ProjectName: item.Title

                };
            }));

            const tableData = updatedResults.map((item: any) => {
                return {
                    Id: item.Id,
                    name: item.name,
                    email: item.email,
                    contact: item.contact,
                    modifiedDate: item.modifiedDate,
                    modifiedBy: item.modifiedBy,
                    assignStaff: item.assignStaff,
                    assignedStaff: item.assignedStaff,
                    ProjectId: item.ProjectId,
                    projectDetails: item.projectDetails,
                    Editor: item?.Editor
                };
            });
            // console.log(updatedResults, tableData, "updatedResults");
            return { updatedResults, tableData };
        }
    };

    const getClientExpandApi = async (ListName: string, select: string, expand: string, filter: string, id?: any) => {
        if (spServiceInstance) {
            const results = await spServiceInstance.getListItemsByFilter(ListName, select, expand, filter, id);
            //console.log(results, "results");
            return results;
        }
    };

    const getClients = async (ListName: string, select: string, expand: string, filter: string, orderBy: any, id?: string | number | undefined) => {

        if (spServiceInstance) {
            const results = await spServiceInstance.getListItemsByFilter(ListName, select, expand, filter, orderBy);

            const updatedResults: any[] = [];

            _.forEach(results, function (item) {

                const assignedStaffDetails = (item.AssignedStaff !== undefined) ? (item.AssignedStaff).map((staff: any) => {
                    const staffDetails = {
                        Id: staff.Id,
                        Name: staff.Title,
                        Email: staff.EMail
                    };
                    return staffDetails;
                }) : [];

                const projectDetails = item?.ProjectId && item?.ProjectId.length > 0 && item?.ProjectId.map((project: any) => {
                    return (
                        {
                            Id: project?.Id,
                            Name: project?.Title
                        }
                    )
                });

                const sortedProjectDetails = _.sortBy(projectDetails,
                    [function (o: any) { return o.Name; }]);

                const assignedStaff = assignedStaffDetails;
                //console.log(item, projectDetails, 'itemresult')

                updatedResults.push({
                    name: item.Title,
                    Title: item.Title,
                    email: item.ClientEmail,
                    modifiedDate: formatDate(item.Modified),
                    modifiedBy: item.Editor.Title,
                    Staff: item.AssignedStaff,
                    assignStaff: (item.AssignedStaff || []).map((staff: any) => staff.Title).join(', ') || '',
                    contact: item.ClientContact,
                    GUID: item.ClientLibraryGUID,
                    webURL: item.ClientLibraryPath,
                    Author: {
                        Name: item.Author.Title,
                        Email: item.Author.EMail
                    },
                    assignedStaff,
                    Id: item.Id,
                    projectDetails: sortedProjectDetails,
                    Editor: item?.Editor
                });
            });

            const tableData = updatedResults.map((item: any) => {
                return {
                    Id: item.Id,
                    name: item.name,
                    email: item.email,
                    contact: item.contact,
                    modifiedDate: item.modifiedDate,
                    modifiedBy: item.modifiedBy,
                    assignStaff: item.assignStaff,
                    assignedStaff: item.assignedStaff,
                    ProjectId: item.ProjectId,
                    projectDetails: item.projectDetails,
                    Editor: item?.Editor
                };
            });
            // console.log(updatedResults, tableData, "updatedResults");
            return { updatedResults, tableData };
        }
    };

    const getfilteredClientsnProjects = async (ListName: string, select: string, expand: string, filter: string, orderBy: any, userRole: string) => {

        if (spServiceInstance) {
            const clientResults = await spServiceInstance.getListItemsByFilter(ListName, select, expand, filter, orderBy);
            //console.log("Client results : ", results);
            const clientArr: string[] = [];

            _.forEach(clientResults, function (citem) {
                clientArr.push(citem.ID);
            })

            const pselect = '*,AssignClient/Title,AssignClient/ClientLibraryGUID,AssignClient/Id';
            const pexpand = 'AssignClient';
            const porderBy = 'Modified';
            const pfilter = "IsActive eq 'Yes'";

            const projectResults = await spServiceInstance.getListItemsByFilter('Project_Informations', pselect, pexpand, pfilter, porderBy);

            let pResults: any[] = [];
            if (userRole === "staff") {
                _.forEach(projectResults, function (pitem) {

                    const match = _.intersection(clientArr, pitem.AssignClientId);
                    if (match.length > 0) {
                        pResults.push(pitem);
                    }
                });
            } else {
                pResults = projectResults;
            }

            //console.log("Filtered project results : ", pResults);

            return { clientResults, pResults };
        }
    };

    const getProjects = async (ListName: string, select: string, expand: string, orderBy: any, id?: string | number | undefined) => {

        if (spServiceInstance) {
            const results = await spServiceInstance.getListItemsByFilter(ListName, select, expand, orderBy, id);
            // console.log("Client results : ", results);

            return results;
        }
    };

    const updateClient = async (ListName: string, itemId: number, itemData: any) => {
        if (spServiceInstance) {
            const results = await spServiceInstance.updateListItem(
                ListName,
                itemId,
                itemData);
            //console.log(results, "results");
            return results;
        }
    };

    const addClient = async (ListName: string, itemData: any) => {
        if (spServiceInstance) {
            const results = await spServiceInstance.addListItem(ListName, itemData);
            return results.data;
        }
    };

    const deleteClient = async (ListName: string, itemId: number) => {

        if (spServiceInstance) {
            const results = await spServiceInstance.deleteListItem(ListName, itemId);
            //console.log(results, "results");
            return results;
        }
    };

    const deleteLibrary = async (LibraryName: string) => {

        if (spServiceInstance) {
            const results = await spServiceInstance.deleteLibrary(LibraryName);
            //console.log(results, "results");
            return results;
        }

    };

    const getDocumentsFromFolder = async (libraryGuid: string): Promise<any> => {
        if (spServiceInstance) {
            const files = await spServiceInstance.getDocumentsFromFolder(libraryGuid);
            //console.log('Retrieved files:', files);
            return files;
        }
    };

    const deleteFile = async (libraryGuid: any, fileId: any) => {
        if (spServiceInstance) {
            const files = await spServiceInstance.deleteFile(libraryGuid, fileId);
            //console.log('Retrieved files:', files);
            return files;
        }
    };

    const getPersonByEmail = async (email: string) => {

        if (spServiceInstance) {
            const results = await spServiceInstance.getPersonByEmail(email);
            //console.log(results, "results");
            return results;
        }
    };

    const getPersonById = async (id: number) => {

        if (spServiceInstance) {
            const results = await spServiceInstance.getPersonById(id);
            //console.log(results, "resultsgetPersonById");
            return results.Email;
        }
    };

    const addDocumentsToFolder = async (libraryGuid: string, file: any) => {

        if (spServiceInstance) {
            const results = await spServiceInstance.uploadDocument(libraryGuid, file);
            //console.log(results, "results");
            return results;
        }
    };

    return {
        getClient,
        updateClient,
        getClientExpand,
        addClient,
        deleteClient,
        uploadDocument,
        uploadDocumentInLibrary,
        deleteLibrary,
        getDocumentsFromFolder,
        deleteFile,
        getPersonByEmail,
        addDocumentsToFolder,
        getPersonById,
        getClientExpandApi,
        updateLibraryName,
        getListCounts,
        updateClientDocumentMetadata,
        getClients,
        getProjects,
        getfilteredListCounts,
        getfilteredClientsnProjects,
        getClientbyID
    };
};

export default ClientService;
