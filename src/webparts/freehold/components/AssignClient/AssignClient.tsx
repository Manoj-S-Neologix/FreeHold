// import React, { useEffect, useState } from 'react';
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
// import DialogActions from '@mui/material/DialogActions';
// import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';
// import styles from './AssignClient.module.scss';
// import { Box, MenuItem, Stack, TextField } from '@mui/material';
// import ProjectService from '../../Services/Business/ProjectService';
// import ClientService from "../../Services/Business/ClientService";
// import toast from "react-hot-toast";

// const AssignClient = ({ open, onClose, props, particularClientAllData, selected, exsistingPersons }: any) => {
//     const [getClientDetails, setGetClientDetails] = useState<any[]>([]);
//     const [getClient, setGetClient] = useState<any[]>([]);

//     //console.log(props, "propsprops");

//     const clientService = ClientService();
//     const clientListName = "Client_Informations";
//     const selectQuery = "Id,Title,ClientLibraryGUID";
    

//     const apiCall = (async () => {
//         await clientService.getClientExpandApi(clientListName, selectQuery, "", "")
//             .then((data) => {
//                 if (data) {
//                     const mappedData = data.map((item: any) => ({
//                         id: item.Id,
//                         name: item.Title,
//                         libraryGUID: item.ClientLibraryGUID
//                     }));
//                     setGetClientDetails(mappedData);
//                 }

//             }).catch((error: any) => {
//                 toast.error(error.message);
//             });
//     });

//     console.log(getClientDetails, "getClientDetails");

//     useEffect(() => {
//         apiCall();
//     }, []);

//     const handleCancel = () => {
//         onClose();
//     };

//     const handleSave = async () => {
//         const dataObj = {
//             AssignedStaffId: {
//                 results: "selectedPersonsId"
//             }
//         };
//         if (selected?.length === 0) {
//             ProjectService().updateProject(
//                 "Project_Informations",
//                 particularClientAllData[0].Id,
//                 dataObj
//             ).then((response: any) => {
//                 console.log("Success:", response);
//                 onClose();

//             }).catch((error: any) => {
//                 console.error("Error:", error);
//             });
//         }
//         else {
//             for (const item of selected) {
//                 ProjectService().updateProject(
//                     "Project_Informations",
//                     item,
//                     dataObj
//                 ).then((response: any) => {
//                     console.log("Success:", response);
//                     onClose();

//                 }).catch((error: any) => {
//                     console.error("Error:", error);
//                 });

//             }
//         }
//     };

//     console.log(getClient, "getClientgetClient");



//     return (
//         <Box sx={{ width: '100', padding: '20px' }}>
//             <Stack direction="column" spacing={2}>
//                 <Dialog open={open} maxWidth='sm' fullWidth>
//                     <DialogTitle className={styles.addTitle}
//                         style={{
//                             textAlign: 'center',
//                             marginLeft: '7px', position: 'relative'
//                         }}>
//                         <div className="d-flex flex-column">
//                             <div className="d-flex justify-content-between 
//                             align-items-center relative">
//                                 <h4
//                                     style={{ margin: '0', color: '#125895' }}>
//                                     Assign Client
//                                 </h4>
//                             </div>
//                             <div style={{
//                                 height: '4px', width: '100%',
//                                 backgroundColor: '#125895'
//                             }} />
//                         </div>
//                     </DialogTitle>
//                     <IconButton
//                         aria-label="close"
//                         onClick={handleCancel}
//                         sx={{
//                             position: "absolute",
//                             right: "14px",
//                             top: "8px",
//                             color: (theme: any) => theme.palette.grey[500],
//                         }}
//                     >
//                         <CloseIcon />
//                     </IconButton>
//                     <DialogContent >
//                         <TextField
//                             label="Assign Client"
//                             variant="outlined"
//                             fullWidth
//                             select
//                             onChange={(e: any) => {
//                                 setGetClient(e.target.value);
//                             }}
//                         >
//                             {getClientDetails?.map((item: any) => (
//                                 <MenuItem key={item.id} value={item.id}>
//                                     {item.name}
//                                 </MenuItem>
//                             ))}
//                         </TextField>
//                     </DialogContent>
//                     <DialogActions sx={{ padding: '10px', marginRight: '14px' }}>
//                         <Button
//                             onClick={handleSave}
//                             variant="contained"
//                             color="primary"
//                             sx={{
//                                 maxWidth: '150px',
//                                 float: 'right',
//                             }}
//                         >
//                             Save
//                         </Button>
//                         <Button variant="outlined" onClick={handleCancel}>
//                             Cancel
//                         </Button>
//                     </DialogActions>
//                 </Dialog>
//             </Stack>
//         </Box>
//     );
// };

// export default AssignClient;

import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import styles from './AssignClient.module.scss';
import { Box, MenuItem, Stack, TextField } from '@mui/material';
import ProjectService from '../../Services/Business/ProjectService';
import ClientService from "../../Services/Business/ClientService";
import toast from "react-hot-toast";
// import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';

const AssignClient = ({ open, onClose, props, particularClientAllData, selected, exsistingPersons }: any) => {
    const [getClientDetails, setGetClientDetails] = useState<any[]>([]);
    const [getClient, setGetClient] = useState<any[]>([]);
    const [personName, setPersonName] = React.useState<string[]>([]);

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
        );
      };


    console.log(getClientDetails, "getClientDetails");

    useEffect(() => {
        apiCall();
    }, []);

    const handleCancel = () => {
        onClose();
    };

    const handleSave = async () => {
        const dataObj = {
            AssignedStaffId: {
                results: "selectedPersonsId"
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

            }).catch((error: any) => {
                console.error("Error:", error);
            });
        }
        else {
            for (const item of selected) {
                ProjectService().updateProject(
                    "Project_Informations",
                    item,
                    dataObj
                ).then((response: any) => {
                    console.log("Success:", response);
                    onClose();

                }).catch((error: any) => {
                    console.error("Error:", error);
                });

            }
        }
    };

    console.log(getClient, "getClientgetClient");



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
                        <TextField
                            label="Assign Client"
                            variant="outlined"
                            fullWidth
                            select
                            onChange={(e: any) => {
                                setGetClient(e.target.value);
                            }}
                        >
                            {getClientDetails?.map((item: any) => (
                                <MenuItem key={item.id} value={item.id}>
                                    {item.name}
                                </MenuItem>
                            ))}
                        </TextField>
                        <div>
                        <InputLabel id="demo-multiple-chip-label"  style={{ margin: '0', color: '#125895', width:'100' }}>Chip</InputLabel>
        <Select
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
        </Select>
        </div>
                    </DialogContent>
                    <DialogActions sx={{ padding: '10px', marginRight: '14px' }}>
                        <Button
                            onClick={handleSave}
                            variant="contained"
                            color="primary"
                            sx={{
                                maxWidth: '150px',
                                float: 'right',
                            }}
                        >
                            Save
                        </Button>
                        <Button variant="outlined" onClick={handleCancel}>
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </Stack>
        </Box>
    );
};

export default AssignClient;



