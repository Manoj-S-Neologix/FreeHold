import { Box, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Grid, IconButton, InputLabel, MenuItem, Stack, TextField } from "@mui/material";
import React from 'react';
import Button from "../../../../Common/Button/CustomButton";
import { Button as MuiButton } from "@mui/material";
import CustomSearch from "../../../../Common/Search/CustomSearch";
import UploadIcon from '@mui/icons-material/Upload';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CloseIcon from "@mui/icons-material/Close";
import { Controller, useForm } from "react-hook-form";
import { Radio, RadioGroup, Checkbox, FormHelperText } from '@mui/material';
import { useTheme } from "@mui/material/styles";
import DragAndDropUpload from "../../../../Common/DragAndDrop/DragAndDrop";
import styles from "./Search.module.scss";
// import ClientProjectUpload from "../ClientUploadDocument/ClientProjectUpload";
import ClientUploadDocument from "../ClientUploadDocument/ClientUploadDocument";
import ProjectUploadDocument from "../ProjectUploadDocument/ProjectUploadDocument";

const clientOptions = ['Client1', 'Client2', 'Client3'];
const projectOptions = ['Project1', 'Project2', 'Project3'];

const IconStyles = (icon: any, theme: any) => {
    return (
        <div style={{ backgroundColor: theme.palette.primary.main, padding: '1px', borderRadius: "50%", border: "1px solid white", width: "25px", height: '25px' }}>
            {icon}
        </div >
    );
};

const Search = (props: any) => {
    const [open, setOpen] = React.useState(false);
    const [search, setSearch] = React.useState<string>('');
    const [openDocuments, setOpenDocuments] = React.useState(false);
    const [clientValue, setClientValue] = React.useState<string>('');
    const [projectValue, setProjectValue] = React.useState<string>('');

    const handleSearchChange = (e: any) => {
        setSearch(e.target.value);
    };

    console.log(search, "searchEvent");

    const handleFilterClick = () => {
        //console.log('Filter clicked');
        setOpen(true);
    };
    const handleDocumentClick = () => {
        //console.log('Document clicked');
        setOpenDocuments(true);
    };

    const handleClear = () => {
        setClientValue('');
        setProjectValue('');
    };

    // const handleCancel = () => {
    //     onClose();
    //   };

    const handleApply = () => {
        console.log({
            "client": clientValue,
            "project": projectValue
        });
    };



    const { control, handleSubmit, formState: { errors } } = useForm();
    const [documentType, setDocumentType] = React.useState('');
    const [isUnitDocumentChecked, setIsUnitDocumentChecked] = React.useState(false);

    const theme = useTheme();

    const handleSave = (data: any) => {
        setOpenDocuments(false);
    };

    const documentTypes = [
        { id: 1, label: "Project" },
        { id: 2, label: "Client" }
    ];


    React.useEffect(() => {
        setDocumentType('')
    }, []);

    return (
        <Box sx={{ backgroundColor: theme.palette.primary.main, padding: '10px' }} >
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
                                    <CustomSearch handleSearchChange={handleSearchChange} />
                                </Box>
                                <Box>
                                    <IconButton
                                        onClick={handleFilterClick}
                                    >
                                        <FilterAltIcon sx={{ color: theme.palette.common.white }} />
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
                                                color: theme.palette.common.white,
                                                fontSize: "20px !important"
                                            }} />,
                                        theme
                                    )}
                                    color={"secondary"}
                                    message="Upload Documents"
                                    handleClick={handleDocumentClick}
                                />
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
                            <h4 style={{ margin: '0', color: theme.palette.primary.main }}>
                                Advanced Filter</h4>
                        </div>
                        <div style={{
                            height: '4px', width: '100%',
                            backgroundColor: theme.palette.primary.main
                        }} />
                    </div>
                </DialogTitle>

                <IconButton
                    aria-label="close"
                    // onClick={handleCancel}
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

            <Dialog
                open={openDocuments}
                fullWidth
                maxWidth={"sm"}
                scroll={"paper"}
            >
                <DialogTitle className={styles.addTitle}
                    style={{ textAlign: 'center', marginLeft: '7px', position: 'relative' }}>
                    <div className="d-flex flex-column">
                        <div className="d-flex justify-content-between align-items-center relative">
                            <h4 style={{ margin: '0', color: '#125895' }}>
                                Upload Documents</h4>
                        </div>
                        <div style={{ height: '4px', width: '100%', backgroundColor: '#125895' }} />
                    </div>
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={() => setOpenDocuments(false)}
                    sx={{
                        position: "absolute",
                        right: "14px",
                        top: "8px",
                        color: (theme: any) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent sx={{ pt: 0, }}>
                    <RadioGroup
                        row
                        name="row-radio-buttons-group"
                        value={documentType}
                        onChange={(e) => setDocumentType(e.target.value)}
                        sx={{ justifyContent: 'space-evenly' }}
                    >
                        {documentTypes.map((docType) => (
                            <FormControlLabel key={docType.id} value={docType.label} control={<Radio />} label={docType.label} />
                        ))}
                    </RadioGroup>
                    {documentType === 'Project' && (
                        <>
                            {/* <ClientProjectUpload /> */}
                            <ClientUploadDocument onClose={() => {
                                setDocumentType('')
                            }} />
                            {false && <form onSubmit={handleSubmit(handleSave)}>
                                <Stack direction={"column"} gap={3}>
                                    <Grid container spacing={2}>
                                        <Grid item sm={12}>
                                            <Controller
                                                name="projectName"
                                                control={control}
                                                defaultValue=""
                                                rules={{ required: 'Project Name is required' }}
                                                render={({ field }: any) => (
                                                    <>
                                                        <InputLabel htmlFor="project-name">Project Name</InputLabel>
                                                        <TextField
                                                            {...field}
                                                            id="project-name"
                                                            fullWidth
                                                            variant="outlined"
                                                            select
                                                            size="small"
                                                            required
                                                            label=""
                                                            error={!!errors.projectName}
                                                        >
                                                            <MenuItem value="">None</MenuItem>
                                                            <MenuItem value="Project A">Project A</MenuItem>
                                                            <MenuItem value="Project B">Project B</MenuItem>
                                                        </TextField>
                                                        <FormHelperText error>{errors.projectName && errors.projectName.message}</FormHelperText>
                                                    </>
                                                )}
                                            />
                                        </Grid>

                                        {false && <Grid item sm={6}>
                                            <Controller
                                                name="clientName"
                                                control={control}
                                                defaultValue=""
                                                rules={{ required: 'Client Name is required' }}
                                                render={({ field }) => (
                                                    <>
                                                        <InputLabel htmlFor="client-name">Client Name</InputLabel>
                                                        <TextField
                                                            {...field}
                                                            id="client-name"
                                                            fullWidth
                                                            variant="outlined"
                                                            select
                                                            size="small"
                                                            required
                                                            label=""
                                                            error={!!errors.clientName}
                                                        >
                                                            <MenuItem value="">None</MenuItem>
                                                            <MenuItem value="Client A">Client A</MenuItem>
                                                            <MenuItem value="Client B">Client B</MenuItem>
                                                        </TextField>
                                                        <FormHelperText error>
                                                            {errors.clientName && errors.clientName.message}
                                                        </FormHelperText>
                                                    </>
                                                )}
                                            />
                                        </Grid>}

                                        {false && <Grid item sm={6}>
                                            <Stack direction="row" alignItems="center">
                                                <Checkbox checked={isUnitDocumentChecked}
                                                    onChange={(e) => setIsUnitDocumentChecked(e.target.checked)}
                                                    size="small" sx={{ p: 0, mr: 2 }} />
                                                <InputLabel>Is Unit Document</InputLabel>
                                            </Stack>
                                            {<Controller
                                                name="unitDocument"

                                                control={control}
                                                defaultValue=""
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        id="is-unit-document"
                                                        fullWidth
                                                        select
                                                        disabled={!isUnitDocumentChecked}
                                                        variant="outlined"
                                                        placeholder="Select Unit..."
                                                        size="small"
                                                        required
                                                    >
                                                        <MenuItem value="">None</MenuItem>
                                                        <MenuItem value="Option A">Option A</MenuItem>
                                                        <MenuItem value="Option B">Option B</MenuItem>
                                                    </TextField>
                                                )}
                                            />}
                                        </Grid>}

                                        {false && <Grid item sm={12}>
                                            <InputLabel htmlFor="project-document">Upload Document</InputLabel>
                                            <DragAndDropUpload
                                                onFilesAdded={(files: File[]) => {
                                                    //console.log(files);
                                                }}
                                            />
                                        </Grid>}

                                    </Grid>
                                </Stack>
                                <DialogActions sx={{ px: 0, mr: 0 }}>
                                    <MuiButton
                                        type="submit"
                                        variant="contained"
                                    >
                                        Save
                                    </MuiButton>
                                    <MuiButton
                                        variant="outlined"
                                        onClick={() => setOpenDocuments(false)}
                                    >
                                        Cancel
                                    </MuiButton>

                                </DialogActions>
                            </form>}
                        </>

                    )}
                    {documentType === 'Client' && (
                        <>
                            <ProjectUploadDocument onClose={() => {
                                setDocumentType('')
                            }} />
                        </>
                        //   <form onSubmit={handleSubmit(handleSave)}>
                        //           {false&& <Stack direction={"column"} gap={3}>
                        //                 <Grid container spacing={2}>
                        //                     <Grid item sm={12}>
                        //                         <Controller
                        //                             name="clientName"
                        //                             control={control}
                        //                             defaultValue=""
                        //                             rules={{ required: 'Client Name is required' }}
                        //                             render={({ field }) => (
                        //                                 <>
                        //                                     <InputLabel htmlFor="client-name">Client Name</InputLabel>
                        //                                     <TextField
                        //                                         {...field}
                        //                                         id="client-name"
                        //                                         fullWidth
                        //                                         variant="outlined"
                        //                                         select
                        //                                         size="small"
                        //                                         required
                        //                                         label=""
                        //                                         error={!!errors.clientName}
                        //                                     >
                        //                                         <MenuItem value="">None</MenuItem>
                        //                                         <MenuItem value="Client A">Client A</MenuItem>
                        //                                         <MenuItem value="Client B">Client B</MenuItem>
                        //                                     </TextField>
                        //                                     <FormHelperText error>{errors.clientName && errors.clientName.message}</FormHelperText>
                        //                                 </>
                        //                             )}
                        //                         />
                        //                     </Grid>
                        //                     <Grid item sm={12}>
                        //                         <InputLabel htmlFor="client-document">Upload Document</InputLabel>
                        //                         <DragAndDropUpload
                        //                             onFilesAdded={(files: File[]) => {
                        //                                 //console.log(files);
                        //                             }}
                        //                         />
                        //                     </Grid>
                        //                 </Grid>
                        //                 <DialogActions sx={{ px: 0, mr: 0 }}>
                        //                     <MuiButton
                        //                         type="submit"
                        //                         variant="contained"
                        //                     >
                        //                         Save
                        //                     </MuiButton>
                        //                     <MuiButton
                        //                         variant="outlined"
                        //                         onClick={() => setOpenDocuments(false)}
                        //                     >
                        //                         Cancel
                        //                     </MuiButton>

                        //                 </DialogActions>
                        //             </Stack>}
                        //         </form>
                    )}

                </DialogContent>
            </Dialog>
        </Box >
    );
};

export default Search;
