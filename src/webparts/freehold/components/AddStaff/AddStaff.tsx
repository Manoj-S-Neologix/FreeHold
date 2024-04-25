import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import styles from './AddStaff.module.scss';
import { Box, Stack } from '@mui/material';
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import ClientService from "../../Services/Business/ClientService";

const AddStaffDialog = ({ open, onClose, props, particularClientAllData }: any) => {


    const [selectedPersons, setSelectedPersons] = useState<any[]>([]);

    console.log(particularClientAllData);

    useEffect(() => {
        // Pre-populate selected persons if already assigned
        if (particularClientAllData && particularClientAllData.assignedStaff) {
            setSelectedPersons(particularClientAllData.assignedStaff.map((staff: any) => ({
                id: staff.Id,
                text: staff.Name,
                secondaryText: staff.Email,
                imageUrl: `https://freeholddxb.sharepoint.com/_layouts/15/userphoto.aspx?size=M&accountname=${encodeURIComponent(staff.Email)}`
            })));
        }

    }, []);
    useEffect(() => {
        // Pre-populate selected persons if already assigned
        if (particularClientAllData && particularClientAllData.assignedStaff) {
            setSelectedPersons(particularClientAllData.assignedStaff.map((staff: any) => ({
                id: staff.Id,
                text: staff.Name,
                secondaryText: staff.Email,
                imageUrl: `https://freeholddxb.sharepoint.com/_layouts/15/userphoto.aspx?size=M&accountname=${encodeURIComponent(staff.Email)}`
            })));
        }

    }, [particularClientAllData]);


    const handleCancel = () => {
        onClose();
    };

    console.log("Selected persons:", selectedPersons);
    const handleSave = async () => {
        const dataObj = {
            AssignedStaffId: {
                results: selectedPersons
            }
        };
        ClientService().updateClient(
            "Client_Informations",
            particularClientAllData[0].Id,
            dataObj
        ).then((response: any) => {
            console.log("Success:", response);
            onClose();

        }).catch((error: any) => {
            console.error("Error:", error);
        });
    };



    const handlePeoplePickerChange = async (items: any[]) => {
        console.log(items, "itemsitemsitemsitems");
        const selectedPersonsIds = [];
        for (const item of items) {
            const getID = await ClientService().getPersonByEmail(item.secondaryText);
            console.log(getID.Id, "getIDgetID");
            selectedPersonsIds.push(getID.Id);
        }
        setSelectedPersons(selectedPersonsIds);
    };




    return (
        <Box sx={{ width: '100', padding: '20px' }}>
            <Stack direction="column" spacing={2}>
                <Dialog open={open} maxWidth='sm' fullWidth>
                    <DialogTitle className={styles.addTitle} style={{ textAlign: 'center', marginLeft: '7px', position: 'relative' }}>
                        <div className="d-flex flex-column">
                            <div className="d-flex justify-content-between align-items-center relative">
                                <h4 style={{ margin: '0', color: '#125895' }}>Assign Staff</h4>
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
                                    height: '30px',
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
                            defaultSelectedUsers={selectedPersons}
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
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </Stack>
        </Box>
    );
};

export default AddStaffDialog;
