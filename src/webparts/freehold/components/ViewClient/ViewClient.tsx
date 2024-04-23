import React, { useState } from 'react';
import { Breadcrumbs, Box, Stack } from '@mui/material';
import { Button as MuiButton } from "@mui/material";
import { emphasize, styled } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import AddClientDialog from '../AddClient/AddClient';
import AddStaffDialog from '../AddStaff/AddStaff';
import GridTable from "../../../../Common/Table/Table";
import { useNavigate } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CustomSearch from "../../../../Common/Search/CustomSearch";
import Button from "../../../../Common/Button/CustomButton";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteDialog from "../Delete/Delete";
import UploadDocument from '../UploadDocuments/UploadDocuments';
import ViewParticularClient from './ViewParticularClient';

import { WebPartContext } from "@microsoft/sp-webpart-base";
import ClientService from "../../Services/Business/ClientService";
import { createDocumentLibrary } from '../../Services/Core/ClientService';

console.log(WebPartContext, "WebPartContext");

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

const ViewClient = (props: any) => {
  const [selected, setSelected] = React.useState<any>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [handleStaffDialog, setHandleStaffDialog] = useState(false);
  const [addClientDialog, setAddClientDialog] = useState(false);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [clientData, setClientData] = useState<any>([]);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [clientDetails, setClientDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const handleSearchChange = (event: any) => {
    setSearchQuery(event.target.value);
  };

  const navigateToHome = () => {
    navigate('/');
  };

  const openAddStaffDialog = () => {
    setHandleStaffDialog(true);
  };

  const closeAddStaffDialog = () => {
    setHandleStaffDialog(false);
  };

  const openAddClientDialog = () => {
    setAddClientDialog(true);
  };

  const closeAddClientDialog = () => {
    setAddClientDialog(false);
  };



  const closeUploadDialog = () => {
    setUploadDialogOpen(false);
  };

  const handleDeleteDialogClose = () => {

    setIsDeleteDialogOpen(false);
  };

  const IconStyles = (icon: any) => {
    return (
      <div>
        {icon}
      </div >
    );
  };

  const headCells = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Client Name' },
    { id: 'email', numeric: false, disablePadding: true, label: 'Client Email' },
    { id: 'modifiedDate', numeric: false, disablePadding: true, label: 'Modified Date' },
    { id: 'modifiedBy', numeric: false, disablePadding: true, label: 'Modified By' },
    { id: 'assignedStaff', numeric: false, disablePadding: true, label: 'Assigned Staff' },
    { id: 'action', numeric: false, disablePadding: true, label: 'Actions' },
  ];
  const rows = [
    { name: 'John Doe', email: 'john@example.com', modifiedDate: '15/03/2024', modifiedBy: 'Alice Johnson', assignedStaff: 'Smith Martinez' },
    { name: 'Jane Smith', email: 'jane@example.com', modifiedDate: '16/03/2024', modifiedBy: 'Bob Brown', assignedStaff: 'Diego Charlie' },
    { name: 'Alice Johnson', email: 'alice@example.com', modifiedDate: '17/03/2024', modifiedBy: 'Charlie Davis', assignedStaff: 'Marco Doe' },
    { name: 'Bob Brown', email: 'bob@example.com', modifiedDate: '18/03/2024', modifiedBy: 'David Wilson', assignedStaff: 'Altair Martinez' },
    { name: 'Charlie Davis', email: 'charlie@example.com', modifiedDate: '19/03/2024', modifiedBy: 'Eve Anderson', assignedStaff: 'Martinez' },
    { name: 'David Wilson', email: 'david@example.com', modifiedDate: '20/03/2024', modifiedBy: 'Frank Martinez', assignedStaff: 'Antonio Rabin' },
    { name: 'Eve Anderson', email: 'eve@example.com', modifiedDate: '21/03/2024', modifiedBy: 'John Doe', assignedStaff: 'Etahn Martin' },
    { name: 'Frank Martinez', email: 'frank@example.com', modifiedDate: '22/03/2024', modifiedBy: 'Jane Smith', assignedStaff: 'Henry' },
  ];

  const actions = [
    {
      label: 'View',
      icon: <VisibilityIcon />,
      handler: (id: any) => {
        //console.log(`View clicked for row ${id}`);
        setIsViewDialogOpen(true);
        setClientDetails(id);
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
        setIsDeleteDialogOpen(true);
        setClientDetails(id);
      },
    },
    {
      label: 'View / Upload Documents',
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
      label: 'Assign Staff',
      button: (
        <Button
          color="secondary"
          message="Assign Staff"
          handleClick={(id: any) => {
            setHandleStaffDialog(!handleStaffDialog);
          }}
        />
      ),
    },
  ];

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const clientService = ClientService();
      const select = '*,AssignedStaff/Title,AssignedStaff/Id';
      const expand = 'AssignedStaff';
      const results = await clientService.getClientExpand('Client_Information', select, expand);
      setClientData(results);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Error fetching data:', error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  console.log(clientData, "clientDetails");

  return (
    <Box sx={{ width: '100', padding: '20px', marginTop: "10px" }} >
      {!isViewDialogOpen && <Stack direction='column' sx={{ gap: "30px" }} >
        <Box >
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="medium" />}
            aria-label="breadcrumb"
          >
            <StyledBreadcrumb onClick={navigateToHome} startIcon={<HomeIcon />} >
              Home
            </StyledBreadcrumb>
            <StyledBreadcrumb disabled>
              Client
            </StyledBreadcrumb>
          </Breadcrumbs>
        </Box>
        <MuiButton
          onClick={async () => {
            await createDocumentLibrary("ClientName")
          }}>Create Document</MuiButton>
        <Box style={{
          margin: '0px', display: "flex", alignItems: "center",
          justifyContent: "space-between"
        }}>
          <Box sx={{ display: "flex", alignItems: "center", width: "23%", justifyContent: "space-between" }}>
            <Button
              handleClick={openAddClientDialog}
              style={{ maxWidth: "200px", whiteSpace: "pre", background: "#125895", color: "#fff" }}
              message="Add Client"
              Icon={
                IconStyles(<AddIcon
                  sx={{
                    color: "white",
                    fontSize: "20px !important",

                  }} />)
              }
            />
            <Button
              handleClick={openAddStaffDialog}
              disabled={selected.length === 0}
              style={{
                maxWidth: "200px", whiteSpace: "pre",
                background: "#dba236", color: "#000"
              }}
              message="Assign Staff"
            />
          </Box>
          <CustomSearch handleSearchChange={handleSearchChange} />
        </Box>
        <Box >
          <GridTable
            rows={rows}
            headCells={headCells}
            props={props}
            searchQuery={searchQuery}
            setSelected={setSelected}
            selected={selected}
            actions={actions}
            isLoading={isLoading}
          />
        </Box>

      </Stack>
      }
      {addClientDialog && <AddClientDialog open={addClientDialog} onClose={closeAddClientDialog} />}
      {handleStaffDialog && <AddStaffDialog props={props} open={handleStaffDialog} onClose={closeAddStaffDialog} />}
      <UploadDocument open={uploadDialogOpen} onClose={closeUploadDialog} />

      {isDeleteDialogOpen &&
        <DeleteDialog clientDetails={clientDetails} open={isDeleteDialogOpen} onClose={handleDeleteDialogClose} />}
      {isViewDialogOpen &&
        <ViewParticularClient
          props={props}
          clientDetails={clientDetails}
          setIsViewDialogOpen={setIsViewDialogOpen}
        />}
    </Box>

  );
};

export default ViewClient;


