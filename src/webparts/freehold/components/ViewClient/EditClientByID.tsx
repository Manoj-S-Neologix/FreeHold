import React, { useState } from 'react';
import { Breadcrumbs, Box, Stack, TextField } from '@mui/material';
import { Button as MuiButton } from "@mui/material";
import { emphasize, styled } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import AddStaffDialog from '../AddStaff/AddStaff';
import { useNavigate, useParams } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Button from "../../../../Common/Button/CustomButton";
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
import UploadDocument from '../UploadDocuments/UploadDocuments';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
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

const EditClientByID = (props: IFreeholdChildProps) => {

    const [handleStaffDialog, setHandleStaffDialog] = useState(false);
    const [selectedPersons, setSelectedPersons] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
    const [clientDetails, setClientDetails] = useState<any[]>([]);
    const { cId } = useParams();

    const fetchData = async () => {
        try {

            const clientService = ClientService();
            const select = '*,AssignedStaff/Title,AssignedStaff/Id,AssignedStaff/EMail,Author/Title,Author/EMail,ProjectId/Id,ProjectId/Title, Editor/Id,Editor/Title,Editor/EMail';
            const expand = 'AssignedStaff,Author,ProjectId,Editor';
            // const orderBy = 'Modified';
            const filter = `Id eq '${cId}'`;
            const orderBy = "Modified";
            // const filtered = "";
            const results = await clientService.getClientbyID('Client_Informations', select, expand, filter, orderBy, cId);

            // Handle project results
            if (results && results?.updatedResults && results?.updatedResults.length > 0) {
                setClientDetails(results.updatedResults);

                const datas: any = {
                    title: results.updatedResults[0]?.name,
                    email: results.updatedResults[0]?.email,
                    contact: results.updatedResults[0]?.contact,
                    assignedStaff: results.updatedResults[0]?.assignedStaff
                };
                setEditData(datas);
                setValue("title", datas.title);
                setValue("email", datas.email);
                setValue("contact", datas.contact);

                const assignedStaffEmails = results.updatedResults[0]?.assignedStaff.map((assignStaff: any) => assignStaff.Email);
                setSelectedPersons(assignedStaffEmails);
            } else {
                setClientDetails([]);
            }

        } catch (error) {
            console.error('Error fetching project data:', error);
        }
    };

    React.useEffect(() => {
        setLoading(false);
        fetchData();
    }, []);

    const { control, handleSubmit, reset, formState: { errors }, trigger, setValue } = useForm(
        {
            defaultValues: {
                title: clientDetails[0]?.name,
                email: clientDetails[0]?.email,
                contact: clientDetails[0]?.contact,
                assignedStaff: clientDetails[0]?.assignedStaff
            }
        }
    );

    const [editData, setEditData] = React.useState<any>({
        title: "",
        email: "",
        contact: "",
        assignedStaff: ""
    });

    const navigate = useNavigate();

    const closeUploadDialog = () => {
        setUploadDialogOpen(false);
    };

    const handleUpdate = handleSubmit(async (data) => {
        setLoading(true);
        const apiResponse = ClientService();

        const updatedData = {
            //Title: editData.title,
            ClientEmail: editData.email,
            ClientContact: editData.contact,
            AssignedStaff: editData.assignedStaff
        };

        apiResponse.updateClient("Client_Informations", clientDetails[0]?.Id, updatedData)
            .then(() => {
                setLoading(false);
                toast.success('Client Updated Successfully!');

                navigateToClient();
                fetchData();
                reset();
            })
            .catch((error) => {
                setLoading(false);
                //console.error('Error updating client details:', error);
                toast.error('Failed to update client details. Please try again.');
            });

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
        navigate(-1);
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
                    <form onSubmit={handleUpdate}>
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

                                            <>
                                                <MuiButton
                                                    type="submit"
                                                    variant="contained"
                                                    color="secondary"
                                                    onClick={() => {
                                                        handleUpdate();
                                                    }}
                                                    disabled={loading}
                                                >
                                                    {loading ? 'Updating...' : 'Update'}
                                                </MuiButton>
                                                <MuiButton
                                                    // sx={{ marginLeft: "20px" }}
                                                    variant="contained"
                                                    color="secondary"
                                                    onClick={navigateToClient}
                                                >
                                                    Cancel
                                                </MuiButton>
                                            </>
                                        </Box>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell component="th" scope="row">Email</TableCell>

                                        <TableCell>

                                            <Controller
                                                name="email"
                                                control={control}
                                                defaultValue=""
                                                rules={{
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
                                                        onChange={async (e) => {
                                                            const input = e.target;
                                                            const value = input.value;
                                                            const start = input.selectionStart;
                                                            const end = input.selectionEnd;
                                                            field.onChange(value);
                                                            await trigger("email");
                                                            setEditData({ ...editData, email: value });
                                                            input.setSelectionRange(start, end);
                                                        }}
                                                        error={!!errors.email}
                                                        helperText={errors.email && errors.email.message}
                                                    />
                                                )}
                                            />
                                        </TableCell>

                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">Contact Number</TableCell>

                                        <TableCell>

                                            <Controller
                                                name="contact"
                                                control={control}
                                                defaultValue=""
                                                rules={{
                                                    // required: 'Client Contact is required',
                                                    pattern: {
                                                        value: /^[0-9+-.]{0,15}$/,
                                                        message: 'Invalid contact number'
                                                    }
                                                }}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        id="clientContact"
                                                        margin="dense"
                                                        size="small"
                                                        value={editData.contact}
                                                        onChange={async (e: any) => {
                                                            const input = e.target;
                                                            const value = input.value.replace(/[^\d+-.]/g, '');
                                                            const start = input.selectionStart;
                                                            const end = input.selectionEnd;
                                                            await field.onChange(value);
                                                            setEditData({ ...editData, contact: value });
                                                            input.setSelectionRange(start, end);
                                                        }}
                                                        error={!!errors.contact}
                                                        helperText={errors.contact && errors.contact.message}
                                                    />
                                                )}
                                            />

                                        </TableCell>

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

                                            {clientDetails[0]?.projectDetails?.length > 0 && (
                                                clientDetails[0]?.projectDetails
                                                .slice() 
                                                .sort((a:any, b:any) => a.Name.localeCompare(b.Name))
                                                .map((data: any) => (
                                                    <div
                                                        onClick={() => navigate(`/ViewProject/${data.Id}`)}
                                                        style={{
                                                            textDecoration: "underline", color: "blue", cursor: "pointer",
                                                            listStyleType: "none"
                                                        }}>
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
                                            {clientDetails[0]?.assignedStaff
                                            ?.sort((a: any, b: any) => a.Name.localeCompare(b.Name))
                                            .map((staff: any, index: number) => (
                                                <li
                                                    className="default-cursor"
                                                    style={{ textDecoration: "none" }}
                                                    key={index}
                                                >
                                                    <span>{staff.Name}</span>
                                                </li>
                                            ))}

                                            <li
                                                className="default-cursor"
                                                style={{ textDecoration: "none", display: "flex", alignItems: "center" }}
                                                key="add-icon"
                                            >
                                                <div
                                                    onClick={() => { setHandleStaffDialog(true); }}
                                                    style={{ cursor: 'pointer', alignItems: 'center', flexDirection: 'column', }}
                                                >
                                                    <AddCircleOutlineIcon fontSize='medium' style={{ color: '#125895;' }} />
                                                </div>
                                            </li>
                                        </TableCell>

                                    </TableRow>

                                </TableBody>

                            </Table>
                        </TableContainer>
                    </form>
                </Box>

            </Stack>

            {handleStaffDialog && <AddStaffDialog
                particularClientAllData={clientDetails}
                exsistingPersons={selectedPersons}
                props={props}
                open={handleStaffDialog} onClose={closeAddStaffDialog}
                fetchData={fetchData} spContext={props.spContext} />}

            {uploadDialogOpen && <UploadDocument
                open={uploadDialogOpen}
                onClose={closeUploadDialog}
                particularClientAllData={clientDetails}
                fetchDatas={fetchData}
            />}

        </Box>
    );
};

export default EditClientByID;

