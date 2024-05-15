import React, { useState } from 'react';
import {  Grid, Stack} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
// import ProjectService from '../../Services/Business/ProjectService';
import DropZone from '../../../../Common/DropZone/DropZone';
import DialogActions from '@mui/material/DialogActions';
import { Button as MuiButton } from "@mui/material";
import ClientService from '../../Services/Business/ClientService';
// import { Radio, RadioGroup,  FormHelperText } from '@mui/material';
// import toast from 'react-hot-toast';
import { CircularProgress } from "@mui/material";
import toast from 'react-hot-toast';


const ProjectUploadDocument: React.FC<any> = ({ onClose, selected, props}) => {

    const { control, handleSubmit, formState: { errors }, setValue } = useForm();


    const [AllClientData, setAllClientData] = useState<any>([]);
    const [particularClientAllData, setParticularClientAllData] = useState<any>([]);
    // const [isUnitDocumentChecked, setIsUnitDocumentChecked] = useState(false);
    const [uploadFiles, setUploadFiles] = useState([]);
    const [getClient, setGetClient] = useState<any[]>([]);
    const [files, setFiles] = useState<File[]>([]);
    // const [getClientDetails, setGetClientDetails] = useState<any[]>([]);
    const [clientData, setClientData] = useState<any>([]);
    const [getGuid, setGetGuid] = React.useState('');
    const [fileData, _] = useState<any[]>([]);

    const [isLoading, setIsLoading] = useState(true);
    const [loading, setLoading] = useState(false);

    console.log(getGuid,"getGuid");

    // const [projectData, setProjectData] = useState<any>([]);

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

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const clientService = ClientService();
        // const select = '*,Title,Id';
        // const expand = 'Author,AssignedStaff';
        // const orderBy = 'Modified';
        console.log("API CALL working")
        const results = await clientService.getClient('Client_Informations');
        console.log(results, "result");
        if (results && results.length > 0) {
          setClientData(results);
          setAllClientData(results);
  
          // Retrieve documents from a folder (assuming getGuid is defined)
          // const clientService = ClientService();
          // const folderGUID = getGuid; // Assuming getGuid is defined elsewhere
          // const folderResults = await clientService.getDocumentsFromFolder(folderGUID);
          // console.log(folderResults, "File Datas");
  
          // setFileData(folderResults);
        } else {
          // Handle case where no data is returned
          setClientData([]);
          setAllClientData([]);
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error('Error fetching data:', error);
      }
    };



    const handleCancel = () => {
      onClose();
    };

    React.useEffect(() => {
        fetchData();
        // apiCall();
      }, []);

    const handleFileInput = (selectedFiles: File[]) => {
        console.log(selectedFiles, "selectedFiles");
        setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
      };

      console.log(files, setValue, particularClientAllData, getClient, setGetClient, clientData, "files");
      console.log(fileData, setLoading, isLoading, setLoading, setGetGuid, "files...");

      

      const handleSave = handleSubmit(async (data: any, libraryGuid: any) => {
        setLoading(true);
    
        try {
          const apiResponse = ClientService();
          console.log(data, 'projectdata..')
          const getLibraryName = AllClientData.filter((item: any) => item.Title === getClient)[0].ClientLibraryPath          ;
          console.log(getLibraryName, getClient, "getLibraryName")
    
          // const folderUrl = `${particularClientAllData[0].ClientLibraryPath}/${getLibraryName}`;
          // console.log(folderUrl, "folderUrlfolderUrl")
          // if (data.unitDocument !== '') {
    
          //   const folderUrl = `${particularClientAllData[0].webURL}/${getLibraryName}`
          //   await apiResponse.addDocumentsToFolder(folderUrl, uploadFiles);
          // }

          // else {
            await apiResponse.addDocumentsToFolder(getLibraryName, uploadFiles);
          // }
    
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
console.log(AllClientData,"AllClientData..")

  return (
    // <form onSubmit={handleSubmit(handleSave)}>
    <Stack direction={"column"} gap={3}>
        <Grid container spacing={2}>
            <Grid item sm={12}>
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
                                        // const getLibraryName = getClientDetails.filter((item: any) => item.name === e.target.value)[0].libraryGUID
                                        const getUnique = AllClientData.filter((datas: any) => datas.Title === e.target.value);
                                        setParticularClientAllData(getUnique);
                                        // setValue('projectName', e.target.value)
                                        console.log(getUnique, "getUnique")

                                        // console.log(getLibraryName, "getLibraryName");
                                        // getDocumentsFromFolder(getLibraryName);
                                        setValue('clientName', e.target.value);
                                        // setGetGuid(e.target.value);
                                        // fetchData(getLibraryName);
                                        
                                    }}
                                >
                                    {AllClientData?.map((item: any) => (
                                        <MenuItem key={item.id} value={item.Title}>
                                            {item.Title}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            {/* <FormHelperText error>{errors.clientName && errors.clientName.message}</FormHelperText> */}
                        </>
                    )}
                />
            </Grid>
            <Grid item sm={12}>
                <InputLabel htmlFor="client-document">Upload Document</InputLabel>
                <DropZone
                  onFilesAdded={handleFileInput}
                  files={uploadFiles}
                  setFiles={setUploadFiles}
                />
            </Grid>
        </Grid>
        <DialogActions sx={{ px: 0, mr: 0 }}>
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
    </Stack>
// </form>
  )
}

export default ProjectUploadDocument

