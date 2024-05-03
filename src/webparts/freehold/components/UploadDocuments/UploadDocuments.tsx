import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Button, IconButton, Box, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
// import DragAndDropUpload from '../../../../Common/DragAndDrop/DragAndDrop';
import ClientService from '../../Services/Business/ClientService';
import styles from "./UploadDocuments.module.scss";
import formatDate from "../../hooks/dateFormat";
import toast from 'react-hot-toast';
import DropZone from '../../../../Common/DropZone/DropZone';



interface UploadDocumentProps {
    open: boolean;
    onClose: () => void;
    particularClientAllData: any;
    fetchDatas: () => any;
}

const UploadDocument: React.FC<UploadDocumentProps> = ({ open, onClose, particularClientAllData, fetchDatas }) => {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [deleteId, setDeleteId] = useState<number>(0);
    const [files, setFiles] = useState<File[]>([]);
    const [fileData, setFileData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const { handleSubmit } = useForm();
    const [uploadFiles, setUploadFiles] = useState<any[]>([]);

    const handleFileInput = (selectedFiles: File[]) => {
        console.log(selectedFiles, "selectedFiles");
        setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    };

    React.useEffect(() => {
        setFiles([]);
    }, []);


    console.log(files, "files");

    console.log(particularClientAllData, "ClientData");


    const fetchData = async () => {
        if (particularClientAllData.length > 0) {
            const clientService: any = ClientService();
            const folderGUID = particularClientAllData[0].GUID;
            try {
                const results = await clientService.getDocumentsFromFolder(folderGUID);
                console.log(results, "File Datas");
                console.log("Folder GUID:", folderGUID);
                setFileData(results);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                console.error("Error fetching documents:", error);
            }
        } else {
            console.warn("No data in particularClientAllData");
        }
    };



    console.log(fileData, "fileData");



    const mappedFiles = fileData.map((file: any) => ({
        id: file.Id,
        fileName: file.FileLeafRef,
        url: file.FileRef,
        fileType: file.File_x0020_Type,
        created: file.Created,
        editorName: file.Editor.Title,
        editorId: file.Editor.Id
    }));

    console.log(mappedFiles);



    useEffect(() => {
        fetchData();
    }, [particularClientAllData, files]);



    const handleCloseDeleteDialog = () => {
        setIsDeleteDialogOpen(false);
        fetchData();
    };


    const fileInfoArray = uploadFiles?.map((file: any) => ({
        lastModified: file.lastModified,
        lastModifiedDate: file.lastModifiedDate,
        name: file.name,
        size: file.size,
        type: file.type,
        webkitRelativePath: file.webkitRelativePath
    }));

    console.log(fileInfoArray, 'fileInfoArray');

    console.log(uploadFiles, "uploadFiles");

    const handleSave = handleSubmit(async (data: any) => {
        setLoading(true);
        const apiResponse = ClientService();

        console.log(particularClientAllData[0].webURL, "name");
        console.log(fileInfoArray);

        apiResponse.uploadDocumentInLibrary(particularClientAllData[0].webURL, fileInfoArray)
            .then(() => {
                setLoading(false);
                // handleCancel();
                setFiles([]);
                setUploadFiles([]);
                toast.success('Documents Added Successfully!');
                fetchData();


            })
            .catch((error) => {
                setLoading(false);
                console.error("Failed to add client and document:", error);
                toast.error(`Failed to add client and document: ${error}`);
            });

    });


    const handleDelete = () => {
        const apiResponse = ClientService();

        apiResponse.deleteFile(particularClientAllData[0].GUID, deleteId)
            .then(() => {
                setIsDeleteDialogOpen(false);
                console.log("File deleted successfully!");
                toast.success('File deleted successfully!');
                fetchData();
            })
            .catch(error => {
                console.error("Failed to delete document:", error);
                toast.error(`Failed to delete document: ${error}`);
            });
    };

    const handleCancel = () => {
        fetchDatas();
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
                        <Stack direction={"column"} spacing={2}>
                            <Box>
                                {/* <DragAndDropUpload
                                    files ={uploadFiles} setFiles={setUploadFiles}
                                    onFilesAdded={(files: File[]) => {
                                        setFiles(prevFiles => [...prevFiles, ...files]); // Add uploaded files to state
                                        setUploadFiles(prevFiles => [...prevFiles, ...files]);
                                    }}

                                /> */}


                                {/* <DropZone
                                  
                                    files={uploadFiles}
                                    setFiles={setUploadFiles}
                                    onFilesAdded={(files: File[]) => {
                                    setUploadFiles([...uploadFiles, ...files]); 
                                    }}
                                /> */}

                                <DropZone
                                    onFilesAdded={handleFileInput}
                                    files={uploadFiles}
                                    setFiles={setUploadFiles}
                                />

                                {/* <DropZone onFilesAdded={handleFileInput} 
                            files={uploadFiles} setFiles={setUploadFiles}
                            /> */}

                            </Box>
                            {uploadFiles.length > 0 && <DialogActions sx={{ px: 0, mr: 0 }}>
                                {/* <MuiButton
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
                                </MuiButton> */}
                                <Stack
                                    direction="row"
                                    justifyContent="end"
                                    alignItems="center"
                                    spacing={3}
                                >
                                    <Button variant="contained"
                                        sx={{ width: loading ? '150px' : 'auto' }}
                                        onClick={handleSave} disabled={loading
                                        }
                                        type="submit">
                                        {loading ? (
                                            <CircularProgress size={20} color="inherit" />
                                        ) : (
                                            "Save"
                                        )}
                                    </Button>
                                    {!loading && <Button variant="outlined" onClick={handleCancel}  >Cancel</Button>}
                                </Stack>
                            </DialogActions>}
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
                                        {!isLoading && mappedFiles.length > 0 ? mappedFiles.map((file: any) => (
                                            <TableRow key={file.fileName}>
                                                <TableCell>
                                                    <Box sx={{
                                                        cursor: 'pointer',
                                                        textDecoration: 'underline',
                                                        color: 'primary'
                                                    }}
                                                        onClick={() => {
                                                            window.open(file.url, '_blank');
                                                        }}   >
                                                        {file.fileName}

                                                    </Box>
                                                </TableCell>
                                                <TableCell>{formatDate(file.created)}</TableCell>
                                                <TableCell>{file.editorName}</TableCell>
                                                <TableCell>
                                                    <IconButton onClick={() => {
                                                        setIsDeleteDialogOpen(true); setDeleteId(file.id);
                                                    }}>
                                                        <DeleteIcon color="error" />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        )) :
                                            !isLoading && <TableRow>
                                                <TableCell colSpan={8} align="center">
                                                    No Records Found
                                                </TableCell>
                                            </TableRow>}
                                        {isLoading &&
                                            <TableRow>
                                                <TableCell colSpan={8} align="center">
                                                    <CircularProgress size={20} />
                                                </TableCell>
                                            </TableRow>
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Stack>
                    </DialogContent>
                </Dialog>
                {isDeleteDialogOpen && (
                    <Dialog open={isDeleteDialogOpen} maxWidth='sm' fullWidth  >
                        <DialogTitle className={styles.addTitle}
                            style={{ textAlign: 'center', marginLeft: '7px', position: 'relative' }}>
                            <div className="d-flex flex-column">
                                <div className="d-flex justify-content-between
                               align-items-center relative">
                                    <h4 style={{ margin: '0', color: '#125895' }}>
                                        Delete Document</h4>
                                </div>
                                <div style={{
                                    height: '4px', width: '100%',
                                    backgroundColor: '#125895'
                                }} />
                            </div>
                        </DialogTitle>
                        {!loading && <IconButton
                            aria-label="close"
                            onClick={handleCloseDeleteDialog}
                            sx={{
                                position: "absolute",
                                right: "14px",
                                top: "8px",
                                color: (theme: any) => theme.palette.grey[500],
                            }}
                        >
                            <CloseIcon />
                        </IconButton>}
                        <DialogContent >

                            <div style={{ marginLeft: '7px' }}>
                                Are you sure you want to delete document
                                <strong style={{ marginLeft: '2px' }}>
                                </strong>
                                ?
                            </div>
                        </DialogContent>
                        <DialogActions sx={{ padding: '10px', marginRight: '14px' }}>
                            {/* <Button
                                onClick={handleDelete}
                                variant="contained"
                                color="primary"
                                sx={{
                                    maxWidth: '150px',
                                    float: 'right',
                                }}
                            >
                                Delete
                            </Button>
                            <Button variant="outlined" onClick={handleCancel}>
                                Cancel
                            </Button> */}
                            <Stack
                                direction="row"
                                justifyContent="end"
                                alignItems="center"
                                spacing={3}
                            >
                                <Button variant="contained" color="primary"
                                    sx={{ width: loading ? '150px' : 'auto' }}
                                    onClick={handleDelete} disabled={loading}>
                                    {loading ? (
                                        <CircularProgress size={20} color="inherit" />
                                    ) : (
                                        "Delete"
                                    )}
                                </Button>
                                {!loading && <Button variant="outlined" onClick={handleCancel}  >Cancel</Button>}
                            </Stack>
                        </DialogActions>
                    </Dialog>
                )}
            </Stack>
        </Box>
    );
};

export default UploadDocument;