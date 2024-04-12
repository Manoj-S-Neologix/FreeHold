// import React from 'react';
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
// import DialogActions from '@mui/material/DialogActions';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';

// interface AddClientDialogProps {
//   open: boolean;
//   onClose: () => void;
// }

// const AddClientDialog: React.FC<AddClientDialogProps> = ({ open, onClose }) => {
//   return (
//     <Dialog open={open} onClose={onClose}>
//       <DialogTitle>Add Client</DialogTitle>
//       <DialogContent>
//         <TextField autoFocus margin="dense" label="Client Name" fullWidth />
//         {/* Add more fields as needed */}
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose}>Cancel</Button>
//         <Button onClick={onClose} color="primary">Save</Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default AddClientDialog;


// import * as React from 'react';
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
// import DialogActions from '@mui/material/DialogActions';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';

// interface AddClientDialogProps {
//   open: boolean;
//   onClose: () => void;
// }

// const AddClientDialog: React.FC<AddClientDialogProps> = ({ open, onClose }) => {
//   return (

//     <Dialog open={open} onClose={onClose}>
//       <DialogTitle>Add Client</DialogTitle>
//       <DialogContent>
//         <div style={{ display: 'flex', marginBottom: '20px' }}>
//           <div style={{ marginRight: '20px', flex: 1 }}>
//             <label htmlFor="clientName">Client Name</label>
//             <TextField id="clientName" autoFocus margin="dense" fullWidth />
//           </div>
//           <div style={{ flex: 1 }}>
//             <label htmlFor="clientDetails">Client Details</label>
//             <TextField id="clientDetails" margin="dense" fullWidth />
//           </div>
//         </div>
//         <div style={{ marginBottom: '20px' }}>
//           <label htmlFor="loremIpsum">Lorem Ipsum</label>
//           <TextField id="loremIpsum" margin="dense" fullWidth />
//         </div>
//         <div style={{ marginBottom: '20px' }}>
//           <label htmlFor="clientDocuments">Client Documents</label>
//           {/* <TextField id="clientDocuments" margin="dense" fullWidth /> */}
//           <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center' }}>
//             <Button variant="outlined" fullWidth>
//               Click here to upload document
//             </Button>
//             {/* Upload icon can be added here */}
//           </div>
//         </div>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose}>Cancel</Button>
//         <Button onClick={onClose} color="primary">Save</Button>
//       </DialogActions>
//     </Dialog>

//   );
// };

// export default AddClientDialog;




import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import styles from './Addclient.module.scss';

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
    // Handle saving the file here
    // You can use the 'file' state
    setFile(null);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} className={`${styles.dialogOverlay}`}>
      <DialogTitle className={`${styles.dialogTitle }`}>Add Client</DialogTitle >
      <DialogContent className={`${styles.dialogContent}`}>
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
          <div  className={`${styles.dropZone}`}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            {file ? (
              <div>{file.name}</div>
            ) : (
              <div>
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
        <Button  className={`${styles.AddcancelButton}`} onClick={handleCancel} >Cancel</Button>
        <Button className={`${styles.AddsaveButton}`} onClick={handleSave} > Save </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddClientDialog;

