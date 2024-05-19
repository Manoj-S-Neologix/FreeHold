import { Box, Breadcrumbs, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { emphasize, styled } from '@mui/material/styles';
import { Button as MuiButton } from "@mui/material";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Controller, useForm } from 'react-hook-form';
import Stack from '@mui/material/Stack';
import MaterialTable, { Icons } from 'material-table';

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
import _ from 'lodash';
import { WebPartContext } from '@microsoft/sp-webpart-base';

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

const ChecklistValidation = (props: { spContext: WebPartContext, siteUrl: string }) => {

  const [isLoading, setIsLoading] = useState(true);
  const [projectData, setProjectData] = useState<any>([]);
  const [unitData, setunitData] = useState<any>([]);
  const { control, formState: { errors }, setValue, getValues, reset } = useForm();
  const [particularClientAllData, setParticularClientAllData] = useState<any>([]);
  const projectService = ProjectService();

  const [data, setData] = useState<any>([]);
  const columns = [
    { title: "Project", field: "project", defaultGroupOrder: 0 },
    { title: "Client", field: "client", defaultGroupOrder: 0 },
    { title: "Unit", field: 'unit', defaultGroupOrder: 0 },
    { title: "Checklist Name", field: "checklistname" },
    { title: "Progress", field: 'progress' }
  ]
  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate('/');
  };

  //Get search results
  const handleSearch = async () => {

    projectService.getProject('project Checklist')
      .then(async (results: any) => {
        console.log(results);

        let clientName: string = "";
        let unitFolder: string = "";

        if (results.length > 0) {
          //Get project number
          const projectInfo = _.filter(projectData, function (o) { return o.projectName === getValues("projectName"); })[0].projectNumber;

          let projectRelativePath = projectInfo;

          if (getValues("clientName") !== "" && getValues("clientName") !== undefined && getValues("clientName") !== null) {
            clientName = getValues("clientName");
            projectRelativePath += "/" + getValues("clientName");
          }

          if (getValues("unitDocument") !== "" && getValues("unitDocument") !== undefined && getValues("unitDocument") !== null) {
            unitFolder = getValues("unitDocument");
            projectRelativePath += "/" + getValues("unitDocument");
          }

          //Get all recursive documents
          let docDetails = await ProjectService().getFolderItemsRecursive(props.spContext, props.siteUrl, `/${projectRelativePath}`, `<View Scope='RecursiveAll'><Query><OrderBy><FieldRef Name="Modified" Ascending="FALSE"/></OrderBy></Query></View>`, projectInfo);

          const docDetails_Grpd = _.groupBy(docDetails, "FileDirRef");
          console.log("docDetails :", docDetails_Grpd);

          //Create document list
          const docList: any[] = [];

          _.forEach(results, function (value) {

            if (clientName === "" && unitFolder === "") {

              const projectFolderPath: string = `${props.spContext.pageContext.web.serverRelativeUrl}/${projectInfo}`;
              const clientDetails = _.filter(docDetails_Grpd[projectFolderPath], function (o) { return o.FileSystemObjectType == 1; });

              _.forEach(clientDetails, function (client) {

                const clientFolderPath: string = `${props.spContext.pageContext.web.serverRelativeUrl}/${projectInfo}/${client.Title}`;
                const unitDetails = _.filter(docDetails_Grpd[clientFolderPath], function (o) { return o.FileSystemObjectType == 1; });

                _.forEach(unitDetails, function (unit) {
                  docList.push({
                    project: getValues("projectName"),
                    client: client.Title,
                    unit: unit.Title,
                    checklistname: value.Title,
                    progress: (docDetails_Grpd[`${clientFolderPath}/${unit.Title}`] !== undefined) ? checkProgress(docDetails_Grpd[`${clientFolderPath}/${unit.Title}`], value.Title) : <HighlightOffIcon style={{ color: 'red' }} />
                  });
                });
              });

            }
            else if (clientName !== "" && unitFolder === "") {
              const clientFolderPath: string = `${props.spContext.pageContext.web.serverRelativeUrl}/${projectInfo}/${clientName}`;
              const unitDetails = _.filter(docDetails_Grpd[clientFolderPath], function (o) { return o.FileSystemObjectType == 1; });

              _.forEach(unitDetails, function (unit) {
                docList.push({
                  project: getValues("projectName"),
                  client: getValues("clientName"),
                  unit: unit.Title,
                  checklistname: value.Title,
                  progress: (docDetails_Grpd[`${clientFolderPath}/${unit.Title}`] !== undefined) ? checkProgress(docDetails_Grpd[`${clientFolderPath}/${unit.Title}`], value.Title) : <HighlightOffIcon style={{ color: 'red' }} />
                });
              });
            } else if (clientName !== "" && unitFolder !== "") {
              const clientFolderPath: string = `${props.spContext.pageContext.web.serverRelativeUrl}/${projectInfo}/${clientName}`;

              docList.push({
                project: getValues("projectName"),
                client: getValues("clientName"),
                unit: unitFolder,
                checklistname: value.Title,
                progress: (docDetails_Grpd[`${clientFolderPath}/${unitFolder}`] !== undefined) ? checkProgress(docDetails_Grpd[`${clientFolderPath}/${unitFolder}`], value.Title) : <HighlightOffIcon style={{ color: 'red' }} />
              });

            }

          });

          console.log('docList', docList);

          //Set table
          setData(docList);

        } else {
          toast("No checklist configured for the selected project");
        }
      })
      .catch((error) => {
        console.error('Error fetching checklist data:', error);
      });

    //Set table
    //setData(empList);

  };

  const checkProgress = (docDetails: any, checkListName: string) => {

    const docs = _.filter(docDetails, function (o) { return o.FileSystemObjectType == 0 && o.DMSTag == checkListName; });

    return (docs.length > 0) ? <CheckCircleOutlineIcon style={{ color: 'green' }} /> : <HighlightOffIcon style={{ color: 'red' }} />;
  };

  const groupedData: { [key: string]: any[] } = {};
  data.forEach((row: { project: string | number; }) => {
    if (!groupedData[row.project]) {
      groupedData[row.project] = [];
    }
    groupedData[row.project].push(row);
  });

  console.log(isLoading);

  const fetchData = async () => {

    try {
      setIsLoading(true);
      const select = '*,Author/Title,Author/EMail,AssignClient/Title,AssignClient/ClientLibraryGUID,AssignClient/Id';
      const expand = 'Author,AssignClient';
      const orderBy = 'Modified';
      const results = await projectService.getProjectExpand('Project_Informations', select, expand, orderBy);
      console.log(results, "result");
      if (results && results.updatedResults && results.updatedResults.length > 0) {
        setProjectData(results.updatedResults);

      } else {
        // Handle case where no data is returned
        setProjectData([]);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Error fetching data:', error);
    }
  };

  const getDocumentsFromFolder = async (libraryName: string, clientName: string) => {
    try {

      const unitFolders: any = await ProjectService().getAllFoldersInLibrary(`${libraryName}/${clientName}`);
      if (unitFolders.length > 0) {
        setunitData(unitFolders);
      } else {
        toast("No unit folders found.")
      }

    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

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

              {/* Filter section */}
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
                                const getUnique = projectData.filter((datas: any) => datas.projectName === e.target.value);
                                if (getUnique[0].clientDetails.length > 0) {
                                  setParticularClientAllData(getUnique[0].clientDetails);
                                } else {
                                  toast("No client found, Please select any other project");
                                }
                                setValue('projectName', e.target.value);

                              }}
                            >
                              {projectData?.map((item: any) => (
                                <MenuItem key={item.id} value={item.projectName}>
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

                                setValue('clientName', e.target.value);
                                const projectInfo = _.filter(projectData, function (o) { return o.projectName === getValues("projectName"); })[0].projectNumber;

                                getDocumentsFromFolder(projectInfo, e.target.value);

                              }}
                            >
                              {particularClientAllData?.map((item: any) => (
                                <MenuItem key={item.Id} value={item.Name}>
                                  {item.Name}
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
                            //disabled={!isUnitDocumentChecked}
                            variant="outlined"
                            placeholder="Select Unit..."
                            size="small"
                            sx={{
                              width: '15rem',
                              height: '2rem'
                            }}
                            onChange={(e: any) => {
                              setValue('unitDocument', e.target.value);
                            }}
                            required
                          >
                            {unitData.length > 0 &&
                              unitData.map((item: any, idx: any) => (
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

                <FormControl sx={{ display: 'flex', flexDirection: 'row', gap: "1rem", justifyContent: 'center', alignItems: 'center', width: 'maxContent', marginTop: '2rem' }}>
                  <Button
                    disabled={(getValues('projectName') !== "" && getValues('projectName') !== undefined) ? false : true}
                    variant='contained'
                    style={{ height: '1.5rem', backgroundColor: '#dba236', color: '#000' }}
                    onClick={() => {
                      handleSearch();
                    }}>Search</Button>
                  <Button
                    variant='contained'
                    style={{ height: '1.5rem', backgroundColor: '#dba236', color: '#000' }}
                    onClick={() => {
                      reset();
                      setunitData([]);
                      setParticularClientAllData([]);
                      setData([]);
                    }}>Clear</Button>
                </FormControl>
              </div>

              {/* Filter results */}
              <Box style={{ position: 'relative', top: '5rem' }}>

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

            </Box>
          </Box>
        </Stack>
      </Box >
    </div >
  );
};

export default ChecklistValidation;