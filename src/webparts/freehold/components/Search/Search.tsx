import { Box, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Grid, IconButton, MenuItem, Stack, TextField, Chip, Menu, Autocomplete } from "@mui/material";
import React, { useState } from 'react';
import Button from "../../../../Common/Button/CustomButton";
import { Button as MuiButton } from "@mui/material";
import CommonCustomSearch from "../../../../Common/Search/CommonCustomSearch";
import UploadIcon from '@mui/icons-material/Upload';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CloseIcon from "@mui/icons-material/Close";
import { Controller, useForm } from "react-hook-form";
import { Radio, RadioGroup } from '@mui/material';
import { useTheme } from "@mui/material/styles";
import styles from "./Search.module.scss";
import ClientUploadDocument from "../ClientUploadDocument/ClientUploadDocument";
import ProjectUploadDocument from "../ProjectUploadDocument/ProjectUploadDocument";
import ClientService from "../../Services/Business/ClientService";
import ProjectService from "../../Services/Business/ProjectService";
import SPService, { SPServiceType } from "../../Services/Core/SPService";
import MenuIcon from '@mui/icons-material/Menu';
import _ from "lodash";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const IconStyles = (icon: any, theme: any) => {
    return (
        <div style={{ backgroundColor: theme.palette.primary.main, padding: '1px', borderRadius: "50%", border: "1px solid white", width: "25px", height: '25px' }}>
            {icon}
        </div >
    );
};

const Search: React.FC<any> = ({ onClose, spContext, siteUrl }) => {
    const [open, setOpen] = React.useState(false);
    const [, setSearch] = React.useState<string>('');
    const [openDocuments, setOpenDocuments] = React.useState(false);
    const [isExpand, setIsExpand] = React.useState<boolean>(false);
    const [isNavOpen, setisNavOpen] = React.useState(false);
    const spServiceInstance: SPServiceType = SPService;
    const [userRole, setUserRole] = useState('');
    const [isLoading, setIsLoading] = React.useState(true);
    const [isApplied, setIsApplied] = React.useState(false);
    const [, setClientData] = React.useState<any>([]);
    const [AllClientData, setAllClientData] = React.useState<any>([]);
    const [, setGetClient] = React.useState<any[]>([]);
    const [, setParticularClientAllData] = React.useState<any>([]);
    const [projectData, setProjectData] = React.useState<any>([]);
    const { control, formState: { errors }, setValue, reset, getValues, watch } = useForm();
    const [documentType, setDocumentType] = React.useState('');
    const [selectedPersons, setSelectedPersons] = React.useState<string[]>([]);
    const navigate = useNavigate();
    const location = useLocation();

    React.useEffect(() => {
        if (location.pathname !== "/") {
            setisNavOpen(true);
        } else {
            setisNavOpen(false);
        }
    }, [location]);

    const theme = useTheme();

    const handleSearchChange = (e: any) => {
        setSearch(e.target.value);
    };

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const mopen = Boolean(anchorEl);
    const mhandleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const mhandleClose = () => {
        setAnchorEl(null);
    };

    const handleDocumentClick = () => {
        setOpenDocuments(true);
    };

    const handleClear = () => {
        reset();
    };

    const handleApply = () => {
        setOpen(false);
        setOpen(false);
        const selectedClientName = getValues("clientName");
        const selectedProjectName = getValues("projectName");
        const selectedNames: string[] = [];
        if (selectedClientName) {
            selectedNames.push("Client : " + selectedClientName);
        }
        if (selectedProjectName) {
            selectedNames.push("Project : " + selectedProjectName);
        }
        setSelectedPersons(selectedNames);
        setIsExpand(true);
        if (selectedClientName !== "" || selectedProjectName !== "") {
            setIsApplied(true);
        } else {
            setIsApplied(false);
        }
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

            if (userRole === "staff") {
                const select = '*,Author/Title,Author/EMail,AssignClient/Title,AssignClient/ClientLibraryGUID,AssignClient/Id,Editor/Id,Editor/Title,Editor/EMail';
                const expand = 'Author,AssignClient,Editor';
                const orderBy = 'Modified';
                const filter = "IsActive eq 'Yes'";

                const cselect = '*,AssignedStaff/Title,AssignedStaff/EMail,AssignedStaff/Id,Author/Title,Author/EMail,ProjectId/Id,ProjectId/Title, Editor/Id,Editor/Title,Editor/EMail';
                const cexpand = 'AssignedStaff,Author,ProjectId,Editor';
                const cfilter = `AssignedStaff/EMail eq '${spContext.pageContext.user.email}' and IsActive eq 'Yes'`;

                const [projectResults, clientResults] = await Promise.all([
                    projectService.getfilteredProjectExpand('Project_Informations', select, filter, expand, orderBy, spContext.pageContext.user.email),
                    clientService.getClientExpandApi('Client_Informations', cselect, cexpand, cfilter, "")
                ]);
                if (projectResults && projectResults.updatedResults && projectResults.updatedResults.length > 0) {
                    setProjectData(projectResults.TableData);
                } else {
                    setProjectData([]);
                    setAllClientData([]);
                }
                if (clientResults && clientResults.length > 0) {
                    setAllClientData(clientResults);
                } else {
                    setAllClientData(clientResults);
                }
            } else {
                const clientResults = await clientService.getClient('Client_Informations');
                if (clientResults && clientResults.length > 0) {
                    setClientData(clientResults);
                    setAllClientData(clientResults);
                } else {
                    setClientData([]);
                    setAllClientData([]);
                }
                const projectResults = await projectService.getProject('Project_Informations');
                if (projectResults && projectResults.length > 0) {
                    // setProjectData(projectResults);
                    setProjectData(projectResults.filter((project: any) => project.IsActive === 'Yes'));
                } else {
                    setProjectData([]);
                }
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.error('Error fetching data:', error);
        }
    };

    const getUserRoles = () => {
        const loggedInUserGroups: string[] = [];
        let userRoleVal: string = "staff";

        spServiceInstance.getLoggedInUserGroups().then((response) => {
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
    };

    const pageRedirect = (url: string) => {
        mhandleClose();
        navigate(url);
    };

    React.useEffect(() => {
        setDocumentType('');
        getUserRoles();
    }, []);

    React.useEffect(() => {
        fetchData();
    }, [userRole]);

      // Watch the values of clientName and projectName
      const clientName = watch("clientName");
      const projectName = watch("projectName");
  
      // Check if either field is filled
      const isFormValid = !!clientName || !!projectName;

    return (
        <Box sx={{ backgroundColor: theme.palette.primary.main, padding: '10px' }} >
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
                                <Box sx={{ width: "100%", paddingLeft: '8px' }}>
                                    <CommonCustomSearch projectData={projectData} clientData={AllClientData} isExpand={isExpand} handleSearchChange={handleSearchChange} spContext={spContext} siteUrl={siteUrl} client={getValues("clientName")} project={getValues("projectName")} isApplied={isApplied} />
                                </Box>
                                <Box>

                                    {selectedPersons.length === 0 &&
                                        <Box sx={{ width: "20px !important", cursor: 'pointer' }} onClick={() => setOpen(true)}>
                                            <FilterAltIcon sx={{ marginRight: '11rem', color: theme.palette.common.white }} />
                                        </Box>
                                    }

                                    <Box sx={{ display: "flex" }}>
                                        {selectedPersons.length !== 0 &&
                                            (
                                                selectedPersons.map((person, index) => (
                                                    <Chip
                                                        key={index}
                                                        sx={{ color: theme.palette.common.white }}
                                                        label={person}
                                                        onDelete={() => {
                                                            const updatedPersons = selectedPersons.filter((name, idx) => idx !== index);

                                                            if (selectedPersons[index].startsWith("Project :")) {
                                                                setValue('projectName', "");

                                                                if (getValues("clientName") === "") {
                                                                    setIsApplied(false);
                                                                }
                                                            } else if (selectedPersons[index].startsWith("Client :")) {
                                                                setValue('clientName', "");

                                                                if (getValues("projectName") === "") {
                                                                    setIsApplied(false);
                                                                }
                                                            }
                                                            setSelectedPersons(updatedPersons);
                                                            if (updatedPersons.length === 0) {
                                                                setIsExpand(false);
                                                            }
                                                        }}
                                                    />
                                                ))
                                            )}
                                    </Box>

                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            paddingTop: "1rem !important",
                            position: "absolute",
                            top: "70px !important",
                            right: "10px !important"
                        }}>
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

                                {isNavOpen &&
                                    <div>
                                        <IconButton
                                            aria-label="more"
                                            id="long-button"
                                            aria-controls={mopen ? 'long-menu' : undefined}
                                            aria-expanded={mopen ? 'true' : undefined}
                                            aria-haspopup="true"
                                            onClick={mhandleClick}
                                            sx={{ color: theme.palette.common.white }}
                                        >
                                            <MenuIcon />
                                        </IconButton>
                                        <Menu
                                            id="long-menu"
                                            anchorEl={anchorEl}
                                            MenuListProps={{
                                                'aria-labelledby': 'long-button',
                                            }}
                                            open={mopen}
                                            sx={{ color: theme.palette.common.white }}
                                            onClose={mhandleClose}
                                        >

                                            <MenuItem onClick={() => pageRedirect("/ViewClients")}>
                                                View Clients
                                            </MenuItem>
                                            <MenuItem onClick={() => pageRedirect("/ViewProject")}>
                                                View Projects
                                            </MenuItem>
                                            <MenuItem onClick={() => pageRedirect("/ChecklistValidation")}>
                                                Checklist Validation
                                            </MenuItem>
                                        </Menu>
                                    </div>
                                }
                            </Box>
                        </Grid>
                    </Grid>
                </Box >
            </Stack >

            <Dialog
                open={open}
                fullWidth={true}
                maxWidth={"sm"}
                sx={{
                    '.MuiPaper-root': { overflowY: 'initial !important' }
                }}
            >
                <DialogTitle>
                    <Box sx={{ overflowY: 'hidden' }} className="d-flex flex-column" >
                        <Box sx={{ overflowY: 'hidden' }} className="d-flex justify-content-between
                     align-items-center relative" >
                            <h4 style={{ margin: '0', color: theme.palette.primary.main }}>
                                Advanced Filter</h4>
                        </Box>
                        <div style={{
                            height: '4px', width: '100%',
                            backgroundColor: theme.palette.primary.main
                        }} />
                    </Box>
                </DialogTitle>

                <IconButton
                    aria-label="close"
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
                    <Grid container spacing={2} sx={{ m: 0, alignItems: "center", paddingLeft: "10px", paddingRight: "10px", width: "100%" }}>
                        <Grid item xs={12} sm={12} >

                            <Controller
                                name="clientName"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: 'Client Name is required'
                                }}
                                render={({ field }) => (
                                    <Autocomplete
                                        {...field}
                                        disablePortal
                                        id="combo-box-client"
                                        options={AllClientData.map((option: any) => option.Title)}
                                        sx={{ width: '100%' }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Client Name"
                                                variant="outlined"
                                                error={!!errors?.clientName}
                                                helperText={errors?.clientName?.message}

                                            />
                                        )}
                                        onChange={(e, value) => {
                                            setGetClient(value);
                                            const getUnique = AllClientData.filter((datas: any) => datas.Title === value);
                                            setParticularClientAllData(getUnique);
                                            setValue('clientName', value);
                                        }}
                                    />
                                )}
                            />

                        </Grid>
                        <Grid item xs={12} sm={12}>

                            {/* <Controller
                                name="projectName"
                                control={control}
                                defaultValue=""
                                rules={{ required: 'Project Name is required' }}
                                render={({ field }) => (
                                    <Autocomplete
                                        {...field}
                                        disablePortal
                                        id="combo-box-project"
                                        options={projectData.map((option: any) => option.Title)}
                                        sx={{ width: '100%' }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Project Name"
                                                error={!!errors.projectName}
                                                helperText={errors?.projectName?.message}
                                                variant="outlined"
                                            />
                                        )}
                                        onChange={(e, value) => {
                                            setValue('projectName', value);
                                        }}
                                    />
                                )}
                            /> */}
                             <Controller
                                name="projectName"
                                control={control}
                                defaultValue=""
                                rules={{ required: 'Project Name is required' }}
                                render={({ field }) => (
                                    <Autocomplete
                                        {...field}
                                        disablePortal
                                        id="combo-box-project"
                                        options={projectData.map((option: any) => option.Title)}
                                        sx={{ width: '100%' }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Project Name"
                                                error={!!errors.projectName}
                                                helperText={errors?.projectName?.message}
                                                variant="outlined"
                                            />
                                        )}
                                        onChange={(e, value) => {
                                            setValue('projectName', value);
                                        }}
                                    />
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
                            disabled={!isFormValid}
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
                            <ProjectUploadDocument
                                userRole={userRole}
                                spContext={spContext}
                                siteUrl={siteUrl}
                                onClose={() => {
                                    setDocumentType('')
                                    setOpenDocuments(false)
                                }} />
                        </>

                    )}
                    {documentType === 'Client' && (
                        <>
                            <ClientUploadDocument
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
