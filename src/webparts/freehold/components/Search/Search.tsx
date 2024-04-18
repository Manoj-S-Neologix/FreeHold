import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, MenuItem, Stack, TextField } from "@mui/material";
import React from 'react';
import Button from "../../../../Common/Button/CustomButton";
import { Button as MuiButton } from "@mui/material";
import CustomSearch from "../../../../Common/Search/CustomSearch";
import UploadIcon from '@mui/icons-material/Upload';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CloseIcon from "@mui/icons-material/Close";

// Import your options for the select here
const clientOptions = ['Client1', 'Client2', 'Client3'];
const projectOptions = ['Project1', 'Project2', 'Project3'];

const IconStyles = (icon: any) => {
    return (
        <div style={{ backgroundColor: '#125895', padding: '1px', borderRadius: "50%", border: "1px solid white", width: "25px", height: '25px' }}>
            {icon}
        </div >
    );
};

const Search = (props: any) => {
    const [open, setOpen] = React.useState(false);
    const [clientValue, setClientValue] = React.useState<string>('');
    const [projectValue, setProjectValue] = React.useState<string>('');

    const handleFilterClick = () => {
        console.log('Filter clicked');
        setOpen(true);
    };

    const handleClear = () => {
        setClientValue('');
        setProjectValue('');
    };

    const handleApply = () => {

        console.log({
            "client": clientValue,
            "project": projectValue
        });
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
                                    style={{ maxWidth: "200px", whiteSpace: "pre" }}
                                    Icon={IconStyles(
                                        <UploadIcon
                                            sx={{
                                                color: "white",
                                                fontSize: "20px !important"
                                            }} />
                                    )}
                                    color={"secondary"}
                                    message="Upload Documents" />
                            </Box>
                        </Grid>
                    </Grid>
                </Box >
            </Stack >
            <Dialog
                open={open}
                fullWidth={true}
                maxWidth={"sm"}
            >
                <DialogTitle>
                    <div className="d-flex flex-column">
                        <div className="d-flex justify-content-between
                     align-items-center relative">
                            <h4 style={{ margin: '0', color: '#125895' }}>
                                Advanced Filter</h4>
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
                <DialogContent sx={{ pt: 0, mt: 0, pl: 0, overflow: "hidden" }}>
                    <Grid container spacing={2} sx={{ m: 0, alignItems: "center", paddingLeft: "10px", paddingRight: "10px" }}>
                        <Grid item xs={12} sm={12} >
                            <TextField
                                fullWidth
                                label="Client"
                                select
                                value={clientValue}
                                onChange={(event) => setClientValue(event.target.value)}
                                variant="outlined"
                            >
                                {clientOptions.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </TextField>

                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                fullWidth
                                label="Project"
                                select
                                value={projectValue}
                                onChange={(event) => setProjectValue(event.target.value)}
                                variant="outlined"
                            >
                                {projectOptions.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>
                    <DialogActions sx={{ mt: 3, ml: "7px", width: "100%", p: 0 }}>
                        <MuiButton variant="outlined" onClick={handleClear}>
                            Clear
                        </MuiButton>
                        <MuiButton
                            onClick={handleApply}
                            variant="contained"
                            color="primary"
                            sx={{
                                maxWidth: '150px',
                                float: 'right',
                            }}
                        >
                            Apply
                        </MuiButton>
                    </DialogActions>
                </DialogContent>
            </Dialog >
        </Box >
    );
};

export default Search;
