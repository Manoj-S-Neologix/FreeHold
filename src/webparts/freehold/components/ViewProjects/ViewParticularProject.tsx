import React, { useState } from 'react';
import { Breadcrumbs, Box, Stack, TextField  } from '@mui/material';
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
import AssignClient from "../AssignClient/AssignClient";
// import ViewProjects from '../ViewProjects/ViewProjects';

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

const ViewParticularProject = ({ props, clientDetails, setIsViewDialogOpen }: any) => {
    const [selected, setSelected] = React.useState<any>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [handleStaffDialog, setHandleStaffDialog] = useState(false);
    const [handleClientDialog, setHandleClientDialog] = useState(false);
    const [addClientDialog, setAddClientDialog] = useState(false);
    const navigate = useNavigate();

    const closeAssignClientDialog = () => {
        setHandleClientDialog(false);
    };

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

    // const handleEditClick = () => {
    //     setIsEditClicked(true);
    // };




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

    const [isEdit, setIsEdit] = useState(false);

    const handleDeleteDialogClose = () => {
        setIsDeleteDialogOpen(false);
    };

    const navigateToClient = () => {
        navigate('/ViewProjects');
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
                            Project
                        </StyledBreadcrumb>
                        <StyledBreadcrumb disabled>
                            {clientDetails.projectCode}
                        </StyledBreadcrumb>
                    </Breadcrumbs>
                </Box>
                <Box>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="client-details-table">
                            <TableHead>
                                <TableRow>

                                    <TableCell
                                        sx={{ fontWeight: 'bold', fontSize: '18px', textTransform: 'uppercase' }}
                                        component="th"
                                        scope="row"
                                    >Project Details</TableCell>
                                    {/* <Box sx={{
                                        display: "flex",
                                        justifyContent: "flex-end",
                                        marginTop: "10px",
                                        marginRight: "10px"
                                    }} >
                                        <Button
                                            handleClick={() => { setIsEdit(true); }}
                                            color="secondary"
                                            Icon={
                                                <EditIcon />
                                            }
                                            message="Edit"
                                        />
                                    </Box> */}
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
                                        <TableCell>{clientDetails.projectName}</TableCell>
                                    ) : (
                                        <TableCell>
                                            <TextField
                                                sx={{ pt: 1 }}
                                                label="Project Name"
                                                size="small"
                                                value={clientDetails.projectName}
                                                variant="outlined"
                                            />
                                        </TableCell>
                                    )}
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">Code</TableCell>
                                    {!isEdit ? (
                                        <TableCell>{clientDetails.projectCode}</TableCell>
                                    ) : (
                                        <TableCell>
                                            <TextField
                                                sx={{ pt: 1 }}
                                                label="Project Code"
                                                size="small"
                                                value={clientDetails.projectCode}
                                                variant="outlined"
                                            />
                                        </TableCell>
                                    )}
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">Assign Client</TableCell>
                                    <TableCell
                                        sx={{ textDecoration: "underline", color: "blue", cursor: "pointer" }}
                                        onClick={() => { setHandleClientDialog(true); }}
                                    >
                                        {clientDetails.assignedClients}
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
                                {isEdit && <TableRow>
                                    <TableCell component="th" scope="row">
                                        <MuiButton variant="contained" color="primary">
                                            Save
                                        </MuiButton>
                                        <MuiButton sx={{ marginLeft: "10px" }} variant="outlined" color="secondary"
                                            onClick={navigateToClient}
                                        >
                                            Cancel
                                        </MuiButton>
                                    </TableCell>
                                </TableRow>}


                            </TableBody>

                        </Table>
                    </TableContainer>
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

            {handleClientDialog && <AssignClient open={handleClientDialog} onClose={closeAssignClientDialog}
                props={props} />}
        </Box>
    );
};

export default ViewParticularProject;



