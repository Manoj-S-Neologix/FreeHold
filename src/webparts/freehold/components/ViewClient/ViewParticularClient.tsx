import React, { useState } from 'react';
import { Breadcrumbs, Box, Stack, TextField } from '@mui/material';
import { Button as MuiButton } from "@mui/material";
import { emphasize, styled } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import AddClientDialog from '../AddClient/AddClient';
import AddStaffDialog from '../AddStaff/AddStaff';
import GridTable from "../../../../Common/Table/Table";
import { useNavigate } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CustomSearch from "../../../../Common/Search/CustomSearch";
import Button from "../../../../Common/Button/CustomButton";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteDialog from "../Delete/Delete";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ClientService from '../../Services/Business/ClientService';
import { Controller, useForm } from "react-hook-form";


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

const ViewParticularClient = ({ props, clientDetails, setClientDetails, setIsViewDialogOpen, isEdit, setIsEdit, handleCancel }: any) => {
    const [selected, setSelected] = React.useState<any>([]);

    const [searchQuery, setSearchQuery] = useState('');
    const [handleStaffDialog, setHandleStaffDialog] = useState(false);
    const [addClientDialog, setAddClientDialog] = useState(false);
    // const { handleSubmit, control } = useForm();
    const { control, setValue, handleSubmit, reset, formState: { errors }, trigger } = useForm();
    setValue('title', clientDetails.name);
    setValue('email', clientDetails.email);
    const [editData, setEditData] = React.useState<any>({
        title: clientDetails.name,
        email: clientDetails.email,

    });
    // const [isError, setIsError] = useState(false);
    const navigate = useNavigate();

    const handleSearchChange = (event: any) => {
        setSearchQuery(event.target.value);
    };



    console.log(clientDetails, editData, "clientDetails");


    // update code start

    const handleUpdate = handleSubmit(async (data) => {
        try {
            const apiResponse = ClientService();

            const updatedData = {
                Title: editData.title,
                ClientEmail: editData.email,
                // ClientContact: data.contact,
            };

            const response = await apiResponse.updateClient("Client_Information", clientDetails.Id, updatedData);
            console.log(response, updatedData, 'responseresponseresponse');
            // handleCancel();
            // console.log("Update response:", response);
            reset();
            navigateToClient();
        } catch (error) {
            console.error('Error updating client details:', error);
            // setIsError(true);
        }
    });


    // update code end


    const navigateToHome = () => {
        navigate('/');
    };

    const openAddStaffDialog = () => {
        setHandleStaffDialog(true);
    };

    const closeAddStaffDialog = () => {
        setHandleStaffDialog(false);
    };

    const openAddClientDialog = () => {
        setAddClientDialog(true);
    };

    const closeAddClientDialog = () => {
        setAddClientDialog(false);
    };









    const IconStyles = (icon: any) => {
        return (
            <div>
                {icon}
            </div >
        );
    };

    const headCells = [
        { id: 'name', numeric: false, disablePadding: true, label: 'Client Name' },
        { id: 'email', numeric: false, disablePadding: true, label: 'Client Email' },
        { id: 'modifiedDate', numeric: false, disablePadding: true, label: 'Modified Date' },
        { id: 'modifiedBy', numeric: false, disablePadding: true, label: 'Modified By' },
        { id: 'assignedStaff', numeric: false, disablePadding: true, label: 'Assigned Staff' },
        { id: 'action', numeric: false, disablePadding: true, label: 'Actions' },
    ];
    const rows = [
        { name: 'John Doe', email: 'john@example.com', modifiedDate: '15/03/2024', modifiedBy: 'Alice Johnson', assignedStaff: 'Smith Martinez' },
        { name: 'Jane Smith', email: 'jane@example.com', modifiedDate: '16/03/2024', modifiedBy: 'Bob Brown', assignedStaff: 'Diego Charlie' },
        { name: 'Alice Johnson', email: 'alice@example.com', modifiedDate: '17/03/2024', modifiedBy: 'Charlie Davis', assignedStaff: 'Marco Doe' },
        { name: 'Bob Brown', email: 'bob@example.com', modifiedDate: '18/03/2024', modifiedBy: 'David Wilson', assignedStaff: 'Altair Martinez' },
        { name: 'Charlie Davis', email: 'charlie@example.com', modifiedDate: '19/03/2024', modifiedBy: 'Eve Anderson', assignedStaff: 'Martinez' },
        { name: 'David Wilson', email: 'david@example.com', modifiedDate: '20/03/2024', modifiedBy: 'Frank Martinez', assignedStaff: 'Antonio Rabin' },
        { name: 'Eve Anderson', email: 'eve@example.com', modifiedDate: '21/03/2024', modifiedBy: 'John Doe', assignedStaff: 'Etahn Martin' },
        { name: 'Frank Martinez', email: 'frank@example.com', modifiedDate: '22/03/2024', modifiedBy: 'Jane Smith', assignedStaff: 'Henry' },
    ];

    const actions = [
        {
            label: 'View',
            icon: <VisibilityIcon />,
            handler: (id: any) => {
                //console.log(`View clicked for row ${id}`);
            },
        },
        {
            label: 'Edit',
            icon: <EditIcon />,
            handler: (id: any) => {
                //console.log(`Edit clicked for row ${id}`);
            },
        },
        {
            label: 'Delete',
            icon: <DeleteIcon />,
            handler: (id: any) => {
                //console.log(`Delete clicked for row ${id}`);
                setIsDeleteDialogOpen(true);
            },
        },
        {
            label: 'Upload Documents',
            button: (
                <Button
                    color="primary"
                    message="Upload Documents"
                    handleClick={(id: any) => {
                        //console.log(`Upload Documents clicked for row ${id}`);
                    }}
                />
            ),
        },
        {
            label: 'Assign Staff',
            button: (
                <Button
                    color="secondary"
                    message="Assign Staff"
                    handleClick={(id: any) => {
                        setHandleStaffDialog(!handleStaffDialog);
                    }}
                />
            ),
        },
    ];

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);



    const handleDeleteDialogClose = () => {
        setIsDeleteDialogOpen(false);
    };

    console.log(clientDetails, 'viewParticularClient');

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
                                        <TableCell component="th" scope="row">Name</TableCell>
                                        {!isEdit ? (
                                            <TableCell>{clientDetails.name}</TableCell>
                                        ) : (
                                            <TableCell>
                                                {/* <TextField
                                                sx={{ pt: 1 }}
                                                size="small"
                                                value={clientDetails.name}
                                                onChange={(e) => setClientDetails({ ...clientDetails, name: e.target.value })}
                                                variant="outlined"
                                                label=""
                                            /> */}
                                                <Controller
                                                    name="title"
                                                    control={control}
                                                    defaultValue=""
                                                    rules={{
                                                        required: 'Client Name is required',
                                                        minLength: {
                                                            value: 3,
                                                            message: "Client Name must be at least 3 characters.",
                                                        },
                                                        maxLength: {
                                                            value: 100,
                                                            message: "Client Name must be at most 100 characters.",
                                                        }
                                                    }}
                                                    render={({ field }) => (
                                                        <TextField
                                                            {...field}
                                                            id="clientName"
                                                            margin="dense"
                                                            size="small"
                                                            //   fullWidth
                                                            value={editData.title}
                                                            onChange={async (e) => {
                                                                const value = e.target.value;
                                                                field.onChange(value);
                                                                await trigger('title');
                                                                setEditData({ ...editData, title: value });
                                                            }}
                                                            error={!!errors.title}
                                                            helperText={errors.title && errors.title.message}
                                                        />
                                                    )}
                                                />
                                            </TableCell>
                                        )}
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">Email</TableCell>
                                        {!isEdit ? (
                                            <TableCell>{clientDetails.email}</TableCell>
                                        ) : (
                                            <TableCell>
                                                {/* <TextField
                                                sx={{ pt: 1 }}
                                                size="small"
                                                value={clientDetails.email}
                                                onChange={(e) => setClientDetails({ ...clientDetails, email: e.target.value })}
                                                variant="outlined"
                                                label=""
                                            /> */}
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
                                        <TableCell component="th" scope="row">Modified Date</TableCell>
                                        <TableCell>{clientDetails.modifiedDate}</TableCell>
                                        {/* {!isEdit ? (
                                    ) : (
                                        <TableCell>
                                            <TextField
                                                sx={{
                                                    pt: 1,
                                                    width: "230px",
                                                    '& input[type="date"]': {
                                                        padding: '11px',
                                                    },
                                                }}
                                                type="date"
                                                value={clientDetails.modifiedDate ? clientDetails.modifiedDate.split('/').reverse().join('-') : ''}
                                                onChange={(e) => setClientDetails({ ...clientDetails, modifiedDate: e.target.value })}
                                                variant="outlined"
                                            />

                                        </TableCell>
                                    )} */}
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">Modified By</TableCell>
                                        <TableCell>{clientDetails.modifiedBy}</TableCell>
                                        {/* {!isEdit ? (
                                    ) : (
                                        <TableCell>
                                            <TextField
                                                sx={{ pt: 1 }}
                                                size="small"
                                                value={clientDetails.modifiedBy}
                                                variant="outlined"
                                                label=""
                                            />
                                        </TableCell>
                                    )} */}
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">Assigned Staff</TableCell>
                                        {isEdit && <TableCell
                                            onClick={() => { setHandleStaffDialog(true); }}
                                        >
                                            {clientDetails.assignStaff}
                                        </TableCell>}
                                        {!isEdit && <TableCell
                                            sx={{ textDecoration: "underline", color: "blue", cursor: "pointer" }}
                                            onClick={() => { setHandleStaffDialog(true); }}
                                        >
                                            {clientDetails.assignStaff}
                                        </TableCell>}
                                    </TableRow>
                                    {isEdit && <TableRow>
                                        <TableCell component="th" scope="row">
                                            <MuiButton type="submit" variant="contained" color="primary"
                                                onClick={handleUpdate}
                                            >
                                                Update
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
                {false && <Box style={{
                    margin: '0px', display: "flex", alignItems: "center",
                    justifyContent: "space-between"
                }}>
                    <Box sx={{ display: "flex", alignItems: "center", width: "21%", justifyContent: "space-between" }}>
                        <Button
                            handleClick={openAddClientDialog}
                            style={{ maxWidth: "200px", whiteSpace: "pre", background: "#125895", color: "#fff" }}
                            message="Add Client"
                            Icon={
                                IconStyles(<AddIcon
                                    sx={{
                                        color: "white",
                                        fontSize: "20px !important",

                                    }} />)
                            }
                        />
                        <Button
                            handleClick={openAddStaffDialog}
                            disabled={selected.length === 0}
                            style={{
                                maxWidth: "200px", whiteSpace: "pre",
                                background: "#dba236", color: "#000"
                            }}
                            message="Assign Staff"
                        />
                    </Box>
                    <CustomSearch handleSearchChange={handleSearchChange} />
                </Box>}
                {false && <Box >
                    <GridTable
                        rows={rows}
                        headCells={headCells}
                        props={props}
                        searchQuery={searchQuery}
                        setSelected={setSelected}
                        selected={selected}
                        actions={actions}
                    />
                </Box>}
            </Stack>
            {false && <AddClientDialog open={addClientDialog} onClose={closeAddClientDialog} />}
            {false && <AddStaffDialog props={props} open={handleStaffDialog} onClose={closeAddStaffDialog} />}
            {false && isDeleteDialogOpen &&
                <DeleteDialog
                    clientDetails={clientDetails}
                    open={isDeleteDialogOpen}
                    onClose={handleDeleteDialogClose} />}


        </Box>
    );
};

export default ViewParticularClient;

