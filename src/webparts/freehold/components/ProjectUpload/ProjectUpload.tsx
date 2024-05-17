/* eslint-disable no-unused-expressions */
import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
// import Button from '@mui/material/Button';
import { Autocomplete, Button, CircularProgress } from "@mui/material";
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
import CheckIcon from "@mui/icons-material/Check";
import formatDate from "../../hooks/dateFormat";


// interface UploadDocumentProps {
//   open: boolean;
//   onClose: () => void;
//   particularClientAllData: any;
// }

const ViewUpload: React.FC<any> = ({ open, onClose, particularClientAllData, selected, props }) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  // const [deleteId, setDeleteId] = useState<number>(0);
  const [files, setFiles] = useState<File[]>([]);
  const [fileData, setFileData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  // const { handleSubmit } = useForm();
  const [uploadFiles, setUploadFiles] = useState<any[]>([]);
  const [dropdownOptions, setDropdownOptions] = useState<any[]>([]);

  ////
  const [getClientDetails, setGetClientDetails] = useState<any[]>([]);
  const [getClient, setGetClient] = useState<any[]>([]);
  const [_, setCollectionOfDocuments] = React.useState<string[]>([]);
  const [deleteId, setDeleteId] = useState<number>(0);


  console.log(getClient, getClientDetails, particularClientAllData, "getClientgetClient");
  const { control, handleSubmit, formState: { errors }, setValue } = useForm();
  const [isUnitDocumentChecked, setIsUnitDocumentChecked] = useState(false);
  // const watchClientName = watch('clientName')
  // const watchUnitDocument = watch('unitDocument')

  const handleFileInput = (selectedFiles: File[]) => {
    console.log(selectedFiles, "selectedFiles");
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    // fetchData();
  };

  // const handleSave = () => {
  //   onClose();
  // };

  const handleCancel = () => {
    onClose();
  };

  console.log(files, "files");

  console.log(setFileData, "setFileData");



  const clientService = ClientService();
  const clientListName = "Client_Informations";
  const selectQuery = "Id,Title,ClientLibraryGUID";


  // const apiCall = (async () => {
  //   await clientService.getClientExpandApi(clientListName, selectQuery, "", "")
  //     .then((data: any) => {
  //       if (data) {
  //         const mappedData = data.map((item: any) => ({
  //           id: item.Id,
  //           name: item.Title,
  //           libraryGUID: item.ClientLibraryGUID
  //         }));
  //         setGetClientDetails(mappedData);
  //       }

  //     }).catch((error: any) => {
  //       toast.error(error.message);
  //     });
  // });
  const apiCall = async () => {
    try {
      const data = await clientService.getClientExpandApi(clientListName, selectQuery, "", "");
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
  const [getClientDocumentsData, setClientDocumentsData] = useState<any[]>([]);
  const [getClientDocumentsAllData, setClientDocumentsAllData] = useState<any[]>([]);
  const [getFoldersResponse, setGetFoldersResponse] = useState<any[]>([]);
  // const getProjectName = particularClientAllData[0]?.projectName;
  const getProjectCode = particularClientAllData[0]?.projectNumber;

  const getDocumentsFromFolder = async (libraryGuid: string) => {
    try {
      const results: any = await ProjectService().getDocumentsFromFolder(libraryGuid);
      console.log(results, 'guidresult')
      const getLibraryName = getClientDetails.filter((item: any) => item.libraryGUID === libraryGuid)[0].name;
      console.log(`${getProjectCode}/${getLibraryName}`, 'getProjectName/getLibraryName');
      const getFolders: any = await ProjectService().getAllFoldersInLibrary(`${getProjectCode}/${getLibraryName}`);
      console.log('Retrieved files:', results,);
      console.log('getFolders', getFolders);
      setGetFoldersResponse(getFolders);

      // Ensure results is an array before setting state
      if (Array.isArray(results)) {
        setClientDocumentsData(results.map(item => item.FileLeafRef));
        setClientDocumentsAllData(results);
        console.log(getClientDocumentsAllData, 'BBB');
      } else {
        console.error('Error: Retrieved data is not an array');
      }
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };



  React.useEffect(() => {
    apiCall();
  }, []);



  const fetchData = async (getGuid: any) => {

    const projectService: any = ProjectService();
    const folderGUID = getGuid;
    try {
      const results = await projectService.getDocumentsFromFolder(folderGUID);
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


  const mappedFiles = fileData.map((file: any) => ({
    id: file.Id,
    fileName: file.FileLeafRef,
    url: file.FileRef,
    fileType: file.File_x0020_Type,
    created: file.Created,
    editorName: file.Editor.Title,
    editorId: file.Editor.Id,
    dmstags: file.DMS_x0020_Tags
  }));

  console.log(mappedFiles);



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

  // const handleSave = handleSubmit(async (data: any) => {
  //   setLoading(true);
  //   const apiResponse = ProjectService();
  //   const collectionOfDocuments: any = [];
  //   getClientDocumentsData.map((data: any) => {
  //     collectionOfDocuments.push({
  //       Id: data.Id,
  //       GUID: data.GUID,
  //       FileLeafRef: data.FileLeafRef,
  //       FileRef: data.FileRef
  //     });
  //   });
  //   console.log(collectionOfDocuments, 'collection..');
  //   const updatedData = {
  //     clientName: getClientDetails.filter((item: any) => item.libraryGUID === data.clientName)[0].name,
  //     libraryGUID: data.clientName,
  //     collectionOfDocuments: collectionOfDocuments,
  //     // projectName: particularClientAllData[0]?.projectName,
  //     projectNumber: particularClientAllData[0]?.projectNumber
  //   };

  //   console.log(updatedData, getProjectName, "updatedData");
  //   const response = await ProjectService().createLibrary(getProjectName, "Project Document Library");
  //   console.log(response, "responseresponse");
  //   //create a folder in a library
  //   const rootUrl = response[0].ParentWebUrl + "/" + updatedData.projectNumber;
  //   const createFolder = await ProjectService().createFolder(rootUrl, updatedData.clientName);

  //   console.log(createFolder.data.ServerRelativeUrl, "createFoldercreateFolder");
  //   // once folder is created, upload files
  //   // const uploadDocument = await ProjectService().copyDocuments(createFolder.data.ServerRelativeUrl, updatedData.libraryGUID, updatedData.collectionOfDocuments);

  //   const uploadDocument = await ProjectService().copyDocuments(createFolder.data.ServerRelativeUrl, updatedData.libraryGUID);
  //   console.log(uploadDocument, "uploadDocumentuploadDocument");
  //   // console.log(updatedData, "handleSave");

  //   console.log(particularClientAllData[0].name, "name");
  //   console.log(fileInfoArray, 'fileinfo');

  //   apiResponse.addDocumentsToFolder(particularClientAllData[0].name, fileInfoArray[0].name)
  //     .then(() => {
  //       setLoading(false);
  //       // handleCancel();
  //       setFiles([]);
  //       setUploadFiles([]);
  //       false && toast.success('Documents Added Successfully!');
  //       false && fetchData("test");


  //     })
  //     .catch((error) => {
  //       setLoading(false);
  //       console.error("Failed to add client and document:", error);
  //       toast.error(`Failed to add client and document: ${error}`);
  //     });

  // });

  // const handleSave = handleSubmit(async (data: any) => {
  //   setLoading(true);
  //   const apiResponse = ProjectService();
  //   apiResponse.addDocumentsToFolder(getClientDetails[0].name, fileInfoArray[0]?.name)
  //     .then(() => {
  //       setLoading(false);
  //       // handleCancel();
  //       setFiles([]);
  //       setUploadFiles([]);
  //       false && toast.success('Documents Added Successfully!');

  //       false && fetchData("test");


  //     })
  //     .catch((error) => {
  //       setLoading(false);
  //       console.error("Failed to add client and document:", error);
  //       toast.error(`Failed to add client and document: ${error}`);
  //     });

  // });

  React.useEffect(() => {
    if (uploadFiles && uploadFiles.length > 0) {
      fetchProjectData();
    }
  }, [uploadFiles]);


  const onDelete = (index: number) => {
    setUploadFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  // const handleSave = handleSubmit(async (data: any, libraryGuid: any) => {
  //   setLoading(true);

  //   try {
  //     const apiResponse = ProjectService();
  //     console.log(data, 'projectdata..')
  //     // Determine the selected client based on the submitted form data
  //     // const selectedClientName = client.name;
  //     // const selectedClient = client.find((c:any) => c.Name === selectedClientName);
  //     // console.log(getLibraryName, 'getLibraryName.')
  //     // Construct the folder URL for the selected client
  //     const folderUrl = `${particularClientAllData[0].webURL}/${getClient}`;
  //     if (data.unitDocument !== '') {

  //       const folderUrl = `${particularClientAllData[0].webURL}/${getClient}/${data.unitDocument}`
  //       await apiResponse.addDocumentsToFolder(folderUrl, uploadFiles);
  //     }
  //     else {
  //       // Upload documents to the specified client's folder
  //       await apiResponse.addDocumentsToFolder(folderUrl, uploadFiles);
  //     }
  //     // await apiResponse.addDocumentsToFolder(folderUrl, uploadFiles);

  //     setLoading(false);
  //     setFiles([]);
  //     setUploadFiles([]);
  //     toast.success('Documents Added Successfully!');
  //     // fetchData("test");
  //     handleCancel(); // Close the dialog if needed

  //   } catch (error) {
  //     setLoading(false);
  //     console.error("Failed to add client and document:", error);
  //     toast.error(`Failed to add client and document: ${error}`);
  //   }
  // });

  //project upload with meta data
  const handleSave = handleSubmit(async (data: any, libraryGuid: any) => {
    setLoading(true);

    const updatedData = {
      DMS_x0020_Tags: data.projectChecklist
    }

    console.log(updatedData.DMS_x0020_Tags, 'DMSTags..')

    try {
      const apiResponse = ProjectService();
      console.log(data, 'projectdata..')
      const folderUrl = `${particularClientAllData[0].webURL}/${getClient}`;
      if (data.unitDocument !== '') {

        const folderUrl = `${particularClientAllData[0].webURL}/${getClient}/${data.unitDocument}`
        console.log(folderUrl, 'projectfolderurl..')
        await apiResponse.addDocumentsToFolder(folderUrl, uploadFiles);
        await apiResponse.updateProjectDocumentMetadata(folderUrl, uploadFiles, updatedData.DMS_x0020_Tags)
      }
      else {
        // Upload documents to the specified client's folder
        await apiResponse.updateProjectDocumentMetadata(folderUrl, uploadFiles, updatedData.DMS_x0020_Tags)
        await apiResponse.addDocumentsToFolder(folderUrl, uploadFiles);

      }


      // await apiResponse.addDocumentsToFolder(folderUrl, uploadFiles);

      setLoading(false);
      setFiles([]);
      setUploadFiles([]);
      toast.success('Documents Added Successfully!');
      // fetchData("test");
      handleCancel(); // Close the dialog if needed

    } catch (error) {
      setLoading(false);
      console.error("Failed to add client and document:", error);
      toast.error(`Failed to add client and document: ${error}`);
    }
  });

  const handleDelete = (getGuid: any) => {
    const apiResponse = ProjectService();
    apiResponse.deleteFile(getGuid, deleteId)
      .then(() => {
        setIsDeleteDialogOpen(false);
        console.log("File deleted successfully!");
        toast.success('File deleted successfully!');
        fetchData(getGuid);
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
            <Stack direction="column" spacing={2}>
              {/* <form onSubmit={handleSubmit}> */}
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
                            helperText={errors?.clientName?.message}
                            onChange={(e: any) => {
                              console.log(e.target.value);
                              setGetClient(e.target.value);
                              const getLibraryName = getClientDetails.filter((item: any) => item.name === e.target.value)[0].libraryGUID

                              console.log(getLibraryName, "getLibraryName");
                              getDocumentsFromFolder(getLibraryName);
                              setValue('clientName', e.target.value);
                              setGetGuid(e.target.value);
                              fetchData(getLibraryName);
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
                          // onChange={(e: any) => {
                          //   console.log(e.target.value);
                          //   const getLibraryName = getClientDetails.filter((item: any) => item.name === getGuid)[0].libraryGUID

                          //   const libraryPath = `${getLibraryName}/${e.target.value}`;
                          //   setValue('unitDocument', e.target.value);


                          //   fetchData(libraryPath)
                          // }}
                          required
                        >
                          {/* <MenuItem value="">None</MenuItem>
                          <MenuItem value="Option A">Option A</MenuItem>
                          <MenuItem value="Option B">Option B</MenuItem> */}
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
                  {console.log(getClientDocumentsData, getClientDocumentsAllData, getFoldersResponse, 'getClientDocuments..')}
                  {false && getClientDocumentsData.length > 0 && (
                    <Grid item xs={12}>
                      <Controller
                        name="AssignClientDocuments"
                        control={control}
                        defaultValue={[]}
                        rules={{
                          required: 'Assign Client Documents is required',
                        }}
                        render={({ field }) => (
                          <>
                            <InputLabel htmlFor="Client-Documents">Client Documents</InputLabel>
                            <Autocomplete
                              multiple
                              options={getClientDocumentsData}
                              getOptionLabel={(option: any) => option}
                              disableCloseOnSelect
                              {...field}
                              size="small"
                              onChange={(e: any, value: any) => {
                                field.onChange(value);
                                setValue('AssignClientDocuments', value);
                                const collectionOfDocuments: any = [];
                                getClientDocumentsAllData?.map((item: any) => {
                                  console.log(item, value, value.includes(item.FileLeafRef), '...');
                                  if (value.includes(item.FileLeafRef)) {
                                    collectionOfDocuments.push({
                                      Id: item.Id,
                                      GUID: item.GUID,
                                      FileLeafRef: item.FileLeafRef,
                                      FileRef: item.FileRef
                                    });
                                    console.log(collectionOfDocuments, 'collectionOfDocuments///');
                                  }
                                });
                                setCollectionOfDocuments(collectionOfDocuments);
                              }}
                              renderInput={(params: any) => (
                                <TextField
                                  {...params}
                                  variant="outlined"
                                  label=""
                                  placeholder="Select Document"
                                  size="small"
                                  error={!!errors?.AssignClientDocuments}
                                  helperText={errors?.AssignClientDocuments?.message}
                                />
                              )}
                              renderOption={(props: any, option: any, { selected }: any) => (
                                <MenuItem
                                  {...props}
                                  value={option}
                                  sx={{ justifyContent: "space-between" }}
                                >
                                  {option}
                                  {selected ? <CheckIcon color="info" /> : null}
                                </MenuItem>
                              )}
                            />
                          </>
                        )}
                      />
                    </Grid>
                  )}

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
              {/* </form> */}
              <Box>
                {/* <DragAndDropUpload
                  onFilesAdded={(files: File[]) => {
                    //console.log(files);
                  }}
                /> */}

                <DropZone
                  onFilesAdded={handleFileInput}
                  files={uploadFiles}
                  setFiles={setUploadFiles}
                />
              </Box>
              {/*old code for project upload */}
              {/* {uploadFiles.length > 0 && <DialogActions sx={{ px: 0, mr: 0 }}>
                <Stack
                  direction="row"
                  justifyContent="end"
                  alignItems="center"
                  spacing={3}
                >
                  <Button variant="contained"
                    sx={{ width: loading ? '150px' : 'auto' }}
                    onClick={handleSave} disabled={loading} type="submit">
                    {loading ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : (
                      "Save"
                    )}
                  </Button>
                  {!loading && <Button variant="outlined" onClick={() => { setUploadFiles([]) }}  >Cancel</Button>}
                </Stack>

              </DialogActions>} */}

              {/*single checklist dropdown for project */}
              {/* {uploadFiles.length > 0 && dropdownOptions.length > 0 && (
                <>
                  <div>
                    <Controller
                      name="projectChecklist"
                      control={control}
                      defaultValue=""
                      rules={{ required: 'Project Checklist is required' }}
                      render={({ field }) => (
                        <>
                          <InputLabel htmlFor="project-checklist">Project Checklist</InputLabel>
                          <TextField
                            {...field}
                            id="project-checklist"
                            fullWidth
                            variant="outlined"
                            select
                            size="small"
                            required
                            error={!!errors.projectChecklist}
                            helperText={errors?.projectChecklist?.message}
                            onChange={(e: any) => {
                              console.log('Selected:', e.target.value);
                              setValue('projectChecklist', e.target.value);
                            }}
                          >
                            {dropdownOptions?.map((option: any, index: any) => (
                              <MenuItem key={index} value={option.Title}>
                                {option.Title}
                              </MenuItem>
                            ))}
                          </TextField>
                        </>
                      )}
                    />

                  </div>
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
              )} */}

              {/*multiple checklist dropdown */}
              {uploadFiles.length > 0 && dropdownOptions.length > 0 && (
                <>
                  {/* {uploadFiles.map((uploadedFile, index) => (
                    <div key={index} style={{ position: 'relative', bottom: '6.2rem', marginLeft: '16rem' }}
                    >
                      <Controller
                        name={`projectChecklist-${index}`}
                        control={control}
                        defaultValue=""
                        rules={{ required: 'Project Checklist is required' }}
                        render={({ field }) => (
                          <>
                            <div >

                              <InputLabel htmlFor={`project-checklist-${index}`}>Project Checklist</InputLabel>
                            </div>
                            <TextField
                              {...field}
                              id={`project-checklist-${index}`}
                              fullWidth
                              style={{ maxWidth: '200px' }}
                              variant="outlined"
                              select
                              size="small"
                              required
                              error={!!errors[`projectChecklist-${index}`]}
                              helperText={errors[`projectChecklist-${index}`]?.message}
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
                              {dropdownOptions?.map((option: any, index: any) => (
                                <MenuItem key={index} value={option.Title}>
                                  {option.Title}
                                </MenuItem>
                              ))}
                            </TextField>
                          </>
                        )}
                      />
                    </div>
                  ))} */}
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
                      {!isLoading && getClientDocumentsData.length > 0 &&
                        mappedFiles.length > 0 ? mappedFiles.map((file: any) => (
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
                            <TableCell>{file.dmstags}</TableCell>
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
                            {getClientDocumentsData.length > 0 ?
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
          {/* <DialogActions>
            <Button onClick={handleSave} variant="contained" color="primary">
              Save
            </Button>
            <Button onClick={handleCancel} variant="outlined">
              Cancel
            </Button>
          </DialogActions> */}
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
