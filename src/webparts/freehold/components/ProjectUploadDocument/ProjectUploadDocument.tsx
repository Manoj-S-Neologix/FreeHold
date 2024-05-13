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
import toast from 'react-hot-toast';
// import { CircularProgress } from "@mui/material";
// import ClientService from '../../Services/Business/ClientService';

const ProjectUploadDocument: React.FC<any> = ({ onClose, selected, props}) => {

    const { control, handleSubmit, formState: { errors }, setValue } = useForm();

  

    // const [AllClientData, setAllClientData] = useState<any>([]);
    const [particularClientAllData, setParticularClientAllData] = useState<any>([]);
    // const [isUnitDocumentChecked, setIsUnitDocumentChecked] = useState(false);
    const [uploadFiles, setUploadFiles] = useState([]);
    const [getClient, setGetClient] = useState<any[]>([]);
    // const [loading, setLoading] = useState(false);
    const [files, setFiles] = useState<File[]>([]);
    const [getClientDetails, setGetClientDetails] = useState<any[]>([]);
    // const [getFoldersResponse, setGetFoldersResponse] = useState<any[]>([]);
    // const [isLoading, setIsLoading] = useState(true);
    // const [projectData, setProjectData] = useState<any>([]);

    const clientService = ClientService();
    const clientListName = "Client_Informations";
    const selectQuery = "Id,Title,ClientLibraryGUID";

    const apiCall = async () => {
      try {
        const data = await clientService.getClientExpandApi(clientListName, selectQuery, "", "");
        console.log("API Call Data:", data);
        if (data) {
          const assignClientIds = particularClientAllData[0]?.assignClientId?.split(',').map((id: any) => Number(id.trim()));
          const filteredData = data.filter((item:any) => assignClientIds.includes(item.Id));
          console.log(filteredData, "filteredData");
          const mappedData = filteredData.map((item:any) => ({
            id: item.Id,
            name: item.Title,
            libraryGUID: item.ClientLibraryGUID
          }));
          setGetClientDetails(mappedData);
          // console.log(getClientDetails, "")
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

    React.useEffect(() => {
        // fetchData();
        apiCall();
      }, []);

    const handleFileInput = (selectedFiles: File[]) => {
        console.log(selectedFiles, "selectedFiles");
        setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
      };

      console.log(files, setValue, setParticularClientAllData, getClient, "files");

      const handleSave=()=>{
        <></>
      }


  return (
    <form onSubmit={handleSubmit(handleSave)}>
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
                                        const getLibraryName = getClientDetails.filter((item: any) => item.name === e.target.value)[0].libraryGUID

                                        console.log(getLibraryName, "getLibraryName");
                                        // getDocumentsFromFolder(getLibraryName);
                                        setValue('clientName', e.target.value);
                                        // setGetGuid(e.target.value);
                                        // fetchData(getLibraryName);
                                        
                                    }}
                                >
                                    {getClientDetails?.map((item: any) => (
                                        <MenuItem key={item.id} value={item.name}>
                                            {item.name}
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
                type="submit"
                variant="contained"
            >
                Save
            </MuiButton>
            <MuiButton
                variant="outlined"
                // onClick={() => setOpenDocuments(false)}
            >
                Cancel
            </MuiButton>

        </DialogActions>
    </Stack>
</form>
  )
}

export default ProjectUploadDocument

