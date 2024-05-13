import React, { useState } from 'react';
import { Box, Grid, Stack, Checkbox } from '@mui/material';
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
// import ClientService from '../../Services/Business/ClientService';


const ClientProjectUpload: React.FC<any> = ({ onClose, selected, props}) => {

    // const ClientProjectUpload: React.FC<ClientProjectUpload> = ({ open, onClose, particularClientAllData, fetchDatas }) => {

    const { control, handleSubmit, formState: { errors }, setValue } = useForm();

    const [AllClientData, setAllClientData] = useState<any>([]);
    const [particularClientAllData, setParticularClientAllData] = useState<any>([]);
    const [isUnitDocumentChecked, setIsUnitDocumentChecked] = useState(false);
    const [uploadFiles, setUploadFiles] = useState([]);
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
    // const [getClientFromFolder, setGetClientFromFolder] = useState<any[]>([]);



    console.log(projectData, setGetClientDetails, isLoading, setGetFoldersResponse,  'projectdata..')

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
        editorId: file.Editor.Id
      }));
    
      console.log(mappedFiles);

      // const clientService = ClientService();
      // const clientListName = "Client_Informations";
      // const selectQuery = "Id,Title,ClientLibraryGUID";

      // const apiCall = async () => {
      //   try {
      //     const data = await clientService.getClientExpandApi(clientListName, selectQuery, "", "");
      //     console.log("API Call Data:", data);
      //     if (data) {
      //       const assignClientIds = particularClientAllData[0]?.assignClientId?.split(',').map((id: any) => Number(id.trim()));
      //       const filteredData = data.filter((item:any) => assignClientIds.includes(item.Id));
      //       console.log(filteredData, "filteredData");
      //       const mappedData = filteredData.map((item:any) => ({
      //         id: item.Id,
      //         name: item.Title,
      //         libraryGUID: item.ClientLibraryGUID
      //       }));
      //       setGetClientDetails(mappedData);
      //       // console.log(getClientDetails, "")
      //     }
      //   } catch (error) {
      //     toast.error(error.message);
      //   }
      // };
    
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

      // const getClientFromFolder = async (libraryGuid: string) => {
      // //   try {
      // //     const results: any = await ProjectService().getDocumentsFromFolder(libraryGuid);
      // //     console.log(results, 'guidresult')
      // //     const getLibraryName = getClientDetails.filter((item: any) => item.libraryGUID === libraryGuid)[0].name;
      // //     console.log(`${getProjectCode}/${getLibraryName}`, 'getProjectName/getLibraryName');
      // //     const getFolders: any = await ProjectService().getAllFoldersInLibrary(`${getProjectCode}/${getLibraryName}`);
          
      // //     console.log('Retrieved files:', results,);
      // //     console.log('getFolders', getFolders);
      // //     setGetFoldersResponse(getFolders);
    
      // //     // Ensure results is an array before setting state
      // //     if (Array.isArray(results)) {
      // //       setClientDocumentsData(results.map(item => item.FileLeafRef));
      // //       setClientDocumentsAllData(results);
      // //       console.log(getClientDocumentsAllData, 'BBB');
      // //     } else {
      // //       console.error('Error: Retrieved data is not an array');
      // //     }
      // //   } catch (error) {
      // //     console.error('Error fetching documents:', error);
      // //   }
      // // };
    


      const fetchData = async (getGuid: any) => {
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


      React.useEffect(() => {
        fetchData(getGuid);
        // apiCall();
      }, []);
    




    console.log(particularClientAllData, "Data");
    console.log(files, "files");

    const handleCancel = () => {
        onClose();
      };
      
    const handleSave = handleSubmit(async (data: any, libraryGuid: any) => {
        setLoading(true);
    
        try {
          const apiResponse = ProjectService();
          console.log(data, 'projectdata..')
          const folderUrl = `${particularClientAllData[0].webURL}/${getClient}`;
          if (data.unitDocument !== '') {
    
            const folderUrl = `${particularClientAllData[0].webURL}/${getClient}/${data.unitDocument}`
            await apiResponse.addDocumentsToFolder(folderUrl, uploadFiles);
          }
          else {
            await apiResponse.addDocumentsToFolder(folderUrl, uploadFiles);
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
        <Box  >
            <Grid>
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
                                        console.log(getUnique,"getUnique")
                                        await ProjectService().getDocumentsFromFolder(getUnique[0].GUID);
                                        
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
                              const getLibraryName = getClientDetails.filter((item: any) => item.name === e.target.value)[0].libraryGUID

                              console.log(getLibraryName,  "getLibraryName");
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

                <DropZone
                  onFilesAdded={handleFileInput}
                  files={uploadFiles}
                  setFiles={setUploadFiles}
                />
            </Grid>
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
        </Box>

    )
}

export default ClientProjectUpload