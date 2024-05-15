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
// import { Box, Stack, Grid, CircularProgress} from '@mui/material';
import { Box, Stack, Grid, CircularProgress, Select, MenuItem } from '@mui/material';

// import { addListItem } from '../../Services/Core/ClientService';
// import DragAndDropUpload from '../../../../Common/DragAndDrop/DragAndDrop';
import ClientService from '../../Services/Business/ClientService';
import { Controller, useForm } from "react-hook-form";
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import toast from 'react-hot-toast';
import DropZone from "../../../../Common/DropZone/DropZone";







const AddClientDialog = ({ open, onClose, props, fetchData }: any) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const { control, handleSubmit, reset, formState: { errors }, trigger } = useForm();
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

  console.log(files, 'files');

  const handleCancel = () => {
    setFiles([]);

    reset();
    onClose();
  };

  React.useEffect(() => {
    if (files && files.length > 0) {
        fetchClientData();
    }
});



  const fileInfoArray = files?.map((file: any) => ({
    lastModified: file.lastModified,
    lastModifiedDate: file.lastModifiedDate,
    name: file.name,
    size: file.size,
    type: file.type,
    webkitRelativePath: file.webkitRelativePath
  }));

  console.log(fileInfoArray, selectedPersons, 'fileInfoArray');

  const handlePeoplePickerChange = async (items: any[]) => {
    console.log(items, "itemsitemsitemsitems");
    const selectedPersonsIds = [];
    for (const item of items) {
      const getID = await ClientService().getPersonByEmail(item.secondaryText);
      console.log(getID.Id, "getIDgetID");
      selectedPersonsIds.push(getID.Id);
    }
    setSelectedPersons(selectedPersonsIds);
  };

  const fetchClientData = () => {
    const clientService = ClientService(); 
    clientService.getClient('Client Checklist')
        .then((results) => {
            console.log(results, 'client');
            if(results){
            setDropdownOptions(results);
            }
        })
        .catch((error) => {
            console.error('Error fetching SharePoint data:', error);
        });
};



  // const handleSave = handleSubmit(async (data) => {
  //   try {
  //     setLoading(true);
  //     const apiResponse = ClientService();

  //     const dataObj = {
  //       Title: data.title,
  //       ClientEmail: data.email,
  //       ClientContact: data.contact,
  //     };
  //     false && await addListItem('Clients', dataObj);

  //     const response = await apiResponse.addClient("Client_Informations", dataObj);
  //     const fileInfoArray = files.map((file: any) => ({
  //       lastModified: file.lastModified,
  //       lastModifiedDate: file.lastModifiedDate,
  //       name: file.name,
  //       size: file.size,
  //       type: file.type,
  //       webkitRelativePath: file.webkitRelativePath
  //     }));
  //     console.log(response, fileInfoArray, 'responseresponseresponse');
  //     await apiResponse.uploadDocument(response.Title, fileInfoArray, 'Client_Informations', response.Id);
  //     setLoading(false);
  //     handleCancel();

  //     setFiles([]);
  //     // showToast(`Client Added Successfully !`, "success");

  //     handleCancel();
  //   } catch (error) {
  //     setLoading(false);
  //     //showToast(`Failed to add client and document.`, "error");

  //   }
  // });


  const handleSave = handleSubmit(async (data) => {
    setLoading(true);
    const apiResponse = ClientService();
    console.log(data, selectedPersons, "staff");

    const dataObj = {
      Title: data.title,
      ClientEmail: data.email,
      ClientContact: data.contact,
      AssignedStaffId: {
        results: selectedPersons
      }
    };

    // false && addListItem('Clients', dataObj);

    const uploadPromise: any = new Promise((resolve, reject) => {
      const fileInfoArray = files.map((file: any) => ({
        lastModified: file.lastModified,
        lastModifiedDate: file.lastModifiedDate,
        name: file.name,
        size: file.size,
        type: file.type,
        webkitRelativePath: file.webkitRelativePath
      }));

      apiResponse.uploadDocument(data.title, fileInfoArray, 'Client_Informations')
        .then(response => resolve(response))
        .catch(error => reject(error));
    });

    console.log(uploadPromise, "uploadPromise");
    // Create item in the list after document upload
    uploadPromise
      .then((uploadDocumentResponse: any) => {
        console.log(uploadDocumentResponse, uploadDocumentResponse.data, uploadDocumentResponse.data.ParentWebUrl, "uploadDocumentResponse");
        const updatedDataObj = {
          ...dataObj,
          ClientLibraryGUID: uploadDocumentResponse.data.Id,
          ClientLibraryPath: uploadDocumentResponse.data.ParentWebUrl + "/" + dataObj.Title
        };
        return apiResponse.addClient("Client_Informations", updatedDataObj);
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

                  <label htmlFor="clientEmail">Client Email<span style={{ color: 'red' }}>*</span></label>
                  <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "Email Id is required.",
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
                  <label htmlFor="clientContact">Contact Number<span style={{ color: 'red' }}>*</span></label>
                  <Controller
                    name="contact"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: 'Client Contact is required',
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
                        context={props.props.props.context as any}
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
                  <div >
                    <label htmlFor="clientDocuments">Client Documents</label>
                    {/* <DragAndDropUpload onFilesAdded={handleFileInput} setIsError={setIsError} /> */}
                    {<DropZone onFilesAdded={handleFileInput} setIsError={setIsError} setFiles={setFiles} files={files} />}
                    {isError && <span style={{ color: 'red', fontSize: '12px' }}>File size should be less than 10 MB</span>}
                  </div>
                  {files.length > 0 && dropdownOptions.length > 0 && (
                  <div>
                    <label htmlFor="clientChecklist">Client Checklist</label>
                    <Select
                      value={''} // Set the selected value state here if needed
                      onChange={(e:any) => console.log('Selected:', e.target.value)}
                      variant="outlined"
                    >
                      {dropdownOptions.map((option:any, index:any) => (
                        <MenuItem key={index} value={option.Id}>
                          {option.Title}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
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

