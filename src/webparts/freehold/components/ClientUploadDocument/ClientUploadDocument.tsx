import React, { useState } from 'react';
import { Grid, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import DropZone from '../../../../Common/DropZone/DropZone';
import DialogActions from '@mui/material/DialogActions';
import { Button as MuiButton } from "@mui/material";
import ClientService from '../../Services/Business/ClientService';
import { CircularProgress } from "@mui/material";
import toast from 'react-hot-toast';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

const ClientUploadDocument: React.FC<any> = ({ onClose, selected, props, userRole, spContext }) => {

  const { control, handleSubmit, formState: { errors }, setValue, getValues, reset } = useForm();
  const [AllClientData, setAllClientData] = useState<any>([]);
  const [, setParticularClientAllData] = useState<any>([]);
  const [uploadFiles, setUploadFiles] = useState<any>([]);
  const [getClient, setGetClient] = useState<any[]>([]);
  const [, setFiles] = useState<File[]>([]);
  const [, setClientData] = useState<any>([]);
  const [, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [dropdownOptions, setDropdownOptions] = useState<any[]>([]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const clientService = ClientService();
      const select = '*,AssignedStaff/Title,AssignedStaff/EMail,AssignedStaff/Id,Author/Title,Author/EMail,ProjectId/Id,ProjectId/Title, Editor/Id,Editor/Title,Editor/EMail';
      const expand = 'AssignedStaff,Author,ProjectId,Editor';
      const filter = (userRole === "staff") ? `AssignedStaff/EMail eq '${spContext.pageContext.user.email}'` : "";
      const orderBy = 'Modified';
      const results = await clientService.getClients('Client_Informations', select, expand, filter, orderBy);
      if (results?.updatedResults && results?.updatedResults.length > 0) {
        setClientData(results?.tableData);
        setAllClientData(results?.updatedResults);
      } else {
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
        if (results) {
          setDropdownOptions(results);
        }
      })
      .catch((error) => {
        console.error('Error fetching SharePoint data:', error);
      });
  };

  const handleFileInput = (selectedFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  const onDelete = (index: number) => {
    const updatedFiles = uploadFiles.filter((_:any, i:any) => i !== index);
    setUploadFiles(updatedFiles);
    const clientName: string = getValues("clientName");
    reset({ clientName });
    updatedFiles.forEach((file:any, i:any) => {
        setValue(`clientChecklist-${i}`, file.checklist || "");
    });
  };

  const handleSave = handleSubmit(async (data: any, libraryGuid: any) => {
    setLoading(true);
    try {
      const apiResponse = ClientService();
      const clientInfo: any = AllClientData.filter((item: any) => item.name === getClient)[0];
      const updatedData = {
        DMSClient: clientInfo.name,
        DMSProject: "",
        DMSUnit: "",
        DMSClientID: (clientInfo.Id).toString(),
        DMSProjectID: ""
      }
      await apiResponse.updateClientDocumentMetadata(clientInfo.webURL, uploadFiles, updatedData);
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

  return (

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
                    setGetClient(e.target.value);
                    const getUnique = AllClientData.filter((datas: any) => datas.Title === e.target.value);
                    setParticularClientAllData(getUnique);
                    setValue('clientName', e.target.value);
                  }}
                >
                  {AllClientData?.map((item: any) => (
                    <MenuItem key={item.id} value={item.name}>
                      {item.name}
                    </MenuItem>
                  ))}
                </TextField>
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
                            style={{ width: 200 }} 
                            onChange={(e: any) => {
                              field.onChange(e);
                              const newValue = e.target.value;
                              setValue('clientChecklist', e.target.value);
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
export default ClientUploadDocument;