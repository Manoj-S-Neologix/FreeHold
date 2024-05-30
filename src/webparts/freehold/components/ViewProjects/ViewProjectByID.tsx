import React, { useState } from 'react';
import { Breadcrumbs, Box, Stack } from '@mui/material';
import { Button as MuiButton } from "@mui/material";
import { emphasize, styled } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate, useParams } from 'react-router-dom';
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
//import AssignClient from "../AssignClient/AssignClient";
import { useForm } from "react-hook-form";
import ProjectService from '../../Services/Business/ProjectService';
//import toast from 'react-hot-toast';
import { IFreeholdChildProps } from '../IFreeholdChildProps';

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

const ViewProjectByID = (props: IFreeholdChildProps) => {

    //const [handleClientDialog, setHandleClientDialog] = useState(false);
    const [projectDetails, setProjectDetails] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const { pId } = useParams();

    const navigate = useNavigate();

    const { formState: { } } = useForm(
        {
        }
    );

    const fetchData = async () => {
        try {

            const projectService = ProjectService();
            const select = '*,Author/Title,Author/EMail,AssignClient/Title,AssignClient/ClientLibraryGUID,AssignClient/Id,Editor/Id,Editor/Title,Editor/EMail';
            const expand = 'Author,AssignClient,Editor';
            const orderBy = 'Modified';
            const filter = `Id eq '${pId}'`;

            const [projectResults] = await Promise.all([
                projectService.getProjectExpand('Project_Informations', select, filter, expand, orderBy)
            ]);

            // Handle project results
            if (projectResults && projectResults.updatedResults && projectResults.updatedResults.length > 0) {
                setProjectDetails(projectResults.TableData);
            } else {
                setProjectDetails([]);
            }


        } catch (error) {
            //setIsLoading(false);
            console.error('Error fetching project data:', error);
        }
    };

    React.useEffect(() => {

        setLoading(false);
        fetchData();
    }, []);


    console.log(projectDetails, "projectDetails", loading);

    const navigateToHome = () => {
        navigate('/');
    };

    const navigateToProject = () => {
        navigate('/ViewProject');
    };

    return (
        <Box sx={{ width: '100', padding: '20px', marginTop: "10px" }}>
            <Stack direction='column' sx={{ gap: "30px" }} >
                <Box>
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
                            {projectDetails[0]?.projectName}
                        </StyledBreadcrumb>
                    </Breadcrumbs>
                </Box>
                <Box sx={{ marginTop: "10px !important" }}>
                    <form>
                        {/* <form> */}
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

                                            {/* <MuiButton variant="contained" color="secondary"
                                                onClick={navigateToProject} sx={{right:'10px'}}
                                            >
                                                Back
                                            </MuiButton> */}

                                            <Button
                                                handleClick={() => { navigate('/EditProject/' + projectDetails[0]?.Id) }}
                                                color="secondary"
                                                Icon={<EditIcon />}
                                                message="Edit"
                                            />



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

                                        <TableCell>{projectDetails[0]?.projectName}</TableCell>

                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">Location</TableCell>

                                        <TableCell>{projectDetails[0]?.location}</TableCell>

                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">Developer</TableCell>

                                        <TableCell>{projectDetails[0]?.developer}</TableCell>

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
                                        <TableCell>{(projectDetails.length > 0) ? projectDetails[0].modifiedDate : ""}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">Modified By</TableCell>
                                        <TableCell>{(projectDetails.length > 0) ? projectDetails[0].modifiedBy : ""}</TableCell>
                                    </TableRow>

                                    {/* <TableRow>
                                        <TableCell component="th" scope="row">
                                            <MuiButton variant="contained" color="secondary"
                                                onClick={navigateToProject}
                                            >
                                                Cancel
                                            </MuiButton>
                                        </TableCell>
                                    </TableRow> */}


                                </TableBody>

                            </Table>
                        </TableContainer>
                    </form>
                </Box>

            </Stack>

        </Box>
    );
};

export default ViewProjectByID;



