import React, { useState } from 'react';
import { Grid, Stack, Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, Button, Autocomplete } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import ProjectService from '../../Services/Business/ProjectService';
import DropZone from '../../../../Common/DropZone/DropZone';
import DialogActions from '@mui/material/DialogActions';
import { Button as MuiButton } from "@mui/material";
import toast from 'react-hot-toast';
import { CircularProgress } from "@mui/material";
import ClientService from '../../Services/Business/ClientService';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import formatDate from "../../hooks/dateFormat";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import styles from "../UploadDocuments/UploadDocuments.module.scss";
import CloseIcon from '@mui/icons-material/Close';
import CommonService from '../../../../Common/Common';
const { removeFilenameWithTimestamp } = CommonService();

const ProjectUploadDocument: React.FC<any> = ({ onClose, selected, spContext, userRole, siteUrl }) => {
  const { control, handleSubmit, formState: { errors }, setValue, getValues } = useForm();
  const [AllClientData, setAllClientData] = useState<any>([]);
  const [particularClientAllData, setParticularClientAllData] = useState<any>([]);
  const [isUnitDocumentChecked, setIsUnitDocumentChecked] = useState(false);
  const [uploadFiles, setUploadFiles] = useState<any>([]);
  const [getClient, setGetClient] = useState("");
  const [loading, setLoading] = useState(false);
  const [, setFiles] = useState<File[]>([]);
  const [getClientDetails, setGetClientDetails] = useState<any[]>([]);
  const [getFoldersResponse, setGetFoldersResponse] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [, setProjectData] = useState<any>([]);
  // const getProjectCode = particularClientAllData[0]?.projectNumber;
  const getProjectWebURL = particularClientAllData[0]?.webURL;
  const [, setClientDocumentsData] = useState<any[]>([]);
  const [, setClientDocumentsAllData] = useState<any[]>([]);
  const [getGuid, setGetGuid] = React.useState('');
  const [fileData, setFileData] = useState<any[]>([]);
  const [dropdownOptions, setDropdownOptions] = useState<any[]>([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number>(0);
  //const getProjectCode = particularClientAllData[0]?.projectNumber;
  const [getProjectUrl, setProjectUrl] = useState("");
  //const [getProjectCode, setProjectCode] = useState("");
  const [projectLibraryName, setProjectLibraryName] = useState("");

  const handleFileInput = (selectedFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  const onDelete = (index: number) => {
    setUploadFiles((prevFiles: any[]) =>
      prevFiles.filter((_, i: number) => i !== index)
    );
  };

  const clientService = ClientService();
  const clientListName = "Client_Informations";
  const selectQuery = "Id,Title,ClientLibraryGUID,AssignedStaff/Title,AssignedStaff/EMail";
  const expand = 'AssignedStaff';

  const apiCall = async (particularClientAllData: any) => {
    try {
      const data = await clientService.getClientExpandApi(clientListName, selectQuery, expand, "", "");
      if (data) {
        const assignClientIds = particularClientAllData[0]?.assignClientId?.split(',').map((id: any) => Number(id.trim()));
        const filteredData = data.filter((item: any) => assignClientIds.includes(item.Id));
        const mappedData = filteredData.map((item: any) => ({
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

  // const getDocumentsFromFolder = async (libraryGuid: string) => {
  //   try {
  //     const getLibraryName = getClientDetails.filter((item: any) => item.libraryGUID === libraryGuid)[0].name;
  //     const getFolders: any = await ProjectService().getAllFoldersInLibrary(`${getProjectUrl}/${getLibraryName}`);
  //     setGetFoldersResponse(getFolders);
  //   } catch (error) {
  //     console.error('Error fetching documents:', error);
  //   }
  // };

  const getDocumentsFromFolder = async (libraryGuid: string) => {
    try {
      const results: any = await ProjectService().getDocumentsFromFolder(libraryGuid);
      const getLibraryName = getClientDetails.filter((item: any) => item.libraryGUID === libraryGuid)[0].name;
      // console.log(`${getProjectWebURL}/${getLibraryName}`, 'getProjectName/getLibraryName');
      const getFolders: any = await ProjectService().getAllFoldersInLibrary(`${getProjectWebURL}/${getLibraryName}`);
      setGetFoldersResponse(getFolders);
      if (Array.isArray(results)) {
        setClientDocumentsData(results.map(item => item.FileLeafRef));
        setClientDocumentsAllData(results);
      } else {
        console.error('Error: Retrieved data is not an array');
      }
    } catch (error) {
      console.error('Error fetching documents:', error);
      toast.error(error.message);
    }
  };

  const getClientFromFolder = async (libraryGuid: string, getUnique: string) => {
    try {
      await apiCall(getUnique)
      const results: any = await ProjectService().getDocumentsFromFolder(libraryGuid);
      const getLibraryName = AllClientData.filter((item: any) => item.GUID === libraryGuid)[0].projectLibraryName;
      // console.log(`${getProjectCode}/${getLibraryName}`, 'getProjectName/getLibraryName');
      const getFolders: any = await ProjectService().getAllFoldersInLibrary(`${getLibraryName}`);
      setGetFoldersResponse(getFolders);
      if (Array.isArray(results)) {
        setClientDocumentsData(results.map(item => item.FileLeafRef));
        setClientDocumentsAllData(results);
      } else {
        console.error('Error: Retrieved data is not an array');
      }
    } catch (error) {
      console.error('Error fetching documents:', error);
      toast.error(error.message);
    }
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const projectService = ProjectService();
      const select = '*,Author/Title,Author/EMail,AssignClient/Title,AssignClient/ClientLibraryGUID,AssignClient/Id,Editor/Id,Editor/Title,Editor/EMail';
      const expand = 'Author,AssignClient,Editor';
      const orderBy = 'Modified';
      const filter = "IsActive eq 'Yes'";
      let results: any = [];
      if (userRole === "staff") {
        results = await projectService.getfilteredProjectExpand('Project_Informations', select, "", expand, orderBy, spContext.pageContext.user.email);
      } else {
        results = await projectService.getProjectExpand('Project_Informations', select, filter, expand, orderBy);
      }
      if (results && results.updatedResults && results.updatedResults.length > 0) {
        setProjectData(results.TableData);
        setAllClientData(results.updatedResults);
        const projectService = ProjectService();
        const folderGUID = getGuid;
        const folderResults = await projectService.getDocumentsFromFolder(folderGUID);
        setFileData(folderResults);
      } else {
        setProjectData([]);
        setAllClientData([]);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Error fetching data:', error);
    }
  };

  const fetchProjectData = () => {
    const projectService = ProjectService();
    projectService.getProject('project Checklist')
      .then((results) => {
        if (results) {
          setDropdownOptions(results);
        }
      })
      .catch((error) => {
        console.error('Error fetching SharePoint data:', error);
      });
  };

  React.useEffect(() => {
    if (uploadFiles && uploadFiles.length > 0) {
      fetchProjectData();
    }
  }, [uploadFiles]);


  React.useEffect(() => {
    fetchData();
  }, []);

  const getDocumentsLibPath = async (type: string, projectUrl: string, projectLibraryName: string) => {

    const projectRelativePath = (type === "project") ? `${projectUrl}` : (type === "client") ? `${projectUrl}/${getValues("clientName")}` : `${projectUrl}/${getValues("clientName")}/${getValues("unitDocument")}`;

    try {
      const results: any = await ProjectService().getFolderItems(spContext, siteUrl, `${projectRelativePath}`, `${projectLibraryName}`);
      setFileData(results);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching documents:", error);
    }
  };



  const handleCancel = () => {
    onClose();
  };

  const handleSave = handleSubmit(async (data: any, libraryGuid: any) => {
    setLoading(true);

    if (getClient !== "") {
      const clientInfo: any = (particularClientAllData[0].clientDetails).filter((o: any) => o.Name === getClient);

      const updatedData = {
        DMSProject: particularClientAllData[0].projectName,
        DMSProjectID: (particularClientAllData[0].Id).toString(),
        DMSClient: clientInfo[0].Name,
        DMSClientID: (clientInfo[0].Id).toString(),
        DMSUnit: (data.unitDocument !== '') ? data.unitDocument : "",
      }
      try {
        const apiResponse = ProjectService();
        const folderUrl = `${particularClientAllData[0].webURL}/${getClient}`;
        if (data.unitDocument !== '' && isUnitDocumentChecked) {

          const folderUrl = `${particularClientAllData[0].webURL}/${getClient}/${data.unitDocument}`
          //await apiResponse.addDocumentsToFolder(folderUrl, uploadFiles);
          await apiResponse.updateProjectDocumentMetadata(folderUrl, uploadFiles, updatedData)
        }
        else {
          await apiResponse.updateProjectDocumentMetadata(folderUrl, uploadFiles, updatedData)
          //await apiResponse.addDocumentsToFolder(folderUrl, uploadFiles);
        }

        uploadFiles.map((uploadedFile: any, index: any) => (
          setValue(`projectChecklist-${index}`, "")
        ));

        setLoading(false);
        setFiles([]);
        setUploadFiles([]);

        toast.success('Documents Added Successfully!');
        if (isUnitDocumentChecked) {
          getDocumentsLibPath("unit", getProjectUrl, projectLibraryName);
        } else {
          getDocumentsLibPath("client", getProjectUrl, projectLibraryName);
        }

      } catch (error) {
        setLoading(false);
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
      try {
        const apiResponse = ProjectService();
        const folderUrl = `${particularClientAllData[0].webURL}/${getClient}`;
        if (data.unitDocument !== '' && isUnitDocumentChecked) {

          const folderUrl = `${particularClientAllData[0].webURL}/${getClient}/${data.unitDocument}`
          //await apiResponse.addDocumentsToFolder(folderUrl, uploadFiles);
          await apiResponse.updateProjectDocumentMetadata(folderUrl, uploadFiles, updatedData)
        }
        else {
          await apiResponse.updateProjectDocumentMetadata(folderUrl, uploadFiles, updatedData)
          //await apiResponse.addDocumentsToFolder(folderUrl, uploadFiles);
        }

        uploadFiles.map((uploadedFile: any, index: any) => (
          setValue(`projectChecklist-${index}`, "")
        ));

        setLoading(false);
        setFiles([]);
        setUploadFiles([]);

        toast.success('Documents Added Successfully!');
        if (isUnitDocumentChecked) {
          getDocumentsLibPath("unit", getProjectUrl, projectLibraryName);
        } else {
          getDocumentsLibPath("client", getProjectUrl, projectLibraryName);
        }

      } catch (error) {
        setLoading(false);
        toast.error(`Failed to add client and document: ${error}`);
      }
    }
  });

  const handleDelete = (getGuid: any) => {
    const apiResponse = ProjectService();
    apiResponse.deleteFile(particularClientAllData[0].GUID, deleteId)
      .then(() => {
        setIsDeleteDialogOpen(false);
        toast.success('File deleted successfully!');
        if (isUnitDocumentChecked) {
          getDocumentsLibPath("unit", getProjectUrl, projectLibraryName);
        } else {
          getDocumentsLibPath("client", getProjectUrl, projectLibraryName);
        }
      })
      .catch(error => {
        console.error("Failed to delete document:", error);
        toast.error(`Failed to delete document: ${error}`);
      });
  };


  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    fetchData();
  };

  return (
    <Stack direction={"column"} gap={3}>
      <Grid container spacing={2}>
        <Grid item sm={12}>
         
           <Controller
            name="projectName"
            control={control}
            defaultValue=""
            rules={{ required: 'Project Name is required' }}
            render={({ field }) => (
              <>
                <Autocomplete
                  {...field}
                  disablePortal
                  id="combo-box-project"
                  options={AllClientData.map((option: any) => option.projectName)}
                  sx={{ width: '100%' }}
                  renderInput={(params) => (
                    <>
                      <InputLabel htmlFor="combo-box-project">Project Name</InputLabel>
                      <TextField
                        {...params}
                        // label="Project Name"
                        size="small"
                        error={!!errors.projectName}
                        helperText={errors?.projectName?.message}
                        variant="outlined"
                      />
                    </>
                  )}
                  // clearIcon={null}
                  onChange={(e, value) => {
                    if (value) {
                      const getUnique = AllClientData.filter((datas: any) => datas.projectName === value);
                      setProjectUrl(getUnique[0].webURL);
                      //setProjectCode(getUnique[0].projectNumber);
                      setProjectLibraryName(getUnique[0].projectLibraryName);
                      setParticularClientAllData(getUnique);
                      setValue('projectName', value);
                      setValue('clientName', "");
                      setIsUnitDocumentChecked(false);
                      setValue('unitDocument', "");
                      getClientFromFolder(getUnique[0].GUID, getUnique);
                      getDocumentsLibPath("project", getUnique[0].webURL, getUnique[0].projectLibraryName);
                    } else {
                      setProjectUrl("");
                      //setProjectCode("");
                      setProjectLibraryName("");
                      setParticularClientAllData([]);
                      setValue('projectName', "");
                      setValue('clientName', "");
                      setIsUnitDocumentChecked(false);
                      setValue('unitDocument', "");
                      setFileData([]); 
                      setUploadFiles([]); 
                    }
                  }}
                />
              </>
            )}
          />
        </Grid>

        <Grid item sm={6}>
          {/* <Controller
            name="clientName"
            control={control}
            defaultValue=""
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
                    setGetClient(e.target.value);
                    setIsUnitDocumentChecked(false);
                    const getLibraryName = getClientDetails.filter((item: any) => item.name === e.target.value)[0].libraryGUID;
                    getDocumentsFromFolder(getLibraryName);
                    setValue('clientName', e.target.value);
                    setGetGuid(e.target.value);
                    getDocumentsLibPath("client", getProjectUrl, getProjectCode);
                    fetchData();

                  }}
                >
                  {getClientDetails?.map((item: any) => (
                    <MenuItem key={item.Id} value={item.name}>
                      {item.name}
                    </MenuItem>
                  ))}
                </TextField>
              </>
            )}
          /> */}
           <Controller
            name="clientName"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <>
                <InputLabel htmlFor="client-name">Client Name</InputLabel>
                <Autocomplete
                  {...field}
                  id="client-name"
                  options={getClientDetails}
                  getOptionLabel={(option) => option.name}
                  fullWidth
                  size="small"
                  value={getClientDetails.find((item) => item.name === field.value) || null}
                  onChange={(e, newValue) => {
                    if (newValue) {
                      setGetClient(newValue.name);
                      setIsUnitDocumentChecked(false);
                      const getLibraryName = newValue.libraryGUID;
                      setValue('clientName', newValue.name);
                      setGetGuid(newValue.name);
                      getDocumentsFromFolder(getLibraryName);
                      getDocumentsLibPath("client", getProjectUrl, projectLibraryName);
                    } else {
                      setGetClient('');
                      setIsUnitDocumentChecked(false);
                      setValue('clientName', '');
                      setFileData([]); // Clear document data
                      setUploadFiles([]); // Clear upload files
                      setValue('unitDocument', '');
                      getDocumentsLibPath("project", getProjectUrl, projectLibraryName); 
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label=""
                      error={!!errors.clientName}
                      helperText={errors?.clientName?.message}
                    />
                  )}
                />
              </>
            )}
          />
        </Grid>

        <Grid item sm={6}>
          <Stack direction="row" alignItems="center">
            <Checkbox
              checked={isUnitDocumentChecked}
              onChange={(e) => {
                setIsUnitDocumentChecked(e.target.checked);
                setValue('unitDocument', "");
                if (!e.target.checked) {
                  getDocumentsLibPath("client", getProjectUrl, projectLibraryName);
                }
              }
              }
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
              <Autocomplete
                {...field}
                id="is-unit-document"
                // options={getFoldersResponse.map(item => item.Name)}
                options={getClient ? getFoldersResponse.map(item => item.Name) : []} // Show options only if client is selected
                fullWidth
                // disabled={!isUnitDocumentChecked}
                disabled={!isUnitDocumentChecked || !getClient} 
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    // placeholder="Select Unit..."
                    size="small"
                    required
                  />
                )}
                onChange={(e, newValue) => {
                  setValue('unitDocument', newValue || "");
                  getDocumentsLibPath("unit", getProjectUrl, projectLibraryName);
                }}
              />
            )}
          />
        </Grid>
        <Grid item sm={12}>
          <InputLabel htmlFor="project-document">Upload Document</InputLabel>
          <DropZone
            onFilesAdded={handleFileInput}
            files={uploadFiles}
            setFiles={setUploadFiles}
          />
        </Grid>
      </Grid>
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
                {uploadFiles.map((uploadedFile: any, index: any) => (
                  <TableRow key={index}>
                    <TableCell>{uploadedFile.name}</TableCell>
                    <TableCell>
                      <Controller
                        name={`projectChecklist-${index}`}
                        control={control}
                        defaultValue=""
                        rules={{ required: 'Project Checklist is required' }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            id={`project-checklist-${index}`}
                            fullWidth
                            variant="outlined"
                            select
                            size="small"
                            required
                            error={!!errors[`projectChecklist-${index}`]}
                            helperText={errors[`projectChecklist-${index}`]?.message}
                            style={{ width: 200 }}
                            onChange={(e: any) => {
                              field.onChange(e);
                              const newValue = e.target.value;
                              setValue('projectChecklist', e.target.value);
                              setUploadFiles((prevFiles: any) => {
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
              <MuiButton
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
              </MuiButton>
              {!loading && <MuiButton variant="outlined" onClick={handleCancel}>Cancel</MuiButton>}
            </Stack>
          </DialogActions>
        </>
      )}
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
                      {removeFilenameWithTimestamp(file.FileLeafRef)}

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
      </TableContainer>
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

    </Stack>

  )
}

export default ProjectUploadDocument;