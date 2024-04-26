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

    const getProjectExpand = async (ListName: string, select: string, expand: string) => {
        if (spServiceInstance) {
            const results = await spServiceInstance.getListItemsByFilter(ListName, select, expand, "");

            const updatedResults = await Promise.all(results.map(async (item: any) => {
                const assignedStaffDetails = await Promise.all((item.AssignedStaff || []).map(async (staff: any) => {
                    const clientInformation = {
                        Id: staff.Id,
                        Name: staff.Title,
                        Email: staff.EMail && await getPersonByEmail(staff.EMail)
                    };
                    return clientInformation;
                }));


                return {
                    name: item.Title,
                    projectName: item.Title,
                    projectNumber: item.ProjectNumber,
                    location: item.Location,
                    developer: item.Developer,
                    modifiedDate: formatDate(item.Modified),
                    modifiedBy: item.Author.Title,
                    Staff: item.AssignedStaff,
                    assignStaff: (item.AssignedStaff || []).map((staff: any) => staff.Title).join(', ') || '',
                    contact: item.ClientContact,
                    GUID: item.ClientLibraryGUID,
                    Author: {
                        Name: item.Author.Title,
                        Email: item.Author.EMail
                    },
                    assignedStaff: assignedStaffDetails,
                    Id: item.Id,

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
                assignStaff: (tableItem.AssignedStaff || []).map((staff: any) => staff.Title).join(', ') || '',
            }));

            return { updatedResults, TableData };
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


    //         const addDocumentsToFolder = async (libraryGuid: string, file: any) => {

    //             if (spServiceInstance) {
    //                 const results = await spServiceInstance.uploadDocument(libraryGuid, file);
    //                 console.log(results, "results");
    //             }
    //         };



    return {
        getProject,
        updateClient,
        getProjectExpand,
        addProject,
        getPersonByEmail,
        getDocumentsFromFolder,
        deleteProject,
        getPersonById,
        
        // uploadDocument,
        deleteLibrary,
       
        // addDocumentsToFolder
    };
};

export default ProjectService;
