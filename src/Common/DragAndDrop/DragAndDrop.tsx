import React, { useState } from 'react';
import { Delete } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';

interface DragAndDropUploadProps {
  onFilesAdded: (files: File[]) => void;
  setIsError?: React.Dispatch<React.SetStateAction<boolean>>;
  setFiles?: React.Dispatch<React.SetStateAction<File[]>>;
  files?: File[];
}

const DragAndDropUpload: React.FC<DragAndDropUploadProps> = ({ onFilesAdded, setIsError, setFiles, files }) => {
  const [highlight, setHighlight] = useState<boolean>(false);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setHighlight(false);
    const droppedFiles = Array.from(e.dataTransfer.files) as File[];
    if (setFiles) {
      setFiles((prevFiles: File[] | undefined) => {
        const newFiles = prevFiles ? [...prevFiles, ...droppedFiles] : [...droppedFiles];
        onFilesAdded(newFiles);
        return newFiles;
      });
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []) as File[];
    const filesWithLimit = selectedFiles.filter(file => file.size <= 10 * 1024 * 1024);

    if (setIsError) {
      setIsError(filesWithLimit.length !== selectedFiles.length);
    }

    if (setFiles) {
      setFiles((prevFiles: File[] | undefined) => {
        const newFiles = prevFiles ? [...prevFiles, ...filesWithLimit] : [...filesWithLimit];
        onFilesAdded(newFiles);
        return newFiles;
      });
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setHighlight(true);
  };

  const handleDragLeave = () => {
    setHighlight(false);
  };

  const handleDeleteFile = (index: number) => {
    if (setFiles && files) {
      const newFiles = [...files];
      newFiles.splice(index, 1);
      setFiles(newFiles);
      onFilesAdded(newFiles);
    }
  };

  

  return (
    <div>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={highlight ? 'drag-and-drop-upload highlight' : 'drag-and-drop-upload'}
        style={{
          marginTop: '10px',
          padding: '20px',
          border: '1px solid gray',
          textAlign: 'center',
          cursor: 'pointer',
        }}
      >
        <div style={{ marginBottom: '10px' }} onClick={() => document.getElementById('fileInput')?.click()}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ width: '50%' }}>
              {/* Replace this with your desired upload icon or image */}
              <img
                src={require('../../../src/assets/Images/UploadImage.jpg')}
                width="90"
                height="70"
                alt="Upload Image"
              />
            </div>
            <div style={{ width: '50%' }}>
              <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                <div>Drag and drop</div>
                <div>or</div>
                <div>
                  <label htmlFor="fileInput" style={{ color: 'blue', cursor: 'pointer' }}>
                    click here to upload document
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Input element for file selection */}
        <input
          type="file"
          id="fileInput"
          accept=".pdf,.doc,.docx,.txt"
          style={{ display: 'none' }}
          onChange={handleFileInput}
          multiple
        />
      </div>

      {/* Display the list of selected files */}
      <div style={{ marginTop: '20px', paddingLeft: '20px' }}>
        {files?.map((file, index) => (
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
      </div>
    </div>
  );
};

export default DragAndDropUpload;

