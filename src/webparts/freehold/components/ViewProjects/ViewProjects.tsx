import React, { useState } from 'react';
import { CircularProgress, Breadcrumbs, Box, Stack, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography, Chip } from '@mui/material';
import { Button as MuiButton } from "@mui/material";
import { emphasize, styled } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
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
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { Controller, useForm } from "react-hook-form";
import DeleteDialog from './Delete/Delete';
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import CreateUnit from '../CreateUnit/CreateUnit';
import toast from "react-hot-toast";
// import styles from '../AssignClient/AssignClient.module.scss';


// import toast from 'react-hot-toast';
// import ViewParticularClient from '../ViewClient/ViewParticularClient';





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

const ViewProject = ({ onClose, props }: any) => {
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
  const { control, formState: { errors } } = useForm();
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedName, setSelectedName] = useState<any[]>([]);


  console.log(selectedName, 'selected..')

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

  const openAssignClientDialog = () => {
    setHandleClientDialog(true);
  };

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



  const handleFilterClick = () => {
    setOpen(true);
  };

  const closeUploadDialog = () => {
    setUploadDialogOpen(false);
    // fetchData();
  };



  const handleDeleteDialogClose = () => {
    setIsDeleteDialogOpen(false);
    // fetchData();
  };

  const theme = useTheme();

  const handleClear = () => {
    // Implement clear functionality here
  };

  const handleApply = () => {
    // Implement apply functionality here
  };


  const IconStyles = (icon: any) => {
    return (
      <div>
        {icon}
      </div >
    );
  };


  const headCells = [
    // { id: 'Id', numeric: false, disablePadding: true, label: 'Id' },
    { id: 'projectNumber', numeric: false, disablePadding: true, label: 'Project Number' },
    { id: 'projectName', numeric: false, disablePadding: true, label: 'Project Name' },
    { id: 'location', numeric: false, disablePadding: true, label: 'Location' },
    { id: 'developer', numeric: false, disablePadding: true, label: 'Developer' },
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

        const uniqueClientData = AllClientData.map((client: any) => console.log(client.Id, data));
        setParticularClientAllData(uniqueClientData);

        const getUnique = AllClientData.filter((datas: any) => datas.Id === data.Id);
        setParticularClientAllData(getUnique);

      },
    },
    {
      label: 'Edit',
      icon: <EditIcon />,
      handler: (id: any) => {

        setIsViewDialogOpen(true);
        setProjectDetails(id);
        setIsEdit(true);
        //console.log(`Edit clicked for row ${id}`);
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

  const handleClickOpen = (name: any) => {
    setSelectedName(() => {
      // navigate("/ViewClient/" + id)
      return name;
    });
    setDialogOpen(true);
    console.log(selectedName, 'selected')
  }
  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleCancel = () => {
    console.log("Cancel button clicked");
    onClose();
  };

  // const handleDialog = () => {
  //   return(
  //     <>
  //     <Dialog
  //       open={open}
  //       onClose={handleClose}
  //       aria-labelledby="alert-dialog-title"
  //       aria-describedby="alert-dialog-description"
  //     >
  //       <DialogTitle>
  //       <div className="d-flex flex-column">
  //         <div className="d-flex justify-content-between align-items-center relative">
  //           <h4 style={{ margin: '0', color: '#125895' }}>
  //             Assigned Client</h4>
  //           </div>
  //         <div style={{ height: '4px', width: '100%', backgroundColor: '#125895' }} />
  //       </div>
  //       </DialogTitle>
  //       <IconButton
  //           aria-label="close"
  //           onClick={handleClose}
  //           sx={{
  //             position: "absolute",
  //             right: "14px",
  //             top: "8px",
  //             color: (theme: any) => theme.palette.grey[500],
  //           }}
  //         >
  //           <CloseIcon />
  //         </IconButton>
  //       <DialogContent>
  //         {projectData?.clientDetails?.map((data:any)=>{
  //           return(
  //             <Box>
  //               <Typography>{data.Title}</Typography>
  //             </Box>
  //           )
  //         })}
  //       </DialogContent>
  //     </Dialog>
  //   </>
  //   )
  // }

  // console.log(, "data")
  // const hyperLink = (data: any, name: any, id:any) => {
  //   return (
  //     <Box>
  //       <Chip
  //         label={data}
  //         onClick={() => {
  //           handleClickOpen(id, name);
  //           console.log(name, 'e.target')
  //         }}
  //       >
  //         {data}
  //       </Chip>
  //     </Box>
  //   );
  // };

  const hyperLink = (data: any, names: any[]) => {
    return (
      <Box>
        <Chip
          label={data}
          onClick={() => {
            handleClickOpen(names);
            console.log(names, 'e.target');
          }}
        >
          {data}
        </Chip>
      </Box>
    )
  };

  //   const hyperLink = (data: any, id: any) => {
  //   // Check if data is an array and has items
  //   if (Array.isArray(data) && data.length > 0) {
  //     return (
  //       <Box
  //         onClick={() => {
  //           navigate('/ViewClient/' + id);
  //         }}
  //         style={{
  //           textDecoration: "underline", color: "blue", cursor: "pointer",
  //           listStyleType: "none", padding: 0
  //         }}
  //       >
  //         {data.length}
  //       </Box>
  //     );
  //   } else if (data !== '-') {
  //     // Display a single client name if not an array and not '-'
  //     return (
  //       <Box
  //         onClick={() => {
  //           navigate('/ViewClient/' + id);
  //         }}
  //         style={{
  //           textDecoration: "underline", color: "blue", cursor: "pointer",
  //           listStyleType: "none", padding: 0
  //         }}
  //       >
  //         {data}
  //       </Box>
  //     );
  //   } else {
  //     // Display nothing if data is '-'
  //     return null;
  //   }
  // };


  console.log(projectData, 'projectdata..')
  const tableData = projectData.map((item: any) => {
    return {
      Id: item.Id,
      projectNumber: item.projectNumber,
      projectName: item.projectName,
      location: item.location,
      developer: item.developer,
      assignClient: hyperLink(item?.clientDetails.length, item?.clientDetails),
      modifiedDate: item?.modifiedDate,
      modifiedBy: item?.modifiedBy,
    };
  }
  );

  console.log(tableData, "table..data");

  const tableDataWidth = projectData.map((item: any) => {
    return {
      Id: { value: item.Id, width: "50px" },
      projectNumber: { value: item.projectNumber, width: "140px" },
      projectName: { value: item.projectName, width: "150px" },
      location: { value: item.location, width: "140px" },
      developer: { value: item.developer, width: "140px" },
      assignClient: { value: item?.assignClient, width: "150px" },
      modifiedDate: { value: item.modifiedDate, width: "140px" },
      modifiedBy: { value: item.modifiedBy, width: "150px" },
      // assignedStaff: { value: item?.assignedStaff, width: "80%" },
    };
  });

  React.useEffect(() => {
    fetchData();
  }, []);


  // const handleClearClient = (ServerRelativeUrl: any) => {
  //   ProjectService().deleteAssignedClient(ServerRelativeUrl)
  //     .then(() => {
  //       console.log("File deleted successfully!");
  //       toast.success('File deleted successfully!');
  //     })
  //     .catch((error) => {
  //       console.error("Failed to delete document:", error);
  //       toast.error(`Failed to delete document: ${error}`);
  //     });
  // };

  const handleClearClient = async() => {
    try {
        // const apiResponse = ProjectService();
        const getClientName = selectedName?.map((item:any)=>item.Title)
        const folderUrl = `${projectData[0].webURL}/${getClientName}`
        // await apiResponse.deleteFolder(folderUrl)
        console.log(folderUrl, 'folderurl..')
        toast.success('Assigned Client Deleted Successfully!');
  
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



  // React.useEffect(() => {
  //   fetchData();
  // }, [isViewDialogOpen]);

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
              <Button
                handleClick={openAssignClientDialog}
                disabled={selected.length === 0}
                style={{ maxWidth: "200px", whiteSpace: "pre", background: "#dba236", color: "#000" }}
                message="Assign Client"
              />
            </Box>
            <Box style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <CustomSearch handleSearchChange={handleSearchChange} />
              {false && <IconButton onClick={handleFilterClick}>
                <FilterAltIcon />
              </IconButton>}
            </Box>
          </Box>
          <Dialog
            open={open}
            fullWidth={true}
            maxWidth={"sm"}
          >
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
                        context={props.props.props.context as any}
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
          </Dialog>
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
            <DialogContent>
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
                      onClick={() => {setIsDelete(true)}}
                      style={{color:'#bbb'}}
                      >
                        <DeleteIcon />
                    </IconButton>
                  </div>
                ))}
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
                          {/* <Button
                                onClick={handleDelete}
                                variant="contained"
                                color="primary"
                                sx={{
                                    maxWidth: '150px',
                                    float: 'right',
                                }}
                            >
                                Delete
                            </Button>
                            <Button variant="outlined" onClick={handleCancel}>
                                Cancel
                            </Button> */}
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
              // rows={rows}
              // headCells={headCells}
              // props={props}
              // actions={actions}
              // searchQuery={searchQuery}
              // setSelected={setSelected}
              // selected={selected} />
              rows={tableData}
              headCells={headCells}
              props={props}
              searchQuery={searchQuery}
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
        />}

      {handleUnitDialog && <CreateUnit open={handleUnitDialog} onClose={closeUnitDialog} particularClientAllData={particularClientAllData} selected={selected} props={props} />}

      {uploadDialogOpen && <ViewUpload open={uploadDialogOpen} onClose={closeUploadDialog} particularClientAllData={particularClientAllData} selected={selected} props={props} />}
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