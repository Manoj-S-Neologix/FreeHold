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
import { Box, CircularProgress, Grid, MenuItem, Stack, TextField, InputBase, Tooltip, Table, TableBody, TableContainer, TableRow, } from '@mui/material';
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

const CreateUnit = ({ open, onClose, props, particularClientAllData, selected, exsistingPersons, exsistingProjectLibrary, userRole }: any) => {
    const [getClientDetails, setGetClientDetails] = useState<any[]>([]);
    const [getClient, setGetClient] = useState<any>('');
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState(1);
    const { control, handleSubmit, reset, unregister, watch, formState: { errors }, setValue, trigger } = useForm();
    const [showCount, setShowCount] = useState(false);
    const [getFoldersResponse, setGetFoldersResponse] = useState<any[]>([]);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [deleteItemPath, setDeleteItemPath] = useState("");
    const getProjectUrl = particularClientAllData[0]?.webURL;
    const clientService = ClientService();
    const clientListName = "Client_Informations";
    const selectQuery = "Id,Title,ClientLibraryGUID,AssignedStaff/Title,AssignedStaff/EMail";
    const expand = 'AssignedStaff';
    const filter = (userRole === "staff") ? `AssignedStaff/EMail eq '${props.spContext.pageContext.user.email}'` : "";

    const apiCall = async () => {
        try {
            const data = await clientService.getClientExpandApi(clientListName, selectQuery, expand, filter, "");
            if (data) {
                const assignClientIds = particularClientAllData[0].assignClientId.split(',').map((id: any) => Number(id.trim()));
                const filteredData = data.filter(item => assignClientIds.includes(item.Id));
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

    useEffect(() => {
        apiCall();
    }, []);

    const handleCancel = () => {
        onClose();
    };

    const deleteUnit = (indexToRemove: number) => {
        const currentValues = watch(); 
        setCount((prevCount) => {
            const newCount = prevCount - 1;
            unregister(`unitName${indexToRemove}`);
            for (let i = indexToRemove; i < newCount; i++) {
                setValue(`unitName${i}`, currentValues[`unitName${i + 1}`]);
                unregister(`unitName${i + 1}`);
            }
            return newCount;
        });
    };

    const handleSwitchChange = (event: any) => {
        setShowCount(event.target.checked);
        setCount(1);
        reset();
    };

    const handleCountChange = (value: any) => {
        setCount(Math.max(Number(value), 1));
    };

    const handleSave = handleSubmit(async (data) => {
        setLoading(true);
        const collectionOfUnits: any[] = [];
        Object.entries(data).forEach(([key, value]) => {
            if (key.startsWith("unitName") && value !== "") {
                collectionOfUnits.push({ key: value });
            }
        });

        const AssignClient = getClientDetails.filter((item: any) => item.libraryGUID === data.AssignClient)[0].name;
        try {
            const response = await ProjectService().createFolder(getProjectUrl, AssignClient);
            const folderCreationPromises = collectionOfUnits.map((unit) => {
                return ProjectService().createFolder(response.data.ServerRelativeUrl, unit.key);
            });
            await Promise.all(folderCreationPromises);
            const updatedFolders = await ProjectService().getAllFoldersInLibrary(`${getProjectUrl}/${AssignClient}`);
            setGetFoldersResponse(updatedFolders);

            setLoading(false);
            toast.success("Units created successfully");

            reset();
            setCount(1);
        } catch (error) {
            setLoading(false);
            toast.error(error.message);
            console.error("Error:", error);
        }
    });

    const [, setClientDocumentsData] = useState<any[]>([]);
    const [, setClientDocumentsAllData] = useState<any[]>([]);
    const getDocumentsFromFolder = async (libraryGuid: string) => {
        try {
            const results: any = await ProjectService().getDocumentsFromFolder(libraryGuid);
            const getLibraryName = getClientDetails.filter((item: any) => item.libraryGUID === libraryGuid)[0].name;
            const getFolders: any = await ProjectService().getAllFoldersInLibrary(`${getProjectUrl}/${getLibraryName}`);
            setGetFoldersResponse(getFolders);
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

    const handleDeleteUnit = async () => {
        try {
            const apiResponse = ProjectService();
            await apiResponse.deleteFolder(deleteItemPath)
            toast.success('Unit Deleted Successfully!');
            setGetFoldersResponse(prevFolders =>
                prevFolders.filter(folder => folder.ServerRelativeUrl !== deleteItemPath)
            );
            setIsDeleteDialogOpen(false);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast.error(`Failed to delete unit: ${error}`);
        }
    }

    const handleCloseDeleteDialog = () => {
        setIsDeleteDialogOpen(false);
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
                                                label="Assigned Client"
                                                variant="outlined"
                                                fullWidth
                                                select
                                                {...field}
                                                required
                                                onChange={(e: any) => {
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
                                            </TextField>
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TableContainer>
                                        <Table>
                                            <TableBody>
                                                {getFoldersResponse.length > 0 &&
                                                    getFoldersResponse.map((item: any, idx: any) => (
                                                        <TableRow key={idx}>
                                                            <Grid item xs={12} style={{ display: 'flex', paddingBottom: '0.5rem' }}>
                                                                <TextField label={item?.Name} fullWidth disabled name='getUnitDocument'>
                                                                    {item?.Name}
                                                                </TextField>
                                                                <IconButton aria-label="delete"
                                                                    onClick={() => { setIsDeleteDialogOpen(true); setDeleteItemPath(item.ServerRelativeUrl); }}>
                                                                    <DeleteIcon />
                                                                </IconButton>
                                                            </Grid>
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
                                                                    },
                                                                    validate: {
                                                                        noTrailingSpaces: value =>
                                                                            !/^\s|\s$|^(\s)+$/.test(value) || `Unit ${index + 1} cannot have leading or trailing spaces`,
                                                                        isNotRegistered: async (value: string) => {

                                                                            await
                                                                                new Promise<void>((resolve) => setTimeout(resolve, 500));
                                                                            return getFoldersResponse.find((item: any) => item.Name === value) ?
                                                                                "Unit is already registered" : undefined;
                                                                        }
                                                                    },
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
                                                                        onChange={async (e: any) => {
                                                                            field.onChange(e);
                                                                            await trigger(`${`unitName${index}`}`);
                                                                        }}
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




