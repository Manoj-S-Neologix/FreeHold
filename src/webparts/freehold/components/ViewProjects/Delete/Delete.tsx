/* eslint-disable no-unused-expressions */
import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';
import { Box, Stack } from '@mui/material';
import styles from './Delete.module.scss';
import ProjectService from '../../../Services/Business/ProjectService'; 
import toast from 'react-hot-toast';


interface DeleteDialogProps {
  open: boolean;
  onClose: () => void;
  projectDetails: any; 
  fetchData: () => Promise<void>;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({ open, onClose, projectDetails, fetchData}) => {
  const [loading, setLoading] = useState(false);

  const handleCancel = () => {
    onClose();
  };

  const handleDeleteProject = async () => {
    try {
      setLoading(true);
      await ProjectService().deleteProject("Project_Informations", projectDetails.Id);
      await ProjectService().deleteLibrary(projectDetails.projectNumber);
      toast.success('Project deleted Successfully !');
      fetchData();

      onClose();
    } catch (error) {
      toast.error('Error deleting Project:', error);
      setLoading(false); 
    }
  };
  
  return (
    <Box sx={{ width: '100', padding: '20px' }}>
      <Stack direction="column" spacing={2}>
        <Dialog open={open} maxWidth='sm' fullWidth>
          <DialogTitle className={styles.addTitle} style={{ textAlign: 'center', marginLeft: '7px', position: 'relative' }}>
            <div className="d-flex flex-column">
              <div className="d-flex justify-content-between align-items-center relative">
                <h4 style={{ margin: '0', color: '#125895' }}>
                  Delete Project
                </h4>
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
          <DialogContent>
            <div style={{ marginLeft: '7px' }}>
              Are you sure you want to delete Project
              <strong style={{ marginLeft: '2px' }}>{projectDetails.Title}</strong>
              ?
            </div>
          </DialogContent>
          <DialogActions sx={{ padding: '10px', marginRight: '14px' }}>
            <Stack
              direction="row"
              justifyContent="end"
              alignItems="center"
              spacing={3}
            >
              <Button
                variant="contained"
                color="primary"
                sx={{ width: loading ? '150px' : 'auto' }}
                onClick={handleDeleteProject}
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  "Delete"
                )}
              </Button>
              {!loading && <Button variant="outlined" onClick={handleCancel}>Cancel</Button>}
            </Stack>
          </DialogActions>
        </Dialog>
      </Stack>
    </Box>
  );
};

export default DeleteDialog;


