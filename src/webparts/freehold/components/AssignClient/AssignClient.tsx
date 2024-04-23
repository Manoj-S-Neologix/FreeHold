import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import styles from './AssignClient.module.scss';
import { Box, Stack } from '@mui/material';
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";

const AssignClient = ({ open, onClose, props }: any) => {
    const [selectedPersons, setSelectedPersons] = useState<any[]>([]);

    //console.log(props, "propsprops");

    const handleCancel = () => {
        onClose();
    };

    const handleSave = async () => {
        // Perform save operation here
    };

    const handlePeoplePickerChange = (items: any[]) => {
        setSelectedPersons(items);
    };
    console.log("Selected persons:", selectedPersons);


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
                        <PeoplePicker
                            styles={{
                                input: {
                                    width: '100%',
                                    height: '40px',
                                    marginBottom: '10px'
                                },
                                itemsWrapper: {
                                    'ms-PickerPersona-container': {
                                        width: '100%',
                                        backgroundColor: 'white !important'
                                    }
                                }
                            }}
                            context={props.props.props.context as any}
                            personSelectionLimit={4}
                            required={true}
                            showHiddenInUI={false}
                            principalTypes={[PrincipalType.User]}
                            resolveDelay={1000}
                            onChange={handlePeoplePickerChange}
                        />

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
                            Clear
                        </Button>
                    </DialogActions>
                </Dialog>
            </Stack>
        </Box>
    );
};

export default AssignClient;
