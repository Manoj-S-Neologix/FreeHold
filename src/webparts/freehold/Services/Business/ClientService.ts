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

const ClientService = () => {
    const spServiceInstance: SPServiceType = SPService;


    const uploadDocument = async (libraryName: string, file: any, listName: any, Id: any) => {
        if (spServiceInstance) {
            const response = await spServiceInstance.createLibrary(libraryName);
            await spServiceInstance.uploadDocument(libraryName, file);
            console.log(response, "ClientLibraryGUIDClientLibraryGUID");
            const results = await spServiceInstance.updateListItem(listName, Id,
                {
                    ClientLibraryGUID: response.data.Id,
                    ClientLibraryPath: response.data.ParentWebUrl + "/" + libraryName
                }
            );
            return results;

        }
    };

    const getClient = async (ListName: string) => {
        if (spServiceInstance) {
            const results = await spServiceInstance.getAllListItems(ListName);
            return results;
        }
    };
    // const getClientExpand = async (ListName: string, select: string, expand: string) => {
    //     if (spServiceInstance) {
    //         const results = await spServiceInstance.getListItemsByFilter(ListName, select, expand, "");
    //         const TableData = results.map((item: any) => {
    //             return {
    //                 Id: item.Id,
    //                 name: item.Title,
    //                 email: item.ClientEmail,
    //                 contact: item.ClientContact,
    //                 modifiedDate: formatDate(item.Modified),
    //                 modifiedBy: item.Author.Title,
    //                 assignStaff: item?.AssignedStaff?.map((staff: any) => staff.Title).join(', ') || '',
    //             };
    //         });
    //         const updatedResults = results.map((item: any) => {
    //             return {
    //                 name: item.Title,
    //                 email: item.ClientEmail,
    //                 modifiedDate: formatDate(item.Modified),
    //                 modifiedBy: item.Author.Title,
    //                 Staff: item?.AssignedStaff,
    //                 assignStaff: item?.AssignedStaff?.map((staff: any) => staff.Title).join(', ') || '',
    //                 contact: item.ClientContact,
    //                 GUID: item.ClientLibraryGUID,

    //                 Author: {
    //                     Name: item.Author.Title,
    //                     Email: item.Author.EMail
    //                 },
    //                 assignedStaff: item.AssignedStaff &&
    //                     item.AssignedStaff.map((staff: any) => {
    //                         return {
    //                             Id: staff.Id,
    //                             Name: staff.Title,
    //                             Email: getPersonByEmail(staff.EMail)
    //                         };
    //                     }),
    //                 Id: item.Id,
    //                 TableData
    //             };
    //         });

    //         return { updatedResults };
    //     }
    // };

    const getClientExpand = async (ListName: string, select: string, expand: string) => {
        if (spServiceInstance) {
            const results = await spServiceInstance.getListItemsByFilter(ListName, select, expand, "");
            const updatedResults = await Promise.all(results.map(async (item: any) => {
                const assignedStaffDetails = await Promise.all((item.AssignedStaff || []).map(async (staff: any) => {
                    console.log(staff, "staffEMail");
                    const staffDetails = {
                        Id: staff.Id,
                        Name: staff.Title,
                        Email: staff.Id && await getPersonById(staff.Id)
                    };
                    return staffDetails;
                }));

                return {
                    name: item.Title,
                    email: item.ClientEmail,
                    modifiedDate: formatDate(item.Modified),
                    modifiedBy: item.Author.Title,
                    Staff: item.AssignedStaff,
                    assignStaff: (item.AssignedStaff || []).map((staff: any) => staff.Title).join(', ') || '',
                    contact: item.ClientContact,
                    GUID: item.ClientLibraryGUID,
                    webURL:item.ClientLibraryPath,
                    Author: {
                        Name: item.Author.Title,
                        Email: item.Author.EMail
                    },
                    assignedStaff: assignedStaffDetails,
                    Id: item.Id,
                    TableData: results.map((tableItem: any) => ({
                        Id: tableItem.Id,
                        name: tableItem.Title,
                        email: tableItem.ClientEmail,
                        contact: tableItem.ClientContact,
                        modifiedDate: formatDate(tableItem.Modified),
                        modifiedBy: tableItem.Author.Title,
                        assignStaff: (tableItem.AssignedStaff || []).map((staff: any) => staff.Title).join(', ') || '',
                    }))
                };
            }));

            return { updatedResults };
        }
    };


    const updateClient = async (ListName: string, itemId: number, itemData: any) => {
        if (spServiceInstance) {
            const results = await spServiceInstance.updateListItem(
                ListName,
                itemId,
                itemData);
            console.log(results, "results");
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

    const deleteFile = async (libraryGuid: any, fileId: any) => {
        if (spServiceInstance) {
            const files = await spServiceInstance.deleteFile(libraryGuid, fileId);
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
    const addDocumentsToFolder = async (libraryGuid: string, file: any) => {

        if (spServiceInstance) {
            const results = await spServiceInstance.uploadDocument(libraryGuid, file);
            console.log(results, "results");
        }
    };



    return {
        getClient,
        updateClient,
        getClientExpand,
        addClient,
        deleteClient,
        uploadDocument,
        deleteLibrary,
        getDocumentsFromFolder,
        deleteFile,
        getPersonByEmail,
        addDocumentsToFolder,
        getPersonById
    };
};

export default ClientService;
