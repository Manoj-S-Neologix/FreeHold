/* eslint-disable no-unused-expressions */
import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
// import Button from '@mui/material/Button';
import { Button, CircularProgress } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Stack, Grid } from '@mui/material';
// import DragAndDropUpload from '../../../../Common/DragAndDrop/DragAndDrop';
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
// import FormHelperText from '@mui/material/FormHelperText';
import styles from "./ProjectUpload.module.scss";
import ProjectService from '../../Services/Business/ProjectService';
import toast from 'react-hot-toast';
import DropZone from '../../../../Common/DropZone/DropZone';
import ClientService from "../../Services/Business/ClientService";
//import CheckIcon from "@mui/icons-material/Check";
import formatDate from "../../hooks/dateFormat";

const ViewUpload: React.FC<any> = ({ open, onClose, particularClientAllData, selected, props, spContext, siteUrl, userRole }) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [fileData, setFileData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploadFiles, setUploadFiles] = useState<any[]>([]);
  const [dropdownOptions, setDropdownOptions] = useState<any[]>([]);

  const [getClientDetails, setGetClientDetails] = useState<any[]>([]);
  const [getClient, setGetClient] = useState("");
  //const [_, setCollectionOfDocuments] = React.useState<string[]>([]);
  const [deleteId, setDeleteId] = useState<number>(0);

  console.log(getClient, getClientDetails, particularClientAllData, "getClientgetClient");
  const { control, handleSubmit, formState: { errors }, setValue, getValues, reset } = useForm();
  const [isUnitDocumentChecked, setIsUnitDocumentChecked] = useState(false);

  const handleFileInput = (selectedFiles: File[]) => {
    console.log(selectedFiles, "selectedFiles");
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    // fetchData();
  };

  const handleCancel = () => {
    onClose();
  };

  console.log(files, "files");

  console.log(setFileData, "setFileData");

  const clientService = ClientService();
  const clientListName = "Client_Informations";
  const selectQuery = "Id,Title,ClientLibraryGUID,AssignedStaff/Title,AssignedStaff/EMail";
  const expand = 'AssignedStaff';
  //alert("userROle | " + userRole);
  const filter = (userRole === "staff") ? `AssignedStaff/EMail eq '${spContext.pageContext.user.email}'` : "";

  const apiCall = async () => {
    try {
      const data = await clientService.getClientExpandApi(clientListName, selectQuery, expand, filter, "");
      if (data) {
        const assignClientIds = particularClientAllData[0].assignClientId.split(',').map((id: any) => Number(id.trim()));
        const filteredData = data.filter(item => assignClientIds.includes(item.Id));
        console.log(filteredData, "filteredData");
        const mappedData = filteredData.map(item => ({
          id: item.Id,
          name: item.Title,
          libraryGUID: item.ClientLibraryGUID
        }));
        setGetClientDetails(mappedData);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const [getGuid, setGetGuid] = React.useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [getFoldersResponse, setGetFoldersResponse] = useState<any[]>([]);
  const getProjectCode = particularClientAllData[0]?.projectNumber;
  //const getProjectId = particularClientAllData[0]?.Id;
  const getProjectUrl = particularClientAllData[0]?.webURL;

  const getDocumentsFromFolder = async (libraryGuid: string) => {
    try {
      //const results: any = await ProjectService().getDocumentsFromFolder(libraryGuid);
      //console.log(results, 'guidresult')
      const getLibraryName = getClientDetails.filter((item: any) => item.libraryGUID === libraryGuid)[0].name;
      console.log(`${getProjectCode}/${getLibraryName}`, 'getProjectName/getLibraryName');
      const getFolders: any = await ProjectService().getAllFoldersInLibrary(`${getProjectUrl}/${getLibraryName}`);
      //console.log('Retrieved files:', results,);
      console.log('getFolders', getFolders);
      setGetFoldersResponse(getFolders);

    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  React.useEffect(() => {
    apiCall();
  }, []);

  const getDocumentsLibPath = async (type: string) => {

    let projectRelativePath = (type === "project") ? `${getProjectUrl}` : (type === "client") ? `${getProjectUrl}/${getValues("clientName")}` : `${getProjectUrl}/${getValues("clientName")}/${getValues("unitDocument")}`;

    try {
      const results: any = await ProjectService().getFolderItems(spContext, siteUrl, `${projectRelativePath}`, getProjectCode);
      console.log(results, "File Datas");
      setFileData(results);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching documents:", error);
    }
  };

  const fetchProjectData = () => {
    const projectService = ProjectService();
    projectService.getProject('project Checklist')
      .then((results) => {
        console.log(results, 'client');
        if (results) {
          setDropdownOptions(results);
        }
      })
      .catch((error) => {
        console.error('Error fetching SharePoint data:', error);
      });
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

  console.log(getClientDetails, "uploadFilesgetGuid");

  console.log(particularClientAllData, 'getProjectName..');

  React.useEffect(() => {
    if (uploadFiles && uploadFiles.length > 0) {
      fetchProjectData();
    }
  }, [uploadFiles]);

  React.useEffect(() => {
    getDocumentsLibPath("project");
  }, []);

  const onDelete = (index: number) => {

    //console.log("getvalues", getValues());

    setUploadFiles(prevFiles => prevFiles.filter((_, i) => i !== index));

    const clientName: string = getValues("clientName");
    reset();

    setValue("clientName", clientName);

    //const upFiles:any[] = uploadFiles;

    uploadFiles.filter((_, i) => i !== index).map((uploadedFile, index) => (
      setValue(`projectChecklist-${index}`, uploadedFile.checklist)
    ));

    //console.log("getvalues", getValues());
  };

  //project upload with meta data
  const handleSave = handleSubmit(async (data: any, libraryGuid: any) => {
    setLoading(true);

    if (getClient !== "") {
      const clientInfo: any = (particularClientAllData[0].clientDetails).filter((o: any) => o.Name == getClient);

      const updatedData = {
        DMSProject: particularClientAllData[0].projectName,
        DMSProjectID: (particularClientAllData[0].Id).toString(),
        DMSClient: clientInfo[0].Name,
        DMSClientID: (clientInfo[0].Id).toString(),
        DMSUnit: (data.unitDocument !== '') ? data.unitDocument : "",
      }

      //console.log("clientInfo", clientInfo);

      try {
        const apiResponse = ProjectService();
        console.log(data, 'projectdata..')
        const folderUrl = `${particularClientAllData[0].webURL}/${getClient}`;
        if (data.unitDocument !== '' && isUnitDocumentChecked) {

          const folderUrl = `${particularClientAllData[0].webURL}/${getClient}/${data.unitDocument}`
          console.log(folderUrl, 'projectfolderurl..')
          await apiResponse.addDocumentsToFolder(folderUrl, uploadFiles);
          await apiResponse.updateProjectDocumentMetadata(folderUrl, uploadFiles, updatedData)
        }
        else {
          // Upload documents to the specified client's folder
          await apiResponse.updateProjectDocumentMetadata(folderUrl, uploadFiles, updatedData)
          await apiResponse.addDocumentsToFolder(folderUrl, uploadFiles);
        }

        uploadFiles.map((uploadedFile, index) => (
          setValue(`projectChecklist-${index}`, "")
        ));

        setLoading(false);
        setFiles([]);
        setUploadFiles([]);

        toast.success('Documents Added Successfully!');
        if (isUnitDocumentChecked) {
          getDocumentsLibPath("unit");
        } else {
          getDocumentsLibPath("client");
        }

      } catch (error) {
        setLoading(false);
        console.error("Failed to add client and document:", error);
        toast.error(`Failed to add client and document: ${error}`);
      }
    } else {

      const updatedData = {
        DMSProject: particularClientAllData[0].projectName,
        DMSProjectID: (particularClientAllData[0].Id).toString(),
        DMSClient: "",
        DMSClientID: "",
        DMSUnit: "",
      }

      //console.log("clientInfo", clientInfo);

      try {
        const apiResponse = ProjectService();
        console.log(data, 'projectdata..')
        const folderUrl = `${particularClientAllData[0].webURL}/${getClient}`;
        if (data.unitDocument !== '' && isUnitDocumentChecked) {

          const folderUrl = `${particularClientAllData[0].webURL}/${getClient}/${data.unitDocument}`
          console.log(folderUrl, 'projectfolderurl..')
          await apiResponse.addDocumentsToFolder(folderUrl, uploadFiles);
          await apiResponse.updateProjectDocumentMetadata(folderUrl, uploadFiles, updatedData)
        }
        else {
          // Upload documents to the specified client's folder
          await apiResponse.updateProjectDocumentMetadata(folderUrl, uploadFiles, updatedData)
          await apiResponse.addDocumentsToFolder(folderUrl, uploadFiles);
        }

        uploadFiles.map((uploadedFile, index) => (
          setValue(`projectChecklist-${index}`, "")
        ));

        setLoading(false);
        setFiles([]);
        setUploadFiles([]);

        toast.success('Documents Added Successfully!');
        if (isUnitDocumentChecked) {
          getDocumentsLibPath("unit");
        } else {
          getDocumentsLibPath("client");
        }

      } catch (error) {
        setLoading(false);
        console.error("Failed to add client and document:", error);
        toast.error(`Failed to add client and document: ${error}`);
      }
    }

  });

  const handleDelete = (getGuid: any) => {

    const apiResponse = ProjectService();
    apiResponse.deleteFile(particularClientAllData[0].GUID, deleteId)
      .then(() => {
        setIsDeleteDialogOpen(false);
        console.log("File deleted successfully!");
        toast.success('File deleted successfully!');
        //fetchData(particularClientAllData[0].GUID);

        if (isUnitDocumentChecked) {
          getDocumentsLibPath("unit");
        } else {
          getDocumentsLibPath("client");
        }
      })
      .catch(error => {
        console.error("Failed to delete document:", error);
        toast.error(`Failed to delete document: ${error}`);
      });
  };

  return (
    <Box sx={{ width: '100', padding: '20px' }}>
      <Stack direction="column" spacing={2}>
        <Dialog open={open} onClose={onClose}>

          <DialogTitle>
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
            <Stack direction="column" spacing={2}>
              {/* <form onSubmit={handleSubmit}> */}

              {/* Document selection section */}
              <Stack direction="column" gap={3}>
                <Grid container spacing={2}>
                  {/* Client grid */}
                  <Grid item sm={6}>
                    <Controller
                      name="clientName"
                      control={control}
                      defaultValue=""
                      //rules={{ required: 'Client Name is required' }}
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
                            helperText={errors?.clientName?.message}
                            onChange={(e: any) => {
                              console.log(e.target.value);
                              setGetClient(e.target.value);
                              setIsUnitDocumentChecked(false);
                              console.log("particularClientAllData: ", particularClientAllData);
                              const getLibraryName = getClientDetails.filter((item: any) => item.name === e.target.value)[0].libraryGUID

                              console.log(getLibraryName, "getLibraryName");
                              setValue('clientName', e.target.value);
                              setGetGuid(e.target.value);

                              //Populate Unit documents folder
                              getDocumentsFromFolder(getLibraryName);

                              //Get documents for client selection
                              //fetchData(getLibraryName);
                              getDocumentsLibPath("client");
                            }}
                          >
                            {getClientDetails?.map((item: any) => (
                              <MenuItem key={item.id} value={item.name}>
                                {item.name}
                              </MenuItem>
                            ))}
                          </TextField>
                        </>
                      )}
                    />
                  </Grid>

                  {/* Unit document grid */}
                  <Grid item sm={6}>
                    <Stack direction="row" alignItems="center">
                      <Checkbox
                        checked={isUnitDocumentChecked}
                        onChange={(e) => {
                          setIsUnitDocumentChecked(e.target.checked);
                          setValue('unitDocument', "");
                          if (!e.target.checked) {
                            getDocumentsLibPath("client");
                          }

                        }}
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
                          onChange={(e: any) => {
                            console.log(e.target.value);
                            setValue('unitDocument', e.target.value);

                            getDocumentsLibPath("unit");

                            /* const getLibraryName = getClientDetails.filter((item: any) => item.name === getGuid)[0].libraryGUID
   
                            const libraryPath = `${getLibraryName}/${e.target.value}`;
   
                            fetchData(libraryPath) */
                            //Get documents for client selection
                            //fetchData(getLibraryName);
                          }}
                          required
                        >
                          {getFoldersResponse.length > 0 &&
                            getFoldersResponse.map((item: any, idx: any) => (
                              <MenuItem key={idx} value={item?.Name}>
                                {item?.Name}
                              </MenuItem>
                            ))}
                        </TextField>
                      )}
                    />
                  </Grid>

                </Grid>
              </Stack>

              {/* Dropzone */}
              <Box>

                <DropZone
                  onFilesAdded={handleFileInput}
                  files={uploadFiles}
                  setFiles={setUploadFiles}
                />
              </Box>

              {/*Dropzone selected document display */}
              {uploadFiles.length > 0 && dropdownOptions.length > 0 && (
                <>

                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Document</TableCell>
                          <TableCell>Document Type</TableCell>
                          <TableCell>Delete</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {uploadFiles.map((uploadedFile, index) => (
                          <TableRow key={index}>
                            <TableCell>{uploadedFile.name}</TableCell>
                            <TableCell>
                              <Controller
                                name={`projectChecklist-${index}`}
                                control={control}
                                defaultValue={uploadedFile.checklist || ""}
                                rules={{ required: 'Project Checklist is required' }}
                                render={({ field }) => (
                                  <TextField
                                    {...field}
                                    fullWidth
                                    variant="outlined"
                                    select
                                    size="small"
                                    //value={uploadedFile.checklist}
                                    required
                                    error={!!errors[`projectChecklist-${index}`]}
                                    helperText={errors[`projectChecklist-${index}`]?.message}
                                    style={{ width: 200 }} // Fixed width
                                    onChange={(e: any) => {
                                      field.onChange(e);
                                      const newValue = e.target.value;
                                      setValue('projectChecklist', e.target.value);
                                      console.log(newValue, 'e.target')
                                      setUploadFiles(prevFiles => {
                                        const updatedFiles = [...prevFiles];
                                        updatedFiles[index].checklist = newValue;
                                        return updatedFiles;
                                      });
                                    }}
                                  >
                                    {dropdownOptions?.map((option: any) => (
                                      <MenuItem key={option.Title} value={option.Title}>
                                        {option.Title}
                                      </MenuItem>
                                    ))}
                                  </TextField>
                                )}
                              />
                            </TableCell>
                            <TableCell>
                              <IconButton aria-label="delete" onClick={() => onDelete(index)}>
                                <DeleteIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  <DialogActions sx={{ px: 0, mr: 0 }}>
                    <Stack
                      direction="row"
                      justifyContent="end"
                      alignItems="center"
                      spacing={3}
                    >
                      <Button
                        variant="contained"
                        sx={{ width: loading ? '150px' : 'auto' }}
                        onClick={handleSave}
                        disabled={loading}
                        type="submit"
                      >
                        {loading ? (
                          <CircularProgress size={20} color="inherit" />
                        ) : (
                          "Save"
                        )}
                      </Button>
                      {!loading && <Button variant="outlined" onClick={handleCancel}>Cancel</Button>}
                    </Stack>
                  </DialogActions>
                </>
              )}

              {/* Document display */}
              {
                < TableContainer >
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Document Name</TableCell>
                        <TableCell>Document Type</TableCell>
                        <TableCell>Uploaded Date</TableCell>
                        <TableCell>Uploaded By</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {!isLoading &&
                        fileData.length > 0 ? fileData.map((file: any) => (
                          <TableRow key={file.FileLeafRef}>
                            <TableCell>
                              <Box sx={{
                                cursor: 'pointer',
                                textDecoration: 'underline',
                                color: 'primary'
                              }}
                                onClick={() => {
                                  window.open(file.FileRef, '_blank');
                                }}   >
                                {file.FileLeafRef}

                              </Box>
                            </TableCell>
                            <TableCell>{file.DMS_x0020_Tags}</TableCell>
                            <TableCell>{formatDate(file.Modified)}</TableCell>
                            <TableCell>{file.Editor.Title}</TableCell>
                            <TableCell>
                              <IconButton onClick={() => {
                                setIsDeleteDialogOpen(true); setDeleteId(file.Id);
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
                            {fileData.length > 0 ?
                              <CircularProgress size={20} />
                              : "select Client Name"
                            }
                          </TableCell>
                        </TableRow>
                      }
                    </TableBody>
                  </Table>
                </TableContainer>}

            </Stack>
          </DialogContent>

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

                <Stack
                  direction="row"
                  justifyContent="end"
                  alignItems="center"
                  spacing={3}
                >
                  <Button variant="contained" color="primary"
                    sx={{ width: loading ? '150px' : 'auto' }}
                    onClick={() => handleDelete(getGuid)} disabled={loading}>
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
        </Dialog>

      </Stack>
    </Box >
  );

};

export default ViewUpload;
