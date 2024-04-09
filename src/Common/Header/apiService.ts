const fetchUserName = async () => {
    try {
        const response = await fetch("https://freeholddxb.sharepoint.com/_api/web/currentuser", {
            headers: {
                "Accept": "application/json;odata=verbose",
                "Content-Type": "application/json;odata=verbose"
            },
            credentials: 'include' 
        });
        const data = await response.json();
        return data.d.Title; 
    } catch (error) {
        console.error('Error fetching user name:', error);
        return null;
    }
};

export default fetchUserName;



// not working

// import { sp } from "@pnp/sp/presets/all"; 

// const fetchUserName = async () => {
//     try {
//         const response = await sp.web.currentUser.get();
//         return response.Title; // Assuming 'Title' contains the user's name
//     } catch (error) {
//         console.error('Error fetching user name:', error);
//         return null;
//     }
// };

// export default fetchUserName;

