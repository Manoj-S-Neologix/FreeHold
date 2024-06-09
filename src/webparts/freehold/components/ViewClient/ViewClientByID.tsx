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
import ClientService from '../../Services/Business/ClientService';
import { IFreeholdChildProps } from '../IFreeholdChildProps';
import UploadDocument from '../UploadDocuments/UploadDocuments';

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

const ViewClientByID = (props: IFreeholdChildProps) => {

    const [, setLoading] = useState(false);
    const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
    const [clientDetails, setClientDetails] = useState<any[]>([]);
    const { cId } = useParams();

    const fetchData = async () => {
        try {
            const clientService = ClientService();
            const select = '*,AssignedStaff/Title,AssignedStaff/Id,Author/Title,Author/EMail,ProjectId/Id,ProjectId/Title, Editor/Id,Editor/Title,Editor/EMail';
            const expand = 'AssignedStaff,Author,ProjectId,Editor';
            const filter = `Id eq '${cId}'`;
            const orderBy = "Modified";
            const results = await clientService.getClientbyID('Client_Informations', select, expand, filter, orderBy, cId);
            if (results && results?.updatedResults && results?.updatedResults.length > 0) {
                setClientDetails(results.updatedResults);
            } else {
                setClientDetails([]);
            }

        } catch (error) {
            console.error('Error fetching project data:', error);
        }
    };

    const closeUploadDialog = () => {
        setUploadDialogOpen(false);
    };

    React.useEffect(() => {
        setLoading(false);
        fetchData();
    }, []);

    const navigate = useNavigate();

    const navigateToHome = () => {
        navigate('/');
    };

    const navigateToClient = () => {
        navigate("/ViewClients");
    };

    return (
        <Box sx={{ width: '100', padding: '20px', marginTop: "10px" }}>
            <Stack direction='column'  >
                <Box sx={{ position: 'relative', bottom: '40px', marginTop: "40px" }}>
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
                            {clientDetails[0]?.name}
                        </StyledBreadcrumb>
                    </Breadcrumbs>
                </Box>
                <Box>

                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="client-details-table">
                            <TableHead>
                                <TableRow>
                                    <TableCell
                                        sx={{ fontWeight: 'bold', fontSize: '18px', textTransform: 'uppercase', borderBottom: 'none' }}
                                        component="th"
                                        scope="row"
                                        colSpan={1}>Client Details</TableCell>

                                    <Box sx={{
                                        display: "flex",
                                        justifyContent: "flex-end",
                                        alignItems: "center",
                                        float: "right",
                                        gap: "10px",
                                        marginTop: "10px",
                                        marginRight: "10px"
                                    }}>
                                        <Button
                                            color="secondary"
                                            message="Manage Documents"
                                            handleClick={() => {
                                                setUploadDialogOpen(true);
                                            }}

                                        />

                                        <Button
                                            handleClick={() => {
                                                navigate('/EditClient/' + clientDetails[0]?.Id)
                                            }}
                                            color="secondary"
                                            Icon={<EditIcon />}
                                            message="Edit"
                                        />

                                    </Box>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell component="th" scope="row">Email</TableCell>
                                    <TableCell>{clientDetails[0]?.email}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">Contact Number</TableCell>
                                    <TableCell>{clientDetails[0]?.contact}</TableCell>

                                </TableRow>

                                <TableRow>
                                    <TableCell component="th" scope="row">Name</TableCell>
                                    <TableCell>{clientDetails[0]?.name}</TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell component="th" scope="row">Modified Date</TableCell>
                                    <TableCell>{clientDetails[0]?.modifiedDate}</TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell component="th" scope="row">Modified By</TableCell>
                                    <TableCell>{clientDetails[0]?.modifiedBy}</TableCell>
                                </TableRow>


                                <TableRow>
                                    <TableCell component="th" scope="row">Assigned Project</TableCell>
                                    <TableCell>
                                        {clientDetails[0]?.projectDetails.length > 0 && (
                                            clientDetails[0]?.projectDetails
                                            .slice() 
                                            .sort((a:any, b:any) => a.Name.localeCompare(b.Name))
                                            .map((data: any) => (
                                                <div
                                                    onClick={() => navigate(`/ViewProject/${data.Id}`)}
                                                    style={{
                                                        textDecoration: "underline", color: "blue", cursor: "pointer",
                                                        listStyleType: "none"
                                                    }}
                                                >
                                                    <span key={data.Id} style={{ margin: 'auto' }}>{data.Name}</span>
                                                </div>
                                            ))
                                        )}
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        Assigned Staff
                                    </TableCell>

                                    <TableCell className="default-cursor">
                                        <ul className="default-cursor" style={{
                                            textDecoration: "none",
                                            listStyleType: "none",
                                            padding: 0
                                        }}>
                                            {clientDetails[0]?.assignedStaff
                                            ?.sort((a: any, b: any) => a.Name.localeCompare(b.Name))
                                            .map((staff: any, index: number) => (
                                                <li className="default-cursor" style={{ textDecoration: "none" }}
                                                    key={index}>
                                                    <span>{staff.Name}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </TableCell>
                                </TableRow>

                            </TableBody>

                        </Table>
                    </TableContainer>

                </Box>

            </Stack>

            {uploadDialogOpen && <UploadDocument
                open={uploadDialogOpen}
                onClose={closeUploadDialog}
                particularClientAllData={clientDetails}
                fetchDatas={fetchData}
            />}

        </Box>
    );
};

export default ViewClientByID;

