import React, { useState } from 'react';
import { Grid, Stack, Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
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

const ProjectUploadDocument: React.FC<any> = ({ onClose, selected, spContext, userRole }) => {
  const { control, handleSubmit, formState: { errors }, setValue } = useForm();
  const [AllClientData, setAllClientData] = useState<any>([]);
  const [particularClientAllData, setParticularClientAllData] = useState<any>([]);
  const [isUnitDocumentChecked, setIsUnitDocumentChecked] = useState(false);
  const [uploadFiles, setUploadFiles] = useState<any>([]);
  const [getClient, setGetClient] = useState("");
  const [loading, setLoading] = useState(false);
  const [, setFiles] = useState<File[]>([]);
  const [getClientDetails, setGetClientDetails] = useState<any[]>([]);
  const [getFoldersResponse, setGetFoldersResponse] = useState<any[]>([]);
  const [, setIsLoading] = useState(true);
  const [, setProjectData] = useState<any>([]);
  // const getProjectCode = particularClientAllData[0]?.projectNumber;
  const getProjectWebURL = particularClientAllData[0]?.webURL;
  const [, setClientDocumentsData] = useState<any[]>([]);
  const [, setClientDocumentsAllData] = useState<any[]>([]);
  const [getGuid, setGetGuid] = React.useState('');
  const [, setFileData] = useState<any[]>([]);
  const [dropdownOptions, setDropdownOptions] = useState<any[]>([]);

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
      const getLibraryName = AllClientData.filter((item: any) => item.GUID === libraryGuid)[0].projectNumber;
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
      let results: any = [];
      if (userRole === "staff") {
        results = await projectService.getfilteredProjectExpand('Project_Informations', select, "", expand, orderBy, spContext.pageContext.user.email);
      } else {
        results = await projectService.getProjectExpand('Project_Informations', select, "", expand, orderBy);
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
    fetchData();
  }, []);

  React.useEffect(() => {
    if (uploadFiles && uploadFiles.length > 0) {
      fetchProjectData();
    }
  }, [uploadFiles]);

  const handleCancel = () => {
    onClose();
  };

  const handleSave = handleSubmit(async (data: any, libraryGuid: any) => {
    setLoading(true);

    try {

      if (getClient !== "") {
        const apiResponse = ProjectService();
        const getLibraryName = getClientDetails.filter((item: any) => item.libraryGUID === getClient)[0].name;

        const clientInfo: any = getClientDetails.filter((item: any) => item.libraryGUID === getClient);

        const updatedData = {
          DMSProject: particularClientAllData[0].projectName,
          DMSProjectID: (particularClientAllData[0].Id).toString(),
          DMSClient: clientInfo[0].name,
          DMSClientID: (clientInfo[0].id).toString(),
          DMSUnit: (data.unitDocument !== '') ? data.unitDocument : "",
        }

        const folderUrl = `${particularClientAllData[0].webURL}/${getLibraryName}`;
        if (data.unitDocument !== '') {
          const folderUrl = `${particularClientAllData[0].webURL}/${getLibraryName}/${data.unitDocument}`
          await apiResponse.updateProjectDocumentMetadata(folderUrl, uploadFiles, updatedData)
        }
        else {
          await apiResponse.updateProjectDocumentMetadata(folderUrl, uploadFiles, updatedData)
        }

        setLoading(false);
        setFiles([]);
        setUploadFiles([]);
        toast.success('Documents Added Successfully!');
        handleCancel();
      } else {
        const apiResponse = ProjectService();

        const updatedData = {
          DMSProject: particularClientAllData[0].projectName,
          DMSProjectID: (particularClientAllData[0].Id).toString(),
          DMSClient: "",
          DMSClientID: "",
          DMSUnit: "",
        }
        const folderUrl = `${particularClientAllData[0].webURL}`;
        await apiResponse.updateProjectDocumentMetadata(folderUrl, uploadFiles, updatedData)
        setLoading(false);
        setFiles([]);
        setUploadFiles([]);
        toast.success('Documents Added Successfully!');
        handleCancel();
      }
    } catch (error) {
      setLoading(false);
      toast.error(`Failed to add client and document: ${error}`);
    }
  });
  return (
    <Stack direction={"column"} gap={3}>
      <Grid container spacing={2}>
        <Grid item sm={12}>
          <Controller
            name="projectName"
            control={control}
            defaultValue=""
            rules={{ required: 'Project Name is required' }}
            render={({ field }: any) => (
              <>
                <InputLabel htmlFor="project-name">Project Name</InputLabel>
                <TextField
                  {...field}
                  id="project-name"
                  fullWidth
                  variant="outlined"
                  select
                  size="small"
                  required
                  label=""
                  error={!!errors.projectName}
                  onChange={async (e: any) => {
                    const getUnique = AllClientData.filter((datas: any) => datas.projectName === e.target.value);
                    setParticularClientAllData(getUnique);
                    setValue('projectName', e.target.value);
                    setValue('clientName', "");
                    setIsUnitDocumentChecked(false);
                    setValue('unitDocument', "");
                    getClientFromFolder(getUnique[0].GUID, getUnique);
                  }}
                >
                  {AllClientData?.map((item: any) => (
                    <MenuItem key={item.id} value={item.projectName
                    }>
                      {item.projectName}-{item.projectNumber}
                    </MenuItem>
                  ))}
                </TextField>
              </>
            )}
          />
        </Grid>

        <Grid item sm={6}>
          <Controller
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
                    const getLibraryName = getClientDetails.filter((item: any) => item.libraryGUID === e.target.value)[0].libraryGUID
                    getDocumentsFromFolder(getLibraryName);
                    setValue('clientName', e.target.value);
                    setGetGuid(e.target.value);
                    fetchData();

                  }}
                >
                  {getClientDetails?.map((item: any) => (
                    <MenuItem key={item.Id} value={item.libraryGUID}>
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

    </Stack>

  )
}

export default ProjectUploadDocument;