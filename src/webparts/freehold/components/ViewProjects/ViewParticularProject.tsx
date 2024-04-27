import React, { useState } from 'react';
import { Breadcrumbs, Box, Stack, TextField } from '@mui/material';
import { Button as MuiButton } from "@mui/material";
import { emphasize, styled } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
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
import AssignClient from "../AssignClient/AssignClient";

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

const ViewParticularProject = ({ props, projectDetails, setIsViewDialogOpen }: any) => {
    const [isEdit, setIsEdit] = useState(false);
    const [handleClientDialog, setHandleClientDialog] = useState(false);

    const navigate = useNavigate();

    const closeAssignClientDialog = () => {
        setHandleClientDialog(false);
    };


    // console.log(projectDetails, "projectDetails");

    const navigateToHome = () => {
        navigate('/');
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
                            {projectDetails.projectNumber}
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
                                    <TableCell component="th" scope="row">Number</TableCell>
                                    {!isEdit ? (
                                        <TableCell>{projectDetails.projectNumber}</TableCell>
                                    ) : (
                                        <TableCell>
                                            <TextField
                                                sx={{ pt: 1 }}
                                                label="Project Code"
                                                size="small"
                                                value={projectDetails.projectNumber}
                                                variant="outlined"
                                            />
                                        </TableCell>
                                    )}
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">Name</TableCell>
                                    {!isEdit ? (
                                        <TableCell>{projectDetails.projectName}</TableCell>
                                    ) : (
                                        <TableCell>
                                            <TextField
                                                sx={{ pt: 1 }}
                                                label="Project Name"
                                                size="small"
                                                value={projectDetails.projectName}
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
                                        {projectDetails.assignedClients ?
                                            projectDetails.assignedClients :
                                            "Assign Client"
                                        }
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">Modified Date</TableCell>
                                    <TableCell>{projectDetails.modifiedDate}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">Modified By</TableCell>
                                    <TableCell>{projectDetails.modifiedBy}</TableCell>
                                </TableRow>
                                {isEdit && <TableRow>
                                    <TableCell component="th" scope="row">
                                        <MuiButton variant="contained" color="primary">
                                            Update
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

            </Stack>
            {handleClientDialog && <AssignClient open={handleClientDialog} onClose={closeAssignClientDialog}
                props={props} />}
        </Box>
    );
};

export default ViewParticularProject;



