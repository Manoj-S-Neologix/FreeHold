import SPService, { SPServiceType } from "../Core/SPService";

const ClientService = () => {
    const spServiceInstance: SPServiceType = SPService;

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
                    Title: item.Title,
                    Email: item.ClientEmail,
                };
            });
            console.log(updatedResults, "updatedResults");
            return results;
        }
    };

    const updateClient = async (ListName: string, itemId: number, itemData: any) => {
        if (spServiceInstance) {
            const results = await spServiceInstance.updateListItem(ListName, itemId, itemData);
            console.log(results, "results");
            return results;
        }
    };

    const addClient = async (ListName: string, itemData: any) => {
        if (spServiceInstance) {
            const results = await spServiceInstance.addListItem(ListName, itemData);
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

    return {
        getClient,
        updateClient,
        getClientExpand,
        addClient,
        deleteClient
    };
};

export default ClientService;
