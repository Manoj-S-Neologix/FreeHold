import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import styles from './AssignClient.module.scss';
import { Autocomplete, Box, CircularProgress, Grid, MenuItem, Stack, Typography } from '@mui/material';
import ProjectService from '../../Services/Business/ProjectService';
import ClientService from "../../Services/Business/ClientService";
import toast from "react-hot-toast";
import TextField from '@mui/material/TextField';

// import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import CheckIcon from "@mui/icons-material/Check";
import { Controller, useForm } from "react-hook-form";

const AssignClient = ({ open, onClose, props, particularClientAllData, selected, exsistingPersons, existingPersons, fetchData, userRole }: any) => {
    const [getClientDetails, setGetClientDetails] = useState<any[]>([]);
    const [getClient, setGetClient] = React.useState<any[]>([]);
    const [personName, setPersonName] = React.useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [collectionOfDocuments, setCollectionOfDocuments] = React.useState<any[]>([]);
    const { control, handleSubmit, reset, formState: { errors }, setValue } = useForm();

    // const getProjectName = particularClientAllData[0]?.projectName;
    const getProjectId = particularClientAllData[0]?.Id;

    const clientService = ClientService();
    const clientListName = "Client_Informations";
    const selectQuery = "Id,Title,ClientLibraryGUID,AssignedStaff/Title,AssignedStaff/EMail";
    const expand = 'AssignedStaff';
    //alert("userROle | " + userRole);
    const filter = (userRole === "staff") ? `AssignedStaff/EMail eq '${props.spContext.pageContext.user.email}'` : "";

    const names = [
        'Oliver Hansen',
        'Van Henry',
        'April Tucker',
        'Ralph Hubbard',
        'Omar Alexander',
        'Carlos Abbott',
        'Miriam Wagner',
        'Bradley Wilkerson',
        'Virginia Andrews',
        'Kelly Snyder',
    ];

    console.log(particularClientAllData, "particularClientAllData.assignClientId")
    console.log(setGetClient, "client-Informations-setGetClient")

    const apiCall = async () => {
        try {
            const data = await clientService.getClientExpandApi(clientListName, selectQuery, expand, filter, "");
            if (data) {
                const clientData = particularClientAllData[0];
                let assignClientIds: any[] = [];

                if (clientData && clientData.assignClientId) {
                    assignClientIds = clientData.assignClientId.split(',').map((id: any) => Number(id.trim()));
                }
                const filteredData = data.filter(item => !assignClientIds.includes(item.Id));
                console.log(filteredData, assignClientIds, "filteredData");
                const mappedData = filteredData.map(item => ({
                    id: item.ID,
                    name: item.Title,
                    libraryGUID: item.ClientLibraryGUID
                }));
                setGetClientDetails(mappedData);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleChange = (event: SelectChangeEvent<typeof personName>) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    console.log(getClientDetails, particularClientAllData, "getClientDetails");

    useEffect(() => {
        apiCall();
    }, [particularClientAllData]);
    const handleCancel = () => {
        onClose();
    };

    const falseFunc = () => {
        const dataObj = {
            AssignedStaffId: {
                results: [

                ]
            }
        };

        if (selected?.length === 0) {
            ProjectService().updateProject(
                "Project_Informations",
                particularClientAllData[0].Id,
                dataObj
            ).then((response: any) => {
                console.log("Success:", response);
                fetchData();
                onClose();
                reset();
                setLoading(false);

            }).catch((error: any) => {
                console.error("Error:", error);
                setLoading(false);
            });
        }
        else {
            setLoading(true);
            for (const item of selected) {
                ProjectService().updateProject(
                    "Project_Informations",
                    item,
                    dataObj
                ).then((response: any) => {
                    console.log("Success:", response);
                    fetchData();
                    onClose();
                    reset();
                    setLoading(false);

                }).catch((error: any) => {
                    setLoading(false);
                    console.error("Error:", error);
                });

            }
        }
    };

    const handleSave = handleSubmit((data) => {
        setLoading(true);
        false && falseFunc();

        // Prepare updated data for saving
        const selectedClient = getClientDetails.find((item: any) => item.libraryGUID === data.AssignClient);
        if (!selectedClient) {
            toast.error('Selected client not found');
            setLoading(false);
            return;
        }

        const updatedData = {
            AssignClient: selectedClient.name,
            libraryGUID: data.AssignClient,
            collectionOfDocuments: collectionOfDocuments,
            clientName: particularClientAllData[0]?.projectName
        };

        const dmsObj = {
            DMSProject: particularClientAllData[0]?.projectName,
            DMSProjectID: (particularClientAllData[0]?.Id).toString()
        };

        // Handle assignClientIds
        const clientData = particularClientAllData[0];
        let assignClientIds = [];

        if (clientData && clientData.assignClientId) {
            assignClientIds = clientData.assignClientId.split(',').map((id: any) => Number(id.trim()));
        }

        const updatedDataObj = {
            ProjectIdId: {
                results: [getProjectId]
            }
        }

        // Obtain the ID and ListID for updating project information
        const Id = selectedClient.id;
        const ListID = particularClientAllData[0]?.Id ? particularClientAllData[0]?.Id : existingPersons?.Id;

        // Debugging log
        console.log("AssignID", Id);
        console.log("ListID", ListID);
        console.log("Updated Data", updatedData);
        console.log("Updated Data Obj", updatedDataObj);

        if (!ListID) {
            toast.error('ListID is not defined');
            setLoading(false);
            return;
        }

        // Create a library for the project and update project information
        Promise.all([
            ProjectService().updateProject("Project_Informations", ListID, { AssignClientId: { results: [...assignClientIds, Id] } }),
            ClientService().updateClient('Client_Informations', Id, updatedDataObj)
        ])
            .then(([libraryResponse, updateResponse]) => {
                // Create a folder in the library
                const rootUrl = particularClientAllData[0].webURL;
                return ProjectService().createFolder(rootUrl, updatedData.AssignClient);
            })
            .then((createFolder) => {
                console.log(createFolder.data.ServerRelativeUrl, "createFoldercreateFolder");

                // Upload documents to the created folder
                return ProjectService().copyDocuments(createFolder.data.ServerRelativeUrl, updatedData.collectionOfDocuments, dmsObj);
            })
            .then((uploadDocument) => {
                toast.success('Client Added Successfully!');
                // Fetch updated data and reset loading state
                fetchData();
                setLoading(false);
                handleCancel();
            })
            .catch((error) => {
                // Handle errors
                console.error("Error occurred:", error);
                setLoading(false);
            });


    });

    console.log(getClient, "getClientgetClient");


    const [getClientDocumentsData, setClientDocumentsData] = useState<any[]>([]);
    const [getClientDocumentsAllData, setClientDocumentsAllData] = useState<any[]>([]);
    // const [getDocumentType, setDocumentType] = useState<any[]>([]);

    console.log(getClientDocumentsData, "getClientDocumentsData")

    const getDocumentsFromFolder = async (libraryGuid: string) => {
        try {
            const results: any = await ProjectService().getDocumentsFromFolder(libraryGuid);
            console.log('Retrieved files:', results);

            // Ensure results is an array before setting state
            if (Array.isArray(results)) {
                setClientDocumentsData(results.map(item => `${item.FileLeafRef} - ${item.DMS_x0020_Tags
                    }`));
                // setClientDocumentsData(results.map(item => item.FileLeafRef));
                setClientDocumentsAllData(results);
            } else {
                console.error('Error: Retrieved data is not an array');
            }
        } catch (error) {
            console.error('Error fetching documents:', error);
        }
    };

    console.log(getClientDocumentsAllData);

    console.log(setClientDocumentsData, "setClientDocumentsDatasetClientDocumentsData")

    return (
        <Box sx={{ width: '100', padding: '20px' }}>
            <Stack direction="column" spacing={2}>
                <Dialog open={open} maxWidth='sm' fullWidth>
                    <DialogTitle className={styles.addTitle}
                        style={{
                            textAlign: 'center',
                            marginLeft: '7px', position: 'relative'
                        }}>
                        <div className="d-flex flex-column">
                            <div className="d-flex justify-content-between 
                            align-items-center relative">
                                <h4
                                    style={{ margin: '0', color: '#125895' }}>
                                    Assign Client
                                </h4>
                            </div>
                            <div style={{
                                height: '4px', width: '100%',
                                backgroundColor: '#125895'
                            }} />
                        </div>
                    </DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={handleCancel}
                        sx={{
                            position: "absolute",
                            right: "14px",
                            top: "8px",
                            color: (theme: any) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <DialogContent >
                        <Box component="form">
                            <Grid container spacing={4}>
                                <Grid item xs={12}>
                                    <Controller
                                        name="AssignClient"
                                        control={control}
                                        defaultValue=""
                                        rules={{
                                            required: 'Assign Client is required',
                                        }}
                                        render={({ field }) => (
                                            <TextField
                                                label="Assign Client"
                                                variant="outlined"
                                                fullWidth
                                                select
                                                {...field}
                                                required
                                                // disabled={particularClientAllData[0]?.ClientGUID ? true : false}
                                                onChange={(e: any) => {
                                                    console.log(e.target.value);
                                                    setGetClient(e.target.value);
                                                    getDocumentsFromFolder(e.target.value);
                                                    setValue('AssignClient', e.target.value);
                                                }}
                                                error={!!errors?.AssignClient}
                                                helperText={errors?.AssignClient?.message}
                                            >
                                                {getClientDetails?.map((item: any) => (
                                                    <MenuItem key={item.id} value={item.libraryGUID}>
                                                        {item.name}
                                                    </MenuItem>
                                                ))}
                                            </TextField>)}
                                    />
                                </Grid>
                                {false && <InputLabel id="demo-multiple-chip-label"
                                    style={{ margin: '0', color: '#125895', width: '100' }}>Chip</InputLabel>}
                                {false && <Select
                                    labelId="demo-multiple-chip-label"
                                    id="demo-multiple-chip"
                                    multiple
                                    value={personName}
                                    onChange={handleChange}
                                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selected.map((value) => (
                                                <Chip key={value} label={value} />
                                            ))}
                                        </Box>
                                    )}
                                //   MenuProps={MenuProps}
                                >
                                    {names.map((name) => (
                                        <MenuItem
                                            key={name}
                                            value={name}
                                        //   style={getStyles(name, personName, theme)}
                                        >
                                            {name}
                                        </MenuItem>
                                    ))}
                                </Select>}

                                {getClient.length > 0 && (
                                    getClientDocumentsData.length > 0 ? (
                                        <Grid item xs={12}>
                                            <Controller
                                                name="AssignClientDocuments"
                                                control={control}
                                                defaultValue={[]}
                                                rules={{
                                                    required: 'Assign Client Documents is required',
                                                }}
                                                render={({ field }) => (
                                                    <Autocomplete
                                                        multiple
                                                        options={getClientDocumentsData}
                                                        getOptionLabel={(option) => option}
                                                        disableCloseOnSelect
                                                        {...field}
                                                        onChange={(e, value) => {
                                                            field.onChange(value);
                                                            setValue('AssignClientDocuments', value);

                                                            const collectionOfDocuments = getClientDocumentsAllData.filter(item =>
                                                                value.includes(`${item.FileLeafRef} - ${item.DMS_x0020_Tags}`)
                                                            ).map(item => ({
                                                                Id: item.Id,
                                                                GUID: item.GUID,
                                                                FileLeafRef: item.FileLeafRef,
                                                                FileRef: item.FileRef
                                                            }));
                                                            setCollectionOfDocuments(collectionOfDocuments);
                                                            console.log(collectionOfDocuments, "collectionOfDocuments.....")
                                                        }}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                variant="outlined"
                                                                // label="Select Document"
                                                                label={
                                                                    <span>
                                                                        Select Document<span style={{ color: '#125895' }}> * </span>
                                                                    </span>
                                                                }
                                                                placeholder="Select Document"
                                                                error={!!errors?.AssignClientDocuments}
                                                                helperText={errors?.AssignClientDocuments?.message}
                                                            />
                                                        )}
                                                        renderOption={(props, option, { selected }) => (
                                                            <MenuItem
                                                                {...props}
                                                                value={option}
                                                                sx={{ justifyContent: "space-between" }}
                                                            >
                                                                {option}
                                                                {selected ? <CheckIcon color="info" /> : null}
                                                            </MenuItem>
                                                        )}
                                                    />

                                                )}
                                            />
                                        </Grid>
                                    )
                                        : <Grid item xs={12} >
                                            <Typography sx={{ textAlign: 'center' }}>No Documents Found</Typography>
                                        </Grid>
                                )
                                }

                            </Grid>
                        </Box>
                    </DialogContent>
                    {getClient.length > 0 &&
                        getClientDocumentsData.length > 0 && <DialogActions sx={{ padding: '10px', marginRight: '14px' }}>
                            <Button variant="contained"
                                sx={{ width: loading ? '150px' : 'auto' }}
                                onClick={handleSave} disabled={loading || getClientDocumentsAllData?.length === 0}>
                                {loading ? (
                                    <CircularProgress size={20} color="inherit" />
                                ) : (
                                    "Save"
                                )}
                            </Button>
                            <Button variant="outlined" onClick={handleCancel}>
                                Cancel
                            </Button>
                        </DialogActions>}
                </Dialog>
            </Stack>
        </Box >
    );
};

export default AssignClient;



