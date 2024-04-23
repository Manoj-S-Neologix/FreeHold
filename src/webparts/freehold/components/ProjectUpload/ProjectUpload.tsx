// import React, { useState } from 'react';
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
// import DialogActions from '@mui/material/DialogActions';
// import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { Box, Stack } from '@mui/material';
// import DragAndDropUpload from '../../../../Common/DragAndDrop/DragAndDrop';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import DeleteDialog from "../Delete/Delete";

// interface UploadDocumentProps {
//   open: boolean;
//   onClose: () => void;
// }

// const ViewUpload: React.FC<UploadDocumentProps> = ({ open, onClose }) => {
//   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

//   const handleCloseDeleteDialog = () => {
//     setIsDeleteDialogOpen(false);
//   };

//   const handleSave = () => {
//     onClose();
//   };

//   const handleCancel = () => {
//     onClose();
//   };

//   return (
//     <Box sx={{ width: '100', padding: '20px' }}>
//       <Stack direction="column" spacing={2}>
//         <Dialog open={open} onClose={onClose}>
//           <DialogTitle>
//             View/Upload Documents
//             <IconButton
//               aria-label="close"
//               onClick={onClose}
//               sx={{
//                 position: 'absolute',
//                 right: '14px',
//                 top: '8px',
//                 color: (theme: any) => theme.palette.grey[500],
//               }}
//             >
//               <CloseIcon />
//             </IconButton>
//           </DialogTitle>
//           <DialogContent>
//             <Stack direction={"column"} spacing={3}>
              
//                 <Box>
//             <DragAndDropUpload
//               onFilesAdded={(files: File[]) => {
//                 //console.log(files);
//               }}
//             />
//             </Box>
//             <TableContainer>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>Item Name</TableCell>
//                     <TableCell>Modified Date</TableCell>
//                     <TableCell>Modified By</TableCell>
//                     <TableCell>Upload Date</TableCell>
//                     <TableCell>Action</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {[
//                     { id: 1, name: 'Folder Name', modifiedDate: '2024-04-22', modifiedBy: 'User 1', uploadDate: '2024-04-20' },
//                     { id: 2, name: 'Document Name', modifiedDate: '2024-04-21', modifiedBy: 'User 2', uploadDate: '2024-04-19' },
//                   ].map((document) => (
//                     <TableRow key={document.id}>
//                       <TableCell>{document.name}</TableCell>
//                       <TableCell>{document.modifiedDate}</TableCell>
//                       <TableCell>{document.modifiedBy}</TableCell>
//                       <TableCell>{document.uploadDate}</TableCell>
//                       <TableCell>
//                         <IconButton onClick={() => setIsDeleteDialogOpen(true)}>
//                           <DeleteIcon color="error" />
//                         </IconButton>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//             </Stack>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleSave} variant="contained" color="primary">
//               Save
//             </Button>
//             <Button onClick={handleCancel} variant='outlined'>Cancel</Button>
//           </DialogActions>
//         </Dialog>
//         {isDeleteDialogOpen && (
//           <DeleteDialog open={isDeleteDialogOpen} onClose={handleCloseDeleteDialog} clientDetails={""}/>
//         )}
//       </Stack>
//     </Box>
//   );
// };

// export default ViewUpload;


import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Stack, Grid } from '@mui/material';
import DragAndDropUpload from '../../../../Common/DragAndDrop/DragAndDrop';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import { Controller, useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Checkbox from '@mui/material/Checkbox';
// import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import DeleteDialog from '../Delete/Delete';

interface UploadDocumentProps {
  open: boolean;
  onClose: () => void;
}

const ViewUpload: React.FC<UploadDocumentProps> = ({ open, onClose }) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleSave = () => {
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  const { control, handleSubmit, formState: { errors } } = useForm();
  const [isUnitDocumentChecked, setIsUnitDocumentChecked] = useState(false);

  return (
    <Box sx={{ width: '100', padding: '20px' }}>
      <Stack direction="column" spacing={2}>
        <Dialog open={open} onClose={onClose}>
          {/* <DialogTitle>
            View/Upload Documents
            <IconButton
              aria-label="close"
              onClick={onClose}
              sx={{
                position: 'absolute',
                right: '14px',
                top: '8px',
                color: (theme: any) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle> */}
                    <DialogTitle >

                <div className="d-flex flex-column">
                  <div className="d-flex justify-content-between
                        align-items-center relative">
                    <h4 style={{ margin: '0', color: '#125895' }}>
                    View/Upload Documents</h4>
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
          <DialogContent>
            <Stack direction="column" spacing={3}>
            <form onSubmit={handleSubmit(handleSave)}>
                <Stack direction="column" gap={3}>
                  <Grid container spacing={2}>
                    <Grid item sm={6}>
                      <Controller
                        name="clientName"
                        control={control}
                        defaultValue=""
                        rules={{ required: 'Client Name is required' }}
                        render={({ field }) => (
                          <>
                            <InputLabel htmlFor="client-name">Client Name</InputLabel>
                            <TextField
                              {...field}
                              id="client-name"
                              fullWidth
                              variant="outlined"
                              select
                              size="small"
                              required
                              label=""
                              error={!!errors.clientName}
                            >
                              <MenuItem value="">None</MenuItem>
                              <MenuItem value="Client A">Client A</MenuItem>
                              <MenuItem value="Client B">Client B</MenuItem>
                            </TextField>
                            <FormHelperText error>
                              {errors.clientName && errors.clientName.message}
                            </FormHelperText>
                          </>
                        )}
                      />
                    </Grid>
                    <Grid item sm={6}>
                      <Stack direction="row" alignItems="center">
                        <Checkbox
                          checked={isUnitDocumentChecked}
                          onChange={(e) => setIsUnitDocumentChecked(e.target.checked)}
                          size="small"
                          sx={{ p: 0, mr: 2 }}
                        />
                        <InputLabel>Is Unit Document</InputLabel>
                      </Stack>
                      <Controller
                        name="unitDocument"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <TextField
                            {...field}
                            id="is-unit-document"
                            fullWidth
                            select
                            disabled={!isUnitDocumentChecked}
                            variant="outlined"
                            placeholder="Select Unit..."
                            size="small"
                            required
                          >
                            <MenuItem value="">None</MenuItem>
                            <MenuItem value="Option A">Option A</MenuItem>
                            <MenuItem value="Option B">Option B</MenuItem>
                          </TextField>
                        )}
                      />
                    </Grid>
                  </Grid>
                </Stack>
                {/* <DialogActions>
                  <Button onClick={handleCancel} variant="outlined">
                    Cancel
                  </Button>
                  <Button type="submit" variant="contained" color="primary">
                    Save
                  </Button>
                </DialogActions> */}
              </form>
              <Box>
                <DragAndDropUpload
                  onFilesAdded={(files: File[]) => {
                    //console.log(files);
                  }}
                />
              </Box>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Item Name</TableCell>
                      <TableCell>Modified Date</TableCell>
                      <TableCell>Modified By</TableCell>
                      <TableCell>Upload Date</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {[
                      { id: 1, name: 'Folder Name', modifiedDate: '2024-04-22', modifiedBy: 'User 1', uploadDate: '2024-04-20' },
                      { id: 2, name: 'Document Name', modifiedDate: '2024-04-21', modifiedBy: 'User 2', uploadDate: '2024-04-19' },
                    ].map((document) => (
                      <TableRow key={document.id}>
                        <TableCell>{document.name}</TableCell>
                        <TableCell>{document.modifiedDate}</TableCell>
                        <TableCell>{document.modifiedBy}</TableCell>
                        <TableCell>{document.uploadDate}</TableCell>
                        <TableCell>
                          <IconButton onClick={() => setIsDeleteDialogOpen(true)}>
                            <DeleteIcon color="error" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
         
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSave} variant="contained" color="primary">
              Save
            </Button>
            <Button onClick={handleCancel} variant="outlined">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
        {isDeleteDialogOpen && (
          <DeleteDialog open={isDeleteDialogOpen} onClose={handleCloseDeleteDialog} clientDetails="" />
        )}
      </Stack>
    </Box>
  );
};

export default ViewUpload;
