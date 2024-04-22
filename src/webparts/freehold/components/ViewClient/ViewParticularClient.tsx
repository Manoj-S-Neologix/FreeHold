import React, { useState } from 'react';
import { Breadcrumbs, Box, Stack } from '@mui/material';
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

function ViewParticularClient({ props, clientDetails, setIsViewDialogOpen }: any) {
    const [selected, setSelected] = React.useState<any>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [handleStaffDialog, setHandleStaffDialog] = useState(false);
    const [addClientDialog, setAddClientDialog] = useState(false);
    const navigate = useNavigate();

    const handleSearchChange = (event: any) => {
        setSearchQuery(event.target.value);
    };

    console.log(clientDetails, "clientDetails");

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
                console.log(`View clicked for row ${id}`);
            },
        },
        {
            label: 'Edit',
            icon: <EditIcon />,
            handler: (id: any) => {
                console.log(`Edit clicked for row ${id}`);
            },
        },
        {
            label: 'Delete',
            icon: <DeleteIcon />,
            handler: (id: any) => {
                console.log(`Delete clicked for row ${id}`);
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
                        console.log(`Upload Documents clicked for row ${id}`);
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

    const navigateToClient = () => {
        navigate('/viewClient');
        setIsViewDialogOpen(false);
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
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="client-details-table">
                            <TableHead>
                                <TableRow>
                                    <TableCell
                                        sx={{ fontWeight: 'bold' }}
                                        component="th"
                                        scope="row"
                                        colSpan={2}>ClientDetails</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell component="th" scope="row">Name</TableCell>
                                    <TableCell>{clientDetails.name}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">Email</TableCell>
                                    <TableCell>{clientDetails.email}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">Modified Date</TableCell>
                                    <TableCell>{clientDetails.modifiedDate}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">Modified By</TableCell>
                                    <TableCell>{clientDetails.modifiedBy}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">Assigned Staff</TableCell>
                                    <TableCell>{clientDetails.assignedStaff}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
                {false && <Box style={{
                    margin: '0px', display: "flex", alignItems: "center",
                    justifyContent: "space-between"
                }}>
                    <Box sx={{ display: "flex", alignItems: "center", width: "23%", justifyContent: "space-between" }}>
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
            {false && <AddStaffDialog open={handleStaffDialog} onClose={closeAddStaffDialog} />}
            {false && isDeleteDialogOpen &&
                <DeleteDialog
                    clientDetails={clientDetails}
                    open={isDeleteDialogOpen}
                    onClose={handleDeleteDialogClose} />}
        </Box>
    );
}

export default ViewParticularClient;


