import { Web } from "@pnp/sp/presets/all";
// import toast from 'react-hot-toast';

export type SPServiceType = {
    createLibrary: (libraryName: string, libraryDescription?: string) => Promise<any>;
    createFolder: (relativePath: string, folderName: string) => Promise<any>;
    deleteFolder: (folderServerRelativeUrl: string) => Promise<any>;
    uploadDocument: (libraryName: string, file: any) => Promise<any>;
    uploadDocumentMetaData: (libraryName: string, file: any, DMSTags: string) => Promise<any>;
    getAllListItems: (listTitle: string) => Promise<any[]>;
    addListItem: (listName: string, listData: any) => Promise<any>;
    updateListItem: (listName: string, itemId: number, itemData: any) => Promise<any>;
    deleteListItem: (listName: string, itemId: number) => Promise<any>;
    deleteLibrary: (librayName: string) => Promise<any>;
    getDocumentsFromFolder: (libraryName: string) => Promise<any>;
    getPersonByEmail: (email: string) => Promise<any>;
    getPersonById: (id: number) => Promise<any>;
    deleteFile: (libraryName: string, fileId: number) => Promise<any>;
    updateLibraryName: (GUIDID: any, updatedlibraryName: string) => Promise<any>;
    copyDocuments: (destinationLibraryUrl: string, files: any[]) => Promise<any>;
    createFolderInLibrary: (libraryName: string, folderName: string) => Promise<any>;
    getFolderInLibrary: (libraryName: string, folderName: string) => Promise<any>;
    getAllFoldersInLibrary: (libraryName: string) => Promise<any>;
    getListCounts: (listName: string) => Promise<number>;
    deleteAssignedStaff:(ServerRelativeUrl:string) => Promise<any>;
    // updateDocumentMetadata:(libraryName: string, folderName: string) => Promise<any>;
    // addDocumentsToFolder: (libraryName: string) => Promise<any>;

    getLoggedInUserGroups: () => Promise<any>;
    getListItemsByFilter: (
        listTitle: string,
        select: string,
        expand: string,
        filter?: any,
        orderBy?: any
    ) => Promise<any[]>;
};

const web = Web('https://freeholddxb.sharepoint.com/sites/Development');

const SPService: SPServiceType = {


    // Get all list items
    getAllListItems: async (listTitle: string): Promise<any[]> => {
        const response = await web.lists.getByTitle(listTitle).items();
        return response;
    },


    createLibrary: async (libraryName: string, libraryDescription?: string): Promise<any> => {
        try {
            // if (!libraryName) {
            //     toast.error("Library name cannot be empty.");
            // }
            // Check if library with the same name already exists
            const response = await web.lists.filter(`Title eq '${libraryName}'`).get();

            if (response.length === 0) {
                // Create a new library since it doesn't exist
                const list = await web.lists.add(libraryName, libraryDescription ? libraryDescription :
                    "Document Library", 101);
                // toast.success(`Document Library created with ID: ${list.data.Id}`);
                return list;
            }
            else {
                //toast.error("Document Library already exists.");
                return response;
            }
        } catch (error) {
            // toast.error("Error creating or checking Document Library:", error);
            console.error("Error creating Library:", error);
            throw error;
        }
    },


    createFolder: async (relativePath: string, folderName: string): Promise<any> => {
        try {
            const folder = await web.getFolderByServerRelativePath(relativePath).folders.add(folderName);
            return folder;
        }
        catch (error) {
            console.error("Error creating folder:", error);
            throw error;
        }
    },

    deleteFolder: async (itemId:any): Promise<any> => {
        // const deletefolder = await web.lists 
        // .getByTitle(folderServerRelativeUrl).recycle();
        const deletefolder = await web.lists
            .getById(itemId).recycle();
        return deletefolder;
},

//   deleteAssignedStaff :async (ServerRelativeUrl:string): Promise<any> => {
//     const deleteAssignedStaff = await web


deleteAssignedStaff: async (ServerRelativeUrl:any): Promise<any> => {
    // const deletefolder = await web.lists 
    // .getByTitle(folderServerRelativeUrl).recycle();
    const deletefolder = await web.getFolderByServerRelativeUrl(ServerRelativeUrl).recycle();
        // .getById(itemId).recycle();
    return deletefolder;
},



    // Upload Document to a library
    // uploadDocument: async (libraryName: string, files: any): Promise<any> => {
    //     return new Promise((resolve, reject) => {
    //         try {
    //             const library = web.getFolderByServerRelativeUrl(libraryName);
    //             const promises = files.map((file: any) => {
    //                 return library.files.add(file.name, file, true).then((document): any => {
    //                     return document
    //                 }).catch((err) => {
    //                     throw err
    //                 })
    //             });
    //             promises.all(Promise).then((documents: any) => resolve(documents)).catch((err: any) => reject(err))
    //             //console.log(files, "filesfilesfiles");
    //             // for (const file of files) {
    //             //     console.log(files, "filesfilesfilesInside");
    //             //     const document = await library.files.add(file.name, file, true);
    //             //     return document;
    //             // }
    //         } catch (error) {
    //             console.error("Error uploading document:", error);
    //             throw error;
    //         }
    //     })
    // },



    // Upload Document to a library
    uploadDocument: async (libraryName: string, files: any[]): Promise<any[]> => {
        const library = web.getFolderByServerRelativeUrl(libraryName);

        const promises = files.map((file: any) => {
            return library.files.add(file.name, file, true)
                .then((document: any) => {
                    return document;
                })
                .catch((err: any) => {
                    throw err;
                });
        });

        return Promise.all(promises)
            .then((documents: any[]) => {
                return documents;
            })
            .catch((error: any) => {
                console.error("Error uploading documents:", error);
                throw error;

            });
    },


    //upload document with metadata
    uploadDocumentMetaData: async (libraryName: string, files: File[], DMSTags: string): Promise<any[]> => {
        const library = web.getFolderByServerRelativeUrl(libraryName);
    
        const promises = files.map(async (file: any) => {
            try {
                const uploadedFile = await library.files.add(file.name, file, true);
                if (uploadedFile) {
                    const item = await uploadedFile.file.getItem();
                    console.log(item, 'serviceitem..')
                    if (item) {
                        await item.update({
                            DMS_x0020_Tags:file.checklist
                        });
                        return item;
                    } else {
                        throw new Error("Failed to get item after upload");
                    }
                } else {
                    throw new Error("Failed to upload file");
                }
            } catch (error) {
                console.error("Error uploading document:", error);
                throw error;
            }
        });
        return Promise.all(promises)
            .then((documents: any[]) => {
                console.log("Documents with metadata updated successfully")
                return documents;
            })
            .catch((error: any) => {
                console.error("Error uploading documents:", error);
                throw error;

            });
    },
    

    // Update library name
    updateLibraryName: async (GUIDID: any, updatedlibraryName: string): Promise<any> => {

        const updateItem = await web.lists.getById(GUIDID).update({ Title: updatedlibraryName });
        return updateItem;
    },

    // Add list items
    addListItem: async (listName: string, listData: any): Promise<any> => {
        const addedItem = await web.lists
            .getByTitle(listName)
            .items.add(listData);
        return addedItem;
    },

    // Update list items
    updateListItem: async (listName: string, itemId: number, itemData: any): Promise<any> => {
        const updateItem = await web.lists
            .getByTitle(listName)
            .items.getById(itemId).update(itemData);
        return updateItem;
    },

    // get the count of items in the list
    getListCounts: async (listName: string): Promise<number> => {
        const count = await web.lists.getByTitle(listName).items();
        return count.length
        // console.log(count);
    },


    // Delete list items
    deleteListItem: async (listName: string, itemId: number): Promise<any> => {
        const deleteItem = await web.lists
            .getByTitle(listName).items.getById(itemId).recycle();
        return deleteItem;
    },


 
    // updateDocumentMetadata: async (libraryName, fileUrl, metadata) => {
    //     // console.log("Entering updateDocumentMetadata function");
    //     try {
    //         // console.log("Retrieving file item for URL:", fileUrl);
    //         const fileItem = await web.getFileByServerRelativeUrl(fileUrl).getItem();
    //         // console.log("File item retrieved:", fileItem);
    //         const response = await fileItem.update(metadata);
    //         // console.log("Metadata update response:", response);
    //         return response;
    //     } catch (error) {
    //         console.error("Error updating document metadata:", error);
    //         throw error;
    //     }
    // },
    





    // Delete list items
    deleteLibrary: async (libraryName: string): Promise<any> => {
        const deleteItem = await web.lists
            .getByTitle(libraryName).recycle();
        return deleteItem;
    },

   



    // Get current logged in user groups
    getLoggedInUserGroups: async (): Promise<any> => {
        const response = await web.currentUser.groups();
        return response;
    },




    // Get filtered list items
    getListItemsByFilter: async (listTitle: string, select: string, expand: string, filter: string, orderBy?: any): Promise<any[]> => {
        if (orderBy) {
            const response = await web.lists.getByTitle(listTitle).items.select(select).expand(expand).filter(filter).orderBy(orderBy, true)();
            return response;
        }
        else {
            const response = await web.lists.getByTitle(listTitle).items.select(select).expand(expand).filter(filter)();
            return response;

        }
    },

    getDocumentsFromFolder: async (libraryGuid: string): Promise<any> => {

        const files = await web.lists.getById(libraryGuid).items.select(
            "FileLeafRef",
            "FileRef",
            "File_x0020_Type",
            'Created',
            'Editor/Id',
            'Editor/Title',
            'Editor/EMail',
            "*",
            "File", "Id",
        ).expand("File", "Editor").getAll();
        //console.log('Retrieved files:', files);
        return files;
    },

    deleteFile: async (libraryGuid: string, fileId: number): Promise<any> => {
        const files = await web.lists.getById(libraryGuid).items.getById(fileId).recycle();
        //console.log('Retrieved files:', files);
        return files;
    },

    getPersonByEmail: async (email: any): Promise<any> => {
        const results = await web.siteUsers.getByEmail(email).get();
        return results;
    },

    getPersonById: async (id: any): Promise<any> => {
        const results = await web.siteUsers.getById(id).get();
        return results;
    },

    copyDocuments(destinationLibraryUrl: string, files: any[]) {
        return new Promise((resolve, reject) => {
            const results: any[] = [];
            const promises = files.map(async file => {
                return web.getFileByServerRelativePath(file.FileRef)
                    .copyTo(`${destinationLibraryUrl}/${file.FileLeafRef}`, false)
                    .then(document => {
                        console.log(`Document ${file.FileLeafRef} copied successfully.`);
                        results.push({ file: file.FileLeafRef, success: true });
                    })
                    .catch(error => {
                        console.error(`Error copying document ${file.FileLeafRef}:`, error);
                        results.push({ file: file.FileLeafRef, success: false, error: error.message });
                    });
            });

            Promise.all(promises)
                .then(() => resolve({ success: true, results }))
                .catch(error => reject({ success: false, error: error.message }));
        });
    },

    createFolderInLibrary: async (libraryName: string, folderName: string): Promise<any> => {
        const library = web.getFolderByServerRelativeUrl(libraryName);
        const folder = await library.folders.add(folderName);
        return folder;
    },

    getFolderInLibrary: async (libraryName: string, folderName: string): Promise<any> => {
        const library = web.getFolderByServerRelativeUrl(libraryName);
        const folder = await library.folders.getByName(folderName);
        return folder;
    },
    getAllFoldersInLibrary: async (libraryName: string): Promise<any> => {
        const library = web.getFolderByServerRelativeUrl(libraryName);
        const folders = await library.folders();
        return folders;
    }




};

export default SPService;

