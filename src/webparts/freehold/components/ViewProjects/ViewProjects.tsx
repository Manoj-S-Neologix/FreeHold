import React, { useState } from 'react';
import { Breadcrumbs, Box, Stack, IconButton } from '@mui/material';
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
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ViewUpload from '../ProjectUpload/ProjectUpload';
import AssignClient from "../AssignClient/AssignClient";
import ViewParticularProject from "./ViewParticularProject";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
// import ClientService from '../../Services/Business/ClientService';
import ProjectService from '../../Services/Business/ProjectService';



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

const ViewProject = (props: any) => {
  //console.log(props, "propspropsprops");
  const [selected, setSelected] = React.useState<any>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [addClientDialogOpen, setAddClientDialogOpen] = useState(false);
  const [handleClientDialog, setHandleClientDialog] = useState(false);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [projectDetails, setProjectDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [projectData, setProjectData] = useState<any>([]);
  const [AllClientData, setAllClientData] = useState<any>([]);







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

  const openAssignClientDialog = () => {
    setHandleClientDialog(true);
  };

  const closeAssignClientDialog = () => {
    setHandleClientDialog(false);
  };

  const closeUploadDialog = () => {
    setUploadDialogOpen(false);
  };

  const handleFilterClick = () => {
    console.log('Filter icon clicked');
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
    { id: 'assignedClients', numeric: false, disablePadding: true, label: 'Assigned Clients' },
    { id: 'modifiedDate', numeric: false, disablePadding: true, label: 'Modified Date' },
    { id: 'modifiedBy', numeric: false, disablePadding: true, label: 'Modified By' },
    { id: 'action', numeric: false, disablePadding: true, label: 'Action' },
  ];

  console.log(AllClientData, "AllClientData");


  // const rows = [
  //   {  projectCode: 'JD123', projectName: 'John Doe', location: "UAE", developer:"Soren", assignedClients: 'Smith Martinez', modifiedDate: '01/02/2023', modifiedBy: 'Mateo Soren' },
  //   {  projectCode: 'JS456', projectName: 'Jane Smith', location: "UAE", developer:"Soren", assignedClients: 'Diego Charlie', modifiedDate: '04/04/2024', modifiedBy: 'Mateo Soren' },
  //   {  projectCode: 'AJ789',projectName: 'Alice Johnson', location: "UAE", developer:"Soren", assignedClients: 'Marco Doe', modifiedDate: '04/04/2024', modifiedBy: 'Mateo Soren' },
  //   { projectCode: 'BB321', projectName: 'Bob Brown', location: "UAE", developer:"Soren", assignedClients: 'Altair Martinez', modifiedDate: '07/01/2024', modifiedBy: 'Mateo Soren' },
  //   { projectCode: 'CD654',  projectName: 'Charlie Davis', location: "UAE", developer:"Soren", assignedClients: 'Martinez', modifiedDate: '10/04/2024', modifiedBy: 'Mateo Soren' },
  //   {  projectCode: 'DW987', projectName: 'David Wilson', location: "UAE", developer:"Soren", assignedClients: 'Antonio Rabin', modifiedDate: '15/04/2024', modifiedBy: 'Mateo Soren' }, 
  //   {  projectCode: 'EA246', projectName: 'Eve Anderson', location: "UAE", developer:"Soren", assignedClients: 'Etahn Martin', modifiedDate: '12/02/2024', modifiedBy: 'Mateo Soren' },
  //   {  projectCode: 'FM135', projectName: 'Frank Martinez', location: "UAE", developer:"Soren", assignedClients: 'Henry ', modifiedDate: '11/03/2024', modifiedBy: 'Mateo Soren' },
  // ];

  const actions = [
    {
      label: 'View',
      icon: <VisibilityIcon />,
      handler: (id: any) => {
        //console.log(`View clicked for row ${id}`);
        //console.log(`View clicked for row ${id}`);
        setIsViewDialogOpen(true);
        setProjectDetails(id);
      },
    },
    {
      label: 'Edit',
      icon: <EditIcon />,
      handler: (id: any) => {
        //console.log(`Edit clicked for row ${id}`);
      },
    },
    {
      label: 'Delete',
      icon: <DeleteIcon />,
      handler: (id: any) => {
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
    },
  ];

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const projectService = ProjectService();
      const select = '*';
      const expand = '';
      const results = await projectService.getProjectExpand('Project_Informations', select, expand);
      console.log(results,"result")
      setProjectData(results?.updatedResults[0].TableData);   
      setAllClientData(results?.updatedResults);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Error fetching data:', error);
    }
  };

  // console.log(, "data")

  const tableData = projectData.map((item: any) => {
    return {
      Id: item.Id,
      projectNumber: item.projectNumber,
      projectName: item.projectName,
      location: item.location,
      developer: item.developer,
      assignedClients: item.assignedClients,
      modifiedDate: item?.modifiedDate,
      modifiedBy: item?.modifiedBy,
    };
  })

  console.log(tableData, "data")

  React.useEffect(() => {
    fetchData();
  }, []);
  React.useEffect(() => {
    fetchData();
  }, [isViewDialogOpen]);

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
            display: "flex", alignItems: "center",
            width: "22%", justifyContent: "space-between"
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
          <IconButton onClick={handleFilterClick}> 
                        <FilterAltIcon />
                    </IconButton>
                    </Box>
        </Box>
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
            />
        </Box>
      </Stack>}
      {addClientDialogOpen && <AddProjectDialog open={addClientDialogOpen} onClose={closeAddClientDialog} />}
      {handleClientDialog && <AssignClient open={handleClientDialog} onClose={closeAssignClientDialog}
        props={props} />}
      {uploadDialogOpen && <ViewUpload open={uploadDialogOpen} onClose={closeUploadDialog} />}
      {isViewDialogOpen &&
        <ViewParticularProject
          props={props}
          projectDetails={projectDetails}
          setIsViewDialogOpen={setIsViewDialogOpen}
          setProjectDetails={setProjectDetails}
        />}
    </Box>
  );
};

export default ViewProject;