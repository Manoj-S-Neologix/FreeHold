import React, { useState } from 'react';
import { Breadcrumbs, Box, Stack, TextField } from '@mui/material';
import { Button as MuiButton } from "@mui/material";
import { emphasize, styled } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate, useParams } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Controller, useForm } from "react-hook-form";
import ProjectService from '../../Services/Business/ProjectService';
import toast from 'react-hot-toast';
import { IFreeholdChildProps } from '../IFreeholdChildProps';
import _ from 'lodash';
import SPService, { SPServiceType } from '../../Services/Core/SPService';

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

const EditProjectByID = (props: IFreeholdChildProps) => {
    const [loading, setLoading] = useState(false);
    const [projectDetails, setProjectDetails] = useState<any[]>([]);
    const { pId } = useParams();
    const [userRole, setUserRole] = useState('');
    const spServiceInstance: SPServiceType = SPService;

    const navigate = useNavigate();

    const getUserRoles = () => {
        const loggedInUserGroups: string[] = [];
        let userRoleVal: string = "staff";

        spServiceInstance.getLoggedInUserGroups().then((response: any) => {
            _.forEach(response, function (group: any) {
                loggedInUserGroups.push(group.Title);
            });

            if (_.indexOf(loggedInUserGroups, "DMS Superuser") > -1) {
                userRoleVal = "superuser";
            } else if (_.indexOf(loggedInUserGroups, "DMS Managers") > -1) {
                userRoleVal = "manager";
            } else if (_.indexOf(loggedInUserGroups, "DMS Staffs") > -1) {
                userRoleVal = "staff";
            }
            setUserRole(userRoleVal);
        });
    }

    React.useEffect(() => {
        getUserRoles();
    }, []);

    const fetchData = async () => {
        try {

            const projectService = ProjectService();

            if (userRole === "staff") {
                //const projectService = ProjectService();
                const select = '*,Author/Title,Author/EMail,AssignClient/Title,AssignClient/ClientLibraryGUID,AssignClient/Id,Editor/Id,Editor/Title,Editor/EMail';
                const expand = 'Author,AssignClient,Editor';
                const orderBy = 'Modified';
                const filter = `IsActive eq 'Yes' and Id eq '${pId}'`;

                const [projectResults] = await Promise.all([
                    //projectService.getProjectExpand('Project_Informations', select, filter, expand, orderBy)
                    projectService.getfilteredProjectExpand('Project_Informations', select, filter, expand, orderBy, props.spContext.pageContext.user.email),
                ]);

                if (projectResults && projectResults.TableData && projectResults.TableData.length > 0) {
                    setProjectDetails(projectResults.TableData);

                    const datas: any = {
                        title: projectResults.TableData[0]?.projectName,
                        projectNumber: projectResults.TableData[0]?.projectNumber,
                        location: projectResults.TableData[0]?.location,
                        developer: projectResults.TableData[0]?.developer
                    };
                    setEditData(datas);
                    setValue("title", datas.title);
                    setValue("projectNumber", datas.projectNumber);
                    setValue("location", datas.location);
                    setValue("developer", datas.developer)

                } else {
                    setProjectDetails([]);
                }
            } else {

                const select = '*,Author/Title,Author/EMail,AssignClient/Title,AssignClient/ClientLibraryGUID,AssignClient/Id,Editor/Id,Editor/Title,Editor/EMail';
                const expand = 'Author,AssignClient,Editor';
                const orderBy = 'Modified';
                const filter = `IsActive eq 'Yes' and Id eq '${pId}'`;

                const [projectResults] = await Promise.all([
                    projectService.getProjectExpand('Project_Informations', select, filter, expand, orderBy)
                ]);

                if (projectResults && projectResults.TableData && projectResults.TableData.length > 0) {
                    setProjectDetails(projectResults.TableData);

                    const datas: any = {
                        title: projectResults.TableData[0]?.projectName,
                        projectNumber: projectResults.TableData[0]?.projectNumber,
                        location: projectResults.TableData[0]?.location,
                        developer: projectResults.TableData[0]?.developer
                    };
                    setEditData(datas);
                    setValue("title", datas.title);
                    setValue("projectNumber", datas.projectNumber);
                    setValue("location", datas.location);
                    setValue("developer", datas.developer)

                } else {
                    setProjectDetails([]);
                }

            }

        } catch (error) {
            console.error('Error fetching project data:', error);
        }
    };

    const { control, setValue, handleSubmit, reset, formState: { errors }, trigger } = useForm(
        {
            defaultValues: {
                title: projectDetails[0]?.projectName,
                projectNumber: projectDetails[0]?.projectNumber,
                location: projectDetails[0]?.location,
                developer: projectDetails[0]?.developer
            }
        }
    );

    const [editData, setEditData] = React.useState<any>({
        projectName: "",
        projectNumber: "",
        location: "",
        developer: ""
    });

    React.useEffect(() => {
        fetchData();
    }, [userRole]);

    const navigateToHome = () => {
        navigate('/');
    };

    const navigateToProject = () => {
        navigate(-1);
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

        apiResponse.updateProject("Project_Informations", projectDetails[0].Id, updatedData)
            .then(() => {
                reset();
                setLoading(false);
                toast.success('Project Updated Successfully!');
                navigateToProject();
                fetchData();
            })
            .catch((error) => {
                setLoading(false);
                toast.error('Failed to update project details. Please try again.');
            });
    });

    return (
        <Box sx={{ width: '100', padding: '20px', marginTop: "10px" }}>
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
                            {projectDetails[0]?.projectNumber}
                        </StyledBreadcrumb>
                    </Breadcrumbs>
                </Box>
                <Box sx={{ marginTop: "10px !important" }}>
                    <form onSubmit={handleUpdate}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="client-details-table">
                                <TableHead sx={{ display: 'table-caption' }}>
                                    <TableRow>

                                        <TableCell
                                            sx={{ fontWeight: 'bold', fontSize: '18px', textTransform: 'uppercase', borderBottom: 'none' }}
                                            component="th"
                                            scope="row"
                                        >Project Details</TableCell>


                                        <Box sx={{
                                            display: "flex",
                                            position: "absolute",
                                            justifyContent: "flex-end",
                                            alignItems: "center",
                                            float: "right",
                                            marginTop: "10px",
                                            marginRight: "10px",
                                            right: "20px"

                                        }}>
                                            <MuiButton type="submit"
                                                variant="contained"
                                                color="secondary"

                                                onClick={() => {
                                                    handleUpdate();
                                                }}
                                                disabled={loading}
                                            >
                                                {loading ? 'Updating...' : 'Update'}
                                            </MuiButton>
                                            <MuiButton sx={{ marginLeft: "10px" }} variant="contained" color="secondary"
                                                onClick={navigateToProject}
                                            >
                                                Cancel
                                            </MuiButton>
                                        </Box>
                                    </TableRow>
                                </TableHead>
                                <TableBody>

                                    <TableRow>
                                        <TableCell component="th" scope="row">Project Number</TableCell>
                                        <TableCell>{projectDetails[0]?.projectNumber}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">Project Name</TableCell>

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

                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">Location</TableCell>

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

                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">Developer</TableCell>

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

                                    </TableRow>

                                    <TableRow>
                                        <TableCell component="th" scope="row">Assigned Client</TableCell>

                                        <TableCell>
                                            {projectDetails[0]?.clientDetails?.length > 0 && (
                                                projectDetails[0].clientDetails
                                                    .sort((a: any, b: any) => a.Title.localeCompare(b.Title))
                                                    .map((data: any) => (
                                                        <div
                                                            onClick={() => navigate(`/ViewClient/${data.Id}`)}
                                                            style={{
                                                                textDecoration: "underline", color: "blue", cursor: "pointer",
                                                                listStyleType: "none"
                                                            }}>
                                                            <span key={data.Id} style={{ margin: 'auto' }}>{data.Title}</span>
                                                        </div>
                                                    ))
                                            )}
                                        </TableCell>

                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">Modified Date</TableCell>
                                        <TableCell>{projectDetails[0]?.modifiedDate}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">Modified By</TableCell>
                                        <TableCell>{projectDetails[0]?.modifiedBy}</TableCell>
                                    </TableRow>
                                </TableBody>

                            </Table>
                        </TableContainer>
                    </form>
                </Box>

            </Stack>
        </Box>
    );
};

export default EditProjectByID;



