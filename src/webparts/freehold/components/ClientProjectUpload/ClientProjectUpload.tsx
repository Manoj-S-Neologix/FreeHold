// import React, { useState, useEffect } from 'react';
// import { Box, Grid } from '@mui/material';
// import { Controller, useForm } from 'react-hook-form';
// import TextField from '@mui/material/TextField';
// import MenuItem from '@mui/material/MenuItem';
// import InputLabel from '@mui/material/InputLabel';
// import ProjectService from '../../Services/Business/ProjectService';
// import DropZone from '../../../../Common/DropZone/DropZone';


// const ClientProjectUpload = (props: any) => {

//     const { control, formState: { errors }, setValue } = useForm();

//     const [AllClientData, setAllClientData] = useState([]);
//     const [particularClientAllData, setParticularClientAllData] = useState([]);
//     const [isUnitDocumentChecked, setIsUnitDocumentChecked] = useState(false);
//     const [uploadFiles, setUploadFiles] = useState([]);

//     const handleFileInput = (selectedFiles) => {
//         console.log(selectedFiles, "selectedFiles");
//         setUploadFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
//       };

  
//     useEffect(() => {
//       const fetchData = async () => {
//         try {
//           const allClients = await ProjectService.getAllClients();
//           setAllClientData(allClients);
//         } catch (error) {
//           console.error('Error fetching client data:', error);
//         }
//       };
//       fetchData();
//     }, []); // Run only once on component mount

   

//     return (
//         // <div>ClientProjectUpload</div>
//         <Box>
// <Grid>
//         <Grid item sm={12}>
//             <Controller
//                 name="projectName"
//                 control={control}
//                 defaultValue=""
//                 rules={{ required: 'Project Name is required' }}
//                 render={({ field }: any) => (
//                     <>
//                         <InputLabel htmlFor="project-name">Project Name</InputLabel>
//                         <TextField
//                             {...field}
//                             id="project-name"
//                             fullWidth
//                             variant="outlined"
//                             select
//                             size="small"
//                             required
//                             label=""
//                             error={!!errors.projectName}
//                             onChange={async(e: any) => {
//                                 console.log(e.target.value);
//                                 const getUnique = AllClientData.filter((datas: any) => datas.Id === e.target.value);
//                                 setParticularClientAllData(getUnique);
//                                 setValue('projectName',"Janani")
//                                 await ProjectService().getDocumentsFromFolder(getUnique[0].GUID);
//                               }}
//                         >
//                              {AllClientData?.map((item: any) => (
//                               <MenuItem key={item.id} value={item.id}>
//                                 {item.name}
//                               </MenuItem>
//                             ))}
//                         </TextField>
//                     </>
//                 )}
//             />
//         </Grid>

//          <Grid item sm={6}>
//                     <Controller
//                       name="clientName"
//                       control={control}
//                       defaultValue=""
//                       rules={{ required: 'Client Name is required' }}
//                       render={({ field }) => (
//                         <>
//                           <InputLabel htmlFor="client-name">Client Name</InputLabel>
//                           <TextField
//                             {...field}
//                             id="client-name"
//                             fullWidth
//                             variant="outlined"
//                             select
//                             size="small"
//                             required
//                             label=""
//                             error={!!errors.clientName}
//                             helperText={errors?.clientName?.message}
//                             onChange={(e: any) => {
//                               console.log(e.target.value);
//                               setGetClient(e.target.value);
//                               const getLibraryName = getClientDetails.filter((item: any) => item.name === e.target.value)[0].libraryGUID

//                               console.log(getLibraryName, "getLibraryName");
//                               getDocumentsFromFolder(getLibraryName);
//                               setValue('clientName', e.target.value);
//                               setGetGuid(e.target.value);
//                               fetchData(getLibraryName);
//                             }}
//                           >
//                             {getClientDetails?.map((item: any) => (
//                               <MenuItem key={item.id} value={item.name}>
//                                 {item.name}
//                               </MenuItem>
//                             ))}
//                           </TextField>
//                         </>
//                       )}
//                     />
//                   </Grid> 


//                   <Grid item sm={6}>
//                     <Stack direction="row" alignItems="center">
//                     <Checkbox
//                         checked={isUnitDocumentChecked}
//                         onChange={(e) => setIsUnitDocumentChecked(e.target.checked)}
//                         size="small"
//                         sx={{ p: 0, mr: 2 }}
//                       />
//                       <InputLabel>Is Unit Document</InputLabel>
//                     </Stack>
//                     <Controller
//                       name="unitDocument"
//                       control={control}
//                       defaultValue=""
//                       render={({ field }) => (
//                         <TextField
//                           {...field}
//                           id="is-unit-document"
//                           fullWidth
//                           select
//                           disabled={!isUnitDocumentChecked}
//                           variant="outlined"
//                           placeholder="Select Unit..."
//                           size="small"

//                           required
//                         >

//                           {getFoldersResponse.length > 0 &&
//                             getFoldersResponse.map((item: any, idx: any) => (
//                               <MenuItem key={idx} value={item?.Name}>
//                                 {item?.Name}
//                               </MenuItem>
//                             ))}
//                         </TextField>
//                       )}
//                     />
//                   </Grid> 

//      <DropZone
//                                     onFilesAdded={handleFileInput}
//                                     files={uploadFiles}
//                                     setFiles={setUploadFiles}
//                                 />
//      </Grid>
//      </Box>

//     )
// }

// export default ClientProjectUpload