import React, { useState } from 'react';
import { CircularProgress, Breadcrumbs, Box, Stack, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography, Chip, MenuItem, InputLabel, TextField } from '@mui/material';
import { Button as MuiButton } from "@mui/material";
import { emphasize, styled } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate, useParams } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CustomSearch from "../../../../Common/Search/CustomSearch";
import Button from "../../../../Common/Button/CustomButton";
import AddProjectDialog from '../AddProjects/AddProject';
import styles from './ViewProjects.module.scss';
import GridTable from "../../../../Common/Table/Table";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ViewUpload from '../ProjectUpload/ProjectUpload';
import AssignClient from "../AssignClient/AssignClient";
import ViewParticularProject from "./ViewParticularProject";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ProjectService from '../../Services/Business/ProjectService';
// import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { Controller, useForm } from "react-hook-form";
import DeleteDialog from './Delete/Delete';
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import CreateUnit from '../CreateUnit/CreateUnit';
import toast from "react-hot-toast";
import _ from 'lodash';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import ClientService from '../../Services/Business/ClientService';
//import { filter } from 'lodash';

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

const ViewProject = (props: { spContext: WebPartContext, siteUrl: string }) => {
  //console.log(props, "propspropsprops");
  const [selected, setSelected] = React.useState<any>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [addClientDialogOpen, setAddClientDialogOpen] = useState(false);
  const [handleClientDialog, setHandleClientDialog] = useState(false);

  const [handleUnitDialog, setHandleUnitDialog] = useState(false);

  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [projectDetails, setProjectDetails] = useState({});
  const [projectData, setProjectData] = useState<any>([]);
  const [AllClientData, setAllClientData] = useState<any>([]);
  const [particularClientAllData, setParticularClientAllData] = useState<any>([]);
  const [selectedPersons, setSelectedPersons] = useState<any[]>([]);
  // const [loading, setLoading] = useState(false);


  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const { control, formState: { errors }, reset, setValue } = useForm();
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedName, setSelectedName] = useState<any[]>([]);

  const [clientDelDetails, setclientDelDetails] = useState<any>([]);
  const [projectDelDetails, setprojectDelDetails] = useState<any>([]);
  // const [clientData, setClientData] = useState<any>([]);
  const [getClient, setGetClient] = useState<any[]>([]);
  const [assignedClientData, setAssignedClientData] = useState<any[]>([]);
  const [filterQuery, setFilterQuery] = useState('');
  const [filterPersonShown, setFilterPersonShown] = useState(false);
  const [filterQueryCall, setFilterQueryCall] = useState('');








  let { editProjectId, viewProjectId } = useParams();


  console.log(selectedName,  'selected..')

  console.log(getClient, setGetClient, "clientData,")

  const navigate = useNavigate();

  const handleSearchChange = (event: any) => {
    setSearchQuery(event.target.value);
  };

  const navigateToHome = () => {
    navigate('/');
  };

  const openAddClientDialog = () => {
    setAddClientDialogOpen(true);
  };

  const closeAddClientDialog = () => {
    setAddClientDialogOpen(false);
    // fetchData();
  };

  /* const openAssignClientDialog = () => {
    setHandleClientDialog(true);
  }; */

  const closeAssignClientDialog = () => {
    setHandleClientDialog(false);
    // fetchData();
  };

  // const openUnitDialog = () => {
  //   setHandleClientDialog(true);
  // };

  const closeUnitDialog = () => {
    setHandleUnitDialog(false);
    // fetchData();
  };



  // const handleFilterClick = () => {
  //   setOpen(true);
  // };

  const closeUploadDialog = () => {
    setUploadDialogOpen(false);
    // fetchData();
  };



  const handleDeleteDialogClose = () => {
    setIsDeleteDialogOpen(false);
    // fetchData();
  };

  const theme = useTheme();



  const handleFilterChange = (event: any) => {
    setFilterQuery(event.target.value);
  };

  console.log(handleFilterChange, "handleFilterChange");

// const handleApply = () => {
//     if (filterQuery) {
//         const filteredData = projectData.filter((data: any) => data.clientDetails.filter((item:any)=>{item.Title===filterQuery}));
//         // setProjectData(filteredData);
//         console.log(filteredData, "filteredData");
//     } else {
//        setProjectData([]);
//         console.log("No filter query specified.");
//     }
// };

const handleApply = () => {
  setFilterPersonShown(true);
  if (filterQuery) {
      const filteredData = projectData.filter((data:any) =>
          data.clientDetails.some((item:any) => item.Title === filterQuery)
      );
      setProjectData(filteredData);
      console.log(filteredData, "filteredData");
  } else {
      setProjectData([]);
      console.log("No filter query specified.");
  }
  // setFilterQuery(filterQueryCall);
  setFilterQueryCall(filterQuery);
  setTimeout(() => {
    setOpen(false);
}, 0);
 reset();
};

const handleClear = () => {
  setFilterQueryCall('');
  reset();
  setOpen(false);
};


  const IconStyles = (icon: any) => {
    return (
      <div>
        {icon}
      </div >
    );
  };

  console.log(selectedPersons,"selectedPersons");

  const headCells = [
    { id: 'Id', numeric: false, disablePadding: true, label: 'Id' },
    { id: 'projectNumber', numeric: false, disablePadding: true, label: 'Project No' },
    { id: 'projectName', numeric: false, disablePadding: true, label: 'Project Name' },
    { id: 'location', numeric: false, disablePadding: true, label: 'Location' },
    //{ id: 'developer', numeric: false, disablePadding: true, label: 'Developer' },
    { id: 'assignClient', numeric: false, disablePadding: true, label: 'Assigned Client' },
    { id: 'modifiedDate', numeric: false, disablePadding: true, label: 'Modified Date' },
    // { id: 'modifiedBy', numeric: false, disablePadding: true, label: 'Modified By' },
    { id: 'action', numeric: false, disablePadding: true, label: 'Action' },
  ];

  console.log(AllClientData, "AllClientData");

  const actions = [
    {
      label: 'View',
      icon: <VisibilityIcon />,
      handler: (data: any) => {

        setIsViewDialogOpen(true);
        setProjectDetails(data);
        console.log();
        setIsEdit(false);


        const uniqueClientData = AllClientData.map((client: any) => console.log(client.Id, data));
        setParticularClientAllData(uniqueClientData);

        const getUnique = AllClientData.filter((datas: any) => datas.Id === data.Id);
        setParticularClientAllData(getUnique);
        navigate('/ViewProject/' + data.Id);




      },
    },
    {
      label: 'Edit',
      icon: <EditIcon />,
      handler: (id: any) => {

        setIsViewDialogOpen(true);
        setProjectDetails(id);
        setIsEdit(true);
        // console.log(`Edit clicked for row ${id}`,id);
        navigate('/EditProject/' + id.Id);
      },
    },

    {
      label: 'Delete',
      icon: <DeleteIcon />,
      handler: (id: any) => {
        setIsDeleteDialogOpen(true);
        setProjectDetails(id);
        //console.log(`Delete clicked for row ${id}`);
      },
    },

    {
      label: 'Create Unit',
      icon: <AcUnitIcon />,
      handler: (data: any) => {
        setHandleUnitDialog(true);
        setProjectDetails(data);
        const uniqueClientData = AllClientData.map((client: any) => console.log(client.Id, data));
        setParticularClientAllData(uniqueClientData);

        const getUnique = AllClientData.filter((datas: any) => datas.Id === data.Id);
        setParticularClientAllData(getUnique);
        //console.log(`Delete clicked for row ${id}`);
      },
    },

    {
      label: 'View Documents',
      button: (
        <Button
          color="primary"
          message="View Documents"
          handleClick={(id: any) => {
            //console.log(`Upload Documents clicked for row ${id}`);
            setUploadDialogOpen(true);
          }}
        />
      ),
      handler: async (data: any) => {
        const getUnique = AllClientData.filter((datas: any) => datas.Id === data.Id);
        setParticularClientAllData(getUnique);
        await ProjectService().getDocumentsFromFolder(getUnique[0].GUID);
      },
    },
    {
      label: 'Assign Client',
      button: (
        <Button
          color="secondary"
          message="Assign Client"
          handleClick={(id: any) => {
            setHandleClientDialog(!handleClientDialog);
          }}
        />
      ),
      handler: async (data: any) => {
        const getUnique = AllClientData.filter((datas: any) => datas.Id === data.Id);
        setParticularClientAllData(getUnique);
      },
    },
    // {
    //   label: 'Create Unit',
    //   button: (
    //     <Button
    //       color="secondary"
    //       message="Create Unit"
    //       handleClick={(id: any) => {
    //         setHandleUnitDialog(!handleUnitDialog);
    //       }}
    //     />
    //   ),
    //   handler: async (data: any) => {
    //     const getUnique = AllClientData.filter((datas: any) => datas.Id === data.Id);
    //     setParticularClientAllData(getUnique);
    //   },
    // },
  ];

  const handlePeoplePickerChange = async (items: any[]) => {
    console.log(items, "itemsitemsitemsitems");
    const selectedPersonsIds = [];
    for (const item of items) {
      const getID = await ProjectService().getPersonByEmail(item.secondaryText);
      console.log(getID.Id, "getIDgetID");
      selectedPersonsIds.push(getID.Id);
    }
    setSelectedPersons(selectedPersonsIds);
  };

  console.log(particularClientAllData, "Data");

  console.log(handlePeoplePickerChange, "handlePeoplePickerChange");

  // const fetchData = async () => {
  //   try {
  //     setIsLoading(true);
  //     const projectService = ProjectService();
  //     const select = '*,Author/Title,Author/EMail,AssignClient/Title,AssignClient/ClientLibraryGUID,AssignClient/Id';
  //     const expand = 'Author,AssignClient';
  //     const orderBy = 'Modified';
  //     const results = await projectService.getProjectExpand('Project_Informations', select, expand, orderBy);
  //     console.log(results, "result");
  //     if (results && results.updatedResults && results.updatedResults.length > 0) {
  //       setProjectData(results.TableData);
  //       setAllClientData(results.updatedResults);
  //     } else {
  //       // Handle case where no data is returned
  //       setProjectData([]);
  //       setAllClientData([]);
  //     }
  //     setIsLoading(false);
  //   } catch (error) {
  //     setIsLoading(false);
  //     console.error('Error fetching data:', error);
  //   }
  // };
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const projectService = ProjectService();
      const clientService = ClientService();
      
      const select = '*,Author/Title,Author/EMail,AssignClient/Title,AssignClient/ClientLibraryGUID,AssignClient/Id,Editor/Id,Editor/Title,Editor/EMail';
      const expand = 'Author,AssignClient,Editor';
      const orderBy = 'Modified';
  
      // Run both requests concurrently
      const [projectResults, clientResults] = await Promise.all([
        projectService.getProjectExpand('Project_Informations', select, expand, orderBy),
        clientService.getClient('Client_Informations')
      ]);
  
      console.log(projectResults, "project results");
      console.log(clientResults, "client results");
  
      // Handle project results
      if (projectResults && projectResults.updatedResults && projectResults.updatedResults.length > 0) {
        setProjectData(projectResults.TableData);
        setAllClientData(projectResults.updatedResults);
      } else {
        setProjectData([]);
        setAllClientData([]);
      }
  
      if (clientResults && clientResults.length > 0) {
        setAssignedClientData(clientResults);
        // setAssignedClientData(clientResults);
    } else {
        // setClientData([]);
        setAssignedClientData([]);
    }
  
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Error fetching data:', error);
    }
  };
  

  const fetchDataEditView = async () => {
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
      }
      // else {
      //   // Handle case where no data is returned
      //   setProjectData([]);
      //   setAllClientData([]);
      // }
      return results?.updatedResults
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Error fetching data:', error);
    }
  };



  // const fetchClientData = async () => {
  //   try {
  //     setIsLoading(true);
  //     const clientService = ClientService();
  //     console.log("API CALL working")
  //     const results = await clientService.getClient('Client_Informations');
  //     console.log(results, "result........");
  //     if (results && results.length > 0) {
  //       setClientData(results);
  //       setAllClientData(results);
  //     } else {
  //       setClientData([]);
  //       setAllClientData([]);
  //     }
  //     setIsLoading(false);
  //   } catch (error) {
  //     setIsLoading(false);
  //     console.error('Error fetching data:', error);
  //   }
  // };


  const handleClickOpen = (name: any) => {

    setSelectedName(() => {
      // navigate("/ViewClient/" + id)
      return name;
    });

    //Set selected row client details

    setDialogOpen(true);
    console.log(selectedName, 'selected')
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleCancel = () => {
    console.log("Cancel button clicked");
    //onClose();
  };

  const hyperLink = (data: any, names: any[], item: any) => {
    return (
      <Box>
        <Chip
          label={data}
          onClick={() => {
            handleClickOpen(names);
            setprojectDelDetails(item);
            console.log(names, 'e.target');
          }}
        >
          {data}
        </Chip>
      </Box>
    )
  };

  console.log(projectData, 'projectdata..')
  const tableData = projectData.map((item: any) => {
    return {
      Id: item.Id,
      projectNumber: item.projectNumber,
      projectName: item.projectName,
      location: item.location,
      //developer: item.developer,
      assignClient: hyperLink(item?.clientDetails.length, item?.clientDetails, item),
      modifiedDate: item?.modifiedDate,
      modifiedBy: item?.modifiedBy,
      clientDetails: item?.clientDetails
    };
  }
  );

  console.log(tableData, "table..data");

  const tableDataWidth = projectData.map((item: any) => {
    return {
      Id: { value: item.Id, width: "50px" },
      projectNumber: { value: item.projectNumber, width: "100px" },
      projectName: { value: item.projectName, width: "120px" },
      location: { value: item.location, width: "120px" },
      //developer: { value: item.developer, width: "140px" },
      assignClient: { value: item?.assignClient, width: "120px" },
      modifiedDate: { value: item.modifiedDate, width: "140px" },
      modifiedBy: { value: item.modifiedBy, width: "150px" },
      // assignedStaff: { value: item?.assignedStaff, width: "80%" },
    };
  });

  const editView = async () => {
    const initialFetch =
      await fetchDataEditView();

    if (editProjectId || viewProjectId) {
      console.log('Project ID changed:', editProjectId, viewProjectId, initialFetch);



      // Fetch the data
      // try {
      //   await fetchData();
      // } catch (error) {
      //   console.error("Error fetching data:", error);
      //   return;
      // }

      // Get the unique client data
      const projectId = editProjectId || viewProjectId;
      // const getUnique = initialFetch?.map ((data: any) => data.Id == (projectId));
      // console.log(data,"data.Iddata.Id")
      initialFetch && initialFetch.length > 0 && initialFetch.map((data: any) => {
        if (data) {
          if (data.Id == projectId) {
            console.log(data, data.Id, "MapFucntionData")
            setProjectData([data]);
            if(editProjectId){
              setIsEdit(true);
            }
            setProjectDetails(data)
            setParticularClientAllData([data]);
            setIsViewDialogOpen(true);
          }

        }
      })
      console.log(AllClientData, editProjectId, viewProjectId, "AllClientDataeditView..");
      // console.log(getUnique, "getUniqueeditview");
      console.log(projectId, "projectIdprojectId")

      // setProjectData([]);

      // Navigate based on the project ID
      if (editProjectId) {
        navigate('/EditProject/' + editProjectId);
      } else if (viewProjectId) {
        navigate('/ViewProject/' + viewProjectId);
      }
    }
  }

  React.useEffect(() => {
    fetchData();
  }, []);

  // React.useEffect(() => {
  //   fetchClientData();
  //   // apiCall();
  // }, []);

  React.useEffect(() => {

    editView();

    if (editProjectId || viewProjectId)
      // console.log(editClientId, viewClientId, "editClientId, viewClientId");
      // setIsViewDialogOpen(false);
      console.log('Project ID changed:', editProjectId, viewProjectId);
  }, [editProjectId, viewProjectId]);

  const handleClearClient = async () => {

    try {
      //console.log('projectData : ', projectData);
      //console.log('clientDelDetails : ', clientDelDetails);
      //console.log('projectDelDetails : ', projectDelDetails);

      let assignClientIds: any[] = [];

      _.forEach(projectDelDetails.clientDetails, function (client) {
        if (client.Id !== clientDelDetails.Id) {
          assignClientIds.push(client.Id);
        }
      });

      //Delete client folder
      const folderUrl = `${projectDelDetails.webURL}/${clientDelDetails.Title}`;
      await ProjectService().deleteFolder(folderUrl);

      //De-associate client
      await ProjectService().updateProject(
        "Project_Informations",
        projectDelDetails.Id,
        { AssignClientId: { results: [...assignClientIds] } }
      );

      //console.log(folderUrl, 'folderurl..') 
      toast.success('Assigned Client Deleted Successfully!');
      setIsDelete(false);
      setDialogOpen(false);
      fetchData();

    } catch (error) {
      setIsLoading(false);
      console.error("Failed to delete assigned client:", error);
      toast.error(`Failed to delete assigned client: ${error}`);
    }
  }

  const handleCloseDeleteDialog = () => {
    setIsDelete(false);
    // fetchData();
  };

  return (
    <Box sx={{ width: '100', padding: '20px', marginTop: "10px" }} >
      {!isViewDialogOpen &&
        <Stack direction='column' sx={{ gap: "30px" }} >
          <Box className={styles.Homebreadcrumb} style={{ padding: '0 10px !important' }}>
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="medium" />}
              aria-label="breadcrumb"
            >
              <StyledBreadcrumb onClick={navigateToHome} startIcon={<HomeIcon />} >
                Home
              </StyledBreadcrumb>
              <StyledBreadcrumb disabled>
                Project
              </StyledBreadcrumb>
            </Breadcrumbs>
          </Box>

          <Box style={{
            margin: '0px', display: "flex", alignItems: "center",
            justifyContent: "space-between"
          }}>
            <Box sx={{
              display: "flex", alignItems: "center", gap: "20px", justifyContent: "space-between"
            }}>

              <Button
                handleClick={openAddClientDialog}
                style={{
                  maxWidth: "200px", whiteSpace: "pre",
                  background: "#125895", color: "#fff"
                }}
                message="Add Project"
                Icon={
                  IconStyles(<AddIcon
                    sx={{
                      color: "white",
                      fontSize: "20px !important",

                    }} />)
                }
              />
              {/* <Button
                handleClick={openAssignClientDialog}
                disabled={selected.length === 0}
                style={{ maxWidth: "200px", whiteSpace: "pre", background: "#dba236", color: "#000" }}
                message="Assign Client"
              /> */}
            </Box>
            <Box style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <CustomSearch handleSearchChange={handleSearchChange} searchQryTxt={searchQuery} />
              
            {!filterPersonShown ? (
        <IconButton onClick={() => { setOpen(true); }}>
          <FilterAltIcon />
        </IconButton>
      ) : (
        <Chip
          sx={{ marginLeft: 2 }}
          // avatar={<Avatar>{filterQuery.charAt(0)}</Avatar>}
          label={filterQueryCall}
          onDelete={() => {
            setFilterQuery('');
            setFilterQueryCall('');
            setSelectedPersons([]);
            setOpen(false);
            setFilterPersonShown(false);
            fetchData();
          }}
          variant="outlined"
        />
      )}
            </Box>
          </Box>

          {/* Filter dialog */}
          <Dialog
            open={open}
            fullWidth={true}
            maxWidth={"sm"}
          >
            {/* <DialogTitle>
              <div className="d-flex flex-column">
                <div className="d-flex justify-content-between align-items-center relative">
                  <h4 style={{ margin: '0', color: theme.palette.primary.main }}>
                    Filter
                  </h4>
                </div>
                <div style={{
                  height: '4px', width: '100%',
                  backgroundColor: theme.palette.primary.main
                }} />
              </div>
            </DialogTitle>

            <IconButton
              aria-label="close"
              onClick={() => { setOpen(false); }}
              sx={{
                position: "absolute",
                right: "14px",
                top: "8px",
                color: (theme: any) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
            <DialogContent sx={{ pt: 0, mt: 0, pl: 0, overflow: "hidden" }}>

              <Grid container spacing={2} sx={{ m: 0, alignItems: "center", paddingLeft: "10px", paddingRight: "10px" }}>

                <Grid item xs={12} sm={6}>
                  <label htmlFor="assignedStaffId">Assigned Client<span style={{ color: 'red' }}>*</span></label>
                  <Controller
                    name="assignedStaffId"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: 'Assigned Client is required',
                    }}
                    render={({ field }) => (
                      <PeoplePicker
                        styles={{
                          input: {
                            width: '100%',
                            height: '30px',
                            paddingTop: "10px"
                          },
                          itemsWrapper: {
                            'ms-PickerPersona-container': {
                              width: '100%',
                              backgroundColor: 'white !important'
                            },
                          },
                          root: {
                            width: '100%',
                            height: '30px',
                            paddingTop: "10px",
                            'ms-BasePicker-text': {
                              width: '100%',
                              borderRadius: '5px'
                            }
                          },
                        }}
                        {...field}
                        context={props.spContext}
                        personSelectionLimit={4}
                        required={true}
                        showHiddenInUI={false}
                        principalTypes={[PrincipalType.User]}
                        resolveDelay={1000}
                        onChange={handlePeoplePickerChange}
                        defaultSelectedUsers={selectedPersons}
                      />
                    )}
                  />
                  {errors.assignedStaffId && <span style={{ color: 'red', fontSize: '12px' }}>{errors.assignedStaffId.message}</span>}
                </Grid>
              </Grid>
              <DialogActions sx={{ mt: 3, ml: "7px", width: "100%", p: 0 }}>
                <MuiButton variant="outlined" onClick={handleClear}>
                  Clear
                </MuiButton>
                <MuiButton
                  onClick={handleApply}
                  variant="contained"
                  color="primary"
                  sx={{
                    maxWidth: '150px',
                    float: 'right',
                  }}
                >
                  Apply
                </MuiButton>
              </DialogActions>
            </DialogContent>
          </Dialog> */}

<DialogTitle>
    <div className="d-flex flex-column">
      <div className="d-flex justify-content-between align-items-center relative">
        <h4 style={{ margin: '0', color: theme.palette.primary.main }}>
          Filter
        </h4>
      </div>
      <div style={{
        height: '4px', width: '100%',
        backgroundColor: theme.palette.primary.main
      }} />
    </div>
  </DialogTitle>

  <IconButton
    aria-label="close"
    onClick={() => { setOpen(false); }}
    sx={{
      position: "absolute",
      right: "14px",
      top: "8px",
      color: (theme: any) => theme.palette.grey[500],
    }}
  >
    <CloseIcon />
  </IconButton>
  <DialogContent sx={{ pt: 0, mt: 0, pl: 0, overflow: "hidden" }}>
    <Grid container spacing={2} sx={{ m: 0, alignItems: "center", paddingLeft: "10px", paddingRight: "10px" }}>
      {/* <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel id="assignedClientLabel">Assigned Client<span style={{ color: 'red' }}>*</span></InputLabel>
          <Controller
            name="assignedClientId"
            control={control}
            defaultValue=""
            rules={{
              required: 'Assigned Client is required',
            }}
            render={({ field }) => (
              <Select
                labelId="assignedClientLabel"
                label="Assigned Client"
                {...field}
                sx={{ height: '40px' }}
              >
                <MenuItem value=""><em>None</em></MenuItem>
                <MenuItem value={10}>Client 1</MenuItem>
                <MenuItem value={20}>Client 2</MenuItem>
                <MenuItem value={30}>Client 3</MenuItem>
              </Select>
            )}
          />
          {errors.assignedClientId && <span style={{ color: 'red', fontSize: '12px' }}>{errors.assignedClientId.message}</span>}
        </FormControl>
      </Grid> */}
        <Grid item sm={12}>
        {/* <Controller
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
                    const getUnique = assignedClientData.filter((datas: any) => datas.Title === e.target.value);
                    setParticularClientAllData(getUnique);
                    console.log(getUnique, "getUnique")
                    setValue('clientName', e.target.value);
                    handleFilterChange(e); 
                }}
            >
                  {assignedClientData?.map((item: any) => (
                    <MenuItem key={item.id} value={item.Title}>
                      {item.Title}
                    </MenuItem>
                  ))}
                </TextField> */}
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
                      error={!!errors.clientName}
                      helperText={errors?.clientName?.message}
                      onChange={(e) => {
                        setValue('clientName', e.target.value);
                        handleFilterChange(e);
                        const getUnique = assignedClientData.filter((datas) => datas.Title === e.target.value);
                        setParticularClientAllData(getUnique);
                        setSelectedPersons(getUnique);
                      }}
                    >
                      {assignedClientData?.map((item) => (
                        <MenuItem key={item.Id} value={item.Title}>
                          {item.Title}
                        </MenuItem>
                      ))}
                    </TextField>
              </>
            )}
          />
        </Grid>
    </Grid>
    <DialogActions sx={{ mt: 3, ml: "7px", width: "100%", p: 0 }}>
                <MuiButton variant="outlined" onClick={handleClear}>
                  Clear
                </MuiButton>
                <MuiButton
                        // onClick={() => {
                        //   handleApply(

                        //   ); handleFilterChange(new MouseEvent('click'));
                        // }}
                        onClick={() => {
                          handleApply();
                      }}
                        variant="contained"
                        color="primary"
                        sx={{
                          maxWidth: '150px',
                          float: 'right',
                        }}
                      >
                        Apply
                      </MuiButton>
              </DialogActions>
  </DialogContent>
</Dialog>

          {/* Assigned client dialog*/}
          <Dialog
            open={dialogOpen}
            fullWidth={true}
            maxWidth={"sm"}
          >
            <DialogTitle>
              <div className="d-flex flex-column">
                <div className="d-flex justify-content-between align-items-center relative">
                  <h4 style={{ margin: '0', color: theme.palette.primary.main }}>
                    Assigned Client
                  </h4>
                </div>
                <div style={{
                  height: '4px', width: '100%',
                  backgroundColor: theme.palette.primary.main
                }} />
              </div>
            </DialogTitle>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: "14px",
                top: "8px",
                color: (theme: any) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
            <DialogContent style={{paddingTop:"0px", paddingRight:"24px"}}>
              <Typography style={{
                textDecoration: "underline", color: "blue", cursor: "pointer",
                listStyleType: "none", padding: 0
              }}>
                {selectedName.map((data: any) => (
                  <div style={{ display: "flex", flexDirection: "row", gap: "0.5rem", alignItems: "center", justifyContent: "flex-start" }}>
                    <Box
                      key={data.Id}
                      onClick={() => {
                        navigate("/ViewClient/" + data.Id)
                      }}>
                      {data.Title}
                    </Box>
                    <IconButton aria-label="delete"
                      onClick={() => { setIsDelete(true); setclientDelDetails(data); }}
                      style={{ color: '#bbb' }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                ))}

                {/* Child delete confirmation */}
                {isDelete && (
                  <Dialog open={isDelete} maxWidth='sm' fullWidth  >
                    <DialogTitle className={styles.addTitle}
                      style={{ textAlign: 'center', marginLeft: '7px', position: 'relative' }}>
                      <div className="d-flex flex-column">
                        <div className="d-flex justify-content-between
                               align-items-center relative">
                          <h4 style={{ margin: '0', color: '#125895' }}>
                            Delete Assigned Client</h4>
                        </div>
                        <div style={{
                          height: '4px', width: '100%',
                          backgroundColor: '#125895'
                        }} />
                      </div>
                    </DialogTitle>
                    {!isLoading && <IconButton
                      aria-label="close"
                      onClick={handleCloseDeleteDialog}
                      sx={{
                        position: "absolute",
                        right: "14px",
                        top: "8px",
                        color: (theme: any) => theme.palette.grey[500],
                      }}
                    >
                      <CloseIcon />
                    </IconButton>}
                    <DialogContent >

                      <div style={{ marginLeft: '7px' }}>
                        Are you sure you want to delete assigned client
                        <strong style={{ marginLeft: '2px' }}>
                        </strong>
                        ?
                      </div>
                    </DialogContent>
                    <DialogActions sx={{ padding: '10px', marginRight: '14px' }}>

                      <Stack
                        direction="row"
                        justifyContent="end"
                        alignItems="center"
                        spacing={3}
                      >
                        <MuiButton variant="contained" color="primary"
                          sx={{ width: isLoading ? '150px' : 'auto' }}
                          onClick={handleClearClient} disabled={isLoading}>
                          {isLoading ? (
                            <CircularProgress size={20} color="inherit" />
                          ) : (
                            "Delete"
                          )}
                        </MuiButton>
                        {!isLoading && <MuiButton variant="outlined" onClick={handleCancel}  >Cancel</MuiButton>}
                      </Stack>
                    </DialogActions>
                  </Dialog>
                )}

              </Typography>
            </DialogContent>
          </Dialog>

          <Box >
            <GridTable
              rows={tableData}
              headCells={headCells}
              props={props}
              searchQuery={searchQuery}
              filterQuery={filterQuery}
              setSelected={setSelected}
              selected={selected}
              actions={actions}
              isLoading={isLoading}
              AllClientData={AllClientData}
              tableDataWidth={tableDataWidth}
            />
          </Box>
        </Stack>}
      {addClientDialogOpen && <AddProjectDialog open={addClientDialogOpen} onClose={closeAddClientDialog} fetchData={fetchData}
        props={props} />}

      {handleClientDialog &&
        <AssignClient
          open={handleClientDialog}
          onClose={closeAssignClientDialog}
          particularClientAllData={particularClientAllData}
          selected={selected}
          props={props}
          fetchData={fetchData}
        />
      }

      {handleUnitDialog && <CreateUnit open={handleUnitDialog} onClose={closeUnitDialog} particularClientAllData={particularClientAllData} selected={selected} props={props} />}

      {uploadDialogOpen && <ViewUpload open={uploadDialogOpen} onClose={closeUploadDialog} particularClientAllData={particularClientAllData} selected={selected} spContext={props.spContext} siteUrl={props.siteUrl} />}
      {isDeleteDialogOpen &&
        // <DeleteDialog projectDetails={projectDetails} open={isDeleteDialogOpen} onClose={handleDeleteDialogClose} />}
        <DeleteDialog projectDetails={projectDetails} open={isDeleteDialogOpen} onClose={handleDeleteDialogClose}
          fetchData={fetchData}
        />}
      {isViewDialogOpen &&
        <ViewParticularProject
          props={props}
          projectDetails={projectDetails}
          setIsViewDialogOpen={setIsViewDialogOpen}
          setIsEdit={setIsEdit}
          setProjectDetails={setProjectDetails}
          isEdit={isEdit}
          selectedName={selectedName}
          setSelectedName={setSelectedName}
          particularClientAllData={particularClientAllData} selected={selected}
          fetchData={fetchData}
        />}
      {/* {isViewDialogOpen && <ViewParticularClient projectDetails={projectDetails}/>} */}
    </Box>
  );
};

export default ViewProject;