import React, { useState } from 'react';
import { CircularProgress, Breadcrumbs, Box, Stack, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography, Chip, Autocomplete, TextField } from '@mui/material';
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
import { Controller, useForm } from "react-hook-form";
import DeleteDialog from './Delete/Delete';
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import CreateUnit from '../CreateUnit/CreateUnit';
import toast from "react-hot-toast";
import _ from 'lodash';
import ClientService from '../../Services/Business/ClientService';
import { IFreeholdChildProps } from '../IFreeholdChildProps';
import SPService, { SPServiceType } from '../../Services/Core/SPService';

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

const ViewProject = (props: IFreeholdChildProps) => {
  const [selected, setSelected] = React.useState<any>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [addClientDialogOpen, setAddClientDialogOpen] = useState(false);
  const [handleClientDialog, setHandleClientDialog] = useState(false);
  const spServiceInstance: SPServiceType = SPService;
  const [userRole, setUserRole] = useState('');
  const [handleUnitDialog, setHandleUnitDialog] = useState(false);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [projectDetails, setProjectDetails] = useState({});
  const [projectData, setProjectData] = useState<any>([]);
  const [AllClientData, setAllClientData] = useState<any>([]);
  const [particularClientAllData, setParticularClientAllData] = useState<any>([]);
  const [, setSelectedPersons] = useState<any[]>([]);
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
  const [assignedClientData, setAssignedClientData] = useState<any[]>([]);
  const [filterQuery, setFilterQuery] = useState('');
  const [filterPersonShown, setFilterPersonShown] = useState(false);
  const [filterQueryCall, setFilterQueryCall] = useState('');

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
  };

  const closeAssignClientDialog = () => {
    setHandleClientDialog(false);
  };

  const closeUnitDialog = () => {
    setHandleUnitDialog(false);
  };

  const closeUploadDialog = () => {
    setUploadDialogOpen(false);
  };

  const handleDeleteDialogClose = () => {
    setIsDeleteDialogOpen(false);
  };

  const theme = useTheme();
  const handleFilterChange = (event: any) => {
    setFilterQuery(event.target.value);
  };

  const handleApply = () => {
    setFilterPersonShown(true);
    if (filterQuery) {
      const filteredData = projectData.filter((data: any) =>
        data.clientDetails.some((item: any) => item.Title === filterQuery)
      );
      setProjectData(filteredData);
    } else {
      setProjectData([]);
    }
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

  let actions: any[] = [];
  if (userRole === "staff") {
    actions = [
      {
        label: 'View',
        icon: <VisibilityIcon />,
        handler: (data: any) => {

          setIsViewDialogOpen(true);
          setProjectDetails(data);
          setIsEdit(false);
          const uniqueClientData = AllClientData.map((client: any) => ({ Id: client.Id, data: data }));
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
          navigate('/EditProject/' + id.Id);
        },
      },
      {
        label: 'Create Unit',
        icon: <AcUnitIcon />,
        handler: (data: any) => {
          setHandleUnitDialog(true);
          setProjectDetails(data);
          const uniqueClientData = AllClientData.map((client: any) =>
            ({ Id: client.Id, data: data })
          );
          setParticularClientAllData(uniqueClientData);
          const getUnique = AllClientData.filter((datas: any) => datas.Id === data.Id);
          setParticularClientAllData(getUnique);
        },
      },

      {
        label: 'Manage Documents',
        button: (
          <Button
            color="primary"
            message="Manage Documents"
            handleClick={(id: any) => {
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
            disabled={userRole === "staff"}
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
      }
    ];
  } else {
    actions = [
      {
        label: 'View',
        icon: <VisibilityIcon />,
        handler: (data: any) => {

          setIsViewDialogOpen(true);
          setProjectDetails(data);
          setIsEdit(false);
          const uniqueClientData = AllClientData.map((client: any) => ({ Id: client.Id, data: data })
          );
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
          navigate('/EditProject/' + id.Id);
        },
      },

      {
        label: 'Delete',
        icon: <DeleteIcon />,
        handler: (id: any) => {
          setIsDeleteDialogOpen(true);
          setProjectDetails(id);
        },
      },

      {
        label: 'Create Unit',
        icon: <AcUnitIcon />,
        handler: (data: any) => {
          setHandleUnitDialog(true);
          setProjectDetails(data);
          const uniqueClientData = AllClientData.map((client: any) => ({ Id: client.Id, data: data })
          );
          setParticularClientAllData(uniqueClientData);

          const getUnique = AllClientData.filter((datas: any) => datas.Id === data.Id);
          setParticularClientAllData(getUnique);
        },
      },

      {
        label: 'Manage Documents',
        button: (
          <Button
            color="primary"
            message="Manage Documents"
            handleClick={(id: any) => {
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
            disabled={userRole === "staff"}
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
      }
    ];
  }

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const projectService = ProjectService();
      const clientService = ClientService();

      const select = '*,Author/Title,Author/EMail,AssignClient/Title,AssignClient/ClientLibraryGUID,AssignClient/Id,Editor/Id,Editor/Title,Editor/EMail';
      const expand = 'Author,AssignClient,Editor';
      const orderBy = 'Modified';
      const filter = "IsActive eq 'Yes'";
      if (userRole === "staff") {
        const cselect = '*,AssignedStaff/Title,AssignedStaff/EMail,AssignedStaff/Id,Author/Title,Author/EMail,ProjectId/Id,ProjectId/Title, Editor/Id,Editor/Title,Editor/EMail';
        const cexpand = 'AssignedStaff,Author,ProjectId,Editor';
        const cfilter = `AssignedStaff/EMail eq '${props.spContext.pageContext.user.email}' and IsActive eq 'Yes'`;

        const [projectResults, clientResults] = await Promise.all([
          projectService.getfilteredProjectExpand('Project_Informations', select, filter, expand, orderBy, props.spContext.pageContext.user.email),
          clientService.getClientExpandApi('Client_Informations', cselect, cexpand, cfilter, "")
        ]);
        if (projectResults && projectResults.updatedResults && projectResults.updatedResults.length > 0) {
          setProjectData(projectResults.TableData);
          setAllClientData(projectResults.updatedResults);
        } else {
          setProjectData([]);
          setAllClientData([]);
        }

        if (clientResults && clientResults.length > 0) {
          setAssignedClientData(clientResults);
        } else {
          setAssignedClientData([]);
        }
      } else {
        const [projectResults, clientResults] = await Promise.all([
          projectService.getProjectExpand('Project_Informations', select, filter, expand, orderBy),
          clientService.getClient('Client_Informations')
        ]);

        if (projectResults && projectResults.updatedResults && projectResults.updatedResults.length > 0) {
          setProjectData(projectResults.TableData);
          setAllClientData(projectResults.updatedResults);
        } else {
          setProjectData([]);
          setAllClientData([]);
        }

        if (clientResults && clientResults.length > 0) {
          setAssignedClientData(clientResults);
        } else {
          setAssignedClientData([]);
        }
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Error fetching data:', error);
    }
  };

  const handleClickOpen = (name: any) => {

    setSelectedName(() => {
      return name;
    });

    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleCancel = () => {
    setIsDelete(false);
  };

  const hyperLink = (data: any, names: any[], item: any) => {
    return (
      <Box>
        <Chip
          label={data}
          onClick={() => {
            handleClickOpen(names);
            setprojectDelDetails(item);
          }}
        >
          {data}
        </Chip>
      </Box>
    )
  };

  const tableData = projectData.map((item: any) => {
    return {
      Id: item.Id,
      projectNumber: item.projectNumber,
      projectName: item.projectName,
      location: item.location,
      assignClient: hyperLink(item?.clientDetails.length, item?.clientDetails, item),
      modifiedDate: item?.modifiedDate,
      //modifiedBy: item?.modifiedBy,
      clientDetails: item?.clientDetails
    };
  }
  );

  const tableDataWidth = projectData.map((item: any) => {
    return {
      Id: { value: item.Id, width: "50px" },
      projectNumber: { value: item.projectNumber, width: "100px" },
      projectName: { value: item.projectName, width: "120px" },
      location: { value: item.location, width: "120px" },
      //developer: { value: item.developer, width: "140px" },
      assignClient: { value: item?.assignClient, width: "120px" },
      modifiedDate: { value: item.modifiedDate, width: "140px" },
      //modifiedBy: { value: item.modifiedBy, width: "150px" },
      // assignedStaff: { value: item?.assignedStaff, width: "80%" },
    };
  });


  const getUserRoles = () => {
    const loggedInUserGroups: string[] = [];
    let userRoleVal: string = "staff";

    spServiceInstance.getLoggedInUserGroups().then((response) => {
      _.forEach(response, function (group: any) {
        loggedInUserGroups.push(group.Title);
      });

      if (_.indexOf(loggedInUserGroups, "DMS Superuser") > -1) {
        userRoleVal = "superuser";
      } else if (_.indexOf(loggedInUserGroups, "DMS Managers") > -1) {
        userRoleVal = "manager";
      } else if (_.indexOf(loggedInUserGroups, "DMS Staffs") > -1) {
        userRoleVal = "staff";
      }
      setUserRole(userRoleVal);
    });
  }

  React.useEffect(() => {
    getUserRoles();
  }, []);


  React.useEffect(() => {
    fetchData();
  }, [userRole]);

  const handleClearClient = async () => {

    try {
      const assignClientIds: any[] = [];
      _.forEach(projectDelDetails.clientDetails, function (client) {
        if (client.Id !== clientDelDetails.Id) {
          assignClientIds.push(client.Id);
        }
      });

      const folderUrl = `${projectDelDetails.webURL}/${clientDelDetails.Title}`;
      await ProjectService().deleteFolder(folderUrl);

      await ProjectService().updateProject(
        "Project_Informations",
        projectDelDetails.Id,
        { AssignClientId: { results: [...assignClientIds] } }
      );

      toast.success('Assigned Client Deleted Successfully!');
      setIsDelete(false);
      setDialogOpen(false);
      fetchData();

    } catch (error) {
      setIsLoading(false);
      toast.error(`Failed to delete assigned client: ${error}`);
    }
  }

  const handleCloseDeleteDialog = () => {
    setIsDelete(false);
  };

  return (
    <Box sx={{ width: '100', padding: '20px', marginTop: "10px" }} >
      {!isViewDialogOpen &&
        <Stack direction='column' sx={{ gap: "30px" }} >
          <Box
          >
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
                disabled={userRole === "staff"}
                Icon={
                  IconStyles(<AddIcon
                    sx={{
                      color: "white",
                      fontSize: "20px !important",

                    }} />)
                }
              />
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

                <Grid item sm={12}>


                  <Controller
                    name="clientName"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: 'clientName is required',
                    }}
                    render={({ field }) => (
                      <Autocomplete
                        options={assignedClientData.sort((a, b) => a.Title.localeCompare(b.Title))}
                        getOptionLabel={(option) => option.Title}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Client Name"
                            variant="outlined"
                            error={!!errors?.ClientName}
                            helperText={errors?.ClientName?.message}
                          />
                        )}
                        onChange={(e, value) => {
                          field.onChange(value ? value.Title : '');
                          setValue('ClientName', value ? value.Title : '');
                          handleFilterChange(value ? { target: { value: value.Title } } : null);
                          const getUnique = assignedClientData.filter((datas) => datas.Title === value?.Title);
                          setParticularClientAllData(getUnique);
                          setSelectedPersons(getUnique);
                        }}
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <DialogActions sx={{ mt: 3, ml: "7px", width: "100%", p: 0 }}>
                <MuiButton variant="outlined" onClick={handleClear}>
                  Clear
                </MuiButton>
                <MuiButton
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
            <DialogContent style={{ paddingTop: "0px", paddingRight: "24px" }}>
              <Typography style={{
                textDecoration: "underline", color: "blue", cursor: "pointer",
                listStyleType: "none", padding: 0
              }}>
                {selectedName
                  .sort((a: any, b: any) => a.Title.localeCompare(b.Title))
                  .map((data: any) => (
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
                        disabled={(userRole === "staff")}
                        style={{ color: '#bbb' }}
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

                      <Stack
                        direction="row"
                        justifyContent="end"
                        alignItems="center"
                        spacing={3}
                      >
                        <MuiButton variant="contained" color="primary"
                          sx={{ width: isLoading ? '150px' : 'auto' }}
                          onClick={handleClearClient}

                          disabled={isLoading}>
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
          userRole={userRole}
        />
      }

      {handleUnitDialog && <CreateUnit open={handleUnitDialog} onClose={closeUnitDialog} particularClientAllData={particularClientAllData} selected={selected} props={props} userRole={userRole} />}

      {uploadDialogOpen && <ViewUpload open={uploadDialogOpen} onClose={closeUploadDialog} particularClientAllData={particularClientAllData} selected={selected} spContext={props.spContext} siteUrl={props.siteUrl} userRole={userRole} />}
      {isDeleteDialogOpen &&
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
    </Box>
  );
};

export default ViewProject;