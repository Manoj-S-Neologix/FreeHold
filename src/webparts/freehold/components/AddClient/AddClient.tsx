// import React, { useState } from 'react';
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
// import DialogActions from '@mui/material/DialogActions';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';
// import styles from './AddClient.module.scss';
// import { Box, Stack } from '@mui/material';
// import { createFolderInLibrary, uploadDocumentToLibrary, addListItem } from '../AddClient/apiService';
// import { Delete } from '@mui/icons-material';

// interface AddClientDialogProps {
//   open: boolean;
//   onClose: () => void;
// }

// const AddClientDialog: React.FC<AddClientDialogProps> = ({ open, onClose }) => {
//   const [files, setFiles] = useState<File[]>([]);
//   const [title, setTitle] = useState<string>('');

//   const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFiles = e.target.files;
//     if (selectedFiles) {
//       const newFiles = Array.from(selectedFiles);
//       setFiles((prevFiles) => [...prevFiles, ...newFiles]);
//     }
//   };

//   const handleDeleteFile = (index: number) => {
//     setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
//   };

//   const handleCancel = () => {
//     setFiles([]);
//     setTitle('');
//     onClose();
//   };

//   const handleSave = async () => {
//     onClose();
//     await handleAddClientSubmit();
//   };

//   const handleAddClientSubmit = async () => {
//     if (title) {
//       try {
//         const obj = {
//           Name: title,
//         };
//         await addListItem('Clients', obj);

//         if (files.length > 0) {
//           const currentDate = new Date().toISOString().slice(0, 10);
//           const formattedDate = currentDate.replace(/-/g, '');
//           const folderName = `${title}_${formattedDate}`;

//           await createFolderInLibrary('SPDocument', folderName);

//           for (const file of files) {
//             await uploadDocumentToLibrary('SPDocument', folderName, file.name, file);
//           }
//         }

//         alert('Client and Document(s) added successfully!');
//         setFiles([]);
//         setTitle('');
//       } catch (error) {
//         console.error('Error adding client and document:', error);
//         alert('Failed to add client and document. Please check the console for details.');
//       }
//     } else {
//       alert('Please enter a title.');
//     }
//   };

//   const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     const droppedFiles = Array.from(e.dataTransfer.files);
//     setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
//   };

//   return (
//     <Box sx={{ width: '100', padding: '20px' }}>
//       <Stack direction="column" spacing={2}>
//         <Dialog open={open} onClose={handleCancel} maxWidth="md" className={styles.dialogOverlayAddClient}>
//           <DialogTitle className={styles.addTitle} style={{ textAlign: 'center', marginLeft: '7px' }}>
//             Add Client
//             <IconButton aria-label="close" onClick={handleCancel} sx={{ position: 'absolute', right: 8, top: 8 }}>
//               <CloseIcon />
//             </IconButton>
//           </DialogTitle>
//           <DialogContent>
//             <div style={{ marginBottom: '20px' }}>
//               <label htmlFor="clientName">Client Name*</label>
//               <TextField id="clientName" margin="dense" fullWidth value={title} onChange={(e) => setTitle(e.target.value)} />
//             </div>
//             <div style={{ marginBottom: '10px' }}>
//               <label htmlFor="clientDocuments">Client Documents</label>
//               <div
//                 onDrop={handleDrop}
//                 onDragOver={(e) => e.preventDefault()}
//                 className={styles.dropZone}
//               >
//                 {files.map((file, index) => (
//                   <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
//                     <div>{file.name}</div>
//                     <IconButton
//                       aria-label="delete"
//                       onClick={() => handleDeleteFile(index)}
//                       style={{ marginLeft: 'auto' }}
//                     >
//                       <Delete />
//                     </IconButton>
//                   </div>
//                 ))}
//                 <div>
//                   Drag and drop or{' '}
//                   <label htmlFor="fileInput" style={{ color: 'blue', cursor: 'pointer' }}>
//                     click here to upload document
//                   </label>
//                   <input
//                     type="file"
//                     id="fileInput"
//                     accept=".pdf,.doc,.docx,.txt"
//                     style={{ display: 'none' }}
//                     onChange={handleFileInput}
//                     multiple 
//                   />
//                 </div>
//               </div>
//             </div>
//           </DialogContent>
//           <DialogActions>
//             {/* <Button onClick={handleCancel} className={styles.AddcancelButton}>Cancel</Button>
//             <Button onClick={handleSave} className={styles.AddsaveButton}>Save</Button> */}
//             <Button onClick={handleCancel} variant="contained">Cancel</Button>
//             <Button onClick={handleSave} variant="contained">Save</Button>

//           </DialogActions>
//         </Dialog>
//       </Stack>
//     </Box>
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
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import styles from './AddClient.module.scss';
import { Box, Stack } from '@mui/material';
import { createFolderInLibrary, uploadDocumentToLibrary, addListItem } from '../AddClient/apiService';
import { Delete } from '@mui/icons-material';
// import { Upload } from '@mui/icons-material';
// import UploadFileIcon from '@mui/icons-material/UploadFile';


interface AddClientDialogProps {
  open: boolean;
  onClose: () => void;
}

const AddClientDialog: React.FC<AddClientDialogProps> = ({ open, onClose }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [title, setTitle] = useState<string>('');

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      const newFiles = Array.from(selectedFiles);
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  const handleDeleteFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleCancel = () => {
    setFiles([]);
    setTitle('');
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

        alert('Client and Document(s) added successfully!');
        setFiles([]);
        setTitle('');
      } catch (error) {
        console.error('Error adding client and document:', error);
        alert('Failed to add client and document. Please check the console for details.');
      }
    } else {
      alert('Please enter a title.');
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
  };


  return (
    <Box sx={{ width: '100', padding: '20px' }}>
      <Stack direction="column" spacing={2}>
        <Dialog open={open} onClose={handleCancel} maxWidth='sm' fullWidth className={styles.dialogOverlayAddClient} >
          {/* <DialogTitle className={styles.addTitle} style={{ textAlign: 'center', marginLeft: '7px' }}>
            Add Client
            <IconButton aria-label="close" onClick={handleCancel} sx={{ position: 'absolute', right: 8, top: 8 }}>
              <CloseIcon />
            </IconButton>
          </DialogTitle> */}

            <DialogTitle className={styles.addTitle} style={{ textAlign: 'center', marginLeft: '7px', position: 'relative' }}>
            Add Client
            <hr style={{ position: 'absolute', bottom: '-8px', left: '50%', transform: 'translateX(-50%)', width: '80px', border: '1px solid black' }} />
            <IconButton aria-label="close" onClick={handleCancel} sx={{ position: 'absolute', right: 8, top: 8 }}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent >
            <div style={{ marginBottom: '20px' }}>
              {/* <label htmlFor="clientName">Client Name*</label> */}
              <label htmlFor="clientName">Client Name<span style={{color:'red'}}>*</span></label>

              <TextField id="clientName" margin="dense" fullWidth value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="clientDocuments">Client Documents</label>
              <div
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                className={styles.dropZone}
              >
                {files.map((file, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                    <div>{file.name}</div>
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDeleteFile(index)}
                      style={{ marginLeft: 'auto' }}
                    >
                      <Delete />
                    </IconButton>
                  </div>
                ))}
                <div style={{ display: "flex", justifyContent:'space-between', alignItems:'center' }}>
                  <div style={{width: "50%"}}>
                    {/* <IconButton >
                  <UploadFileIcon fontSize='large'/>
                  </IconButton> */}
                    <img src={require('./../../../../assets/Images/UploadImage.jpg')}
                     width="90"
                     height="70"
                     alt="Upload Image"
                    />
                  </div>
                  <div style={{width: "50%"}}>
                    <div style={{ display: "flex", flexDirection:"column", textAlign:'left'}}>
                    <div>
                  Drag and drop 
                  </div>
                  <div>or{' '}</div>
                  <div>
                  <label htmlFor="fileInput" style={{ color: 'blue', cursor: 'pointer' }}>
                    click here to upload document                  
                  </label>
                  </div>
                  </div>
                  <input
                    type="file"
                    id="fileInput"
                    accept=".pdf,.doc,.docx,.txt"
                    style={{ display: 'none' }}
                    onChange={handleFileInput}
                    multiple 
                  />
                </div>
                </div>
                
              </div>
            </div>
          </DialogContent>
          <DialogActions sx={{padding:'10px', marginRight:'14px'}}>
            {/* <Button onClick={handleCancel} className={styles.AddcancelButton}>Cancel</Button>
            <Button onClick={handleSave} className={styles.AddsaveButton}>Save</Button> */}
            <Button onClick={handleSave} variant="contained">Save</Button>
            <Button onClick={handleCancel} variant="contained">Cancel</Button>
          </DialogActions>
        </Dialog>
      </Stack>
    </Box>
  );
};

export default AddClientDialog;


