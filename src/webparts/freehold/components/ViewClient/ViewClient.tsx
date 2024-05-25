/* eslint-disable prefer-const */
import React, { useState } from 'react';
import { Breadcrumbs, Box, Stack, Dialog, DialogContent, DialogTitle, Grid, IconButton, Chip, Avatar, Typography } from '@mui/material';
import { Button as MuiButton } from "@mui/material";
import { emphasize, styled } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import AddClientDialog from '../AddClient/AddClient';
import AddStaffDialog from '../AddStaff/AddStaff';
import GridTable from "../../../../Common/Table/Table";
import { useNavigate, useParams } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CustomSearch from "../../../../Common/Search/CustomSearch";
import Button from "../../../../Common/Button/CustomButton";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteDialog from "./Delete/Delete";
import UploadDocument from '../UploadDocuments/UploadDocuments';
import ViewParticularClient from './ViewParticularClient';
import ClientService from "../../Services/Business/ClientService";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { Controller, useForm } from "react-hook-form";
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

const ViewClient = (props: { spContext: WebPartContext, siteUrl: string }) => {
  const [selected, setSelected] = React.useState<any[]>([]);
  const [selectedDetails, setSelectedDetails] = React.useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterQuery, setFilterQuery] = useState('');
  const [searchText, setSearchText] = useState('');
  const [isPersona, setISPersona] = useState(false);

  // console.log(filterQuery, "filterQuery");
  const [searchQueryCall, setSearchQueryCall] = useState('');

  const [filterQueryCall, setFilterQueryCall] = useState('');

  const [handleStaffDialog, setHandleStaffDialog] = useState(false);
  const [addClientDialog, setAddClientDialog] = useState(false);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [clientData, setClientData] = useState<any>([]);
  const [AllClientData, setAllClientData] = useState<any>([]);
  const [particularClientAllData, setParticularClientAllData] = useState<any>([]);
  const [particularClientProjects, setparticularClientProjects] = useState<any>([]);
  const [selectedPersons, setSelectedPersons] = useState<any[]>([]);

  const [filterPersonShown, setFilterPersonShown] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [clientDetails, setClientDetails] = useState<any | undefined>({});
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = React.useState(false);
  const [selectedName, setSelectedName] = useState<any[]>([]);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  // const assignStaffOptions = ['Staff 1', 'Staff 2', 'Staff 3'];
  const { control, formState: { errors } } = useForm();

  let { editClientId, viewClientId } = useParams();
  const navigate = useNavigate();

  console.log(editClientId, viewClientId, "editviewid")

  const fetchDataByuserId = async () => {
    if (viewClientId) {
      setIsEdit(false);
      const data = await fetchDataById(viewClientId);
      console.log(data, "datadatadata");

      if (data && data.length > 0) {
        console.log(data[0].Id, "datadatadata");
        const ID = data[0].Id;
        const clientDetails = data[0];
        console.log(clientDetails, "datadatadata");
        setClientDetails(clientDetails); // Assuming data is an object
        console.log("datadatadata", AllClientData, ID);
        /* const getValue = AllClientData.map((data: any) => {
          if (data.Id === ID) {
            return data;
          }
          return;
        }); */

        const select = '*,AssignClient/Title,AssignClient/Id';
        const expand = 'AssignClient';
        const orderBy = 'Modified';
        const filter = `AssignClient/Id eq '${ID}'`;

        // const filtered = "";
        const results = await ClientService().getProjects('Project_Informations', select, expand, filter, orderBy);
        //console.log("Project details : ", results);

        const getUnique = AllClientData.filter((datas: any) => datas.Id === ID);
        setParticularClientAllData(getUnique);
        setparticularClientProjects(results);
        //console.log("datadatadata", getValue, getUnique, "getUniquegetUnique");
        setIsViewDialogOpen(true);
        navigate('/ViewClient/' + String(clientDetails?.Id));
      }
    }
    if (editClientId) {
      setIsEdit(true);
      setIsOpen(true);
      setIsViewDialogOpen(true);
      const data = await fetchDataById(editClientId);
      console.log(data, "datadatadata");
      if (data) {
        const ID = data[0].Id;
        const clientDetails = data[0];
        console.log(clientDetails, "datadatadata");
        setClientDetails(clientDetails);
        const getValue = AllClientData.map((data: any) => {
          if (data.Id === ID) {
            return data;
          }
          return;
        });
        const getUnique = AllClientData.filter((datas: any) => datas.Id === ID);
        // setParticularClientAllData([clientDetails]);
        setParticularClientAllData(getUnique);
        console.log("datadatadata", getValue, getUnique, "getUniquegetUnique");

        const select = '*,AssignClient/Title,AssignClient/Id';
        const expand = 'AssignClient';
        const orderBy = 'Modified';
        const filter = `AssignClient/Id eq '${ID}'`;

        const results = await ClientService().getProjects('Project_Informations', select, expand, filter, orderBy);
        setparticularClientProjects(results);
        navigate('/EditClient/' + String(clientDetails?.Id));
      }
    }
  };

  console.log(particularClientAllData, "getUniquegetUnique");
  console.log(clientData, '.clientData.')
  console.log(selectedName, 'selectedname')

  const handleSearchChange = (event: any) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterChange = (event: any) => {
    setFilterQuery(event.target.value);
  };

  const navigateToHome = () => {
    navigate('/');
  };

  const openAddStaffDialog = () => {
    setHandleStaffDialog(true);
  };

  const closeAddStaffDialog = () => {
    setHandleStaffDialog(false);
    fetchData();
  };

  const openAddClientDialog = () => {
    setAddClientDialog(true);
  };

  const closeAddClientDialog = () => {
    setAddClientDialog(false);
  };

  const handleFilterClick = () => {
    setOpen(true);
  };

  const closeUploadDialog = () => {
    setUploadDialogOpen(false);
  };

  const handleDeleteDialogClose = () => {
    setIsDeleteDialogOpen(false);
  };

  const theme = useTheme();

  const handleClear = () => {
    setSearchQueryCall('');
    setFilterQueryCall('');
    setSelectedPersons([]);
    setOpen(false);
  };

  const handleApply = () => {

    setFilterPersonShown(true);
    const filteredData = clientData.filter((data: any) => {
      if (data.assignStaff && typeof data.assignStaff === 'string') {
        return data.assignStaff.toLowerCase().includes(searchText);
      }
      return false;
    });
    console.log(filteredData, clientData, "filteredData....")
    setClientData(filteredData);
    setFilterQuery(filterQueryCall);
    setSearchQuery(searchQueryCall);
    setISPersona(true);
    setOpen(false);
  };

  console.log(clientData, "clientDataclientData")

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
    // { id: 'contact', numeric: false, disablePadding: true, label: 'Contact Number' },
    { id: 'modifiedDate', numeric: false, disablePadding: true, label: 'Modified Date' },
    // { id: 'modifiedBy', numeric: false, disablePadding: true, label: 'Modified By' },
    { id: 'assignStaff', numeric: false, disablePadding: true, label: 'Assigned Staff' },
    { id: 'action', numeric: false, disablePadding: true, label: 'Actions' },
  ];

  console.log(AllClientData, "AllClientData");


  const actions = [
    {
      label: 'View',
      icon: <VisibilityIcon />,
      handler: async (data: any) => {

        viewClientId = String(data.Id);
        if (data.Id) {
          console.log(data, "AllClientDataAllClientData");
          await fetchDataByuserId();
        }

      },
    },
    {
      label: 'Edit',
      icon: <EditIcon />,
      handler: async (data: any) => {

        editClientId = String(data.Id);
        if (data.Id) {
          console.log(data, "AllClientDataAllClientData");
          await fetchDataByuserId();
        }
      },
    },
    {
      label: 'Delete',
      icon: <DeleteIcon />,
      handler: (id: any) => {
        //console.log(`Delete clicked for row ${id}`);
        setIsDeleteDialogOpen(true);
        setClientDetails(id);
        // handledeleteClient(id);
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
        await ClientService().getDocumentsFromFolder(getUnique[0].GUID);

      },

    },
    {
      label: 'Assign Staff',
      button: (
        <Button
          color="secondary"
          message="Assign Staff"
          handleClick={(data: any) => {
            setHandleStaffDialog(!handleStaffDialog);
          }}
        />
      ),
      handler: async (data: any) => {
        const getUnique = AllClientData.filter((datas: any) => datas.Id === data.Id);
        setParticularClientAllData(getUnique);
      },
    },
  ];

  const searchPeopleInTable = async (items: any[]) => {
    if (items.length > 0 && items[0]?.text) {
      const searchText = items[0].text.toLowerCase();
      setSearchText(searchText)
      setSearchQueryCall(items[0].text);
      // setFilterQueryCall(items[0].text);
      setSelectedPersons(items);
    }
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const clientService = ClientService();
      const select = '*,AssignedStaff/Title,AssignedStaff/EMail,AssignedStaff/Id,Author/Title,Author/EMail,ProjectId/Id,ProjectId/Title, Editor/Id,Editor/Title,Editor/EMail';
      const expand = 'AssignedStaff,Author,ProjectId,Editor';
      const filter = "";
      const orderBy = 'Modified';
      console.log(orderBy, "orderByorderByorderBy....")
      const results = await clientService.getClients('Client_Informations', select, expand, filter, orderBy);
      console.log(results, 'client')
      setClientData(results?.tableData);
      setAllClientData(results?.updatedResults);
      setIsLoading(false);
      setSelected([]);

    } catch (error) {
      setIsLoading(false);
      console.error('Error fetching data:', error);
    }
  };

  const fetchDataById = async (id: any) => {
    try {
      setIsLoading(true);
      const clientService = ClientService();
      const select = '*,AssignedStaff/Title,AssignedStaff/Id,Author/Title,Author/EMail,ProjectId/Id,ProjectId/Title, Editor/Id,Editor/Title,Editor/EMail';
      const expand = 'AssignedStaff,Author,ProjectId,Editor';
      // const orderBy = 'Modified';
      const filter = `Id eq '${id}'`;
      const orderBy = "Modified";
      // const filtered = "";
      const results = await clientService.getClients('Client_Informations', select, expand, filter, orderBy);
      //const filteredResults = await clientService.getClientExpand('Client_Informations', select, expand, "", orderBy);
      //setAllClientData(filteredResults?.tableData);

      // setClientData(results?.updatedResults[0].TableData);
      //setAllClientData(results?.updatedResults);
      setIsLoading(false);
      setSelected([]);
      return results?.updatedResults;
    } catch (error) {
      setIsLoading(false);
      console.error('Error fetching data:', error);
    }
  };

  const handleClickOpen = (name: any, id?: number) => {
    const newItem = { name, id };
    setSelectedName([...selected, newItem]);
    setDialogOpen(true);
    console.log(name, id, 'selected');
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const hyperLink = (data: any, name: any[], id?: any) => {
    return (
      <Box>
        <Chip
          label={data}
          onClick={() => {
            handleClickOpen(name, id);
          }}
        >
          {data}
        </Chip>
      </Box>
    );
  };

  const tableData = clientData.map((item: any) => {
    return {
      Id: item.Id,
      name: item.name,
      email: item.email,
      contact: item.contact,
      modifiedDate: item.modifiedDate,
      modifiedBy: item.modifiedBy,
      assignStaff: hyperLink(item?.assignedStaff.length, item?.assignedStaff, item.Id),
      assignedStaff: item?.assignedStaff,
      ProjectId: hyperLink(item.projectName, item?.ProjectIdId)
    };
  });

  console.log(tableData, "tableDatatableDatatableData")

  const tableDataWidth = clientData.map((item: any) => {
    return {
      Id: { value: item.Id, width: "50px" },
      name: { value: item.name, width: "130px" },
      email: { value: item.email, width: "180px" },
      contact: { value: item.contact, width: "150px" },
      modifiedDate: { value: item.modifiedDate, width: "150px" },
      modifiedBy: { value: item.modifiedBy, width: "150px" },
      assignStaff: { value: item?.assignStaff, width: "150px" },
      assignedStaff: { value: item?.assignedStaff, width: "80%" },
    };
  });

  React.useEffect(() => {
    fetchData();
  }, []);

  React.useEffect(() => {
    if (editClientId || viewClientId)
      fetchDataByuserId();
    // console.log(editClientId, viewClientId, "editClientId, viewClientId");
    // setIsViewDialogOpen(false);
  }, [editClientId, viewClientId]);

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

        <Box style={{
          margin: '0px', display: "flex", alignItems: "center",
          justifyContent: "space-between"
        }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: "20px", justifyContent: "space-between" }}>
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
              disabled={selected.length <= 0}
              style={{
                maxWidth: "200px", whiteSpace: "pre",
                background: "#dba236", color: "#000"
              }}
              message="Assign Staff"
            />
          </Box>
          <Box style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <CustomSearch handleSearchChange={handleSearchChange} searchQryTxt={searchQuery} />
            {!filterPersonShown ? <IconButton
              onClick={() => {
                handleFilterClick()
              }}
            >
              <FilterAltIcon />
            </IconButton> :

              <Chip
                sx={{ marginLeft: 2, }}
                avatar={<Avatar alt={searchQueryCall} src={selectedPersons[0]?.imageUrl} />}
                label={searchQueryCall}
                onDelete={() => {
                  setSearchQuery('');
                  setSearchQueryCall('');
                  setFilterQuery('');
                  setFilterQueryCall('');
                  setSelectedPersons([]);
                  setOpen(false);
                  setFilterPersonShown(false);
                  setISPersona(false);
                  fetchData()
                }}
                variant="outlined"
              />
            }
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
              onClick={() => { handleClear(); }}
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
              <Stack spacing={4}>
                <Grid container spacing={2} sx={{ m: 0, alignItems: "center", paddingLeft: "10px", paddingRight: "10px" }}>
                  <Grid style={{ marginBottom: "2rem" }} item xs={12} sm={12}>
                    <label htmlFor="assignedStaffId">Assigned Staff<span style={{ color: 'red' }}>*</span></label>
                    <Controller
                      name="assignedStaffId"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: 'Assigned Staff is required',
                      }}
                      render={({ field }) => (
                        <>
                          {

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
                              personSelectionLimit={1}
                              required={true}
                              showHiddenInUI={false}
                              principalTypes={[PrincipalType.User]}
                              resolveDelay={1000}
                              onChange={searchPeopleInTable}
                              defaultSelectedUsers={selectedPersons}
                            />}

                        </>
                      )}
                    />
                    {errors.assignedStaffId && <span style={{ color: 'red', fontSize: '12px' }}>{errors.assignedStaffId.message}</span>}
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '15px' }}>
                      <MuiButton variant="outlined" onClick={handleClear}>
                        Clear
                      </MuiButton>
                      <MuiButton
                        onClick={() => {
                          handleApply(

                          ); handleFilterChange(new MouseEvent('click'));
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
                    </Box>
                  </Grid>
                </Grid>
              </Stack>
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
                    Assigned Staff
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
              <Typography>

                {selectedName.map((data: any) => (
                  <div key={data.id}>
                    <Box>
                      {data?.name?.map((item: any) => (
                        <Typography key={item.Id}>
                          {item.Name}
                        </Typography>
                      ))}
                    </Box>
                  </div>
                ))}
              </Typography>
            </DialogContent>
          </Dialog>
        </Box>


        <Box >
          <GridTable
            rows={tableData}
            headCells={headCells}
            props={props}
            searchQuery={searchQuery}
            filterQuery={filterQuery}
            isPersona={isPersona}
            setSelected={setSelected}
            setSelectedDetails={setSelectedDetails}
            selected={selected}

            actions={actions}
            isLoading={isLoading}
            AllClientData={AllClientData}
            tableDataWidth={tableDataWidth}

          />
        </Box>

      </Stack>
      }
      {addClientDialog && <AddClientDialog open={addClientDialog} onClose={closeAddClientDialog} fetchData={fetchData} props={props} spContext={props.spContext} />}
      {handleStaffDialog && <AddStaffDialog selectedDetails={selectedDetails} props={props} open={handleStaffDialog} onClose={closeAddStaffDialog} particularClientAllData={particularClientAllData} selected={selected} fetchData={fetchData} spContext={props.spContext} AllClientData={AllClientData} />}
      <UploadDocument open={uploadDialogOpen}
        onClose={closeUploadDialog} particularClientAllData={particularClientAllData} fetchDatas={fetchData} />

      {isDeleteDialogOpen &&
        <DeleteDialog clientDetails={clientDetails}
          open={isDeleteDialogOpen}
          onClose={handleDeleteDialogClose}
          fetchData={fetchData}
        />}
      {isViewDialogOpen &&
        <ViewParticularClient
          spContext={props.spContext}
          props={props}
          clientDetails={clientDetails}
          setIsViewDialogOpen={setIsViewDialogOpen}
          setIsEdit={setIsEdit}
          setIsOpen={setIsOpen}
          setClientDetails={setClientDetails}
          isEdit={isEdit}
          isOpen={isOpen}
          fetchData={fetchDataByuserId}
          initialFetchData={fetchData}
          particularClientAllData={particularClientAllData}
          selected={selected}
          particularClientProjects={particularClientProjects}
        />}
    </Box>

  );
};

export default ViewClient;


