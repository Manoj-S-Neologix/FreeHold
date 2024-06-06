import * as React from 'react';
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Stack, CircularProgress } from '@mui/material';
import ProjectService from '../../Services/Business/ProjectService';
import { Controller, useForm } from "react-hook-form";
import toast from 'react-hot-toast';


interface AddClientDialogProps {
  open: boolean;
  onClose: () => void;
  fetchData: () => Promise<void>;
  props: any;
}


const AddProjectDialog: React.FC<AddClientDialogProps> = ({ open, onClose, fetchData }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit, reset, formState: { errors }, trigger } = useForm();

  const handleCancel = () => {
    onClose();
    reset();
  };

  const handleSave = handleSubmit(async (data) => {
    try {
      setLoading(true);
      const apiResponse = ProjectService();

      const dataObj = {
        Title: data.title,
        ProjectNumber: data.projectNumber,
        Location: data.location,
        Developer: data.developer
      };

      const library = await apiResponse.createLibrary(`Project_${dataObj.ProjectNumber}`, "Project Library");
      const updatedDataObj = {
        ...dataObj,
        ProjectLibraryGUID: library.data.Id,
        ProjectLibraryPath: library.data.ParentWebUrl + "/" + library.data.Title
      }
      const response = await apiResponse.addProject("Project_Informations", updatedDataObj);
      const fileInfoArray = files.map((file: any) => ({
        lastModified: file.lastModified,
        lastModifiedDate: file.lastModifiedDate,
        name: file.name,
        size: file.size,
        type: file.type,
        webkitRelativePath: file.webkitRelativePath
      }));

      console.log(response, fileInfoArray, 'responseresponseresponse');
      setLoading(false);
      setFiles([]);
      toast.success('Project Added Successfully !');
      fetchData();
      handleCancel();
    } catch (error) {
      setLoading(false);
      toast.error(`Project Number already exists`);

    }
  });

  return (
    <Box  >
      <Stack direction='column' spacing={2} >
        <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth  >

          <DialogTitle style={{ textAlign: 'center', position: 'relative' }}>

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

          <DialogContent >
            <form onSubmit={handleSave}>
              <div style={{ display: 'flex', marginBottom: '20px' }}>
                <div style={{ marginRight: '20px', flex: 1 }}>
                  <label htmlFor="projectNumber">Project Number<span style={{ color: 'red' }}>*</span></label>
                  <Controller
                    name="projectNumber"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: 'Project Number is required',
                      pattern: {
                        value: /^[a-zA-Z0-9 ]+$/,
                        message: 'Invalid project number'
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
                          const value = e.target.value.replace(/[^a-zA-Z0-9 ]/g, '');
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
                  <label htmlFor="projectName">Project Name<span style={{ color: 'red' }}>*</span></label>
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
                  <label htmlFor="location">Location<span style={{ color: 'red' }}>*</span></label>
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
                  <label htmlFor="developer">Developer<span style={{ color: 'red' }}>*</span></label>
                  <Controller
                    name="developer"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: 'Developer is required',
                      minLength: {
                        value: 3,
                        message: "Developer must be at least 3 characters.",
                      },
                      maxLength: {
                        value: 100,
                        message: "Developer must be at most 100 characters.",
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

          </DialogActions>
        </Dialog>
      </Stack>
    </Box>
  );
};

export default AddProjectDialog;