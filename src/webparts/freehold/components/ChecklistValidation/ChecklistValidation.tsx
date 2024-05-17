import { Box, Breadcrumbs, Button, Checkbox, TextField, Typography  } from '@mui/material';
import React, { useRef, useState } from 'react';
import { emphasize, styled } from '@mui/material/styles';
import { Button as MuiButton } from "@mui/material";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
// import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Controller, useForm } from 'react-hook-form';
// import Accordion from '@mui/material/Accordion';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import AccordionSummary from '@mui/material/AccordionSummary';
import Stack from '@mui/material/Stack';
import MaterialTable, { Icons } from 'material-table'
// import GridTable from '../../../../Common/Table/Table';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { forwardRef } from 'react';
import toast from 'react-hot-toast';
import {
  AddBox,
  ArrowDownward,
  Check,
  ChevronLeft,
  ChevronRight,
  Clear,
  DeleteOutline,
  Edit,
  FilterList,
  FirstPage,
  LastPage,
  Remove,
  SaveAlt,
  Search,
  ViewColumn
} from "@material-ui/icons";
import ProjectService from '../../Services/Business/ProjectService';
import ClientService from '../../Services/Business/ClientService';

// import AccordionDetails from '@mui/material/AccordionDetails';

const StyledBreadcrumb = styled(MuiButton)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'light'
      ? theme.palette.grey[100]
      : theme.palette.grey[800],
  height: theme.spacing(3),
  color: '#125895',
  fontWeight: theme.typography.fontWeightRegular,
  '&:hover, &:focus': {
    backgroundColor: emphasize(
      theme.palette.mode === 'light'
        ? theme.palette.grey[100]
        : theme.palette.grey[800],
      0.06,
    ),
  },
  '&:active': {
    boxShadow: theme.shadows[1],
    backgroundColor: emphasize(
      theme.palette.mode === 'light'
        ? theme.palette.grey[100]
        : theme.palette.grey[800],
      0.12,
    ),
  },
}));

const commonStyles = {
  bgcolor: 'background.paper',
  width: '100%',
  height: '8rem',
}

const empList = [
  { project: "Local Link", client: 'Austin Tammy', unit: "Unit1", checklistname: "Checklist1", progress: <CheckCircleOutlineIcon style={{ color: 'green' }} /> },
  { project: "Social Circle", client: 'Cames Scott', unit: "Unit2", checklistname: "Checklist2", progress: <HighlightOffIcon style={{ color: 'red' }} /> },
  { project: "Commerce Companion", client: 'Davis Jan', unit: "Unit3", checklistname: "Checklist3", progress: <CheckCircleOutlineIcon style={{ color: 'green' }} /> },
  { project: "Visionary Ventures", client: 'Edwards Jonh', unit: "Unit4", checklistname: "Checklist4", progress: <HighlightOffIcon style={{ color: 'red' }} /> },
  { project: "Breakthrough Solutions", client: 'Steph Fedro', unit: "Unit5", checklistname: "Checklist5", progress: <CheckCircleOutlineIcon style={{ color: 'green' }} /> },
  { project: "Growth Guide", client: 'John Smith', unit: "Unit6", checklistname: "Checklist6", progress: <HighlightOffIcon style={{ color: 'red' }} /> },
  { project: "Progress Planner", client: 'Brian Smith', unit: "Unit7", checklistname: "Checklist7", progress: <CheckCircleOutlineIcon style={{ color: 'green' }} /> },
  { project: "Collaborative Conversations", client: 'Catherine Young', unit: "Unit8", checklistname: "Checklist8", progress: <HighlightOffIcon style={{ color: 'red' }} /> },
  { project: "Community Guard", client: 'Dana Trist', unit: "Unit9", checklistname: "Checklist9", progress: <CheckCircleOutlineIcon style={{ color: 'green' }} /> },
  { project: "Picture Perfect", client: 'Melanie Jones', unit: "Unit10", checklistname: "Checklist10", progress: <HighlightOffIcon style={{ color: 'red' }} /> },
]

const tableIcons: Icons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const ChecklistValidation = (props: any) => {
  const ProjectRef = useRef<HTMLInputElement>(null);
  const ClientRef = useRef<HTMLInputElement>(null);
  const UnitRef = useRef<HTMLInputElement>(null);
  const [tableData, setTableData] = useState<any[]>([]);
  const [AllClientData, setAllClientData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [projectData, setProjectData] = useState<any>([]);
  const [fileData, setFileData] = useState<any[]>([]);
  const { control, formState: { errors }, setValue } = useForm();
  const [particularClientAllData, setParticularClientAllData] = useState<any>([]);
  const [getClientDetails, setGetClientDetails] = useState<any[]>([]);
  const [getFoldersResponse, setGetFoldersResponse] = useState<any[]>([]);
  const [getClientDocumentsData, setClientDocumentsData] = useState<any[]>([]);
  const [getClientDocumentsAllData, setClientDocumentsAllData] = useState<any[]>([]);
  const getProjectCode = particularClientAllData[0]?.projectNumber;
  const [getClient, setGetClient] = useState<any[]>([]);
  const [getGuid, setGetGuid] = React.useState('');
  const [isUnitDocumentChecked, setIsUnitDocumentChecked] = useState(false);
  // const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(empList)
  const columns = [
    { title: "Project", field: "project", defaultGroupOrder: 0 },
    { title: "Client", field: "client", defaultGroupOrder: 0 },
    { title: "Unit", field: 'unit' },
    { title: "Checklist Name", field: "checklistname" },
    { title: "Progress", field: 'progress' }
  ]
  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate('/');
  };
  const [projectValue, setProjectValue] = useState<string>('');
  const [clientValue, setClientValue] = useState<string>('');
  const [unitValue, setUnitValue] = useState<string>('');
  const handleSearch = () => {
    setProjectValue(ProjectRef.current?.value || '');
    setClientValue(ClientRef.current?.value || '');
    setUnitValue(UnitRef.current?.value || '')
    setTableData(prevData => [
      ...prevData,
      { project: projectValue, client: clientValue, unit: unitValue }
    ]);
    setData(data);
  }

  const groupedData: { [key: string]: any[] } = {};
  tableData.forEach(row => {
    if (!groupedData[row.project]) {
      groupedData[row.project] = [];
    }
    groupedData[row.project].push(row);
  });

  console.log(projectData, isLoading, getClient, setGetFoldersResponse, 'projectdata..')

  console.log(getClientDetails, "uploadgetClientDetails....")

  console.log(getClientDocumentsData, getClientDocumentsAllData, getFoldersResponse, 'getClientDocuments..')

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

  React.useEffect(() => {
    fetchData();
    // apiCall();
  }, []);

  return (
    <div>
      <Box sx={{ width: '100', padding: '20px', marginTop: '10px' }}>
        <Stack direction='column' sx={{ gap: "30px" }} >
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="medium" />}
            aria-label="breadcrumb"
          >
            <StyledBreadcrumb onClick={navigateToHome} startIcon={<HomeIcon />} >
              Home
            </StyledBreadcrumb>
            <StyledBreadcrumb disabled>
              CheckList Validation
            </StyledBreadcrumb>
          </Breadcrumbs>
          <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
            <Box sx={{ ...commonStyles, border: 1, borderRadius: 2, borderColor: 'primary.main', mt: 1 }}>
              <div style={{
                display: 'flex', flexDirection: 'row', alignItems: 'flex-start',
                justifyContent: 'flex-start', padding: '20px', gap: '20px', position: 'relative'
              }}>
                <Typography>Project Name
                  <Box>
                    <FormControl>
                      <Controller
                        name="projectName"
                        control={control}
                        defaultValue=""
                        rules={{ required: 'Project Name is required' }}
                        render={({ field }: any) => (
                          <>
                            <TextField
                              {...field}
                              id="project-name"
                              fullWidth
                              variant="outlined"
                              select
                              size="small"
                              required
                              sx={{
                                width: '15rem',
                                height: '2rem'
                              }}
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
                                  {item.projectName}
                                </MenuItem>
                              ))}
                            </TextField>
                          </>
                        )}
                      />
                    </FormControl>
                  </Box>
                </Typography>
                <Typography>Client Name
                  <Box>
                    <FormControl>
                      <Controller
                        name="clientName"
                        control={control}
                        defaultValue=""
                        rules={{ required: 'Client Name is required' }}
                        render={({ field }) => (
                          <>
                            <TextField
                              {...field}
                              id="client-name"
                              fullWidth
                              variant="outlined"
                              select
                              size="small"
                              required
                              sx={{
                                width: '15rem',
                                height: '2rem'
                              }}
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
                    </FormControl>
                  </Box>
                </Typography>
                <Typography>
                  <Stack direction="row" alignItems="center">
                    <Checkbox
                      checked={isUnitDocumentChecked}
                      onChange={(e: any) => setIsUnitDocumentChecked(e.target.checked)}
                      size="small"
                      sx={{ p: 0, mr: 2 }}
                    />
                    Unit
                  </Stack>
                  <Box >
                    <FormControl fullWidth>
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
                            sx={{
                              width: '15rem',
                              height: '2rem'
                            }}
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
                    </FormControl>
                  </Box>
                </Typography>
                <FormControl sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 'maxContent', marginTop: '2rem' }}>
                  <Button variant='contained' style={{ height: '1.5rem', backgroundColor: '#dba236', color: '#000' }} onClick={() => {
                    handleSearch();
                    // setIsOpen(!isOpen);
                  }}>Search</Button>
                </FormControl>
              </div>
              <Box style={{ position: 'relative', top: '5rem' }}>
                {/* <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="client-details-table">
                      <TableHead>
                        <TableRow>
                          <TableCell component="th" scope="row">Project</TableCell>
                          <TableCell component="th" scope="row">Client</TableCell>
                          <TableCell component="th" scope="row">Unit</TableCell>
                          <TableCell component="th" scope="row">CheckList Name</TableCell>
                          <TableCell component="th" scope="row">Progress</TableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {Object.entries(groupedData).map(([project, rows]) => (
                          rows.map((row, index) => (
                            <TableRow key={index}>
                              <TableCell>{row.project}</TableCell>
                              <TableCell>{row.client}</TableCell>
                              <TableCell>{row.unit}</TableCell>
                              <TableCell component="td" scope="row">CheckList Name</TableCell>
                              <TableCell component="td" scope="row"><CheckCircleOutlineIcon style={{ color: 'green' }} /></TableCell>
                            </TableRow>
                          ))
                        ))}
                      </TableBody>


                    </Table>
                  </TableContainer> */}
                <MaterialTable
                  title="CheckList Validation"
                  icons={tableIcons}
                  data={data}
                  columns={columns}
                  options={{
                    grouping: true
                  }}
                />
              </Box>
              {/* {isOpen && <div style={{ display: 'flex', position: 'relative', flexDirection: 'column', justifyContent: 'flex-start', marginTop: '2rem' }}>
                <Stack spacing={1}>
                  <Accordion sx={{ backgroundColor: 'primary.main', color: '#fff' }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ '& .MuiAccordionSummary-expandIconWrapper .MuiSvgIcon-root': { color: '#fff' } }}>
                      <Typography>{projectValue}</Typography>
                    </AccordionSummary>
                  </Accordion>
                  <Accordion sx={{ backgroundColor: 'primary.main', color: '#fff' }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ '& .MuiAccordionSummary-expandIconWrapper .MuiSvgIcon-root': { color: '#fff' } }}>
                      <Typography>{clientValue}</Typography>
                    </AccordionSummary>
                  </Accordion>
                  <Accordion sx={{ backgroundColor: 'primary.main', color: '#fff' }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ '& .MuiAccordionSummary-expandIconWrapper .MuiSvgIcon-root': { color: '#fff' } }}>
                      <Typography>{unitValue}</Typography>
                    </AccordionSummary>
                  </Accordion>
                </Stack>
              </div>} */}
            </Box>
          </Box>
        </Stack>
      </Box>
    </div>
  );
};
export default ChecklistValidation

