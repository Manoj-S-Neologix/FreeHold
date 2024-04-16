import { sp } from "@pnp/sp/presets/all";

// Add list items
export const addListItem = async (listName: string, clientName: string): Promise<void> => {
    try {
      await sp.web.lists.getByTitle(listName).items.add({
        'Client Name': clientName, 
      });
    } catch (error) {
      console.error("Error adding client:", error);
      throw error;
    }
  };
  


// Create a folder in the library
export const createFolderInLibrary = async (libraryName: string, folderName: string): Promise<any> => {
  try {
    const library = await sp.web.getFolderByServerRelativeUrl(libraryName);
    await library.folders.add(folderName);
    return true;
  } catch (error) {
    console.error('Error creating folder:', error);
    return false;
  }
};


// Upload a document to the folder
export const uploadDocumentToLibrary = async (libraryName: string, folderName: string, fileName: string, file: Blob): Promise<any> => {
  try {
    const library = await sp.web.getFolderByServerRelativeUrl(libraryName);
    const uploadedFile = await library.folders.getByName(folderName).files.add(fileName, file);
    console.log(uploadedFile, "UploadedFileAPICall");
    return uploadedFile;
  } catch (error) {
    console.error('Error uploading document to library:', error);
    return null;
  }
};



// Get logged-in user's SharePoint groups

export const getLoggedInUserGroups = async (): Promise<any[]> => {
  try {
    const groups = await sp.web.currentUser.groups.get();
    return groups;
  } catch (error) {
    console.error('Error fetching user groups:', error);
    throw error;
  }
};