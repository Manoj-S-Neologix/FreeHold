import React, { useState } from 'react';
import { Grid, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, } from '@mui/material';
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
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';




const ProjectUploadDocument: React.FC<any> = ({ onClose, selected, props }) => {

  const { control, handleSubmit, formState: { errors }, setValue } = useForm();


  const [AllClientData, setAllClientData] = useState<any>([]);
  const [particularClientAllData, setParticularClientAllData] = useState<any>([]);
  // const [isUnitDocumentChecked, setIsUnitDocumentChecked] = useState(false);
  const [uploadFiles, setUploadFiles] = useState<any>([]);
  const [getClient, setGetClient] = useState<any[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  // const [getClientDetails, setGetClientDetails] = useState<any[]>([]);
  const [clientData, setClientData] = useState<any>([]);
  const [getGuid, setGetGuid] = React.useState('');
  const [fileData, _] = useState<any[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [dropdownOptions, setDropdownOptions] = useState<any[]>([]);

  console.log(getGuid, "getGuid");

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

  React.useEffect(() => {
    if (uploadFiles && uploadFiles.length > 0) {
      fetchClientData();
    }
  }, [uploadFiles]);

  const fetchClientData = () => {
    const clientService = ClientService();
    clientService.getClient('Client Checklist')
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

  const handleFileInput = (selectedFiles: File[]) => {
    console.log(selectedFiles, "selectedFiles");
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  const onDelete = (index: number) => {
    setUploadFiles((prevFiles: any[]) =>
      prevFiles.filter((_, i: number) => i !== index)
    );
  };

  console.log(files, setValue, particularClientAllData, getClient, setGetClient, clientData, "files");
  console.log(fileData, setLoading, isLoading, setLoading, setGetGuid, "files...");



  const handleSave = handleSubmit(async (data: any, libraryGuid: any) => {
    setLoading(true);

    /* const updatedData = {
      DMS_x0020_Tags: data.clientChecklist
    } */

    //console.log(updatedData.DMS_x0020_Tags, 'DMSTags..')

    try {
      const apiResponse = ClientService();
      console.log(data, 'projectdata..')
      const getLibraryName = AllClientData.filter((item: any) => item.Title === getClient)[0].ClientLibraryPath;
      const clientInfo: any = AllClientData.filter((item: any) => item.Title === getClient)[0];

      const updatedData = {
        DMSClient: clientInfo.Title,
        DMSProject: "",
        DMSUnit: "",
        DMSClientID: (clientInfo.Id).toString(),
        DMSProjectID: ""
      }
      console.log(getLibraryName, getClient, "getLibraryName")

      // const folderUrl = `${particularClientAllData[0].ClientLibraryPath}/${getLibraryName}`;
      // console.log(folderUrl, "folderUrlfolderUrl")
      // if (data.unitDocument !== '') {

      //   const folderUrl = `${particularClientAllData[0].webURL}/${getLibraryName}`
      //   await apiResponse.addDocumentsToFolder(folderUrl, uploadFiles);
      // }

      // else {
      await apiResponse.addDocumentsToFolder(getLibraryName, uploadFiles);
      await apiResponse.updateClientDocumentMetadata(getLibraryName, uploadFiles, updatedData)
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
  console.log(AllClientData, "AllClientData..")

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
      {/*single checklist dropdown */}
      {/* {uploadFiles.length > 0 && dropdownOptions.length > 0 && (
        <>
          <div>
            <Controller
              name="clientChecklist"
              control={control}
              defaultValue=""
              rules={{ required: 'Client Checklist is required' }}
              render={({ field }) => (
                <>
                  <InputLabel htmlFor="client-checklist">Client Checklist</InputLabel>
                  <TextField
                    {...field}
                    id="client-checklist"
                    fullWidth
                    variant="outlined"
                    select
                    size="small"
                    required
                    error={!!errors.clientChecklist}
                    helperText={errors?.clientChecklist?.message}
                    onChange={(e: any) => {
                      console.log('Selected:', e.target.value);
                      setValue('clientChecklist', e.target.value);
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

          {/* {uploadFiles.map((uploadedFile:any, index:any) => (
            <div key={index} style={{ position: 'relative', bottom: '6.2rem', marginLeft: '16rem' }}
            >
              <Controller
                name={`clientChecklist-${index}`}
                control={control}
                defaultValue=""
                rules={{ required: 'Client Checklist is required' }}
                render={({ field }) => (
                  <>
                    <div >

                      <InputLabel htmlFor={`client-checklist-${index}`}>Client Checklist</InputLabel>
                    </div>
                    <TextField
                      {...field}
                      id={`client-checklist-${index}`}
                      fullWidth
                      style={{ maxWidth: '200px' }}
                      variant="outlined"
                      select
                      size="small"
                      required
                      error={!!errors[`clientChecklist-${index}`]}
                      helperText={errors[`clientChecklist-${index}`]?.message}
                      onChange={(e: any) => {
                        field.onChange(e);
                        const newValue = e.target.value;
                        setValue('clientChecklist', e.target.value);
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
                {uploadFiles.map((uploadedFile: any, index: any) => (
                  <TableRow key={index}>
                    <TableCell>{uploadedFile.name}</TableCell>
                    <TableCell>
                      <Controller
                        name={`clientChecklist-${index}`}
                        control={control}
                        defaultValue=""
                        rules={{ required: 'Client Checklist is required' }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            id={`client-checklist-${index}`}
                            fullWidth
                            variant="outlined"
                            select
                            size="small"
                            required
                            error={!!errors[`clientChecklist-${index}`]}
                            helperText={errors[`clientChecklist-${index}`]?.message}
                            style={{ width: 200 }} // Fixed width
                            onChange={(e: any) => {
                              field.onChange(e);
                              const newValue = e.target.value;
                              setValue('clientChecklist', e.target.value);
                              console.log(newValue, 'e.target')
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
      {/* <DialogActions sx={{ px: 0, mr: 0 }}>
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
    // </form>
  )
}

export default ProjectUploadDocument

