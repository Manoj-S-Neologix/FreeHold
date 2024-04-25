import * as React from 'react';
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
// import styles from "./AddProject.module.scss";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Stack } from '@mui/material';
import ProjectService from '../../Services/Business/ProjectService';
import {Controller, useForm } from "react-hook-form";

interface AddClientDialogProps {
  open: boolean;
  onClose: () => void;
}

const AddProjectDialog: React.FC<AddClientDialogProps> = ({ open, onClose }) => {
  const [files, setFiles] = useState<File[]>([]);
  // const { control, handleSubmit, reset, formState: { errors }, trigger } = useForm();
  const { control, handleSubmit, formState: { errors }, trigger } = useForm();


  const handleCancel = () => {
    onClose();
  };

  // const handleSave = () => {

  //   onClose();
  // };
  
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

      const apiResponse = ProjectService();

      const dataObj = {
        Title: data.title,
        ProjectNumber: data.projectNumber,
        Location: data.location,
        Developer:data.developer
      };
      // false && await addListItem('Clients', dataObj);

      const response = await apiResponse.addProject("Project_Informations", dataObj);
      const fileInfoArray = files.map((file: any) => ({
        lastModified: file.lastModified,
        lastModifiedDate: file.lastModifiedDate,
        name: file.name,
        size: file.size,
        type: file.type,
        webkitRelativePath: file.webkitRelativePath
      }));
      console.log(response, fileInfoArray, 'responseresponseresponse');
      // await apiResponse.uploadDocument(response.Title, fileInfoArray, 'Client_Informations', response.Id);
      handleCancel();

      setFiles([]);
      // showToast(`Client Added Successfully !`, "success");

      handleCancel();
    } catch (error) {
      //showToast(`Failed to add client and document.`, "error");

    }
  });


  return (
    <Box sx={{ width: '100', padding: '20px' }} >
      <Stack direction='column' spacing={2} >
        <Dialog open={open} onClose={onClose} >
          {/* <DialogTitle style={{textAlign: 'center'}}>Project Name</DialogTitle > */}
          {/* <DialogTitle  style={{ textAlign: 'center', marginLeft: '7px', position: 'relative', color:'#125895' }}>
            Add Project
            <hr style={{ position: 'absolute', bottom: '-8px', left: '50%', transform: 'translateX(-50%)', width: '80px', border: '1px solid black' }} />
            <IconButton aria-label="close" onClick={handleCancel} sx={{ position: 'absolute', right: 8, top: 8 }}>
              <CloseIcon />
            </IconButton>
          </DialogTitle> */}
          {/* <DialogTitle className={styles.addTitle} style={{ textAlign: 'center', marginLeft: '7px', position: 'relative' }}> */}
          <DialogTitle >

            <div className="d-flex flex-column">
              <div className="d-flex justify-content-between
                     align-items-center relative">
                <h4 style={{ margin: '0', color: '#125895' }}>
                  Add Project</h4>
              </div>
              <div style={{
                height: '4px', width: '100%',
                backgroundColor: '#125895'
              }} />
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

          <DialogContent >
          <form onSubmit={handleSave}>
            <div style={{ display: 'flex', marginBottom: '20px' }}>
              <div style={{ marginRight: '20px', flex: 1 }}>
                <label htmlFor="projectNumber">Project Number*</label>
                {/* <TextField id="clientName" margin="dense" size="small" fullWidth /> */}
                <Controller
                      name="projectNumber"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: 'Project Number is required',
                        minLength: {
                          value: 3,
                          message: "Project Number must be at least 3 characters.",
                        },
                        maxLength: {
                          value: 100,
                          message: "Project Number must be at most 100 characters.",
                        }
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          id="projectNumber"
                          margin="dense"
                          size="small"
                          fullWidth
                          onChange={async (e) => {
                            const value = e.target.value;
                            field.onChange(value);
                            await trigger('projectNumber');
                          }}
                          error={!!errors.title}
                          helperText={errors.projectNumber && errors.projectNumber.message}
                        />
                      )}
                    />
              </div>
              <div style={{ flex: 1 }}>
                <label htmlFor="projectName">Project Name</label>
                {/* <TextField id="clientDetails" margin="dense" size="small" fullWidth /> */}
                <Controller
                      name="title"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: 'Project Name is required',
                        minLength: {
                          value: 3,
                          message: "Project Name must be at least 3 characters.",
                        },
                        maxLength: {
                          value: 100,
                          message: "Client Name must be at most 100 characters.",
                        }
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          id="projectName"
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
            </div>
            <div style={{ display: 'flex', marginBottom: '10px' }}>
              <div style={{ marginRight: '20px', flex: 1 }}>
              <label htmlFor="location">Location</label>
              {/* <TextField id="Location" margin="dense" size="small" fullWidth /> */}
              <Controller
                      name="location"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: 'location is required',
                        minLength: {
                          value: 3,
                          message: "location must be at least 3 characters.",
                        },
                        maxLength: {
                          value: 100,
                          message: "location must be at most 100 characters.",
                        }
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          id="location"
                          margin="dense"
                          size="small"
                          fullWidth
                          onChange={async (e) => {
                            const value = e.target.value;
                            field.onChange(value);
                            await trigger('location');
                          }}
                          error={!!errors.title}
                          helperText={errors.location && errors.location.message}
                        />
                      )}
                    />
              </div>
              <div style={{ flex: 1 }}>
                <label htmlFor="developer">Developer</label>
                {/* <TextField id="Developer" margin="dense" size="small" fullWidth /> */}
                <Controller
                      name="developer"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: 'Project Number is required',
                        minLength: {
                          value: 3,
                          message: "Project Number must be at least 3 characters.",
                        },
                        maxLength: {
                          value: 100,
                          message: "Project Number must be at most 100 characters.",
                        }
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          id="developer"
                          margin="dense"
                          size="small"
                          fullWidth
                          onChange={async (e) => {
                            const value = e.target.value;
                            field.onChange(value);
                            await trigger('developer');
                          }}
                          error={!!errors.title}
                          helperText={errors.developer && errors.developer.message}
                        />
                      )}
                    />
              </div>
            </div>

          </form>
          </DialogContent>
          <DialogActions sx={{ padding: '10px', marginRight: '14px' }}>
            {/* <Button onClick={handleCancel} variant="contained">Cancel</Button>
        <Button onClick={handleSave} variant="contained"> Save </Button> */}
            {/* <Button variant="outlined" onClick={handleCancel}>
              Cancel
            </Button> */}
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

          </DialogActions>
        </Dialog>
      </Stack>
    </Box>
  );
};

export default AddProjectDialog;