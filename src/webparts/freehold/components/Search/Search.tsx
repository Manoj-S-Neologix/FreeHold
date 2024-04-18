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


import { Box, Grid, Stack } from "@mui/material";
import React from 'react';
import Button from "../../../../Common/Button/CustomButton";
import CustomSearch from "../../../../Common/Search/CustomSearch";
import UploadIcon from '@mui/icons-material/Upload';
// import { useTheme } from "@mui/material/styles";

const IconStyles = (icon: any) => {
    return (
        <div style={{ backgroundColor: '#125895', padding: '0px', borderRadius: "50%", border: "1px solid white", width: "25px", height: '25px' }}>
            {icon}
        </div >
    );
};

const Search = (props: any) => {
    // const theme = useTheme();

    return (
        <Box sx={{ backgroundColor: '#125895', padding: '10px' }} >
            <Stack direction={"column"} spacing={2}>
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <Grid container spacing={2} >
                        <Grid item xs={12} sm={8}>
                            <Box>
                                <CustomSearch props={props} />
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                <Button
                                    style={{ maxWidth: "190px", whiteSpace: "pre" }}
                                    Icon={IconStyles(<UploadIcon
                                        sx={{ color: "white", fontSize: "10px !important" }} />)}
                                    color={"secondary"}
                                    message="Upload Document" />
                            </Box>
                        </Grid>
                    </Grid>
                </Box >
            </Stack>
        </Box>
    );
};

export default Search;



