import { Web } from "@pnp/sp/presets/all";

export type SPServiceType = {
    getAllListItems: (listTitle: string) => Promise<any[]>;
    addListItem: (listName: string, listData: any) => Promise<any>;
    updateListItem: (listName: string, itemId: number, itemData: any) => Promise<any>;
    deleteListItem: (listName: string, itemId: number) => Promise<any>;
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
            .getByTitle(listName).items.getById(itemId).delete();
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
    }
};

export default SPService;
