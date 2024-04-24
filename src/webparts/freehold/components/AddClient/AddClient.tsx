/* eslint-disable no-unused-expressions */

import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import styles from './AddClient.module.scss';
import { Box, Stack, Grid } from '@mui/material';
// import { createFolderInLibrary, uploadDocumentToLibrary, addListItem } from '../../Services/Core/ClientService';
import { addListItem } from '../../Services/Core/ClientService';
// import DeleteDialog from "../Delete/Delete";
import DragAndDropUpload from '../../../../Common/DragAndDrop/DragAndDrop';
import ClientService from '../../Services/Business/ClientService';
import { Controller, useForm } from "react-hook-form";
//import { showToast } from "../../hooks/toastify";


const AddClientDialog = ({ open, onClose, props, fetchData }: any) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const { control, handleSubmit, reset, formState: { errors }, trigger } = useForm();

  const handleFileInput = (selectedFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  const handleCancel = () => {
    setFiles([]);

    reset();
    onClose();
  };

  const fileInfoArray = files?.map((file: any) => ({
    lastModified: file.lastModified,
    lastModifiedDate: file.lastModifiedDate,
    name: file.name,
    size: file.size,
    type: file.type,
    webkitRelativePath: file.webkitRelativePath
  }));

  console.log(fileInfoArray, 'fileInfoArray');


  const handleSave = handleSubmit(async (data) => {
    try {
      const apiResponse = ClientService();

      const dataObj = {
        Title: data.title,
        ClientEmail: data.email,
        ClientContact: data.contact,
      };
      false && await addListItem('Clients', dataObj);

      const response = await apiResponse.addClient("Client_Information", dataObj);
      const fileInfoArray = files.map((file: any) => ({
        lastModified: file.lastModified,
        lastModifiedDate: file.lastModifiedDate,
        name: file.name,
        size: file.size,
        type: file.type,
        webkitRelativePath: file.webkitRelativePath
      }));
      console.log(response, fileInfoArray, 'responseresponseresponse');
      await apiResponse.uploadDocument(response.Title, fileInfoArray, 'Client_Information', response.Id);
      handleCancel();

      // false && if (files.length > 0) {
      //   const currentDate = new Date().toISOString().slice(0, 10);
      //   const formattedDate = currentDate.replace(/-/g, '');
      //   const folderName = `${data.title}_${formattedDate}`;

      //   await createFolderInLibrary('SPDocument', folderName);

      //   for (const file of files) {
      //     await uploadDocumentToLibrary('SPDocument', folderName, file.name, file);
      //   }
      // }

      setFiles([]);
      //showToast(`Client Added Successfully !`, "success");

      handleCancel();
    } catch (error) {
      //showToast(`Failed to add client and document.`, "error");

    }
  });

  return (
    <Box sx={{ width: '100', padding: '20px' }}>
      <Stack direction="column" spacing={2}>
        <Dialog open={open} maxWidth='sm' fullWidth  >
          <DialogTitle className={styles.addTitle} style={{ textAlign: 'center', marginLeft: '7px', position: 'relative' }}>
            <div className="d-flex flex-column">
              <div className="d-flex justify-content-between align-items-center relative">
                <h4 style={{ margin: '0', color: '#125895' }}>
                  Add Client</h4>
              </div>
              <div style={{ height: '4px', width: '100%', backgroundColor: '#125895' }} />
            </div>
          </DialogTitle>
          <IconButton
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
          </IconButton>
          <DialogContent>
            <form onSubmit={handleSave}>
              <Grid container spacing={2}>
                <Grid item sm={6}>
                  <div style={{ marginBottom: '20px' }}>
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
                  </div>
                </Grid>
                <Grid item sm={6}>
                  <div style={{ marginBottom: '20px' }}>
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
                  </div>
                </Grid>
              </Grid>
              <div style={{ marginBottom: '20px' }}>
                <label htmlFor="clientContact">Client Contact<span style={{ color: 'red' }}>*</span></label>
                <Controller
                  name="contact"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: 'Client Contact is required',
                    pattern: {
                      value: /^[0-9]{10}$/,
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
                        const value = e.target.value.replace(/\D/g, '');
                        field.onChange(value);
                        await trigger("contact");
                      }}
                      error={!!errors.contact}
                      helperText={errors.contact && errors.contact.message}
                    />
                  )}
                />
              </div>
              <div >
                <label htmlFor="clientDocuments">Client Documents</label>
                <DragAndDropUpload onFilesAdded={handleFileInput} setIsError={setIsError} />
                {isError && <span style={{ color: 'red', fontSize: '12px' }}>File size should be less than 10 MB</span>}
              </div>
            </form>
          </DialogContent>

          <DialogActions sx={{ padding: '10px', marginRight: '14px', mt: '0px' }}>
            <Button
              onClick={handleSave}
              variant="contained"
              color="primary"
              sx={{
                maxWidth: '150px',
                float: 'right',
              }}
            >
              Add
            </Button>
            {/* <Button variant="outlined" onClick={handleCancel}>
              Clear
            </Button> */}
          </DialogActions>
        </Dialog>

      </Stack>

    </Box>
  );
};

export default AddClientDialog;

