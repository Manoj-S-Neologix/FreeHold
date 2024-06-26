import {
    SPHttpClient,
    SPHttpClientResponse,
    ISPHttpClientOptions
} from '@microsoft/sp-http';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { Web } from "@pnp/sp/presets/all";
import pnp from 'sp-pnp-js';
// import toast from 'react-hot-toast';

export type SPServiceType = {
    createLibrary: (libraryName: string, libraryDescription?: string) => Promise<any>;
    createFolder: (relativePath: string, folderName: string) => Promise<any>;
    deleteFolder: (libraryName: string) => Promise<any>;
    uploadDocument: (libraryName: string, file: any) => Promise<any>;
    uploadDocumentMetaData: (libraryName: string, file: any, DMSTags: any) => Promise<any>;
    getAllListItems: (listTitle: string) => Promise<any[]>;
    addListItem: (listName: string, listData: any) => Promise<any>;
    updateListItem: (listName: string, itemId: number, itemData: any) => Promise<any>;
    deleteListItem: (listName: string, itemId: number) => Promise<any>;
    deleteLibrary: (librayName: string) => Promise<any>;
    getDocumentsFromFolder: (libraryName: string) => Promise<any>;
    getDocumentsFromUrl: (spContext: WebPartContext, libName: string, folderPath: string, baseURL: string) => Promise<any>;
    getPersonByEmail: (email: string) => Promise<any>;
    getPersonById: (id: number) => Promise<any>;
    deleteFile: (libraryName: string, fileId: number) => Promise<any>;
    updateLibraryName: (GUIDID: any, updatedlibraryName: string) => Promise<any>;
    copyDocuments: (destinationLibraryUrl: string, files: any[], DMStags: any) => Promise<any>;
    createFolderInLibrary: (libraryName: string, folderName: string) => Promise<any>;
    getFolderInLibrary: (libraryName: string, folderName: string) => Promise<any>;
    getAllFoldersInLibrary: (libraryName: string) => Promise<any>;
    getListCounts: (listName: string) => Promise<number>;
    deleteAssignedClient: (listName: string, itemId: number) => Promise<any>;
    getFoldernFilesRecurs: (spContext: WebPartContext, baseURL: string, serverRelativeUrl: string, camlQry: string, libname: string) => Promise<any>;
    getFilteredResults: (queryTxt: string) => Promise<any>;
    getfilteredListCounts: (listName: string, filter: string) => Promise<any>;

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
                //toast.error("Project/Client Document Library already exists. Please try with other project code.");
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

    deleteFolder: async (libraryName: string): Promise<any> => {
        const deletefolder = await web.getFolderByServerRelativeUrl(libraryName).recycle();
        return deletefolder;
    },

    deleteAssignedClient: async (listName: string, itemId: number): Promise<any> => {
        const deleteAssignedClient = await web.lists
            .getByTitle(listName).items.getById(itemId).recycle();
        return deleteAssignedClient;
    },

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
    uploadDocumentMetaData: async (libraryName: string, files: File[], DMSTags: any): Promise<any[]> => {
        const library = web.getFolderByServerRelativeUrl(libraryName);

        const promises = files.map(async (file: any) => {
            try {
                const uploadedFile = await library.files.add(file.name, file, true);
                if (uploadedFile) {
                    const item = await uploadedFile.file.getItem();
                    console.log(item, 'serviceitem..')
                    if (item) {
                        await item.update({
                            ...DMSTags,
                            DMSTags: file.checklist,
                            DMS_x0020_Tags: file.checklist
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

    // get filtered count of items in the list
    getfilteredListCounts: async (listName: string, filter: string): Promise<number> => {
        const count = await web.lists.getByTitle(listName).items.filter(filter).get();
        return count.length;
        // console.log(count);
    },

    // Delete list items
    deleteListItem: async (listName: string, itemId: number): Promise<any> => {
        const deleteItem = await web.lists
            .getByTitle(listName).items.getById(itemId).recycle();
        return deleteItem;
    },

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
            const response = await web.lists.getByTitle(listTitle).items.select(select).expand(expand).filter(filter).orderBy(orderBy, false)();
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

    getDocumentsFromUrl: async (spContext: WebPartContext, libName: string, folderPath: string, baseURL: string): Promise<any> => {

        const options: ISPHttpClientOptions = {
            body: JSON.stringify({
                "query": {
                    "ViewXml": `<View><Query><OrderBy><FieldRef Name="Modified" Ascending="FALSE"/></OrderBy></Query></View>`,
                    "FolderServerRelativeUrl": `${folderPath}`
                }
            })
        };

        return spContext.spHttpClient.post(baseURL + "/_api/Web/Lists/GetByTitle('" + libName + "')/GetItems?$select=*,FileSystemObjectType,FileDirRef,FieldValuesAsText/FileRef,FieldValuesAsText/Author,FieldValuesAsText/FileLeafRef,DMS_x0020_Tags&$expand=FieldValuesAsText", SPHttpClient.configurations.v1, options)
            .then((response: SPHttpClientResponse) => {
                return response.json();
            }).catch((err: any) => {
                console.log(err);
            });
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

    copyDocuments(destinationLibraryUrl: string, files: any[], DMStags: any) {
        return new Promise((resolve, reject) => {
            const results: any[] = [];
            const promises = files.map(async file => {
                return web.getFileByServerRelativePath(file.FileRef)
                    .copyTo(`${destinationLibraryUrl}/${file.FileLeafRef}`, false)
                    .then(async document => {

                        const item = await web.getFileByServerRelativePath(`${destinationLibraryUrl}/${file.FileLeafRef}`).getItem();
                        console.log(item);
                        if (item) {
                            await item.update({
                                DMSProject: DMStags.DMSProject,
                                DMSProjectID: DMStags.DMSProjectID
                            });
                            console.log(`Document ${file.FileLeafRef} copied successfully.`);
                            results.push({ file: file.FileLeafRef, success: true });
                        } else {
                            throw new Error("Failed to get item after upload");
                        }
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
    },

    getFoldernFilesRecurs(spContext: WebPartContext, baseURL: string, serverRelativeUrl: string, camlQry: string, libname: string): Promise<any> {

        const options: ISPHttpClientOptions = {
            body: JSON.stringify({
                "query": {
                    "ViewXml": camlQry,
                    "FolderServerRelativeUrl": `${serverRelativeUrl}`
                }
            })
        };

        return spContext.spHttpClient.post(baseURL + "/_api/Web/Lists/GetByTitle('" + libname + "')/GetItems?$select=*,FileSystemObjectType,FileDirRef,FieldValuesAsText/Author,FieldValuesAsText/FileLeafRef,DMS_x0020_Tags&$expand=FieldValuesAsText", SPHttpClient.configurations.v1, options)
            .then((response: SPHttpClientResponse) => {
                return response.json();
            }).catch((err: any) => {
                console.log(err);
            });
    },

    getFilteredResults: async (queryTxt: string): Promise<any> => {

        const searchRes = await pnp.sp.search({
            Querytext: queryTxt,
            RowLimit: 500,
            SelectProperties: ["CreatedBy", "ServerRedirectedURL", "Path", "Filename", "ModifiedBy", "LastModifiedTime", "DMSClient", "DMSClientID", "DMSProject", "ParentLink", "DMSProjectID", "DMSTags", "DMSUnit"],
            EnableInterleaving: true
        })

        return searchRes;

        //return filteredArray;
    }

};

export default SPService;

