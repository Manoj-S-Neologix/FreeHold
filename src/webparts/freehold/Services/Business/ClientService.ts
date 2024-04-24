import formatDate from "../../hooks/dateFormat";
import SPService, { SPServiceType } from "../Core/SPService";



const ClientService = () => {
    const spServiceInstance: SPServiceType = SPService;


    const uploadDocument = async (libraryName: string, file: any, listName: any, Id: any) => {
        if (spServiceInstance) {
            const library = await spServiceInstance.createLibrary(libraryName);
            if (library) {
                const response = await spServiceInstance.uploadDocument(libraryName, file);

                console.log(response, "ClientLibraryGUIDClientLibraryGUID");
                const results = await spServiceInstance.updateListItem(listName, Id,
                    {
                        ClientLibraryGUID: response.data.Id,
                        ClientLibraryPath: response.data.ServerRelativeUrl
                    }
                );
                return results;
            }
        }
    };

    const getClient = async (ListName: string) => {
        if (spServiceInstance) {
            const results = await spServiceInstance.getAllListItems(ListName);
            return results;
        }
    };
    const getClientExpand = async (ListName: string, select: string, expand: string) => {
        if (spServiceInstance) {
            const results = await spServiceInstance.getListItemsByFilter(ListName, select, expand, "");
            const updatedResults = results.map((item: any) => {
                return {
                    name: item.Title,
                    email: item.ClientEmail,
                    modifiedDate: formatDate(item.Modified),
                    modifiedBy: item.Author.Title,
                    assignStaff: item?.AssignedStaff?.map((staff: any) => staff.Title).join(', ') || '',
                    // Contact: item.ClientContact,
                    //GUID: item.GUID,
                    // Author: {
                    //     Name: item.Author.Title,
                    //     Email: item.Author.EMail
                    // },
                    // assignedStaff: item.AssignedStaff &&
                    //     item.AssignedStaff.map((staff: any) => {
                    //         return {
                    //             Name: staff.Title,
                    //             Id: staff.Id
                    //         };
                    //     }),

                    //Id: item.Id
                };
            });

            console.log(updatedResults, "updatedResults");
            return updatedResults;
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

    return {
        getClient,
        updateClient,
        getClientExpand,
        addClient,
        deleteClient,
        uploadDocument
    };
};

export default ClientService;
