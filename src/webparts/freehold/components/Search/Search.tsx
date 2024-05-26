import { Box, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Grid, IconButton, InputLabel, MenuItem, Stack, TextField, Chip } from "@mui/material";
import React, { useState } from 'react';
import Button from "../../../../Common/Button/CustomButton";
import { Button as MuiButton } from "@mui/material";
import CommonCustomSearch from "../../../../Common/Search/CommonCustomSearch";
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
import ClientService from "../../Services/Business/ClientService";
import ProjectService from "../../Services/Business/ProjectService";
import SPService, { SPServiceType } from "../../Services/Core/SPService";
import _ from "lodash";

// const clientOptions = ['Client1', 'Client2', 'Client3'];
// const projectOptions = ['Project1', 'Project2', 'Project3'];

const IconStyles = (icon: any, theme: any) => {
    return (
        <div style={{ backgroundColor: theme.palette.primary.main, padding: '1px', borderRadius: "50%", border: "1px solid white", width: "25px", height: '25px' }}>
            {icon}
        </div >
    );
};

const Search: React.FC<any> = ({ onClose, spContext, siteUrl }) => {
    const [open, setOpen] = React.useState(false);
    const [search, setSearch] = React.useState<string>('');
    const [openDocuments, setOpenDocuments] = React.useState(false);
    const [isExpand, setIsExpand] = React.useState<boolean>(false);

    const spServiceInstance: SPServiceType = SPService;
    const [userRole, setUserRole] = useState('');

    // const [clientValue, setClientValue] = React.useState<string>('');
    // const [projectValue, setProjectValue] = React.useState<string>('');
    const [isLoading, setIsLoading] = React.useState(true);
    const [clientData, setClientData] = React.useState<any>([]);
    const [AllClientData, setAllClientData] = React.useState<any>([]);
    const [getClient, setGetClient] = React.useState<any[]>([]);
    const [particularClientAllData, setParticularClientAllData] = React.useState<any>([]);
    const [projectData, setProjectData] = React.useState<any>([]);
    //const [selectedProject, setSelectedProject] = React.useState<string>('');
    const { control, handleSubmit, formState: { errors }, setValue, reset, getValues } = useForm();
    const [documentType, setDocumentType] = React.useState('');
    const [isUnitDocumentChecked, setIsUnitDocumentChecked] = React.useState(false);
    const [selectedPersons, setSelectedPersons] = React.useState<string[]>([]);

    const theme = useTheme();

    const handleSearchChange = (e: any) => {
        setSearch(e.target.value);
    };

    console.log(search, "searchEvent");

    console.log(isLoading, clientData, AllClientData, particularClientAllData, getClient, "ClientDataClientData")

    console.log(projectData, "projectData...")

    // const handleFilterClick = () => {
    //     //console.log('Filter clicked');
    //     setOpen(true);
    // };
    const handleDocumentClick = () => {
        //console.log('Document clicked');
        setOpenDocuments(true);
    };



    const handleSave = (data: any) => {
        setOpenDocuments(false);
    };

    const handleClear = () => {
        reset();
        // onClose();
    };

    const handleApply = () => {
        setOpen(false);
        setOpen(false);
        const selectedClientName = getValues("clientName");
        const selectedProjectName = getValues("projectName");
        const selectedNames: string[] = [];
        if (selectedClientName) {
            selectedNames.push(selectedClientName);
        }
        if (selectedProjectName) {
            selectedNames.push(selectedProjectName);
        }
        setSelectedPersons(selectedNames);
        setIsExpand(true)
        reset();
    };

    const documentTypes = [
        { id: 1, label: "Project" },
        { id: 2, label: "Client" }
    ];

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const clientService = ClientService();
            const projectService = ProjectService();

            console.log("API CALL working");

            const clientResults = await clientService.getClient('Client_Informations');
            console.log(clientResults, "client result");
            if (clientResults && clientResults.length > 0) {
                setClientData(clientResults);
                setAllClientData(clientResults);
            } else {
                setClientData([]);
                setAllClientData([]);
            }

            const projectResults = await projectService.getProject('Project_Informations');
            console.log(projectResults, "project result");
            if (projectResults && projectResults.length > 0) {
                setProjectData(projectResults);
            } else {
                setProjectData([]);
            }

            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.error('Error fetching data:', error);
        }
    };

    const getUserRoles = () => {
        let loggedInUserGroups: string[] = [];
        let userRoleVal: string = "staff";

        spServiceInstance.getLoggedInUserGroups().then((response) => {
            //console.log("Current user site groups : ", response);

            _.forEach(response, function (group: any) {
                loggedInUserGroups.push(group.Title);
            });

            if (_.indexOf(loggedInUserGroups, "DMS Superuser") > -1) {
                userRoleVal = "superuser";
            } else if (_.indexOf(loggedInUserGroups, "DMS Managers") > -1) {
                userRoleVal = "manager";
            } else if (_.indexOf(loggedInUserGroups, "DMS Staffs") > -1) {
                userRoleVal = "staff";
            }

            setUserRole(userRoleVal);

        });
    }

    React.useEffect(() => {
        setDocumentType('');
        getUserRoles();
    }, []);


    React.useEffect(() => {
        fetchData();
    }, [userRole]);

    return (
        <Box sx={{ backgroundColor: theme.palette.primary.main, padding: '10px' }} >

            {/* Search box */}
            <Stack direction={"column"} spacing={2}>
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                }}>
                    <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "flex-start",
                                    gap: "10px"
                                }}>
                                <Box sx={{ width: "100%" }}>
                                    <CommonCustomSearch isExpand={isExpand} handleSearchChange={handleSearchChange} spContext={spContext} siteUrl={siteUrl} client={getValues("clientName")} project={getValues("projectName")} />
                                </Box>
                                <Box>

                                    <Stack direction="row" spacing={1}>
                                        <Box sx={{ maxWidth: "10rem", display: "flex" }}>
                                            {selectedPersons.length === 0 ? (
                                                <MuiButton onClick={() => setOpen(true)}>
                                                    <FilterAltIcon sx={{ marginRight: '11rem', color: theme.palette.common.white }} />
                                                </MuiButton>
                                            ) : (
                                                selectedPersons.map((person, index) => (
                                                    <Chip
                                                        key={index}
                                                        sx={{ color: theme.palette.common.white }}
                                                        label={person}
                                                        onDelete={() => {
                                                            const updatedPersons = selectedPersons.filter((name, idx) => idx !== index);
                                                            setSelectedPersons(updatedPersons);
                                                            if (updatedPersons.length === 0) {
                                                                setIsExpand(false);
                                                            }
                                                        }}
                                                    />
                                                ))
                                            )}
                                        </Box>
                                    </Stack>

                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
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

            {/* advanced filter */}
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
                        right: "8px",
                        top: "8px",
                        color: (theme: any) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent sx={{ pt: 0, mt: 0, pl: 0, overflow: "hidden" }}>
                    <Grid container spacing={2} sx={{ m: 0, alignItems: "center", paddingLeft: "10px", paddingRight: "10px" }}>
                        <Grid item xs={12} sm={12} >
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
                                            helperText={errors?.clientName?.message}
                                            onChange={(e: any) => {
                                                // console.log(e.target.value);
                                                setGetClient(e.target.value);
                                                const getUnique = AllClientData.filter((datas: any) => datas.Title === e.target.value);
                                                setParticularClientAllData(getUnique);
                                                // setValue('projectName', e.target.value)
                                                console.log(getUnique, "getUnique")

                                                setValue('clientName', e.target.value);

                                            }}
                                        >
                                            {AllClientData?.map((item: any) => (
                                                <MenuItem key={item.id} value={item.Title}>
                                                    {item.Title}
                                                </MenuItem>
                                            ))}
                                        </TextField>

                                    </>
                                )}
                            />

                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Controller
                                name="projectName"
                                control={control}
                                defaultValue=""
                                rules={{ required: 'Project Name is required' }}
                                render={({ field }) => (
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
                                            //value={selectedProject}
                                            onChange={async (e: any) => {
                                                //setSelectedProject(e.target.value);
                                                setValue('projectName', e.target.value);
                                            }}
                                        >
                                            {projectData.map((item: any) => (
                                                <MenuItem key={item.id} value={item.Title}>
                                                    {item.Title}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </>
                                )}
                            />
                        </Grid>
                    </Grid>
                    <DialogActions sx={{ mt: 3, ml: "7px", width: "100%", p: 0 }}>
                        {!isLoading && <MuiButton variant="outlined" onClick={handleClear}>
                            Clear
                        </MuiButton>}
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

            {/* Upload documents */}
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

                    {/* Project document upload */}
                    {documentType === 'Project' && (
                        <>
                            {/* <ClientProjectUpload /> */}
                            <ClientUploadDocument
                                userRole={userRole}
                                spContext={spContext}
                                onClose={() => {
                                    setDocumentType('')
                                    setOpenDocuments(false)
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
                    {/* Client document upload */}
                    {documentType === 'Client' && (
                        <>
                            <ProjectUploadDocument
                                userRole={userRole}
                                spContext={spContext}
                                onClose={() => {
                                    setDocumentType('')
                                    setOpenDocuments(false)
                                }} />
                        </>

                    )}

                </DialogContent>
            </Dialog>
        </Box >
    );
};

export default Search;
