import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import styles from './AddClient.module.scss';

interface AddClientDialogProps {
  open: boolean;
  onClose: () => void;
}

const AddClientDialog: React.FC<AddClientDialogProps> = ({ open, onClose }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    setFile(selectedFile || null);
  };

  const handleCancel = () => {
    setFile(null);
    onClose();
  };

  const handleSave = () => {
    setFile(null);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} >
      <DialogTitle style={{textAlign: 'center'}}>Add Client</DialogTitle >
      <DialogContent >
        <div style={{ display: 'flex', marginBottom: '20px' }}>
          <div style={{ marginRight: '20px', flex: 1 }}>
            <label htmlFor="clientName">Client Name*</label>
            <TextField id="clientName" margin="dense" fullWidth />
          </div>
          <div style={{ flex: 1 }}>
            <label htmlFor="clientDetails">Client Details*</label>
            <TextField id="clientDetails" margin="dense" fullWidth />
          </div>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="loremIpsum">Lorem Ipsum</label>
          <TextField id="loremIpsum" margin="dense" fullWidth />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="clientDocuments">Client Documents</label>
          <div  
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            {file ? (
              <div>{file.name}</div>
            ) : (
              <div className={`${styles.dropZone}`}>
                Drag and drop or{' '}
                <label htmlFor="fileInput" style={{ color: 'blue', cursor: 'pointer' }}>
                  click here to upload document
                </label>
                <input
                  type="file"
                  id="fileInput"
                  accept=".pdf,.doc,.docx"
                  style={{ display: 'none' }}
                  onChange={handleFileInput}
                />
              </div>
            )}
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} >Cancel</Button>
        <Button onClick={handleSave} > Save </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddClientDialog;