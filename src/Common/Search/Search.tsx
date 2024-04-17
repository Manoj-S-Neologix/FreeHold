// import React from 'react';
// import styles from './Search.module.scss';
// import { TextField, IconButton } from '@material-ui/core';
// import SearchIcon from '@material-ui/icons/Search';
// import FilterListIcon from '@material-ui/icons/FilterList';
// import Upload from "../Upload/Upload";

// const Search = (props:any) => {
//     const handleFilterClick = () => {
//         console.log('Filter clicked');
//     };

//     return (
//         <div className={styles.searchmodule}>
//             <div className={styles.container}>
//                 <div className={styles.row}>
//                     <div className={styles.column}>
//                         <div className={styles.col12}>
//                             <div className={`${styles.col8} ${styles.searchInput}`}>
//                                  <TextField
//                                     className={styles.searchBar}
//                                     placeholder="Search..."
//                                     InputProps={{ endAdornment: <SearchIcon 
//                                         className={styles.IconSearch}/>,
//                                         disableUnderline: true
//                                      }} 
//                                 />
//                                 <IconButton
//                                     onClick={handleFilterClick}
//                                     className={styles.iconFilter}
//                                 >
//                                     <FilterListIcon />
//                                 </IconButton>
//                             </div>
//                             <div className={` ${styles.col2} `}>
//                                 <Upload props={props} />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Search;


import React, { useState } from 'react';
import styles from './Search.module.scss';
import { TextField, IconButton, Dialog, DialogTitle, DialogContent, FormControl, InputLabel, Select, MenuItem, Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import FilterListIcon from '@material-ui/icons/FilterList';
import CloseIcon from '@material-ui/icons/Close';
import Upload from "../Upload/Upload";

const Search = (props:any) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedProject, setSelectedProject] = useState('');
    const [selectedClient, setSelectedClient] = useState('');

    const handleFilterClick = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleResetFilters = () => {
        setSelectedProject('');
        setSelectedClient('');
    };

    const handleApplyFilters = () => {
        // Handle applying filters logic here
    };

    return (
        <div className={styles.searchmodule}>
            <div className={styles.container}>
                <div className={styles.row}>
                    <div className={styles.column}>
                        <div className={styles.col12}>
                         <div className={`${styles.col8} ${styles.searchInput}`}>
                                <TextField
                                    className={styles.searchBar}
                                    placeholder="Search..."
                                    InputProps={{ endAdornment: <SearchIcon 
                                        className={styles.IconSearch}/>,

                                        disableUnderline: true
                                     }} 
                                />
                                <IconButton
                                    onClick={handleFilterClick}
                                    className={styles.iconFilter}
                                >
                                    <FilterListIcon />
                                </IconButton>
                            </div>
                            <div className={` ${styles.col2} `}>
                                <Upload props={props} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth>
                <DialogTitle>
                    Advanced Search
                    <IconButton onClick={handleCloseDialog}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <FormControl fullWidth>
                        <InputLabel>Project</InputLabel>
                        <Select
                            value={selectedProject}
                            onChange={(e) => setSelectedProject(e.target.value as string)}
                        >
                            <MenuItem value="project">Project Name</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel>Client</InputLabel>
                        <Select
                            value={selectedClient}
                            onChange={(e) => setSelectedClient(e.target.value as string)}
                        >
                            <MenuItem value="Client">Client Name</MenuItem>
                        </Select>
                    </FormControl>
                    <Button onClick={handleApplyFilters}>Apply</Button>
                    <Button onClick={handleResetFilters}>Reset</Button>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Search;



