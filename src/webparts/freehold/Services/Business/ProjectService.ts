import formatDate from "../../hooks/dateFormat";
import SPService, { SPServiceType } from "../Core/SPService";



const ProjectService = () => {
    const spServiceInstance: SPServiceType = SPService;


    const uploadDocument = async (libraryName: string, file: any, listName: any, Id: any) => {
        if (spServiceInstance) {
            const response = await spServiceInstance.createLibrary(libraryName);
            await spServiceInstance.uploadDocument(libraryName, file);
            console.log(response, "ClientLibraryGUIDClientLibraryGUID");
            const results = await spServiceInstance.updateListItem(listName, Id,
                {
                    ClientLibraryGUID: response.data.Id,
                    ClientLibraryPath: response.data.ParentWebUrl+"/"+libraryName
                }
            );
            return results;

        }
    };

    const getProject = async (ListName: string) => {
        if (spServiceInstance) {
            const results = await spServiceInstance.getAllListItems(ListName);
            return results;
        }
    };
    const getProjectExpand = async (ListName: string, select: string, expand: string) => {
        if (spServiceInstance) {
            const results = await spServiceInstance.getListItemsByFilter(ListName, select, expand, "");
            const TableData = results.map((item: any) => {
                return {
                    Id: item.Id,
                    projectCode: item.ProjectNumber,
                    projectName: item.ProjectName,
                    location: item.Locatiot,
                    developer:item.Developer,
                    modifiedDate: formatDate(item.Modified),
                    modifiedBy: item.Author.Title,
                    assignStaff: item?.AssignedStaff?.map((staff: any) => staff.Title).join(', ') || '',
                };
            });
            const updatedResults = results.map((item: any) => {
                return {
                    // name: item.Title,
                    // email: item.ClientEmail,
                    modifiedDate: formatDate(item.Modified),
                    modifiedBy: item.Author.Title,
                    assignStaff: item?.AssignedStaff?.map((staff: any) => staff.Title).join(', ') || '',
                    contact: item.ClientContact,
                    GUID: item.ClientLibraryGUID,

                    Author: {
                        Name: item.Author.Title,
                        Email: item.Author.EMail
                    },
                    assignedStaff: item.AssignedStaff &&
                        item.AssignedStaff.map((staff: any) => {
                            return {
                                Name: staff.Title,
                                Id: staff.Id
                            };
                        }),
                    Id: item.Id,
                    TableData
                };
            });
            
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
               if(spServiceInstance){
                    const files = await spServiceInstance.getDocumentsFromFolder(libraryGuid);
                    console.log('Retrieved files:', files);
                  }
            };


            const addDocumentsToFolder = async (libraryGuid: string, file: any) => {
 
                if (spServiceInstance) {
                    const results = await spServiceInstance.uploadDocument(libraryGuid, file);
                    console.log(results, "results");
                }
            };



    return {
        getProject,
        updateClient,
        getProjectExpand,
        addClient,
        deleteClient,
        uploadDocument,
        deleteLibrary,
        getDocumentsFromFolder,
        addDocumentsToFolder
    };
};

export default ProjectService;
