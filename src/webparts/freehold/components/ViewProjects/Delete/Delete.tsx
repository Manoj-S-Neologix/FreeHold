// /* eslint-disable no-unused-expressions */
// import React, { useState } from 'react';
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
// import DialogActions from '@mui/material/DialogActions';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';
// import styles from './Delete.module.scss';
// import { Box, Stack, CircularProgress } from '@mui/material';

// import { Delete } from '@mui/icons-material';
// import { addListItem,createFolderInLibrary, uploadDocumentToLibrary } from "../../../Services/Core/ClientService";
// import ClientService from "../../../Services/Business/ClientService";
// // import ProjectService from '../../Services/Business/ProjectService';


// interface DeleteDialogProps {
//   open: boolean;
//   onClose: () => void;
//   clientDetails: any;
//   // projectDetails: any;
// }

// const DeleteDialog: React.FC<DeleteDialogProps> = ({ open, onClose, clientDetails }) => {
//   const [files, setFiles] = useState<File[]>([]);
//   const [title, setTitle] = useState<string>('');
//   const [loading, setLoading] = useState(false);


//   const handleDeleteFile = (index: number) => {
//     setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
//   };

//   console.log(clientDetails, 'details')

//   const handleCancel = () => {
//     setFiles([]);
//     setTitle('');
//     onClose();
//   };

//   const handleSave = async () => {
//   try{
//     setLoading(true);

//     await handledeleteClient(clientDetails.Id, clientDetails.name)
//     onClose();
//   }
//   catch{
//     setLoading(false);
//     console.error();
    
//   }
//     false && await handleAddClientSubmit();
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

//         alert('Project and Document(s) added successfully!');
//         setFiles([]);
//         setTitle('');
//       } catch (error) {
//         console.error('Error adding project and document:', error);
//         alert('Failed to add project and document. Please check the console for details.');
//       }
//     } else {
//       alert('Please enter a title.');
//     }
//   };

//    //delete code start

//    const handledeleteClient = async (clientId:any, Title:any) => {
//     try {
//         await ClientService().deleteClient("Client_Informations", clientId);
//         await ClientService().deleteLibrary(Title);
//         // console.log(response, "delete response");
//         console.log('Project deleted successfully');
//         // navigateToClient();
        

//     } catch (error) {
//         console.error('Error deleting Project:', error);
//     }
// };


// //delete code end

//   const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     const droppedFiles = Array.from(e.dataTransfer.files);
//     setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
//   };


//   return (
//     <Box sx={{ width: '100', padding: '20px' }}>
//       <Stack direction="column" spacing={2}>
//         <Dialog open={open} maxWidth='sm' fullWidth  >
//           <DialogTitle className={styles.addTitle} style={{ textAlign: 'center', marginLeft: '7px', position: 'relative' }}>
//             <div className="d-flex flex-column">
//               <div className="d-flex justify-content-between
//                      align-items-center relative">
//                 <h4 style={{ margin: '0', color: '#125895' }}>
//                   Delete Project</h4>
//               </div>
//               <div style={{
//                 height: '4px', width: '100%',
//                 backgroundColor: '#125895'
//               }} />
//             </div>
//           </DialogTitle>
//           {!loading && <IconButton
//             aria-label="close"
//             onClick={handleCancel}
//             sx={{
//               position: "absolute",
//               right: "14px",
//               top: "8px",
//               color: (theme: any) => theme.palette.grey[500],
//             }}
//           >
//             <CloseIcon />
//           </IconButton>}
//           <DialogContent >
//             {false && <div style={{ marginBottom: '20px' }}>
//               <label htmlFor="clientName">Project Name<span style={{ color: 'red' }}>*</span></label>

//               <TextField id="clientName" margin="dense" size="small"
//                 fullWidth value={title} onChange={(e) => setTitle(e.target.value)} />
//             </div>}
//             {false && <div style={{ marginBottom: '10px' }}>
//               <label htmlFor="clientDocuments">Project Documents</label>
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


//               </div>
//             </div>}
//             <div style={{ marginLeft: '7px' }}>
//               Are you sure you want to delete Project
//               <strong style={{ marginLeft: '2px' }}>{clientDetails.name}
//               </strong>
//               ?
//             </div>
//           </DialogContent>
//           <DialogActions sx={{ padding: '10px', marginRight: '14px' }}>
//             {/* <Button
//               onClick={handleSave}
//               variant="contained"
//               color="primary"
//               sx={{
//                 maxWidth: '150px',
//                 float: 'right',
//               }}
//             >
//               Delete
//             </Button>
//             <Button variant="outlined" onClick={handleCancel}>
//               Cancel
//             </Button> */}
//                <Stack
//               direction="row"
//               justifyContent="end"
//               alignItems="center"
//               spacing={3}
//             >
//               <Button variant="contained"  color="primary"
//                 sx={{ width: loading ? '150px' : 'auto' }}
//                 onClick={handleSave} disabled={loading}>
//                 {loading ? (
//                   <CircularProgress size={20} color="inherit" />
//                 ) : (
//                   "Delete"
//                 )}
//               </Button>
//               {!loading && <Button variant="outlined" onClick={handleCancel}  >Cancel</Button>}
//             </Stack>
//           </DialogActions>
//         </Dialog>
//       </Stack>
//     </Box>
//   );
// };

// export default DeleteDialog;



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
// import { Delete } from '@mui/icons-material';
import styles from './Delete.module.scss';
import ProjectService from '../../../Services/Business/ProjectService'; // Import ProjectService
import toast from 'react-hot-toast';


interface DeleteDialogProps {
  open: boolean;
  onClose: () => void;
  projectDetails: any; // Use projectDetails instead of clientDetails
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
      toast.success('Project deleted Successfully !');
      fetchData();

      onClose();
    } catch (error) {
      toast.error('Error deleting Project:', error);
      setLoading(false); 
    }
  };

  // const handleDeleteProject = async () => {
  //   setLoading(true);
  //   ProjectService().deleteClient("Project_Informations", projectDetails.Id)
  //     .then(() => {
  //       return ProjectService().deleteLibrary("Project_Informations", projectDetails.Id);
  //     })
  //     .then(() => {
  //       toast.success('Project deleted Successfully !');
  //       console.log('Project deleted Successfully !');
  //       // setFiles([]);
  //       fetchData();
  //     })
  //     .catch((error) => {
  //       const errorMessage = error || 'An error occurred while deleting client and associated document.';
  //       toast.error(`Failed to delete client and associated document. ${errorMessage}`);
  //       console.error('Error deleting client:', error);
  //     });
  // };

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


