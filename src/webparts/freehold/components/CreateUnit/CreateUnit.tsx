/* eslint-disable no-unused-expressions */

import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import styles from '../AssignClient/AssignClient.module.scss';
import { Box, CircularProgress, Grid, MenuItem, Stack, TextField, InputBase, Tooltip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import ProjectService from '../../Services/Business/ProjectService';
import ClientService from "../../Services/Business/ClientService";
import toast from "react-hot-toast";
import { Controller, useForm } from "react-hook-form";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FormControlLabel from '@mui/material/FormControlLabel';
// import RemoveIcon from '@mui/icons-material/Remove';


const CreateUnit = ({ open, onClose, props, particularClientAllData, selected, exsistingPersons, exsistingProjectLibrary }: any) => {
    const [getClientDetails, setGetClientDetails] = useState<any[]>([]);
    const [getClient, setGetClient] = useState<any>('');
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState(1);
    // const [fileData, setFileData] = useState<any[]>([]);
    // const [isLoading, setIsLoading] = useState(true);
    const { control, handleSubmit, reset, formState: { errors }, setValue } = useForm();
    const [showCount, setShowCount] = useState(false);
    // const [fetchUnitData, setFetchUnitData] = useState<any[]>([]);
    const [getFoldersResponse, setGetFoldersResponse] = useState<any[]>([]);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);


    const getProjectCode = particularClientAllData[0]?.projectNumber;
    console.log(getProjectCode, getFoldersResponse, "getProjectCode");

    const clientService = ClientService();
    const clientListName = "Client_Informations";
    const selectQuery = "Id,Title,ClientLibraryGUID";


    const apiCall = async () => {
        try {
            const data = await clientService.getClientExpandApi(clientListName, selectQuery, "", "");
            if (data) {
                const assignClientIds = particularClientAllData[0].assignClientId.split(',').map((id: any) => Number(id.trim()));
                const filteredData = data.filter(item => assignClientIds.includes(item.Id));
                console.log(filteredData, "filteredData");
                const mappedData = filteredData.map(item => ({
                    id: item.Id,
                    name: item.Title,
                    libraryGUID: item.ClientLibraryGUID
                }));
                setGetClientDetails(mappedData);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    // const onDelete = (index: number) => {
    //     setUploadFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    // };

    console.log(getClientDetails, particularClientAllData, "getClientDetails");

    useEffect(() => {
        apiCall();
        // if (particularClientAllData[0]?.ClientGUID) {
        //     setShowCount(true);
        //     setGetClient(particularClientAllData[0]?.ClientGUID);
        // } else {
        //     setShowCount(false);
        //     setGetClient([]);
        // }
    }, []);


    const handleCancel = () => {
        console.log("Cancel button clicked");
        onClose();
    };
    const deleteUnit = (indexToRemove: any) => {
        setCount((prevCount) => prevCount - 1);
        setValue(`unitName${indexToRemove}`, "");
    };


    const handleSwitchChange = (event: any) => {
        setShowCount(event.target.checked);
        setCount(1);
        reset();
    };

    //Counter
    //   const handleCount = (event:any) => {
    //     setCount(Math.max(Number(event.target.value), 1));
    //   };

    const handleCountChange = (value: any) => {
        setCount(Math.max(Number(value), 1));
    };

    // const falseFunc = () => {
    //     const dataObj = {
    //         AssignedStaffId: {
    //             results: [

    //             ]
    //         }
    //     };

    //     if (selected?.length === 0) {
    //         ProjectService().updateProject(
    //             "Project_Informations",
    //             particularClientAllData[0].Id,
    //             dataObj
    //         ).then((response: any) => {
    //             console.log("Success:", response);
    //             onClose();
    //             reset();
    //             setLoading(false);

    //         }).catch((error: any) => {
    //             console.error("Error:", error);
    //             setLoading(false);
    //         });
    //     }
    //     else {
    //         setLoading(true);
    //         for (const item of selected) {
    //             ProjectService().updateProject(
    //                 "Project_Informations",
    //                 item,
    //                 dataObj
    //             ).then((response: any) => {
    //                 console.log("Success:", response);
    //                 onClose();
    //                 reset();
    //                 setLoading(false);

    //             }).catch((error: any) => {
    //                 setLoading(false);
    //                 console.error("Error:", error);
    //             });

    //         }
    //     }
    // };

    const handleSave = handleSubmit(async (data) => {
        setLoading(true);
        const collectionOfUnits: any[] = [];
        Object.entries(data).forEach(([key, value]) => {
            if (key.startsWith("unitName") && value !== "") {
                collectionOfUnits.push({ key: value });
            }
        });

        const AssignClient = getClientDetails.filter((item: any) => item.libraryGUID === data.AssignClient)[0].name;

        console.log(getProjectCode, AssignClient, collectionOfUnits, "handleSave");

        try {
            const response = await ProjectService().createFolder(getProjectCode, AssignClient);
            const folderCreationPromises = collectionOfUnits.map((unit) => {
                return ProjectService().createFolder(response.data.ServerRelativeUrl, unit.key);
            });
            await Promise.all(folderCreationPromises);
            setLoading(false);
            toast.success("Units created successfully");
            reset();
            onClose();
        } catch (error) {
            setLoading(false);
            toast.error(error.message);
            console.error("Error:", error);
        }
    });



    console.log(getClient, "getClientgetClient");



    const [getClientDocumentsData, setClientDocumentsData] = useState<any[]>([]);
    const [getClientDocumentsAllData, setClientDocumentsAllData] = useState<any[]>([]);
    const getDocumentsFromFolder = async (libraryGuid: string) => {
        try {
            const results: any = await ProjectService().getDocumentsFromFolder(libraryGuid);
            console.log('Retrieved files:', results);

            const getLibraryName = getClientDetails.filter((item: any) => item.libraryGUID === libraryGuid)[0].name;
            console.log(`${getProjectCode}/${getLibraryName}`, 'getProjectName/getLibraryName');
            const getFolders: any = await ProjectService().getAllFoldersInLibrary(`${getProjectCode}/${getLibraryName}`);

            setGetFoldersResponse(getFolders);
            console.log(getFolders, "getFolders....")

            // Ensure results is an array before setting state
            if (Array.isArray(results)) {
                setClientDocumentsData(results.map(item => item.FileLeafRef));
                setClientDocumentsAllData(results);
                setShowCount(true);
            } else {
                console.error('Error: Retrieved data is not an array');
            }
        } catch (error) {
            console.error('Error fetching documents:', error);
        }
    };

    console.log(getClientDocumentsAllData);
    console.log(getClientDocumentsData, "document");


    // const handleDelete = (folderServerRelativeUrl: any) => {
    //     const apiResponse = ProjectService();
    //     apiResponse.deleteFolder(folderServerRelativeUrl)
    //       .then(() => {
    //         setIsDeleteDialogOpen(false);
    //         console.log("File deleted successfully!");
    //         toast.success('File deleted successfully!');
    //         fetchData(folderServerRelativeUrl);
    //       })
    //       .catch(error => {
    //         console.error("Failed to delete document:", error);
    //         toast.error(`Failed to delete document: ${error}`);
    //       });
    //   };

    const handleDeleteUnit = (folderServerRelativeUrl: any) => {
        const apiResponse = ProjectService();
        apiResponse.deleteFolder(folderServerRelativeUrl)
            .then(() => {
                setIsDeleteDialogOpen(false);
                console.log("File deleted successfully!");
                toast.success('File deleted successfully!');
                // fetchData(folderServerRelativeUrl);
            })
            .catch(error => {
                console.error("Failed to delete document:", error);
                toast.error(`Failed to delete document: ${error}`);
            });
    }

    const handleCloseDeleteDialog = () => {
        setIsDeleteDialogOpen(false);
        // fetchData();
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
                                                // disabled={particularClientAllData[0]?.ClientGUID ? true : false}
                                                onChange={(e: any) => {
                                                    console.log(e.target.value);
                                                    setGetClient(e.target.value);
                                                    // const getLibraryName = getClientDetails.filter((item: any) => item.name === e.target.value)[0].libraryGUID
                                                    getDocumentsFromFolder(e.target.value);
                                                    setValue('AssignClient', e.target.value);
                                                    // fetchData(getLibraryName);
                                                }}
                                                error={!!errors?.AssignClient}
                                                helperText={errors?.AssignClient?.message}
                                            >
                                                {getClientDetails?.map((item: any) => (
                                                    <MenuItem key={item.id} value={item.libraryGUID}>
                                                        {item.name}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        )}
                                    />
                                </Grid>

                                {/* <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Unit Folder</TableCell>
                                    <TableCell>Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                    {getFoldersResponse.length > 0 &&
                                        getFoldersResponse.map((item: any, idx: any) => (
                                            <MenuItem key={idx} value={item?.Name}>
                                                <TableCell>
                                                {item?.Name}
                                                </TableCell>
                                            </MenuItem>
                                        ))}
                                <TableCell>
                                    <IconButton aria-label="delete" 
                                    // onClick={() => onDelete(index)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableBody>
                        </Table>
                    </TableContainer> */}
                                <Grid item xs={12}>
                                    <TableContainer>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Unit Name</TableCell>
                                                    <TableCell>Delete</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {getFoldersResponse.length > 0 &&
                                                    getFoldersResponse.map((item: any, idx: any) => (
                                                        <TableRow key={idx}>
                                                            <TableCell>
                                                                <Box>
                                                                    {item?.Name}
                                                                </Box>
                                                            </TableCell>
                                                            <TableCell>
                                                                <IconButton aria-label="delete" 
                                                                onClick={() => {setIsDeleteDialogOpen(true)}}>
                                                                    <DeleteIcon />
                                                                </IconButton>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                                {isDeleteDialogOpen && (
                                    <Dialog open={isDeleteDialogOpen} maxWidth='sm' fullWidth  >
                                        <DialogTitle className={styles.addTitle}
                                            style={{ textAlign: 'center', marginLeft: '7px', position: 'relative' }}>
                                            <div className="d-flex flex-column">
                                                <div className="d-flex justify-content-between
                               align-items-center relative">
                                                    <h4 style={{ margin: '0', color: '#125895' }}>
                                                        Delete Unit</h4>
                                                </div>
                                                <div style={{
                                                    height: '4px', width: '100%',
                                                    backgroundColor: '#125895'
                                                }} />
                                            </div>
                                        </DialogTitle>
                                        {!loading && <IconButton
                                            aria-label="close"
                                            onClick={handleCloseDeleteDialog}
                                            sx={{
                                                position: "absolute",
                                                right: "14px",
                                                top: "8px",
                                                color: (theme: any) => theme.palette.grey[500],
                                            }}
                                        >
                                            <CloseIcon />
                                        </IconButton>}
                                        <DialogContent >

                                            <div style={{ marginLeft: '7px' }}>
                                                Are you sure you want to delete unit
                                                <strong style={{ marginLeft: '2px' }}>
                                                </strong>
                                                ?
                                            </div>
                                        </DialogContent>
                                        <DialogActions sx={{ padding: '10px', marginRight: '14px' }}>
                                            {/* <Button
                                onClick={handleDelete}
                                variant="contained"
                                color="primary"
                                sx={{
                                    maxWidth: '150px',
                                    float: 'right',
                                }}
                            >
                                Delete
                            </Button>
                            <Button variant="outlined" onClick={handleCancel}>
                                Cancel
                            </Button> */}
                                            <Stack
                                                direction="row"
                                                justifyContent="end"
                                                alignItems="center"
                                                spacing={3}
                                            >
                                                <Button variant="contained" color="primary"
                                                    sx={{ width: loading ? '150px' : 'auto' }}
                                                    onClick={handleDeleteUnit} disabled={loading}>
                                                    {loading ? (
                                                        <CircularProgress size={20} color="inherit" />
                                                    ) : (
                                                        "Delete"
                                                    )}
                                                </Button>
                                                {!loading && <Button variant="outlined" onClick={handleCancel}  >Cancel</Button>}
                                            </Stack>
                                        </DialogActions>
                                    </Dialog>
                                )}
                                {false && <Grid item xs={6}>
                                    <FormControlLabel
                                        sx={{ mb: 1 }}
                                        control={<Switch
                                            disabled={getClient === ''}
                                            checked={showCount}
                                            onChange={handleSwitchChange} />}
                                        label="Is Unit Documents"
                                    />
                                </Grid>}


                                {getClient !== '' && showCount &&
                                    <Box sx={{
                                        minHeight: count >= 3 ? '205px' : 'auto',
                                        width: '100%',
                                        mt: 2,
                                        pl: 4
                                    }}>
                                        {showCount &&
                                            <Box sx={{
                                                maxHeight: count >= 3 ? '200px' : 'auto',
                                                overflowY: 'auto',
                                                overflowX: 'hidden',
                                                width: '100%',
                                                display: 'grid',
                                                gap: '20px', pt: 3,
                                                pr: 1
                                            }}>
                                                {[...Array(count)].map((_, index) => (
                                                    <Grid item xs={12} key={index} container spacing={1} alignItems="center">
                                                        <Grid item xs={11}>
                                                            <Controller
                                                                name={`unitName${index}`}
                                                                control={control}
                                                                defaultValue=""
                                                                rules={{
                                                                    required: `Unit ${index + 1} is required`,

                                                                    maxLength: {
                                                                        value: 50,
                                                                        message: `Unit ${index + 1} 
                                                        cannot be longer than 50 characters`,
                                                                    },
                                                                    minLength: {
                                                                        value: 3,
                                                                        message: `Unit ${index + 1}
                                                            must be at least 3 characters`,
                                                                    }
                                                                }}
                                                                render={({ field }) => (
                                                                    <TextField
                                                                        label={`Unit ${index + 1}`}
                                                                        variant="outlined"
                                                                        fullWidth
                                                                        {...field}
                                                                        required
                                                                        error={!!errors?.[`unitName${index}`]}
                                                                        helperText={errors?.[`unitName${index}`]?.message}
                                                                    />
                                                                )}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={1}>
                                                            <Tooltip title="Remove Unit">
                                                                <IconButton
                                                                    disabled={count === 1}
                                                                    aria-label={`Remove Unit ${index + 1}`}
                                                                    onClick={() => deleteUnit(index)}

                                                                >
                                                                    <RemoveCircleOutlineIcon
                                                                        fontSize='medium'
                                                                    />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </Grid>
                                                    </Grid>
                                                ))}
                                            </Box>
                                        }
                                    </Box>}

                                {showCount && (
                                    <Grid item xs={6}>
                                        <Box sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'flex-start',
                                        }}>
                                            <Button
                                                variant="contained"
                                                onClick={() => setCount((prev) => Math.max(prev - 1, 1))}
                                                disabled={count === 1}
                                            >
                                                <RemoveIcon fontSize="small" />
                                            </Button>
                                            <Controller
                                                name={`unitCount${count}`}
                                                control={control}
                                                defaultValue={count}
                                                render={({ field }) => (
                                                    <InputBase
                                                        sx={{
                                                            width: "40px", textAlign: "center",
                                                            '& input': { textAlign: 'center', p: 0, }
                                                        }}
                                                        size="small"
                                                        value={count}

                                                        inputProps={{ 'aria-label': 'count' }}
                                                        onChange={(e) => {
                                                            handleCountChange(e.target.value);
                                                            field.onChange(e);
                                                        }}
                                                    />
                                                )}
                                            />
                                            <Button
                                                variant="contained"
                                                onClick={() => setCount((prev) => prev + 1)}
                                            >
                                                <AddIcon fontSize="small" />
                                            </Button>
                                        </Box>
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




