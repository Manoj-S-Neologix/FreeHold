import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import styles from './AddStaff.module.scss';
import { Box, Stack } from '@mui/material';
import { createFolderInLibrary, uploadDocumentToLibrary, addListItem } from '../../Services/apiService';


// console.log(handleDeleteFile)
const AddStaffDialog = ({ open, onClose, props }: any) => {
    console.log(props.context.props.context, "props");
    const [files, setFiles] = useState<File[]>([]);
    const [title, setTitle] = useState<string>('');
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



    return (
        <Box sx={{ width: '100', padding: '20px' }}>
            <Stack direction="column" spacing={2}>
                <Dialog open={open} onClose={handleCancel} maxWidth='sm' fullWidth  >
                    <DialogTitle className={styles.addTitle} style={{ textAlign: 'center', marginLeft: '7px', position: 'relative' }}>
                        <div className="d-flex flex-column">
                            <div className="d-flex justify-content-between
                     align-items-center relative">
                                <h4 style={{ margin: '0', color: '#125895' }}>
                                    Assign Staff</h4>
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
                        
                    </DialogContent>
                    <DialogActions sx={{ padding: '10px', marginRight: '14px' }}>
                        <Button
                            onClick={handleSave}
                            variant="contained"
                            color="primary"
                            sx={{
                                maxWidth: '150px',
                                float: 'right',
                            }}
                        >
                            save
                        </Button>
                        <Button variant="outlined" onClick={handleCancel}>
                            Clear
                        </Button>
                    </DialogActions>
                </Dialog>
            </Stack>
        </Box>
    );
};

export default AddStaffDialog;

