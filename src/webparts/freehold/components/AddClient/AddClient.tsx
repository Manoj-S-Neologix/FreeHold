/* eslint-disable no-unused-expressions */
import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import styles from './AddClient.module.scss';
import { Box, Stack, Grid, CircularProgress, MenuItem, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, } from '@mui/material';
import ClientService from '../../Services/Business/ClientService';
import { Controller, useForm } from "react-hook-form";
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import toast from 'react-hot-toast';
import DropZone from "../../../../Common/DropZone/DropZone";
// import InputLabel from '@mui/material/InputLabel';
import DeleteIcon from '@mui/icons-material/Delete';



const AddClientDialog = ({ open, onClose, props, fetchData, spContext }: any) => {
  const [files, setFiles] = useState<any[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const { control, handleSubmit, reset, formState: { errors }, trigger, setValue } = useForm();
  const [selectedPersons, setSelectedPersons] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [dropdownOptions, setDropdownOptions] = useState<any[]>([]);

  const textFieldWidth = {
    xs: 12,
    sm: 6,
    md: 6,
    lg: 4,
    xl: 3,
    margin: "8px",
  };

  const handleFileInput = (selectedFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  // console.log(files, 'files');

  const handleCancel = () => {
    setFiles([]);

    reset();
    onClose();
  };

  React.useEffect(() => {
    if (files && files.length > 0) {
      fetchClientData();
    }
  }, [files]);

  // const fileInfoArray = files?.map((file: any) => ({
  //   lastModified: file.lastModified,
  //   lastModifiedDate: file.lastModifiedDate,
  //   name: file.name,
  //   size: file.size,
  //   type: file.type,
  //   webkitRelativePath: file.webkitRelativePath
  // }));

  // console.log(fileInfoArray, selectedPersons, 'fileInfoArray');

  const handlePeoplePickerChange = async (items: any[]) => {
    // console.log(items, "itemsitemsitemsitems");
    const selectedPersonsIds = [];
    for (const item of items) {
      const getID = await ClientService().getPersonByEmail(item.secondaryText);
      // console.log(getID.Id, "getIDgetID");
      selectedPersonsIds.push(getID.Id);
    }
    setSelectedPersons(selectedPersonsIds);
  };

  const fetchClientData = () => {
    const clientService = ClientService();
    clientService.getClient('Client Checklist')
      .then((results) => {
        // console.log(results, 'client');
        if (results) {
          setDropdownOptions(results);
        }
      })
      .catch((error) => {
        console.error('Error fetching SharePoint data:', error);
      });
  };

  const onDelete = (index: number) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  const handleSave = handleSubmit(async (data) => {

    setLoading(true);
    const apiResponse = ClientService();
    // console.log(data, selectedPersons, "staff");

    const dataObj = {
      Title: data.title,
      ClientEmail: data.email,
      ClientContact: data.contact,
      AssignedStaffId: {
        results: selectedPersons
      },
      DMS_x0020_Tags: data.clientChecklist
    };

    const uploadPromise: any = new Promise((resolve, reject) => {
      const fileInfoArray = files.map((file: any) => ({
        lastModified: file.lastModified,
        lastModifiedDate: file.lastModifiedDate,
        name: file.name,
        size: file.size,
        type: file.type,
        webkitRelativePath: file.webkitRelativePath,
        // DMSTags: data.clientChecklist 
        DMS_x0020_Tags: data.clientChecklist
      }));

      apiResponse.uploadDocument(`Client_${data.title}`, fileInfoArray, 'Client_Informations')
        .then(response => resolve(response))
        .catch(error => reject(error));
    });

    // console.log(uploadPromise, "uploadPromise");
    // Create item in the list after document upload
    uploadPromise
      .then((uploadDocumentResponse: any) => {
        // console.log(uploadDocumentResponse, uploadDocumentResponse.data, uploadDocumentResponse.data.ParentWebUrl, "uploadDocumentResponse");
        const updatedDataObj = {
          ...dataObj,
          ClientLibraryGUID: uploadDocumentResponse.data.Id,
          ClientLibraryPath: uploadDocumentResponse.data.ParentWebUrl + "/" + uploadDocumentResponse.data.Title
        };
        return apiResponse.addClient("Client_Informations", updatedDataObj).then((clientInfo) => {

          const updatedData = {
            //DMS_x0020_Tags: "",
            DMSClient: dataObj.Title,
            DMSProject: "",
            //DMSTags: "",
            DMSUnit: "",
            DMSClientID: (clientInfo.Id).toString(),
            DMSProjectID: ""
          }

          return apiResponse.updateClientDocumentMetadata(updatedDataObj.ClientLibraryPath, files, updatedData)
            .then(() => {
              setLoading(false);
              // handleCancel();
              setFiles([]);
              // toast.success('Documents Added Successfully!');
              fetchData();
              reset();
            })
            .catch((error) => {
              setLoading(false);
              // console.error("Failed to add client and document:", error);
              toast.error(`Failed to add client and document: ${error}`);
            });

        });

      })
      .then(() => {
        setLoading(false);
        handleCancel();
        setFiles([]);
        fetchData();
        return toast.success('Client Added Successfully !');
      })
      .catch((error: any) => {
        setLoading(false);
        const errorMessage = error || 'An error occurred while adding client and document.';
        return toast.error(`Failed to add client and document. ${errorMessage}`);

      });
  });


  return (
    <Box>
      <Stack direction="column" spacing={2}>
        <Dialog open={open} maxWidth='sm' fullWidth  >
          <DialogTitle className={styles.addTitle} style={{ textAlign: 'center', position: 'relative' }}>
            <div className="d-flex flex-column">
              <div className="d-flex justify-content-between align-items-center relative">
                <h4 style={{ margin: '0', color: '#125895' }}>
                  Add Client</h4>
              </div>
              <div style={{ height: '4px', width: '100%', backgroundColor: '#125895' }} />
            </div>
          </DialogTitle>
          {!loading && <IconButton
            aria-label="close"
            onClick={handleCancel}
            sx={{
              position: "absolute",
              right: "14px",
              top: "8px",
              color: (theme: any) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>}
          <DialogContent>
            <Box component="form">
              <Grid container spacing={4}>
                <Grid
                  item
                  xs={textFieldWidth.xs}
                  sm={textFieldWidth.sm}
                  md={textFieldWidth.sm}
                  lg={textFieldWidth.sm}
                  xl={textFieldWidth.sm}
                >
                  <label htmlFor="clientName">Client Name<span style={{ color: 'red' }}>*</span></label>
                  <Controller
                    name="title"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: 'Client Name is required',
                      minLength: {
                        value: 3,
                        message: "Client Name must be at least 3 characters.",
                      },
                      maxLength: {
                        value: 100,
                        message: "Client Name must be at most 100 characters.",
                      },
                      pattern: {
                        value: /^[a-zA-Z0-9 ]+$/,
                        message: 'Special characters not allowed'
                      }
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="clientName"
                        margin="dense"
                        size="small"
                        fullWidth
                        onChange={async (e) => {
                          const value = e.target.value;
                          field.onChange(value);
                          await trigger('title');
                        }}
                        error={!!errors.title}
                        helperText={errors.title && errors.title.message}
                      />
                    )}
                  />
                </Grid>
                <Grid
                  item
                  xs={textFieldWidth.xs}
                  sm={textFieldWidth.sm}
                  md={textFieldWidth.sm}
                  lg={textFieldWidth.sm}
                  xl={textFieldWidth.sm}
                >

                  <label htmlFor="clientEmail">Client Email</label>
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
                        fullWidth
                        onChange={async (e: any) => {
                          const value = e.target.value;
                          field.onChange(value);
                          await trigger("email");
                        }}
                        error={!!errors.email}
                        helperText={errors.email && errors.email.message}
                      />
                    )}
                  />
                </Grid>
                <Grid
                  item
                  xs={textFieldWidth.xs}
                  sm={textFieldWidth.sm}
                  md={textFieldWidth.sm}
                  lg={textFieldWidth.sm}
                  xl={textFieldWidth.sm}
                >
                  <label htmlFor="clientContact">Contact Number</label>
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
                        fullWidth
                        onChange={async (e: any) => {
                          const value = e.target.value.replace(/[^\d+-.]/g, '');
                          field.onChange(value);
                          await trigger("contact");
                        }}
                        error={!!errors.contact}
                        helperText={errors.contact && errors.contact.message}
                      />
                    )}
                  />
                </Grid>
                <Grid
                  item
                  xs={textFieldWidth.xs}
                  sm={textFieldWidth.sm}
                  md={textFieldWidth.sm}
                  lg={textFieldWidth.sm}
                  xl={textFieldWidth.sm}
                >
                  <label htmlFor="AssignedStaffId">Assigned Staff
                    {/* <span style={{ color: 'red' }}>*</span> */}
                  </label>
                  <Controller
                    name="contact"
                    control={control}
                    defaultValue=""
                    // rules={{
                    //   required: 'Assigned Staff is required',
                    // }}
                    render={({ field }) => (
                      <PeoplePicker
                        styles={{
                          input: {
                            width: '100%',
                            height: '30px',
                            paddingTop: "10px"
                          },
                          itemsWrapper: {
                            'ms-PickerPersona-container': {
                              width: '100%',
                              backgroundColor: 'white !important'
                            },

                          },
                          root: {
                            width: '100%',
                            height: '30px',
                            paddingTop: "10px",

                            'ms-BasePicker-text': {
                              width: '100%',
                              borderRadius: '5px'
                            }
                          },



                        }}
                        {...field}
                        context={spContext}
                        personSelectionLimit={4}
                        // required={true}
                        showHiddenInUI={false}
                        principalTypes={[PrincipalType.User]}
                        resolveDelay={1000}
                        onChange={handlePeoplePickerChange}
                        defaultSelectedUsers={selectedPersons}
                      />
                    )}
                  />
                  {/* {errors.assignedStaffId && <span style={{ color: 'red', fontSize: '12px' }}>{errors.assignedStaffId.message}</span>} */}
                </Grid>
                <Grid
                  item
                  xs={textFieldWidth.xs}
                  sm={textFieldWidth.xs}
                  md={textFieldWidth.xs}
                  lg={textFieldWidth.xs}
                  xl={textFieldWidth.xs}
                >
                  {/* <DragAndDropUpload onFilesAdded={handleFileInput} setIsError={setIsError} /> */}

                  <div >
                    <label htmlFor="clientDocuments">Client Documents</label>
                    {<DropZone onFilesAdded={handleFileInput} setIsError={setIsError} setFiles={setFiles} files={files} />}
                    {isError && <span style={{ color: 'red', fontSize: '12px' }}>File size should be less than 10 MB</span>}
                  </div>
                  {files.length > 0 && dropdownOptions.length > 0 && (
                    <>
                      <TableContainer>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>Document</TableCell>
                              <TableCell>Document Type</TableCell>
                              <TableCell>Delete</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {files.map((file: any, index: any) => (
                              <TableRow key={index}>
                                <TableCell>{file.name}</TableCell>

                                {/* <div key={index}> */}
                                <TableCell>
                                  {/* <Controller
                                    name="clientChecklist"
                                    control={control}
                                    defaultValue=""
                                    // rules={{ required: 'Client Name is required' }}
                                    render={({ field }) => (
                                      <>
                                        <TextField
                                          {...field}
                                          id="client-name"
                                          fullWidth
                                          variant="outlined"
                                          select
                                          size="small"
                                          // required
                                          label=""
                                          error={!!errors.clientChecklist}
                                          helperText={errors?.clientChecklist?.message}
                                          style={{ width: 200 }} // Fixed width
                                          onChange={(e: any) => {
                                              console.log('Selected:', e.target.value);
                                              setValue('clientChecklist', e.target.value);
                                              field.onChange(e);
                                              const newValue = e.target.value;
                                              // setValue(`clientChecklist-${index}`, e.target.value);
                                              setFiles(prevFiles => {
                                                  const updatedFiles = [...prevFiles];
                                                  updatedFiles[index].checklist = newValue;
                                                  return updatedFiles;
                                              });
                                          }}
                                        > */}
                                  <Controller
                                    name={`clientChecklist-${index}`}
                                    control={control}
                                    defaultValue={file.checklist || ""}
                                    rules={{ required: 'Client Checklist is required' }}
                                    render={({ field }) => (
                                      <TextField
                                        {...field}
                                        fullWidth
                                        variant="outlined"
                                        select
                                        size="small"
                                        required
                                        error={!!errors[`clientChecklist-${index}`]}
                                        helperText={errors[`clientChecklist-${index}`]?.message}
                                        style={{ width: 200 }} // Fixed width
                                        onChange={(e: any) => {
                                          field.onChange(e);
                                          const newValue = e.target.value;
                                          setValue(`clientChecklist-${index}`, e.target.value);
                                          setFiles(prevFiles => {
                                            const updatedFiles = [...prevFiles];
                                            updatedFiles[index].checklist = newValue;
                                            return updatedFiles;
                                          });
                                        }}
                                      >
                                        {dropdownOptions.map((option, index) => (
                                          <MenuItem key={index} value={option.Title}>
                                            {option.Title}
                                          </MenuItem>
                                        ))}
                                      </TextField>
                                      // </>
                                    )}
                                  />
                                </TableCell>
                                {/* </div> */}
                                <TableCell>
                                  <IconButton aria-label="delete" onClick={() => onDelete(index)}>
                                    <DeleteIcon />
                                  </IconButton>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>



                    </>
                  )}


                </Grid>
              </Grid>
            </Box>
            <Stack
              direction="row"
              justifyContent="end"
              alignItems="center"
              spacing={3}
            >
              <Button variant="contained"
                sx={{ width: loading ? '150px' : 'auto' }}
                onClick={handleSave} disabled={loading}>
                {loading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  "Add"
                )}
              </Button>
              {/* {!loading && <Button variant="outlined" onClick={handleCancel}  >Clear</Button>} */}
            </Stack>
          </DialogContent>

        </Dialog>

      </Stack>

    </Box >
  );
};

export default AddClientDialog;

