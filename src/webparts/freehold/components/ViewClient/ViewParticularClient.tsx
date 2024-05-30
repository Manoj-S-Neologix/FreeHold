import React, { useEffect, useState } from 'react';
import { Breadcrumbs, Box, Stack, TextField } from '@mui/material';
import { Button as MuiButton } from "@mui/material";
import { emphasize, styled } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import AddStaffDialog from '../AddStaff/AddStaff';
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
import ClientService from '../../Services/Business/ClientService';
import { Controller, useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import UploadDocument from '../UploadDocuments/UploadDocuments';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

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

const ViewParticularClient = ({ props, spContext: WebPartContext, clientDetails, setClientDetails, setIsViewDialogOpen, isOpen, setIsOpen, isEdit, setIsEdit, handleCancel, particularClientAllData, fetchData, initialFetchData, particularClientProjects }: any) => {

    const [handleStaffDialog, setHandleStaffDialog] = useState(false);
    const [selectedPersons, setSelectedPersons] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [uploadDialogOpen, setUploadDialogOpen] = useState(false);

    console.log(selectedPersons, particularClientAllData, "ViewParticularClient");

    useEffect(() => {
        const assignedStaffEmails = particularClientAllData?.flatMap((item: any) =>
            item.assignedStaff.map((assignStaff: any) => assignStaff.Email)
        );
        setSelectedPersons(assignedStaffEmails);

    }, []);

    const { control, handleSubmit, reset, formState: { errors }, trigger, setValue } = useForm(
        {
            defaultValues: {
                title: clientDetails.name,
                email: clientDetails.email,
                contact: clientDetails.contact,
                assignedStaff: clientDetails.assignedStaff
            }
        }
    );

    const [editData, setEditData] = React.useState<any>({
        title: clientDetails.name,
        email: clientDetails.email,
        contact: clientDetails.contact,
        assignedStaff: clientDetails.assignedStaff
    });

    const clientDetailsId: any[] = [];
    clientDetails?.assignedStaff?.map((data: any) => {
        return clientDetailsId.push(data.Id);
    });
    React.useEffect(() => {
        if (clientDetails) {
            const datas: any = {
                title: clientDetails.name,
                email: clientDetails.email,
                contact: clientDetails.contact,
                assignedStaff: clientDetails.assignedStaff
            };
            setEditData(datas);
            setValue("title", datas.title);
            setValue("email", datas.email);
            setValue("contact", datas.contact);
        }
    }, [clientDetails]);

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

        apiResponse.updateClient("Client_Informations", clientDetails.Id, updatedData)
            .then(() => {
                setLoading(false);
                toast.success('Client Updated Successfully!');
                // navigateToClient();
                // setIsEdit(false);
                // isEdit(false);
                navigateToClient();
                // navigate(`/ViewClient/${clientDetails.Id}`);
                // navigate('/ViewClient'); 
                fetchData();
                initialFetchData();
                setIsEdit(false);
                reset();
                // debugger
                // setIsOpen(false);

            })
            .catch((error) => {
                setLoading(false);
                console.error('Error updating client details:', error);
                // toast.error('Failed to update client details. Please try again.');
            });

        /* apiResponse.updateLibraryName(clientDetails.GUID, data.title)

            .then(() => {
                // Update library name (assuming data.title is the new library name)
                return apiResponse.updateClient("Client_Informations", clientDetails.Id, updatedData);
            })
            .then(() => {
                setLoading(false);
                toast.success('Client Updated Successfully!');
                // navigateToClient();
                navigateToClient();
                fetchData();
                initialFetchData();
                setIsEdit(false);
                reset();
                // debugger
                // setIsOpen(false);

            })
            .catch((error) => {
                setLoading(false);
                console.error('Error updating client details:', error);
                // toast.error('Failed to update client details. Please try again.');
            }); */
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
        setIsViewDialogOpen(false);
        // setIsEdit(false);
        navigate('/ViewClient');
        ////navigate(-1);
        // setIsOpen(false);
        // fetchData();
    };

    return (
        <Box>
            <Stack direction='column'  >
                <Box sx={{ position: 'relative', bottom: '40px' }}>
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

                                            {/* {!isEdit && (
                                                <Button
                                                    handleClick={() => {
                                                        setIsEdit(true);

                                                    }}
                                                    color="secondary"
                                                    Icon={<EditIcon />}
                                                    message="Edit"
                                                />
                                                
                                                
                                            )} */}
                                            {!isEdit ? (
                                                <Button
                                                    handleClick={() => {
                                                        setIsEdit(true);
                                                    }}
                                                    color="secondary"
                                                    Icon={<EditIcon />}
                                                    message="Edit"
                                                />
                                            ) : (
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
                                            )}


                                        </Box>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell component="th" scope="row">Email</TableCell>
                                        {!isEdit ? (
                                            <TableCell>{clientDetails.email}</TableCell>
                                        ) : (
                                            <TableCell>

                                                <Controller
                                                    name="email"
                                                    control={control}
                                                    defaultValue=""
                                                    rules={{
                                                        // required: "Email Id is required.",
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
                                        )}
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">Contact Number</TableCell>
                                        {!isEdit ? (
                                            <TableCell>{clientDetails.contact}</TableCell>
                                        ) : (
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
                                                            // fullWidth
                                                            value={editData.contact}
                                                            onChange={async (e: any) => {
                                                                // const value = e.target.value.replace(/[^\d+-.]/g, '');
                                                                // field.onChange(value);
                                                                // await trigger("contact");
                                                                // setEditData({ ...editData, contact: value });
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
                                        )}
                                    </TableRow>

                                    {/* <TableRow>

                                        <TableCell component="th" scope="row">Name</TableCell>
                                        <TableCell>
                                            {!isEdit ? (
                                                clientDetails.name
                                            ) : (
                                                <Controller
                                                    name="title"
                                                    control={control}
                                                    defaultValue=""
                                                    rules={{ required: 'Name is required' }}
                                                    render={({ field }) => (
                                                        <TextField
                                                            {...field}
                                                            // fullWidth
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
                                            )}
                                        </TableCell>

                                    </TableRow> */}

                                    <TableRow>
                                        <TableCell component="th" scope="row">Name</TableCell>
                                        <TableCell>{clientDetails.name}</TableCell>
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
                                        <TableCell component="th" scope="row">Assigned Project</TableCell>

                                        {!isEdit ? (
                                            (<TableCell>

                                                {particularClientProjects?.length > 0 && (
                                                    particularClientProjects.map((data: any) => (
                                                        <div
                                                            onClick={() => navigate(`/ViewProject/${data.Id}`)}
                                                            style={{
                                                                textDecoration: "underline", color: "blue", cursor: "pointer",
                                                                listStyleType: "none"
                                                            }}
                                                        >
                                                            <span key={data.Id} style={{ margin: 'auto' }}>{data.Title}</span>
                                                        </div>
                                                    ))
                                                )}

                                            </TableCell>)
                                        ) : (
                                            <TableCell>

                                                {particularClientProjects?.length > 0 && (

                                                    particularClientProjects.map((data: any) => (
                                                        <div
                                                            onClick={() => navigate(`/ViewProject/${data.Id}`)}
                                                            style={{
                                                                textDecoration: "underline", color: "blue", cursor: "pointer",
                                                                listStyleType: "none"
                                                            }}>
                                                            <span key={data.Id} style={{ margin: 'auto' }}>{data.Title}</span>
                                                        </div>
                                                    ))

                                                )}
                                            </TableCell>

                                        )}

                                    </TableRow>

                                    {false && <TableRow>
                                        <TableCell component="th" scope="row">View Document</TableCell>
                                        <TableCell className="default-cursor">

                                            <Button
                                                color="primary"
                                                message="View Documents"
                                                handleClick={() => {
                                                    //console.log(`Upload Documents clicked for row ${id}`);
                                                    setUploadDialogOpen(true);
                                                }}

                                            />
                                        </TableCell>
                                    </TableRow>}

                                    <TableRow>

                                        <TableCell component="th" scope="row">
                                            Assigned Staff
                                        </TableCell>
                                        {isEdit && (
                                            <TableCell className="default-cursor">
                                                {clientDetails?.assignedStaff?.map((staff: any, index: number) => (
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
                                        )}
                                        {!isEdit &&
                                            <TableCell className="default-cursor">
                                                <ul className="default-cursor" style={{
                                                    textDecoration: "none",
                                                    listStyleType: "none",
                                                    padding: 0
                                                }}>
                                                    {clientDetails?.assignedStaff?.map((staff: any, index: number) => (
                                                        <li className="default-cursor" style={{ textDecoration: "none" }}
                                                            key={index}>
                                                            <span>{staff.Name}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </TableCell>}
                                    </TableRow>


                                    {/* {isEdit && <TableRow>
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
                                                onClick={navigateToClient}

                                            >
                                                Cancel
                                            </MuiButton>
                                        </TableCell>
                                    </TableRow>} */}
                                </TableBody>

                            </Table>
                        </TableContainer>
                    </form>
                </Box>

            </Stack>

            {handleStaffDialog && <AddStaffDialog
                particularClientAllData={particularClientAllData}
                exsistingPersons={selectedPersons}
                props={props}
                open={handleStaffDialog} onClose={closeAddStaffDialog}
                fetchData={fetchData} spContext={props.spContext} />}

            {uploadDialogOpen && <UploadDocument
                open={uploadDialogOpen}
                onClose={closeUploadDialog}
                particularClientAllData={particularClientAllData}
                fetchDatas={fetchData}
            />}

        </Box>
    );
};

export default ViewParticularClient;

