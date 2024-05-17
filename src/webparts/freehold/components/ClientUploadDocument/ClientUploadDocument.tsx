import React, { useState } from 'react';
import { Grid, Stack, Checkbox } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import ProjectService from '../../Services/Business/ProjectService';
import DropZone from '../../../../Common/DropZone/DropZone';
import DialogActions from '@mui/material/DialogActions';
import { Button as MuiButton } from "@mui/material";
// import { Radio, RadioGroup,  FormHelperText } from '@mui/material';
import toast from 'react-hot-toast';
import { CircularProgress } from "@mui/material";
import ClientService from '../../Services/Business/ClientService';
// import ClientService from '../../Services/Business/ClientService';


const ClientProjectUpload: React.FC<any> = ({ onClose, selected, props }) => {

  // const ClientProjectUpload: React.FC<ClientProjectUpload> = ({ open, onClose, particularClientAllData, fetchDatas }) => {

  const { control, handleSubmit, formState: { errors }, setValue } = useForm();

  const [AllClientData, setAllClientData] = useState<any>([]);
  const [particularClientAllData, setParticularClientAllData] = useState<any>([]);
  const [isUnitDocumentChecked, setIsUnitDocumentChecked] = useState(false);
  const [uploadFiles, setUploadFiles] = useState<any>([]);
  const [getClient, setGetClient] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [getClientDetails, setGetClientDetails] = useState<any[]>([]);
  const [getFoldersResponse, setGetFoldersResponse] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [projectData, setProjectData] = useState<any>([]);
  const getProjectCode = particularClientAllData[0]?.projectNumber;
  const [getClientDocumentsData, setClientDocumentsData] = useState<any[]>([]);
  const [getClientDocumentsAllData, setClientDocumentsAllData] = useState<any[]>([]);
  const [getGuid, setGetGuid] = React.useState('');
  const [fileData, setFileData] = useState<any[]>([]);
  const [dropdownOptions, setDropdownOptions] = useState<any[]>([]);
  // const [getClientFromFolder, setGetClientFromFolder] = useState<any[]>([]);



  console.log(projectData, isLoading, setGetFoldersResponse, 'projectdata..')

  console.log(getClientDetails, "uploadgetClientDetails....")

  console.log(getClientDocumentsData, getClientDocumentsAllData, getFoldersResponse, 'getClientDocuments..')


  const handleFileInput = (selectedFiles: File[]) => {
    console.log(selectedFiles, "selectedFiles");
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
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

  const clientService = ClientService();
  const clientListName = "Client_Informations";
  const selectQuery = "Id,Title,ClientLibraryGUID";

  const apiCall = async (particularClientAllData: any) => {
    try {
      console.log(particularClientAllData, "particularClientAllDataparticularClientAllData")
      const data = await clientService.getClientExpandApi(clientListName, selectQuery, "", "");
      console.log("API Call Data:", data);

      if (data) {
        const assignClientIds = particularClientAllData[0]?.assignClientId?.split(',').map((id: any) => Number(id.trim()));
        const filteredData = data.filter((item: any) => assignClientIds.includes(item.Id));
        console.log(filteredData, "filteredData");
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

  const getClientFromFolder = async (libraryGuid: string, getUnique: string) => {
    try {
      console.log(getUnique, "getUnique")
      await apiCall(getUnique)
      const results: any = await ProjectService().getDocumentsFromFolder(libraryGuid);
      console.log(results, 'guidresult')
      const getLibraryName = AllClientData.filter((item: any) => item.GUID === libraryGuid)[0].projectNumber;
      console.log(`${getProjectCode}/${getLibraryName}`, 'getProjectName/getLibraryName');
      const getFolders: any = await ProjectService().getAllFoldersInLibrary(`${getLibraryName}`);

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



  const fetchData = async () => {
    try {
      setIsLoading(true);
      const projectService = ProjectService();
      const select = '*,Author/Title,Author/EMail,AssignClient/Title,AssignClient/ClientLibraryGUID,AssignClient/Id';
      const expand = 'Author,AssignClient';
      const orderBy = 'Modified';
      const results = await projectService.getProjectExpand('Project_Informations', select, expand, orderBy);
      console.log(results, "result");
      if (results && results.updatedResults && results.updatedResults.length > 0) {
        setProjectData(results.TableData);
        setAllClientData(results.updatedResults);

        // Retrieve documents from a folder (assuming getGuid is defined)
        const projectService = ProjectService();
        const folderGUID = getGuid; // Assuming getGuid is defined elsewhere
        const folderResults = await projectService.getDocumentsFromFolder(folderGUID);
        console.log(folderResults, "File Datas");

        setFileData(folderResults);
      } else {
        // Handle case where no data is returned
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
        console.log(results, 'client');
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
    // apiCall();
  }, []);

  React.useEffect(() => {
    if (uploadFiles && uploadFiles.length > 0) {
      fetchProjectData();
    }
  }, [uploadFiles]);



  console.log(particularClientAllData, "Data");
  console.log(files, "files");

  const handleCancel = () => {
    onClose();
  };

  const handleSave = handleSubmit(async (data: any, libraryGuid: any) => {
    setLoading(true);
    const updatedData = {
      DMS_x0020_Tags: data.projectChecklist
    }

    console.log(updatedData.DMS_x0020_Tags, 'DMSTags..')

    try {
      const apiResponse = ProjectService();
      console.log(data, 'projectdata..')
      const getLibraryName = getClientDetails.filter((item: any) => item.libraryGUID === getClient)[0].name

      const folderUrl = `${particularClientAllData[0].webURL}/${getLibraryName}`;
      console.log(folderUrl, "folderUrlfolderUrl")
      if (data.unitDocument !== '') {

        const folderUrl = `${particularClientAllData[0].webURL}/${getLibraryName}/${data.unitDocument}`
        await apiResponse.addDocumentsToFolder(folderUrl, uploadFiles);
        await apiResponse.updateProjectDocumentMetadata(folderUrl, uploadFiles, updatedData.DMS_x0020_Tags)
      }
      else {
        await apiResponse.addDocumentsToFolder(folderUrl, uploadFiles);
        await apiResponse.updateProjectDocumentMetadata(folderUrl, uploadFiles, updatedData.DMS_x0020_Tags)
      }

      setLoading(false);
      setFiles([]);
      setUploadFiles([]);
      toast.success('Documents Added Successfully!');
      handleCancel();

    } catch (error) {
      setLoading(false);
      console.error("Failed to add client and document:", error);
      toast.error(`Failed to add client and document: ${error}`);
    }
  });

  console.log(AllClientData, "UploadClientData...")

  return (
    // <div>ClientProjectUpload</div>
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
                    console.log(e.target.value);
                    const getUnique = AllClientData.filter((datas: any) => datas.projectName === e.target.value);
                    setParticularClientAllData(getUnique);
                    setValue('projectName', e.target.value)
                    console.log(getUnique, "getUnique")
                    // await ProjectService().getDocumentsFromFolder(getUnique[0].GUID);
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
                    console.log(getClientDetails, "getClientDetails....")
                    setGetClient(e.target.value);
                    const getLibraryName = getClientDetails.filter((item: any) => item.libraryGUID === e.target.value)[0].libraryGUID

                    console.log(getLibraryName, "getLibraryName");
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
          <DialogActions sx={{ mt: 3, ml: "7px", width: "100%", p: 0 }}>

            <MuiButton
              sx={{ width: loading ? '150px' : 'auto' }}
              onClick={handleSave} disabled={loading} type="submit">
              {loading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                "Save"
              )}
            </MuiButton>
            {!loading && <MuiButton variant="outlined"
              onClick={handleCancel}
            >
              Cancel</MuiButton>}
          </DialogActions>
        </>
      )} */}

      {/*multiple checklist dropdown */}
      {uploadFiles.length > 0 && dropdownOptions.length > 0 && (
        <>
          {uploadFiles.map((uploadedFile : any, index : any) => (
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
                        setUploadFiles((prevFiles:any) => {
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
          ))}



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

      {/* <DialogActions sx={{ mt: 3, ml: "7px", width: "100%", p: 0 }}>

        <MuiButton
          sx={{ width: loading ? '150px' : 'auto' }}
          onClick={handleSave} disabled={loading} type="submit">
          {loading ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            "Save"
          )}
        </MuiButton>
        {!loading && <MuiButton variant="outlined"
          onClick={handleCancel}
        >
          Cancel</MuiButton>}
      </DialogActions> */}
    </Stack>

  )
}

export default ClientProjectUpload