import React, { useEffect, useState } from 'react';
import { Breadcrumbs, Box, Stack, TextField } from '@mui/material';
import { Button as MuiButton } from "@mui/material";
import { emphasize, styled } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import AddStaffDialog from '../AddStaff/AddStaff';
import { useNavigate } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Button from "../../../../Common/Button/CustomButton";
import EditIcon from '@mui/icons-material/Edit';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ClientService from '../../Services/Business/ClientService';
import { Controller, useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';


const StyledBreadcrumb = styled(MuiButton)(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[800],
    height: theme.spacing(3),
    color: '#125895',
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
        backgroundColor: emphasize(
            theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[800],
            0.06,
        ),
    },
    '&:active': {
        boxShadow: theme.shadows[1],
        backgroundColor: emphasize(
            theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[800],
            0.12,
        ),
    },
}));

const ViewParticularClient = ({ props, clientDetails, setClientDetails, setIsViewDialogOpen, isEdit, setIsEdit, handleCancel, particularClientAllData, fetchData }: any) => {
    // const [selected] = React.useState<any>([]);
    console.log(particularClientAllData, "particularClientAllData");
    // const [searchQuery, setSearchQuery] = useState('');
    const [handleStaffDialog, setHandleStaffDialog] = useState(false);
    const [selectedPersons, setSelectedPersons] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    // const [loading, setLoading] = useState(false);


    useEffect(() => {
        const assignedStaffEmails = particularClientAllData?.flatMap((item: any) =>
            item.assignedStaff.map((assignStaff: any) => assignStaff.Email)
        );
        setSelectedPersons(assignedStaffEmails);

        console.log('Assigned Staff Emails:', assignedStaffEmails);

    }, []);

    // const [addClientDialog, setAddClientDialog] = useState(false);
    // // const { handleSubmit, control } = useForm();
    const { control, setValue, handleSubmit, reset, formState: { errors }, trigger } = useForm();
    setValue('title', clientDetails.name);
    setValue('email', clientDetails.email);
    setValue('contact', clientDetails.contact);
    setValue('assignedStaff', clientDetails.assignedStaff);

    const [editData, setEditData] = React.useState<any>({
        title: clientDetails.name,
        email: clientDetails.email,
        contact: clientDetails.contact,
        assignedStaff: clientDetails.assignedStaff



    });





    // const [isError, setIsError] = useState(false);
    const navigate = useNavigate();

    console.log(clientDetails, "clientdetails");
    // const handleSearchChange = (event: any) => {
    //     setSearchQuery(event.target.value);
    // };



    // console.log(clientDetails, editData, "clientDetails");


    // update code start

    // const handleUpdate = handleSubmit(async (data) => {
    //     try {
    //         const apiResponse = ClientService();

    //         const updatedData = {
    //             Title: editData.title,
    //             ClientEmail: editData.email,
    //             ClientContact: editData.contact,
    //         };

    //         const response = await apiResponse.updateClient("Client_Informations", clientDetails.Id, updatedData);
    //         console.log(response, updatedData, 'responseresponseresponse');
    //         // handleCancel();
    //         // console.log("Update response:", response);
    //         reset();
    //         navigateToClient();
    //     } catch (error) {
    //         console.error('Error updating client details:', error);
    //         // setIsError(true);
    //     }
    // });

    const handleUpdate = handleSubmit(async (data) => {
        try {
            setLoading(true);
            const apiResponse = ClientService();



            const updatedData = {
                Name: editData.title,
                ClientEmail: editData.email,
                ClientContact: editData.contact,
                AssignedStaff: editData.assignedStaff
            };

            const response = await apiResponse.updateClient("Client_Informations", clientDetails.Id, updatedData);

            console.log('Update Client Response:', response);

            reset();
            navigateToClient();
            setLoading(false);
            toast.success('Client Updated Successfully!');
        } catch (error) {
            setLoading(false);
            console.error('Error updating client details:', error);
            toast.error('Failed to update client details. Please try again.');
        }
    });


    // update code end

    const navigateToHome = () => {
        navigate('/');
    };

    const closeAddStaffDialog = () => {
        setHandleStaffDialog(false);
        setSelectedPersons([]);
    };


    const navigateToClient = () => {
        setIsViewDialogOpen(false);
        setIsEdit(false);
        navigate('/viewClient');
    };

    return (
        <Box>
            <Stack direction='column' sx={{ gap: "30px" }} >
                <Box >
                    <Breadcrumbs
                        separator={<NavigateNextIcon fontSize="medium" />}
                        aria-label="breadcrumb"
                    >
                        <StyledBreadcrumb onClick={navigateToHome} startIcon={<HomeIcon />} >
                            Home
                        </StyledBreadcrumb>
                        <StyledBreadcrumb onClick={navigateToClient}>
                            Client
                        </StyledBreadcrumb>
                        <StyledBreadcrumb disabled>
                            {clientDetails.name}
                        </StyledBreadcrumb>
                    </Breadcrumbs>
                </Box>
                <Box>
                    <form onSubmit={handleUpdate}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="client-details-table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell
                                            sx={{ fontWeight: 'bold', fontSize: '18px', textTransform: 'uppercase' }}
                                            component="th"
                                            scope="row"
                                            colSpan={1}>Client Details</TableCell>

                                        <Box sx={{
                                            display: "flex",
                                            justifyContent: "flex-end",
                                            marginTop: "10px",
                                            marginRight: "10px"
                                        }}>
                                            {!isEdit && (
                                                <Button
                                                    handleClick={() => setIsEdit(true)}
                                                    color="secondary"
                                                    Icon={<EditIcon />}
                                                    message="Edit"
                                                />
                                            )}
                                        </Box>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell component="th" scope="row">Email</TableCell>
                                        {!isEdit ? (
                                            <TableCell>{clientDetails.email}</TableCell>
                                        ) : (
                                            <TableCell>

                                                <Controller
                                                    name="email"
                                                    control={control}
                                                    defaultValue=""
                                                    rules={{
                                                        required: "Email Id is required.",
                                                        minLength: {
                                                            value: 5,
                                                            message: "Email address must be at least 5 characters.",
                                                        },
                                                        maxLength: {
                                                            value: 100,
                                                            message: "Email address must be at most 100 characters.",
                                                        },
                                                        pattern: {
                                                            value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
                                                            message: "Invalid email address",
                                                        },
                                                    }}
                                                    render={({ field }) => (
                                                        <TextField
                                                            {...field}
                                                            id="clientEmail"
                                                            margin="dense"
                                                            size="small"
                                                            value={editData.email}
                                                            onChange={async (e: any) => {
                                                                const value = e.target.value;
                                                                field.onChange(value);
                                                                await trigger("email");
                                                                setEditData({ ...editData, email: value });
                                                            }}
                                                            error={!!errors.email}
                                                            helperText={errors.email && errors.email.message}
                                                        />
                                                    )}
                                                />
                                            </TableCell>
                                        )}
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">Contact Number</TableCell>
                                        {!isEdit ? (
                                            <TableCell>{clientDetails.contact}</TableCell>
                                        ) : (
                                            <TableCell>

                                                <Controller
                                                    name="contact"
                                                    control={control}
                                                    defaultValue=""
                                                    rules={{
                                                        required: 'Client Contact is required',
                                                        pattern: {
                                                            value: /^[0-9]{10}$/,
                                                            message: 'Invalid contact number'
                                                        }
                                                    }}
                                                    render={({ field }) => (
                                                        <TextField
                                                            {...field}
                                                            id="clientContact"
                                                            margin="dense"
                                                            size="small"
                                                            // fullWidth
                                                            value={editData.contact}
                                                            onChange={async (e: any) => {
                                                                const value = e.target.value.replace(/\D/g, '');
                                                                field.onChange(value);
                                                                await trigger("contact");
                                                                setEditData({ ...editData, contact: value });
                                                            }}
                                                            error={!!errors.contact}
                                                            helperText={errors.contact && errors.contact.message}
                                                        />
                                                    )}
                                                />

                                            </TableCell>
                                        )}
                                    </TableRow>



                                    <TableRow>

                                        <TableCell component="th" scope="row">Name</TableCell>
                                        <TableCell>
                                            {!isEdit ? (
                                                clientDetails.name
                                            ) : (
                                                <Controller
                                                    name="title"
                                                    control={control}
                                                    defaultValue=""
                                                    rules={{ required: 'Name is required' }}
                                                    render={({ field }) => (
                                                        <TextField
                                                            {...field}
                                                            // fullWidth
                                                            size="small"
                                                            error={!!errors.title}
                                                            helperText={errors.title && errors.title.message}
                                                        />
                                                    )}
                                                />
                                            )}
                                        </TableCell>

                                    </TableRow>

                                    <TableRow>
                                        <TableCell component="th" scope="row">Modified Date</TableCell>
                                        <TableCell>{clientDetails.modifiedDate}</TableCell>

                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">Modified By</TableCell>
                                        <TableCell>{clientDetails.modifiedBy}</TableCell>

                                    </TableRow>

                                    {/* <TableRow>
                                        <TableCell component="th" scope="row">Assigned Staff</TableCell>
                                        {isEdit && <TableCell
                                            onClick={() => { setHandleStaffDialog(true); }}
                                        >
                                            <ul>
                                                {clientDetails?.assignedStaff?.map((staff: any) => (
                                                    <li key={staff}>{staff?.Name}</li>
                                                ))}
                                            </ul>
                                        </TableCell>}
                                        {!isEdit && <TableCell
                                            sx={{ textDecoration: "underline", color: "blue", cursor: "pointer" }}
                                            onClick={() => { setHandleStaffDialog(true); }}
                                        >
                                            <ul>
                                                {clientDetails?.assignedStaff?.map((staff: any) => (
                                                    <li key={staff}>{staff?.Name}</li>
                                                ))}
                                            </ul>

                                        </TableCell>}
                                    </TableRow> */}

                                    <TableRow>
                                        <TableCell component="th" scope="row">Assigned Staff</TableCell>
                                        {isEdit && <TableCell
                                            sx={{ textDecoration: "underline", color: "blue", cursor: "pointer" }}
                                            onClick={() => { setHandleStaffDialog(true); }}
                                        >
                                            {clientDetails?.assignedStaff?.map((staff: any, index: number) => (
                                                <ListItem key={index} component="div" disablePadding>
                                                    <ListItemButton>
                                                        <ListItemText primary={staff.Name} />
                                                    </ListItemButton>
                                                </ListItem>
                                            ))}
                                        </TableCell>}
                                        {!isEdit && <TableCell className="default-cursor"
                                        >
                                            {clientDetails?.assignedStaff?.map((staff: any, index: number) => (
                                                <ListItem key={index} component="div" disablePadding>
                                                    <ListItemButton>
                                                        <ListItemText primary={staff.Name} />
                                                    </ListItemButton>
                                                </ListItem>
                                            ))}
                                        </TableCell>}
                                    </TableRow>

                                    {/* <TableRow>
                                                <TableCell component="th" scope="row">Assigned Staff</TableCell>
                                                <TableCell>
                                                    {!isEdit ? (
                                                        clientDetails.assignedStaff
                                                    ) : (
                                                        <Controller
                                                            name="assignedStaff"
                                                            control={control}
                                                            defaultValue={clientDetails.assignedStaff}
                                                            render={({ field }) => (
                                                                <TextField
                                                                    {...field}
                                                                    id="assignedStaff"
                                                                    margin="dense"
                                                                    size="small"
                                                                    value={editData.assignedStaff}
                                                                    onChange={(e) => {
                                                                        const value = e.target.value;
                                                                        setEditData({ ...editData, assignedStaff: value });
                                                                        field.onChange(value);
                                                                    }}
                                                                />
                                                            )}
                                                        />
                                                    )}
                                                </TableCell>
                                            </TableRow> */}


                                    {isEdit && <TableRow>
                                        <TableCell component="th" scope="row">
                                            {/* <MuiButton type="submit" variant="contained" color="primary"
                                                onClick={handleUpdate}
                                            >
                                                Update
                                            </MuiButton> */}
                                            <MuiButton type="submit"
                                                variant="contained"
                                                color="primary"
                                                onClick={() => {
                                                    handleUpdate();
                                                }}
                                                disabled={loading}
                                            >
                                                {loading ? 'Updating...' : 'Update'}
                                            </MuiButton>
                                            <MuiButton sx={{ marginLeft: "20px" }} variant="contained" color="secondary"
                                                onClick={navigateToClient}
                                            >
                                                Cancel
                                            </MuiButton>
                                        </TableCell>
                                    </TableRow>}
                                </TableBody>

                            </Table>
                        </TableContainer>
                    </form>
                </Box>

            </Stack>

            <AddStaffDialog
                particularClientAllData={particularClientAllData} selected={clientDetails}
                exsistingPersons={selectedPersons} props={props} open={handleStaffDialog} onClose={closeAddStaffDialog} />

        </Box>
    );
};

export default ViewParticularClient;

