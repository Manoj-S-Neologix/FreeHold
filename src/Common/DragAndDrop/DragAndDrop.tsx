import React, { useState } from 'react';
import { Delete } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
// import DeleteDialog from '../../webparts/freehold/components/Delete/Delete';

interface DragAndDropUploadProps {
  onFilesAdded: (files: File[]) => void;


}

const DragAndDropUpload: React.FC<DragAndDropUploadProps> = ({ onFilesAdded }) => {
  const [highlight, setHighlight] = useState<boolean>(false);
  const [files, setFiles] = useState<File[]>([]);
//   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setHighlight(false);
    const droppedFiles = Array.from(e.dataTransfer.files).filter(file => !files.some(f => f.name === file.name));
    setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
    onFilesAdded(droppedFiles);
  };
  
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []).filter(file => !files.some(f => f.name === file.name));
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    onFilesAdded(selectedFiles);
  };
  

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setHighlight(true);
  };

  const handleDragLeave = () => {
    setHighlight(false);
  };

  const handleDeleteFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    onFilesAdded(newFiles);
  };

//   const handleDeleteDialogClose = () => {
//     setIsDeleteDialogOpen(false);
//   };


  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={highlight ? 'drag-and-drop-upload highlight' : 'drag-and-drop-upload'}
    //   className={styles.dropZone}
    style={{
        marginTop: '10px',
        padding: '20px',
        border: '1px solid gray',
        textAlign: 'center',
        cursor: 'pointer',
      }}
    >
      <div style={{ marginBottom: '10px' }}>
        {files.map((file, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
            <div>{file.name}</div>
            <IconButton
              aria-label="delete"
              onClick={(e) => {
                handleDeleteFile(index);
                e.stopPropagation();
              }}
              style={{ marginLeft: 'auto' }}
            >
              <Delete />
            </IconButton>
          </div>
        ))}
        <div style={{ display: "flex", justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ width: "50%" }}>
            <img src={require('../../../src/assets/Images/UploadImage.jpg')}
              width="90"
              height="70"
              alt="Upload Image"
            />
          </div>
          <div style={{ width: "50%" }}>
            <div style={{ display: "flex", flexDirection: "column", textAlign: 'left' }}>
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
  );
};

export default DragAndDropUpload;

