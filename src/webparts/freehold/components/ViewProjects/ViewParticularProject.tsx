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
import { Controller, useForm } from "react-hook-form";
import ProjectService from '../../Services/Business/ProjectService';
import toast from 'react-hot-toast';


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

const ViewParticularProject = ({ props, projectDetails, setIsViewDialogOpen, fetchData, initialFetchData, isEdit, setIsEdit, particularClientAllData }: any) => {
    const [handleClientDialog, setHandleClientDialog] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const closeAssignClientDialog = () => {
        setHandleClientDialog(false);
    };

    const { control, setValue, handleSubmit, reset, formState: { errors }, trigger } = useForm(
        {
           defaultValues: {
                title: projectDetails.projectName,
                projectNumber: projectDetails.projectNumber,
                location: projectDetails.location,
                developer: projectDetails.developer
            }
        }
    );


    const [editData, setEditData] = React.useState<any>({
        projectName: projectDetails.projectName,
        projectNumber: projectDetails.projectNumber,
        location: projectDetails.location,
        developer: projectDetails.developer

    });

    React.useEffect(() => {
        if (projectDetails) {
            const datas: any = {
                title: projectDetails.projectName,
                projectNumber: projectDetails.projectNumber,
                location: projectDetails.location,
                developer: projectDetails.developer
            };
            setEditData(datas);
            setValue("title", datas.title);
            setValue("projectNumber", datas.projectNumber);
            setValue("location", datas.location);
            setValue("developer", datas.developer)
        }
    }, [projectDetails]);

    const navigateToHome = () => {
        navigate('/');
    };

    const navigateToProject = () => {
        setIsViewDialogOpen(false);
        navigate('/ViewProject');
    };

    const handleUpdate = handleSubmit(async (data) => {
        setLoading(true);

        const updatedData = {
            Title: editData.title,
            ProjectNumber: editData.projectNumber,
            Location: editData.location,
            Developer: editData.developer
        };

        const apiResponse = ProjectService();

        apiResponse.updateProject("Project_Informations", projectDetails.Id, updatedData)
            .then(() => {
                reset();
                setLoading(false);
                toast.success('Project Updated Successfully!');
                navigateToProject();
                fetchData();
                initialFetchData();
                setIsEdit(false);
            })
            .catch((error) => {
                setLoading(false);
                console.error('Error updating project details:', error);
                // toast.error('Failed to update project details. Please try again.');
            });
    });

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
                        <StyledBreadcrumb onClick={navigateToProject}>
                            Project
                        </StyledBreadcrumb>
                        <StyledBreadcrumb disabled>
                            {projectDetails.projectNumber}
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
                                            sx={{ fontWeight: 'bold', fontSize: '18px', textTransform: 'uppercase', borderBottom: 'none' }}
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
                                                    handleClick={() => { setIsEdit(true); navigate('/EditProject/' + projectDetails.Id) }}
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
                                        <TableCell component="th" scope="row">Project Number</TableCell>
                                        <TableCell>{projectDetails.projectNumber}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">Project Name</TableCell>
                                        {!isEdit ? (
                                            <TableCell>{projectDetails.projectName}</TableCell>
                                        ) : (
                                            <TableCell>
                                                <Controller
                                                    name="title"
                                                    control={control}
                                                    defaultValue=""
                                                    rules={{
                                                        required: 'Project Name is required',
                                                    }}
                                                    render={({ field }) => (
                                                        <TextField
                                                            {...field}
                                                            id="title"
                                                            margin="dense"
                                                            size="small"
                                                            value={editData.title}
                                                            onChange={async (e) => {
                                                                const input = e.target;
                                                                const value = input.value;
                                                                const start = input.selectionStart;
                                                                const end = input.selectionEnd;
                                                                field.onChange(value);
                                                                await trigger('title');
                                                                setEditData({ ...editData, title: value });
                                                                input.setSelectionRange(start, end);
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
                                        <TableCell component="th" scope="row">Location</TableCell>
                                        {!isEdit ? (
                                            <TableCell>{projectDetails.location}</TableCell>
                                        ) : (
                                            <TableCell>
                                                <Controller
                                                    name="location"
                                                    control={control}
                                                    defaultValue=""
                                                    rules={{
                                                        required: 'Location is required',                                                  
                                                    }}
                                                    render={({ field }) => (
                                                        <TextField
                                                            {...field}
                                                            id="location"
                                                            margin="dense"
                                                            size="small"
                                                            value={editData.location}
                                                            onChange={async (e) => {
                                                                const input = e.target;
                                                                const value = input.value;
                                                                const start = input.selectionStart;
                                                                const end = input.selectionEnd;
                                                                field.onChange(value);
                                                                await trigger("location");
                                                                setEditData({ ...editData, location: value });
                                                                input.setSelectionRange(start, end);
                                                            }}
                                                            error={!!errors.location}
                                                            helperText={errors.location && errors.location.message}
                                                        />
                                                    )}
                                                />
                                            </TableCell>
                                        )}
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">Developer</TableCell>
                                        {!isEdit ? (
                                            <TableCell>{projectDetails.developer}</TableCell>
                                        ) : (
                                            <TableCell>
                                                <Controller
                                                    name="developer"
                                                    control={control}
                                                    defaultValue=""
                                                    rules={{
                                                        required: 'Developer is required',
                                                    }}
                                                    render={({ field }) => (
                                                        <TextField
                                                            {...field}
                                                            id="developer"
                                                            margin="dense"
                                                            size="small"
                                                            value={editData.developer}
                                                            onChange={async (e) => {
                                                                const input = e.target;
                                                                const value = input.value;
                                                                const start = input.selectionStart;
                                                                const end = input.selectionEnd;
                                                                field.onChange(value);
                                                                await trigger('developer');
                                                                setEditData({ ...editData, developer: value });
                                                                input.setSelectionRange(start, end);
                                                            }}
                                                            error={!!errors.developer}
                                                            helperText={errors.developer && errors.developer.message}
                                                        />
                                                    )}
                                                />

                                            </TableCell>
                                        )}
                                    </TableRow>

                                    <TableRow>
                                        <TableCell component="th" scope="row">Assigned Client</TableCell>
                                        {!isEdit ? (
                                            (<TableCell>
                                                {projectDetails?.clientDetails?.length > 0 && (
                                                    projectDetails.clientDetails.map((data: any) => (
                                                        <div
                                                            onClick={() => navigate(`/ViewClient/${data.Id}`)}
                                                            style={{
                                                                textDecoration: "underline", color: "blue", cursor: "pointer",
                                                                listStyleType: "none"
                                                            }}
                                                        >
                                                            <span key={data.Id} style={{ margin: 'auto' }}>{data.Name}</span>
                                                        </div>
                                                    ))
                                                )}
                                            </TableCell>)
                                        ) : (
                                            <TableCell>
                                                {projectDetails?.clientDetails?.length > 0 && (
                                                    projectDetails.clientDetails.map((data: any) => (
                                                        <div
                                                            onClick={() => navigate(`/ViewClient/${data.Id}`)}
                                                            style={{
                                                                textDecoration: "underline", color: "blue", cursor: "pointer",
                                                                listStyleType: "none"
                                                            }}>
                                                            <span key={data.Id} style={{ margin: 'auto' }}>{data.Name}</span>
                                                        </div>
                                                    ))
                                                )}
                                            </TableCell>
                                        )}
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
                                                onClick={navigateToProject}
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
            {handleClientDialog && <AssignClient
                particularClientAllData={particularClientAllData}
                open={handleClientDialog}
                onClose={closeAssignClientDialog}
                props={props}
                fetchData={fetchData} />}
        </Box>
    );
};

export default ViewParticularProject;



