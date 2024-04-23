import React, { useState } from 'react';
import { Breadcrumbs, Box, Stack } from '@mui/material';
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

  const IconStyles = (icon: any) => {
    return (
      <div>
        {icon}
      </div >
    );
  };

  const headCells = [
    { id: 'projectName', numeric: false, disablePadding: true, label: 'Project Name' },
    { id: 'projectCode', numeric: false, disablePadding: true, label: 'Project Code' },
    { id: 'assignedClients', numeric: false, disablePadding: true, label: 'Assigned Clients' },
    { id: 'modifiedDate', numeric: false, disablePadding: true, label: 'Modified Date' },
    { id: 'modifiedBy', numeric: false, disablePadding: true, label: 'Modified By' },
    { id: 'action', numeric: false, disablePadding: true, label: 'Action' },
  ];


  const rows = [
    { projectName: 'John Doe', projectCode: 'JD123', assignedClients: 'Smith Martinez', modifiedDate: '01/02/2023', modifiedBy: 'Mateo Soren' },
    { projectName: 'Jane Smith', projectCode: 'JS456', assignedClients: 'Diego Charlie', modifiedDate: '04/04/2024', modifiedBy: 'Mateo Soren' },
    { projectName: 'Alice Johnson', projectCode: 'AJ789', assignedClients: 'Marco Doe', modifiedDate: '04/04/2024', modifiedBy: 'Mateo Soren' },
    { projectName: 'Bob Brown', projectCode: 'BB321', assignedClients: 'Altair Martinez', modifiedDate: '07/01/2024', modifiedBy: 'Mateo Soren' },
    { projectName: 'Charlie Davis', projectCode: 'CD654', assignedClients: 'Martinez', modifiedDate: '10/04/2024', modifiedBy: 'Mateo Soren' },
    { projectName: 'David Wilson', projectCode: 'DW987', assignedClients: 'Antonio Rabin', modifiedDate: '15/04/2024', modifiedBy: 'Mateo Soren' },
    { projectName: 'Eve Anderson', projectCode: 'EA246', assignedClients: 'Etahn Martin', modifiedDate: '12/02/2024', modifiedBy: 'Mateo Soren' },
    { projectName: 'Frank Martinez', projectCode: 'FM135', assignedClients: 'Henry ', modifiedDate: '11/03/2024', modifiedBy: 'Mateo Soren' },
  ];

  const actions = [
    {
      label: 'View',
      icon: <VisibilityIcon />,
      handler: (id: any) => {
        //console.log(`View clicked for row ${id}`);
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
      label: 'Upload Documents',
      button: (
        <Button
          color="primary"
          message="View / Upload Documents"
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

  return (
    <Box sx={{ width: '100', padding: '20px', marginTop: "10px" }} >
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
            width: "25%", justifyContent: "space-between"
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
          <CustomSearch handleSearchChange={handleSearchChange} />
        </Box>
        <Box >
          <GridTable
            rows={rows}
            headCells={headCells}
            props={props}
            actions={actions}
            searchQuery={searchQuery}
            setSelected={setSelected}
            selected={selected} />
        </Box>
      </Stack>
      <AddProjectDialog open={addClientDialogOpen} onClose={closeAddClientDialog} />
      <AssignClient open={handleClientDialog} onClose={closeAssignClientDialog}
        props={props} />
      <ViewUpload open={uploadDialogOpen} onClose={closeUploadDialog} />

    </Box>
  );
};

export default ViewProject;