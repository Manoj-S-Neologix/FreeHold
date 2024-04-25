import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Button as MuiButton, IconButton, Box, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import DragAndDropUpload from '../../../../Common/DragAndDrop/DragAndDrop';
import DeleteDialog from "../Delete/Delete";
import ClientService from '../../Services/Business/ClientService';

interface UploadDocumentProps {
    open: boolean;
    onClose: () => void;
    particularClientAllData: any
}

const UploadDocument: React.FC<UploadDocumentProps> = ({ open, onClose, particularClientAllData }) => {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [files, setFiles] = useState<File[]>([]);
    const { handleSubmit } = useForm();
    console.log(particularClientAllData, "ClientData")


    // const fetchData = async () => {
    //     if (particularClientAllData.length > 0) {
    //         const clientService: any = ClientService(); 
    //         const folderGUID = particularClientAllData[0].GUID;
    //         try {
    //             const results = await clientService.getDocumentsFromFolder(folderGUID);
    //             console.log(results, "lib name");
    //         } catch (error) {
    //             console.error("Error fetching documents:", error);
    //         }
    //     }
    // };

    const fetchData = async () => {
        if (particularClientAllData.length > 0) {
            const clientService: any = ClientService();
            const folderGUID = particularClientAllData[0].GUID;
            try {
                const results = await clientService.getDocumentsFromFolder(folderGUID);
                console.log(results, "lib name");
            } catch (error) {
                console.error("Error fetching documents:", error);
            }
        } else {
            console.warn("No data in particularClientAllData");
        }
    };



    useEffect(() => {
        fetchData();
    }, [particularClientAllData]);


    const handleCloseDeleteDialog = () => {
        setIsDeleteDialogOpen(false);
    };


    const fileInfoArray = files?.map((file: any) => ({
        lastModified: file.lastModified,
        lastModifiedDate: file.lastModifiedDate,
        name: file.name,
        size: file.size,
        type: file.type,
        webkitRelativePath: file.webkitRelativePath
    }));

    console.log(fileInfoArray, 'fileInfoArray');

    const handleSave = handleSubmit(async (data: any) => {
        try {
            const apiResponse = ClientService();

            console.log(particularClientAllData[0].name, "name");
            console.log(fileInfoArray);
            await apiResponse.addDocumentsToFolder(particularClientAllData[0].name, fileInfoArray);



            handleCancel();
            setFiles([]);
        } catch (error) {
            console.error("Failed to add client and document:", error);
        }
    });



    const handleCancel = () => {
        onClose();
    };

    return (
        <Box sx={{ width: '100', padding: '20px' }}>
            <Stack direction="column" spacing={2}>
                <Dialog open={open} onClose={onClose}>
                    <DialogTitle>
                        <div className="d-flex flex-column">
                            <div className="d-flex justify-content-between align-items-center relative">
                                <h4 style={{ margin: '0', color: '#125895' }}>View/Upload Documents</h4>
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
                        <Stack direction={"column"} spacing={2}>
                            <Box>
                                <DragAndDropUpload
                                    onFilesAdded={(files: File[]) => {
                                        setFiles(prevFiles => [...prevFiles, ...files]); // Add uploaded files to state
                                    }}
                                />
                            </Box>
                            <DialogActions sx={{ px: 0, mr: 0 }}>
                                <MuiButton
                                    onClick={handleSave}
                                    type="submit"
                                    variant="contained"
                                >
                                    Save
                                </MuiButton>
                                <MuiButton style={{ marginRight: '30px' }}
                                    onClick={handleCancel}
                                    variant="outlined"
                                >
                                    Cancel
                                </MuiButton>
                            </DialogActions>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Document Name</TableCell>
                                            <TableCell>Uploaded Date</TableCell>
                                            <TableCell>Uploaded By</TableCell>
                                            <TableCell>Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {[
                                            { id: 1, name: 'Document 1', uploadedDate: '2024-04-22', uploadedBy: 'User 1' },
                                            { id: 2, name: 'Document 2', uploadedDate: '2024-04-21', uploadedBy: 'User 2' },
                                        ].map((document) => (
                                            <TableRow key={document.id}>
                                                <TableCell>{document.name}</TableCell>
                                                <TableCell>{document.uploadedDate}</TableCell>
                                                <TableCell>{document.uploadedBy}</TableCell>
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
                </Dialog>
                {isDeleteDialogOpen && (
                    <DeleteDialog open={isDeleteDialogOpen} onClose={handleCloseDeleteDialog} clientDetails={""} />
                )}
            </Stack>
        </Box>
    );
};

export default UploadDocument;
