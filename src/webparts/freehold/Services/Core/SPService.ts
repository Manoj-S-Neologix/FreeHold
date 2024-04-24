import { Web } from "@pnp/sp/presets/all";

export type SPServiceType = {
    createLibrary: (libraryName: string,) => Promise<any>;
    uploadDocument: (libraryName: string, file: any) => Promise<any>;
    getAllListItems: (listTitle: string) => Promise<any[]>;
    addListItem: (listName: string, listData: any) => Promise<any>;
    updateListItem: (listName: string, itemId: number, itemData: any) => Promise<any>;
    deleteListItem: (listName: string, itemId: number) => Promise<any>;
    deleteLibrary: (libraryName: string) => Promise<any>;
    getDocumentsFromFolder: (libraryName: string) => Promise<any>;

    getLoggedInUserGroups: () => Promise<any>;
    getListItemsByFilter: (
        listTitle: string,
        select: string,
        expand: string,
        filter: string,) => Promise<any[]>;
};

const web = Web('https://freeholddxb.sharepoint.com/sites/Development');

const SPService: SPServiceType = {


    // Get all list items
    getAllListItems: async (listTitle: string): Promise<any[]> => {
        const response = await web.lists.getByTitle(listTitle).items();
        return response;
    },


    //Create Library
    createLibrary: async (libraryName: string): Promise<any> => {
        try {
            const list = await web.lists.add(libraryName, "Document Library", 101);
            console.log(`Document Library created with ID: ${list.data.Id}`);
            return list;
        } catch (error) {
            console.error("Error creating Document Library:", error);
            throw error;
        }
    },


    // Upload Document to a library
    uploadDocument: async (libraryName: string, files: any): Promise<any> => {
        try {
            const library = web.getFolderByServerRelativeUrl(libraryName);
            console.log(files, "filesfilesfiles");
            for (const file of files) {
                console.log(files, "filesfilesfilesInside");
                const document = await library.files.add(file.name, file, true);
                return document;
            }
        } catch (error) {
            console.error("Error uploading document:", error);
            throw error;
        }
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
    getListItemsByFilter: async (listTitle: string, select: string, expand: string, filter: string): Promise<any[]> => {
        const response = await web.lists.getByTitle(listTitle).items.select(select).expand(expand).filter(filter)();
        return response;
    },

     getDocumentsFromFolder: async (libraryGuid: string): Promise<any> => {

            const files = await web.lists.getById(libraryGuid).items.get();
            console.log('Retrieved files:', files);
     
        
          }
    





};

export default SPService;
