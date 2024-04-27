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
import toast from 'react-hot-toast';


const AddStaffDialog = ({ open, onClose, props, particularClientAllData, selected, exsistingPersons }: any) => {


    const [selectedPersons, setSelectedPersons] = useState<any[]>([]);
    const [selectedPersonsId, setSelectedPersonsId] = useState<any[]>([]);

    useEffect(() => {
        const assignedStaffEmails = particularClientAllData?.flatMap((item: any) =>
            item.assignedStaff.map((assignStaff: any) => assignStaff.Email)
        );
        setSelectedPersons(assignedStaffEmails);
    }, [particularClientAllData]);


    console.log(particularClientAllData, selected, selectedPersons, "particularClientAllData");

    const handleCancel = () => {
        onClose();
    };


    // const handleSave = async () => {
    //     const dataObj = {
    //         AssignedStaffId: {
    //             results: selectedPersonsId
    //         }
    //     };
    //     if (selected?.length === 0) {
    //         ClientService().updateClient(
    //             "Client_Informations",
    //             particularClientAllData[0].Id,
    //             dataObj
    //         ).then((response: any) => {
    //             console.log("Success:", response);
    //             onClose();

    //         }).catch((error: any) => {
    //             console.error("Error:", error);
    //         });
    //     }
    //     else {
    //         for (const item of selected) {
    //             ClientService().updateClient(
    //                 "Client_Informations",
    //                 item,
    //                 dataObj
    //             ).then((response: any) => {
    //                 console.log("Success:", response);
    //                 onClose();

    //             }).catch((error: any) => {
    //                 console.error("Error:", error);
    //             });

    //         }
    //     }
    // };


    const handleSave = async () => {
        const dataObj = {
            AssignedStaffId: {
                results: selectedPersonsId
            }
        };
        const ID = particularClientAllData[0]?.Id ? particularClientAllData[0]?.Id : exsistingPersons.Id

        console.log(ID, particularClientAllData, exsistingPersons)

        try {
            if (selected?.length === 0) {
                const response = await ClientService().updateClient(
                    "Client_Informations",
                    particularClientAllData[0].Id,
                    dataObj
                );
                console.log("Success:", response);
                onClose();
                toast.success('Staff updated successfully!');
            } else {
                for (const item of selected) {
                    const response = await ClientService().updateClient(
                        "Client_Informations",
                        item,
                        dataObj
                    );
                    console.log("Success:", response);
                    onClose();
                }
                toast.success('Staff updated successfully!');
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error(`Failed to update staff(s): ${error}`);
        }
    };


    const handlePeoplePickerChange = async (items: any[]) => {
        console.log(items, "itemsitemsitemsitems");
        const selectedPersonsIds = [];
        for (const item of items) {
            const getID = await ClientService().getPersonByEmail(item.secondaryText);
            console.log(getID.Id, "getIDgetID");
            selectedPersonsIds.push(getID.Id);
        }
        setSelectedPersonsId(selectedPersonsIds);
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
                            defaultSelectedUsers={selected?.length > 0 ? [] : exsistingPersons || selectedPersons || []}

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
