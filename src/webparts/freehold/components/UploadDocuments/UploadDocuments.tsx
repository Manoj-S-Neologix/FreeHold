import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Stack } from '@mui/material';
import DragAndDropUpload from '../../../../Common/DragAndDrop/DragAndDrop';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeleteDialog from "../Delete/Delete";

interface UploadDocumentProps {
    open: boolean;
    onClose: () => void;
}

const UploadDocument: React.FC<UploadDocumentProps> = ({ open, onClose }) => {
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

    return (
        <Box sx={{ width: '100', padding: '20px' }}>
            <Stack direction="column" spacing={2}>
                <Dialog open={open} onClose={onClose}>
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
                        <Stack direction={"column"} spacing={3}>
                            <Box>
                                <DragAndDropUpload
                                    onFilesAdded={(files: File[]) => {
                                        console.log(files);
                                    }}
                                />
                            </Box>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Document Name</TableCell>
                                            <TableCell>Modified Date</TableCell>
                                            <TableCell>Modified By</TableCell>
                                            <TableCell>Upload Date</TableCell>
                                            <TableCell>Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {[
                                            { id: 1, name: 'Document 1', modifiedDate: '2024-04-22', modifiedBy: 'User 1', uploadDate: '2024-04-20' },
                                            { id: 2, name: 'Document 2', modifiedDate: '2024-04-21', modifiedBy: 'User 2', uploadDate: '2024-04-19' },
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
                        <Button onClick={handleCancel} variant='outlined'>Cancel</Button>
                    </DialogActions>
                </Dialog>
                {isDeleteDialogOpen && (
                    <DeleteDialog open={isDeleteDialogOpen} onClose={handleCloseDeleteDialog} clientDetails={""} />
                )}
            </Stack>
        </Box>
    );
};

export default UploadDocument;
