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
import CheckIcon from "@mui/icons-material/Check";
import { Controller, useForm } from "react-hook-form";

const AssignClient = ({ open, onClose, props, particularClientAllData, selected, exsistingPersons, existingPersons, fetchData, userRole }: any) => {
    const [getClientDetails, setGetClientDetails] = useState<any[]>([]);
    const [getClient, setGetClient] = React.useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [collectionOfDocuments, setCollectionOfDocuments] = React.useState<any[]>([]);
    const { control, handleSubmit, formState: { errors }, setValue } = useForm();
    const getProjectId = particularClientAllData[0]?.Id;
    const clientService = ClientService();
    const clientListName = "Client_Informations";
    const selectQuery = "Id,Title,ClientLibraryGUID,AssignedStaff/Title,AssignedStaff/EMail";
    const expand = 'AssignedStaff';
    const filter = (userRole === "staff") ? `AssignedStaff/EMail eq '${props.spContext.pageContext.user.email}'` : "";

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

    useEffect(() => {
        apiCall();
    }, [particularClientAllData]);

    const handleCancel = () => {
        onClose();
    };

    const handleSave = handleSubmit((data) => {
        setLoading(true);
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
            DMSProjectID: (particularClientAllData[0]?.Id)?.toString()
        };
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
        const Id = selectedClient.id;
        const ListID = particularClientAllData[0]?.Id ? particularClientAllData[0]?.Id : existingPersons?.Id;

        if (!ListID) {
            toast.error('ListID is not defined');
            setLoading(false);
            return;
        }
        Promise.all([
            ProjectService().updateProject("Project_Informations", ListID, { AssignClientId: { results: [...assignClientIds, Id] } }),
            ClientService().updateClient('Client_Informations', Id, updatedDataObj)
        ])
            .then(([libraryResponse, updateResponse]) => {
                const rootUrl = particularClientAllData[0].webURL;
                return ProjectService().createFolder(rootUrl, updatedData.AssignClient);
            })
            .then((createFolder) => {
                return ProjectService().copyDocuments(createFolder.data.ServerRelativeUrl, updatedData.collectionOfDocuments, dmsObj);
            })
            .then((uploadDocument) => {
                toast.success('Client Added Successfully!');
                fetchData();
                setLoading(false);
                handleCancel();
            })
            .catch((error) => {
                console.error("Error occurred:", error);
                setLoading(false);
            });
    });

    const [getClientDocumentsData, setClientDocumentsData] = useState<any[]>([]);
    const [getClientDocumentsAllData, setClientDocumentsAllData] = useState<any[]>([]);

    const getDocumentsFromFolder = async (libraryGuid: string) => {
        try {
            const results: any = await ProjectService().getDocumentsFromFolder(libraryGuid);
            if (Array.isArray(results)) {
                setClientDocumentsData(results.map(item => `${item.FileLeafRef} - ${item.DMS_x0020_Tags
                    }`));
                setClientDocumentsAllData(results);
            } else {
                console.error('Error: Retrieved data is not an array');
            }
        } catch (error) {
            console.error('Error fetching documents:', error);
        }
    };

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
                                            <Autocomplete
                                                options={getClientDetails.sort((a, b) => a.name.localeCompare(b.name))}
                                                getOptionLabel={(option) => option.name}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        label="Assign Client"
                                                        variant="outlined"
                                                        error={!!errors?.AssignClient}
                                                        helperText={errors?.AssignClient?.message}
                                                    />
                                                )}
                                                onChange={(e, value) => {
                                                    field.onChange(value ? value.libraryGUID : '');
                                                    setGetClient(value ? value.libraryGUID : '');
                                                    getDocumentsFromFolder(value ? value.libraryGUID : '');
                                                    setValue('AssignClient', value ? value.libraryGUID : '');
                                                }}
                                            />
                                        )}
                                    />
                                </Grid>
                                {getClient.length > 0 && (
                                    getClientDocumentsData.length > 0 ? (
                                        <Grid item xs={12}>
                                            <Controller
                                                name="AssignClientDocuments"
                                                control={control}
                                                defaultValue={[]}
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
                                                        }}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                variant="outlined"
                                                                label={
                                                                    <span>
                                                                        Select Document
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
                    <DialogActions sx={{ padding: '10px', marginRight: '14px' }}>
                        <Button variant="contained" sx={{ width: loading ? '150px' : 'auto' }} onClick={handleSave} disabled={loading}>
                            {loading ? <CircularProgress size={20} color="inherit" /> : "Save"}
                        </Button>
                        <Button variant="outlined" onClick={handleCancel}>Cancel</Button>
                    </DialogActions>
                </Dialog>
            </Stack>
        </Box >
    );
};

export default AssignClient;



