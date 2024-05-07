
import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import styles from '../AssignClient/AssignClient.module.scss';
import { Autocomplete, Box, CircularProgress, Grid, MenuItem, Stack, TextField } from '@mui/material';
import ProjectService from '../../Services/Business/ProjectService';
import ClientService from "../../Services/Business/ClientService";
import toast from "react-hot-toast";
// import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import CheckIcon from "@mui/icons-material/Check";
import { Controller, useForm } from "react-hook-form";

const CreateUnit = ({ open, onClose, props, particularClientAllData, selected, exsistingPersons,exsistingProjectLibrary }: any) => {
    const [getClientDetails, setGetClientDetails] = useState<any[]>([]);
    const [getClient, setGetClient] = useState<any[]>([]);
    const [personName, setPersonName] = React.useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [collectionOfDocuments, setCollectionOfDocuments] = React.useState<string[]>([]);
    // const [selectedPersonsId, setSelectedPersonsId] = useState<any[]>([]);
    // const [clientSelected, setClientSelected] = useState(false);
    // const [selectedUnit, setSelectedUnit] = useState<string | null>(null);



    const { control, handleSubmit, reset, formState: { errors }, setValue } = useForm();

    const getProjectName = particularClientAllData[0]?.projectName;

    //console.log(props, "propsprops");

    const clientService = ClientService();
    const clientListName = "Client_Informations";
    const selectQuery = "Id,Title,ClientLibraryGUID";

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



    const apiCall = (async () => {
        await clientService.getClientExpandApi(clientListName, selectQuery, "", "")
            .then((data) => {
                if (data) {
                    const mappedData = data.map((item: any) => ({
                        id: item.Id,
                        name: item.Title,
                        libraryGUID: item.ClientLibraryGUID
                    }));
                    setGetClientDetails(mappedData);
                }

            }).catch((error: any) => {
                toast.error(error.message);
            });
    });


    const handleChange = (event: SelectChangeEvent<typeof personName>) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
            // setClientSelected(true); // Client is selected
            // setSelectedUnit(null); // Reset selectedUnit
        );
    };


    console.log(getClientDetails, particularClientAllData, "getClientDetails");

    useEffect(() => {
        apiCall();
    }, []);

    const handleCancel = () => {
        console.log("Cancel button clicked");
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

    const handleSave = handleSubmit(async (data) => {
        setLoading(true);
        falseFunc();

        // const dataObj = {
        //     AssignedStaffId: {
        //         results: selectedPersonsId  
        //     }
        // };
        

        const updatedData = {
            AssignClient: getClientDetails.filter((item: any) => item.libraryGUID === data.AssignClient)[0].name,
            libraryGUID: data.AssignClient,
            collectionOfDocuments: collectionOfDocuments,
            clientName: particularClientAllData[0]?.projectName
        };

      
            // Use existing project library details to create unit documents
            const { libraryGUID, projectLibraryPath } = exsistingProjectLibrary;

            console.log(libraryGUID, "libraryGUID")
        
            // Construct the URL for the project library
            const libraryUrl = `${projectLibraryPath}/${particularClientAllData[0]?.projectName}`;
        
            // Use SharePoint API to create folder and upload documents
            const folderCreationResponse = await ProjectService().createFolder(libraryUrl, data.AssignClient);
            const folderUrl = folderCreationResponse.data.ServerRelativeUrl;
        
            // Upload selected documents to the created folder
            const documentUploadResponse = await ProjectService().copyDocuments(
              folderCreationResponse.data.UniqueId,
              folderUrl,
              data.collectionOfDocuments
            );
        
            console.log("Folder created and documents uploaded:", documentUploadResponse);
        
            // Close the dialog
            onClose();


        // const Id = getClientDetails.filter((item: any) => item.libraryGUID === data.AssignClient)[0].Id
        // const ListID = particularClientAllData[0]?.Id ? particularClientAllData[0]?.Id : exsistingPersons?.Id;
        // console.log(Id, ListID , "AssignID")



        // if (!selected || selected.length === 0) {
        //     try {
        //         await ProjectService().updateProject("Project_Informations", ListID, dataObj);
        //         // setSelectedPersons([]);
        //         setSelectedPersonsId([]);
    
        //     } catch (error) {
        //         console.error('Error updating project:', error);
        //     }
        // }

    
        console.log(updatedData, getProjectName, "updatedData");

        const response = await ProjectService().createLibrary(getProjectName, "Project Document Library");
        console.log(response, "responseresponse");
        const unitrootUrl = response[0].ParentWebUrl + "/" + updatedData.clientName;
        const createFolder = await ProjectService().createFolder(unitrootUrl, updatedData.AssignClient);


        console.log(createFolder.data.ServerRelativeUrl, "createFoldercreateFolder");
        const uploadDocument = await ProjectService().copyDocuments(createFolder.data.UniqueId, createFolder.data.ServerRelativeUrl, updatedData.collectionOfDocuments);
        console.log(uploadDocument, "uploadDocumentuploadDocument");
        setLoading(false);
        handleCancel();
        
    
    });


    console.log(getClient, "getClientgetClient");

    const [getClientDocumentsData, setClientDocumentsData] = useState<any[]>([]);
    const [getClientDocumentsAllData, setClientDocumentsAllData] = useState<any[]>([]);
    const getDocumentsFromFolder = async (libraryGuid: string) => {
        try {
            const results: any = await ProjectService().getDocumentsFromFolder(libraryGuid);
            console.log('Retrieved files:', results);

            // Ensure results is an array before setting state
            if (Array.isArray(results)) {
                setClientDocumentsData(results.map(item => item.FileLeafRef));
                setClientDocumentsAllData(results);
            } else {
                console.error('Error: Retrieved data is not an array');
            }
        } catch (error) {
            console.error('Error fetching documents:', error);
        }
    };

    console.log(getClientDocumentsAllData);


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
                                    Create Unit
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

                          
                         {getClientDetails ? (
                                <Grid item xs={12}>
                                <Controller
                                    name="AssignUnit"
                                    control={control}
                                    defaultValue={[]}
                                    rules={{ required: 'Assign Unit is required' }}
                                    render={({ field }) => (
                                        <Autocomplete
                                            multiple
                                            options={Array.from({ length: 10 }, (_, i) => `Unit ${i + 1}`)}
                                            getOptionLabel={(option) => option}
                                            onChange={(e, value) => {
                                                field.onChange(value);
                                                setValue('AssignUnit', value);
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    variant="outlined"
                                                    label="Select Unit"
                                                    placeholder="Select Unit"
                                                    error={!!errors?.AssignUnit}
                                                    helperText={errors?.AssignUnit?.message}
                                                />
                                            )}
                                            renderOption={(props, option, { selected }) => (
                                                <MenuItem
                                                    {...props}
                                                    value={option}
                                                    sx={{ justifyContent: 'space-between' }}
                                                >
                                                    {option}
                                                    {selected ? <CheckIcon color="info" /> : null}
                                                </MenuItem>
                                            )}
                                        />
                                    )}
                                />
                            </Grid>
                                ) : (
                                    <Grid item xs={12}>
                                        <Controller
                                            name="AssignClientDocuments"
                                            control={control}
                                            defaultValue={[]}
                                            rules={{ required: 'Assign Client Documents is required' }}
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
                                                        const collectionOfDocuments: any = [];
                                                        getClientDocumentsAllData?.forEach((item: any) => {
                                                            if (value.includes(item.FileLeafRef)) {
                                                                collectionOfDocuments.push({
                                                                    Id: item.Id,
                                                                    GUID: item.GUID,
                                                                    FileLeafRef: item.FileLeafRef,
                                                                    FileRef: item.FileRef,
                                                                });
                                                            }
                                                        });
                                                        setCollectionOfDocuments(collectionOfDocuments);
                                                    }}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            variant="outlined"
                                                            label="Select Document"
                                                            placeholder="Select Document"
                                                            error={!!errors?.AssignClientDocuments}
                                                            helperText={errors?.AssignClientDocuments?.message}
                                                        />
                                                    )}
                                                    renderOption={(props, option, { selected }) => (
                                                        <MenuItem
                                                            {...props}
                                                            value={option}
                                                            sx={{ justifyContent: 'space-between' }}
                                                        >
                                                            {option}
                                                            {selected ? <CheckIcon color="info" /> : null}
                                                        </MenuItem>
                                                    )}
                                                />
                                            )}
                                        />
                                    </Grid>
                                )}
                            </Grid>
                        </Box>
                    </DialogContent>
                    <DialogActions sx={{ padding: '10px', marginRight: '14px' }}>
                        <Button variant="contained"
                            sx={{ width: loading ? '150px' : 'auto' }}
                            onClick={handleSave} disabled={loading}>
                            {loading ? (
                                <CircularProgress size={20} color="inherit" />
                            ) : (
                                "Save"
                            )}
                        </Button>
                        <Button variant="outlined" onClick={handleCancel}>
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </Stack>
        </Box >
    );
};

export default CreateUnit;



