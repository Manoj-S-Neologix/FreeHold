import * as React from 'react';
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

interface AddClientDialogProps {
  open: boolean;
  onClose: () => void;
}

const AddProjectDialog: React.FC<AddClientDialogProps> = ({ open, onClose }) => {


  const handleCancel = () => {
    onClose();
  };

  const handleSave = () => {

    onClose();
  };

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
            <div style={{ display: 'flex', marginBottom: '20px' }}>
              <div style={{ marginRight: '20px', flex: 1 }}>
                <label htmlFor="clientName">Project Number*</label>
                <TextField id="clientName" margin="dense" size="small" fullWidth />
              </div>
              <div style={{ flex: 1 }}>
                <label htmlFor="clientDetails">Project Name</label>
                <TextField id="clientDetails" margin="dense" size="small" fullWidth />
              </div>
            </div>
            <div style={{ display: 'flex', marginBottom: '10px' }}>
              <div style={{ marginRight: '20px', flex: 1 }}>
              <label htmlFor="Location">Location</label>
              <TextField id="Location" margin="dense" size="small" fullWidth />
              </div>
              <div style={{ flex: 1 }}>
                <label htmlFor="Developer">Developer</label>
                <TextField id="Developer" margin="dense" size="small" fullWidth />
              </div>
            </div>


          </DialogContent>
          <DialogActions sx={{ padding: '10px', marginRight: '14px' }}>
            {/* <Button onClick={handleCancel} variant="contained">Cancel</Button>
        <Button onClick={handleSave} variant="contained"> Save </Button> */}
            <Button variant="outlined" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              variant="contained"
              color="primary"
              sx={{
                maxWidth: '150px',
                float: 'right',
              }}
            >
              Save
            </Button>

          </DialogActions>
        </Dialog>
      </Stack>
    </Box>
  );
};

export default AddProjectDialog;