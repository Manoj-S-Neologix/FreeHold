import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
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
    <Box sx={{width:'100', padding:'20px' }} > 
    <Stack direction ='column' spacing={2} >
    <Dialog open={open} onClose={onClose} >
      {/* <DialogTitle style={{textAlign: 'center'}}>Project Name</DialogTitle > */}
      <DialogTitle  style={{ textAlign: 'center', marginLeft: '7px', position: 'relative', color:'#125895' }}>
            Add Project
            <hr style={{ position: 'absolute', bottom: '-8px', left: '50%', transform: 'translateX(-50%)', width: '80px', border: '1px solid black' }} />
            <IconButton aria-label="close" onClick={handleCancel} sx={{ position: 'absolute', right: 8, top: 8 }}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
      <DialogContent >
        <div style={{ display: 'flex', marginBottom: '20px' }}>
          <div style={{ marginRight: '20px', flex: 1 }}>
            <label htmlFor="clientName">Client Name*</label>
            <TextField id="clientName" margin="dense" fullWidth />
          </div>
          <div style={{ flex: 1 }}>
            <label htmlFor="clientDetails">Project Detail</label>
            <TextField id="clientDetails" margin="dense" fullWidth />
          </div>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="loremIpsum">Lorem Ipsum</label>
          <TextField id="loremIpsum" margin="dense" fullWidth />
        </div>
       

      </DialogContent>
      <DialogActions sx={{padding:'10px', marginRight:'14px'}}>
        <Button onClick={handleCancel} variant="contained">Cancel</Button>
        <Button onClick={handleSave} variant="contained"> Save </Button>
      </DialogActions>
    </Dialog>
    </Stack>
    </Box>
  );
};

export default AddProjectDialog;