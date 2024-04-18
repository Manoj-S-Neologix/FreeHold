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


import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Stack } from "@mui/material";
import React from 'react';
import Button from "../../../../Common/Button/CustomButton";
import { Button as MuiButton } from "@mui/material";
import CustomSearch from "../../../../Common/Search/CustomSearch";
import UploadIcon from '@mui/icons-material/Upload';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CloseIcon from "@mui/icons-material/Close";
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';


// import { useTheme } from "@mui/material/styles";

const IconStyles = (icon: any) => {
    return (
        <div style={{ backgroundColor: '#125895', padding: '1px', borderRadius: "50%", border: "1px solid white", width: "25px", height: '25px' }}>
            {icon}
        </div >
    );
};

const Search = (props: any) => {
    const [open, setOpen] = React.useState(false);


    const handleFilterClick = () => {
        console.log('Filter clicked');
        setOpen(true);
    };

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
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "flex-start",
                                    gap: "10px"
                                }}>
                                <Box sx={{ width: "100%" }}>
                                    <CustomSearch props={props} />
                                </Box>
                                <Box>
                                    <IconButton
                                        onClick={handleFilterClick}
                                    >
                                        <FilterAltIcon sx={{ color: "white" }} />
                                    </IconButton>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                <Button
                                    style={{ maxWidth: "190px", whiteSpace: "pre" }}
                                    Icon={IconStyles(
                                        <UploadIcon
                                            sx={{
                                                color: "white",
                                                fontSize: "20px !important"
                                            }} />
                                    )}
                                    color={"secondary"}
                                    message="Upload Document" />
                            </Box>
                        </Grid>
                    </Grid>
                </Box >
            </Stack >
            <Dialog
                open={open}
                fullWidth={true}
                maxWidth={"md"}
            >
                <DialogTitle>
                    <div className="d-flex flex-column">
                        <div className="d-flex justify-content-between
                     align-items-center relative">
                            <h4 style={{ margin: '0', color: '#125895' }}>
                                Filter</h4>
                        </div>
                        <div style={{
                            height: '4px', width: '100%',
                            backgroundColor: '#125895'
                        }} />
                    </div>
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={() => { setOpen(false); }}
                    sx={{
                        position: "absolute",
                        right: "14px",
                        top: "8px",
                        color: (theme: any) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent sx={{ pt: 0, mt: 0 }}>
                    <RadioGroup name="radio-buttons-group" >
                        <FormControlLabel value="Client" label="Client" control={<Radio />} />
                        <FormControlLabel value="Project" label="Project" control={<Radio />} />
                    </RadioGroup>
                    <DialogActions sx={{ mt: 3 }}>
                        <MuiButton variant="outlined" onClick={() => { setOpen(false); }}>
                            Reset
                        </MuiButton>
                        <MuiButton
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{
                                maxWidth: '150px',
                                float: 'right',
                            }}
                        >
                            Filter
                        </MuiButton>
                    </DialogActions>
                </DialogContent>
            </Dialog >
        </Box >
    );
};

export default Search;



