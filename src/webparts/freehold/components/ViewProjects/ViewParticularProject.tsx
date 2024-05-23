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
    // const [isEdit, setIsEdit] = useState(false);
    const [handleClientDialog, setHandleClientDialog] = useState(false);
    const [loading, setLoading] = useState(false);
    // const [selectedPersons, setSelectedPersons] = useState<any[]>([]);



    const navigate = useNavigate();

    const closeAssignClientDialog = () => {
        setHandleClientDialog(false);
    };

    const { control, setValue, handleSubmit, reset, formState: { errors }, trigger } = useForm(
        {
            // setValue('projectName', projectDetails.projectName);
            // setValue('projectNumber', projectDetails.projectNumber);
            // setValue('location', projectDetails.location);
            // setValue('developer', projectDetails.developer);

            defaultValues: {
                title: projectDetails.projectName,
                projectNumber: projectDetails.projectNumber,
                location: projectDetails.location,
                developer: projectDetails.developer
                // contact: clientDetails.contact,
                // assignedStaff: clientDetails.assignedStaff
            }

        }
    );


    const [editData, setEditData] = React.useState<any>({
        projectName: projectDetails.projectName,
        projectNumber: projectDetails.projectNumber,
        location: projectDetails.location,
        developer: projectDetails.developer

    });

    // const projectDetailsId: any[] = [];
    // projectDetails?.map((data: any) => {
    //     return projectDetailsId.push(data.Id);
    // });

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


    console.log(projectDetails, "projectDetails");

    const navigateToHome = () => {
        navigate('/');
    };

    const navigateToProject = () => {
        navigate('/ViewProjects');
        setIsViewDialogOpen(false);
    };

    // const handleUpdate = handleSubmit(async (data) => {
    //     console.log(editData,"data")
    //     try {
    //         setLoading(true);
    //         const apiResponse = ProjectService();
    //         const updatedData = {
    //             Title: editData.projectName,
    //             projectName: editData.projectName,
    //             ProjectNumber: editData.projectNumber,
    //             Location: editData.location,
    //             Developer:editData.developer
    //             // AssignedStaff: editData.assignedStaff
    //         };


    //         const response = await apiResponse.updateProject("Project_Informations", projectDetails.Id, updatedData);

    //         console.log('Update Client Response:', response);

    //         reset();
    //         // navigateToClient();
    //         setLoading(false);
    //         toast.success('Client Updated Successfully!');
    //         fetchData();
    //         initialFetchData();
    //         setIsEdit(false);
    //     } catch (error) {
    //         setLoading(false);
    //         console.error('Error updating client details:', error);
    //         toast.error('Failed to update client details. Please try again.');
    //     }
    // });



    // const handleUpdate = handleSubmit(async (data) => {
    //     // console.log('Starting update process...');
    //     setLoading(true);
    //     const apiResponse = ProjectService();
    //     const updatedData = {
    //         Title: editData.title,
    //         // projectName: editData.projectName,
    //         ProjectNumber: editData.projectNumber,
    //         Location: editData.location,
    //         Developer: editData.developer
    //     };

    //     apiResponse.updateProject("Project_Informations", projectDetails.Id, updatedData)
    //         .then(() => {
    //         console.log(updatedData,"updatedData")
    //             reset();
    //             setLoading(false);
    //             toast.success('Project Updated Successfully!');
    //             fetchData();
    //             initialFetchData();
    //             setIsEdit(false);
    //         })
    //         .catch((error) => {
    //             setLoading(false);
    //             console.error('Error updating project details:', error);
    //             toast.error('Failed to update project details. Please try again.');
    //         });
    // });

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





    // const { control, handleSubmit, reset, formState: { errors }, trigger } = useForm(
    //     {
    //         defaultValues: {
    //             title: projectDetails.projectName,
    //             projectNumber: projectDetails.ProjectNumber,
    //             location: projectDetails.location,
    //             developer: projectDetails.developer
    //         }
    //     }
    // );



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
                        {/* <form> */}
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
                                    {/* <TableRow>
                                        <TableCell component="th" scope="row">Project Number</TableCell>
                                        {!isEdit ? (
                                            <TableCell>{projectDetails.projectNumber}</TableCell>
                                        ) : (
                                            <TableCell>
                                                <Controller
                                                    name="projectNumber"
                                                    control={control}
                                                    defaultValue=""
                                                    rules={{
                                                        required: 'Project Number is required',
                                                        pattern: {
                                                            value: /^[a-zA-Z0-9+-.]+$/,
                                                            message: 'Invalid project number'
                                                        }
                                                    }}
                                                    render={({ field }) => (
                                                        <TextField
                                                            {...field}
                                                            id="projectNumber"
                                                            margin="dense"
                                                            size="small"
                                                            // fullWidth
                                                            value={editData.projectNumber}
                                                            onChange={async (e) => {
                                                                const input = e.target;
                                                                const value = e.target.value.replace(/[^a-zA-Z0-9+-.]/g, '');
                                                                const start = input.selectionStart;
                                                                const end = input.selectionEnd;
                                                                field.onChange(value);
                                                                await trigger('projectNumber');
                                                                setEditData({ ...editData, projectNumber: value });
                                                                input.setSelectionRange(start, end);
                                                            }}
                                                            error={!!errors.projectNumber}
                                                            helperText={errors.projectNumber && errors.projectNumber.message}
                                                        />
                                                    )}
                                                />

                                            </TableCell>
                                        )}
                                    </TableRow> */}
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
                                                        //    pattern: {
                                                        //     value: /^[a-zA-Z\s]+$/,
                                                        //        message: 'Invalid project name'
                                                        //    }
                                                    }}
                                                    render={({ field }) => (
                                                        <TextField
                                                            {...field}
                                                            id="title"
                                                            margin="dense"
                                                            size="small"
                                                            // fullWidth
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
                                                        required: 'Project Number is required',
                                                        // pattern: {
                                                        //     value: /^[a-zA-Z\s-]+$/,
                                                        //     message: 'Invalid project number'
                                                        // }
                                                    }}
                                                    render={({ field }) => (
                                                        <TextField
                                                            {...field}
                                                            id="location"
                                                            margin="dense"
                                                            size="small"
                                                            // fullWidth
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
                                                        // pattern: {
                                                        //     value: /^[a-zA-Z\s-]+$/,
                                                        //     message: 'Invalid Developer'
                                                        // }
                                                    }}
                                                    render={({ field }) => (
                                                        <TextField
                                                            {...field}
                                                            id="developer"
                                                            margin="dense"
                                                            size="small"
                                                            // fullWidth
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
                                        <TableCell component="th" scope="row">Assign Client</TableCell>
                                        {!isEdit ? (<TableCell>{projectDetails.assignClient}</TableCell>) : (<TableCell
                                            sx={{ textDecoration: "underline", color: "blue", cursor: "pointer" }}
                                        // onClick={(id:any) => {
                                        //     // setHandleClientDialog(true);
                                        //     // setIsViewDialogOpen(true)
                                        //     navigate("/ViewClient/" + id)
                                        // }}
                                        >
                                            {projectDetails.assignClient ?
                                                projectDetails.assignClient :
                                                "Assign Client"
                                            }
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
                                    {/* {isEdit && <TableRow>
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
                                </TableRow>} */}
                                    {isEdit && <TableRow>
                                        <TableCell component="th" scope="row">

                                            <MuiButton type="submit"
                                                variant="contained"
                                                color="primary"

                                                onClick={() => {
                                                    // console.log("data")
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
                // exsistingPersons={selectedPersons}
                open={handleClientDialog}
                onClose={closeAssignClientDialog}
                props={props}
                fetchData={fetchData} />}
        </Box>
    );
};

export default ViewParticularProject;



