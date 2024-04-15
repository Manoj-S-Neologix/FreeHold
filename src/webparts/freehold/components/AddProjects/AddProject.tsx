import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

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
    <Dialog open={open} onClose={onClose} >
      <DialogTitle style={{textAlign: 'center'}}>Project Name</DialogTitle >
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
      <DialogActions>
        <Button onClick={handleCancel} >Cancel</Button>
        <Button onClick={handleSave} > Save </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProjectDialog;