import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Delete } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { Box, Typography, InputLabel } from "@mui/material";
interface DragAndDropUploadProps {
    onFilesAdded: (files: File[]) => void;
    setIsError?: React.Dispatch<React.SetStateAction<boolean>>;
    setFiles?: React.Dispatch<React.SetStateAction<File[]>>;
    files?: File[];
}


const DropZone: React.FC<DragAndDropUploadProps> = ({ onFilesAdded, setIsError, setFiles, files }) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (setFiles)
            setFiles((prevFiles: any) => [...prevFiles, ...acceptedFiles]);
    }, []);

    const onDelete = (index: number) => {
        if (setFiles)
            setFiles((prevFiles: any) => {
                const updatedFiles = [...prevFiles];
                updatedFiles.splice(index, 1);
                return updatedFiles;
            });
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    React.useEffect(() => {
        if (setFiles) {
            setFiles([]);
        }
    }, []);

    return (
        <div>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
                {...getRootProps()}
                style={dropzoneStyle}>
                <Box sx={{ width: "50%" }}>
                    <img
                        src={require('../../assets/Images/UploadImage.jpg')}
                        width="90"
                        height="70"
                        alt="Upload Image"
                    />
                    <input {...getInputProps()} />
                </Box>
                {isDragActive ? (
                    <p>Drop the files here ...</p>
                ) : (
                    <Box sx={{ width: "50%" }}>
                        <Box style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                            <Typography variant="subtitle1">Drag and drop</Typography>
                            <Typography variant="subtitle1">or</Typography>
                            <Box>
                                <InputLabel htmlFor="fileInput" sx={{ color: 'blue', cursor: 'pointer' }}>
                                    click here to upload document
                                </InputLabel>
                            </Box>
                        </Box>
                    </Box>
                )}
            </Box>
            {files && files.length > 0 && (
                <div>
                    <h4 style={{ margin: 0 }}>Uploaded files:</h4>
                    <ul>
                        {files && files.length > 0 && files.map((file: any, index: any) => (
                            <li key={index}>
                                <span>{file.name}</span>
                                <IconButton aria-label="delete" onClick={() => onDelete(index)}>
                                    <Delete />
                                </IconButton>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DropZone;

const dropzoneStyle: React.CSSProperties = {
    border: '1px solid gray',
    padding: '20px',
    textAlign: 'center',
    cursor: 'pointer',
    margin: '20px auto',
    // width: 'calc(100vw - 500px)',
    outline: 'none',
};



