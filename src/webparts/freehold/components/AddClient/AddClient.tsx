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
import { createFolderInLibrary, uploadDocumentToLibrary, addListItem } from '../../Services/Core/ClientService';
// import DeleteDialog from "../Delete/Delete";
import DragAndDropUpload from '../../../../Common/DragAndDrop/DragAndDrop';


const AddClientDialog = ({ open, onClose, props }: any) => {
  const [files, setFiles] = useState<File[]>([]);
  const [title, setTitle] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [contact, setContact] = useState<string>('');
  
  const handleFileInput = (selectedFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  const handleCancel = () => {
    setFiles([]);
    setTitle('');
    setEmail('');
    setContact('');
    onClose();
  };
  
  const handleSave = async () => {
    onClose();
    await handleAddClientSubmit();
  };

  const handleAddClientSubmit = async () => {
    if (title) {
      try {
        const obj = {
          Name: title,
          Email: email,
          Contact: contact,
        };
        await addListItem('Clients', obj);

        if (files.length > 0) {
          const currentDate = new Date().toISOString().slice(0, 10);
          const formattedDate = currentDate.replace(/-/g, '');
          const folderName = `${title}_${formattedDate}`;

          await createFolderInLibrary('SPDocument', folderName);

          for (const file of files) {
            await uploadDocumentToLibrary('SPDocument', folderName, file.name, file);
          }
        }

        // alert('Client and Document(s) added successfully!');
        setFiles([]);
        setTitle('');
      } catch (error) {
        console.error('Error adding client and document:', error);
        // alert('Failed to add client and document. Please check the console for details.');
      }
    } else {
      // alert('Please enter a title.');
    }
  };

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
          <Grid container spacing={2}>
          <Grid item sm={6}>
            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="clientName">Client Name<span style={{ color: 'red' }}>*</span></label>
              <TextField
                id="clientName"
                margin="dense"
                size="small"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            </Grid>
            <Grid item sm={6}>
            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="clientEmail">Client Email<span style={{ color: 'red' }}>*</span></label>
              <TextField
                id="clientEmail"
                margin="dense"
                size="small"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            </Grid>
            </Grid>
            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="clientContact">Client Contact<span style={{ color: 'red' }}>*</span></label>
              <TextField
                id="clientContact"
                margin="dense"
                size="small"
                fullWidth
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
              </div>
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="clientDocuments">Client Documents</label>
              <DragAndDropUpload onFilesAdded={handleFileInput} />
            </div>
          </DialogContent>

          <DialogActions sx={{ padding: '10px', marginRight: '14px', mt:'0px' }}>
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

