import React, { useState } from 'react';
import { Breadcrumbs, Box, Stack, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton } from '@mui/material';
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
  const [AllClientData, setAllClientData] = useState<any>([]);
  const [particularClientAllData, setParticularClientAllData] = useState<any>([]);
  const [selectedPersons, setSelectedPersons] = useState<any[]>([]);


  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [clientDetails, setClientDetails] = useState<any | undefined>({});
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = React.useState(false);
  // const assignStaffOptions = ['Staff 1', 'Staff 2', 'Staff 3'];
  const { control, formState: { errors } } = useForm();

  const { editClientId, viewClientId } = useParams();
  const navigate = useNavigate();


  const fetchDataByuserId = async () => {
    if (viewClientId) {
      setIsViewDialogOpen(true);
      const data = await fetchDataById(viewClientId);
      console.log(data, "datadatadata");

      if (data && data.length > 0) {
        console.log(data, "datadatadata");
        setClientDetails(data[0]?.TableData.pop()); // Assuming data is an object
        setParticularClientAllData(data[0]?.TableData.pop());
        navigate('/ViewClient/' + String(data[0]?.Id));
      }
    }
    if (editClientId) {
      setIsEdit(true);
      setIsViewDialogOpen(true);
      const data = await fetchDataById(editClientId);
      if (data) {
        console.log(data);
        // setClientDetails(data[0]);
        // setParticularClientAllData(data[0]);
        // navigate('/EditClient/' + String(data[0]?.Id));
      }
    }
  };






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
    fetchData();
  };

  const openAddClientDialog = () => {
    setAddClientDialog(true);
  };

  const closeAddClientDialog = () => {
    setAddClientDialog(false);
    fetchData();
  };

  const handleFilterClick = () => {
    setOpen(true);
  };



  const closeUploadDialog = () => {
    setUploadDialogOpen(false);
    fetchData();
  };

  const handleDeleteDialogClose = () => {
    setIsDeleteDialogOpen(false);
    fetchData();
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
    { id: 'name', numeric: false, disablePadding: true, label: 'Client Name' },
    { id: 'email', numeric: false, disablePadding: true, label: 'Client Email' },
    { id: 'contact', numeric: false, disablePadding: true, label: 'Contact Number' },
    { id: 'modifiedDate', numeric: false, disablePadding: true, label: 'Modified Date' },
    { id: 'modifiedBy', numeric: false, disablePadding: true, label: 'Modified By' },
    { id: 'assignedStaff', numeric: false, disablePadding: true, label: 'Assigned Staff' },
    { id: 'action', numeric: false, disablePadding: true, label: 'Actions' },
  ];

  console.log(AllClientData, "AllClientData");


  const actions = [
    {
      label: 'View',
      icon: <VisibilityIcon />,
      handler: (data: any) => {
        setIsViewDialogOpen(true);
        setClientDetails(data);
        navigate('/ViewClient/' + data.Id);

        // Filter out unique client data
        const uniqueClientData = AllClientData.map((client: any) => console.log(client.Id, data));
        setParticularClientAllData(uniqueClientData);
        const getUnique = AllClientData.filter((datas: any) => datas.Id === data.Id);
        setParticularClientAllData(getUnique);
      },
    },




    {
      label: 'Edit',
      icon: <EditIcon />,
      handler: (data: any) => {
        //console.log(`Edit clicked for row ${data}`);
        setIsViewDialogOpen(true);
        setClientDetails(data);
        setIsEdit(true);
        navigate('/EditClient/' + data.Id);
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
  const handlePeoplePickerChange = async (items: any[]) => {
    console.log(items, "itemsitemsitemsitems");
    const selectedPersonsIds = [];
    for (const item of items) {
      const getID = await ClientService().getPersonByEmail(item.secondaryText);
      console.log(getID.Id, "getIDgetID");
      selectedPersonsIds.push(getID.Id);
    }
    setSelectedPersons(selectedPersonsIds);
  };

  console.log(particularClientAllData, "Data");

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const clientService = ClientService();
      const select = '*,AssignedStaff/Title,AssignedStaff/Id,Author/Title,Author/EMail';
      const expand = 'AssignedStaff,Author';
      const filter = "";
      const results = await clientService.getClientExpand('Client_Informations', select, expand, filter);
      setClientData(results?.updatedResults[0].TableData);
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
      const select = '*,AssignedStaff/Title,AssignedStaff/Id,Author/Title,Author/EMail';
      const expand = 'AssignedStaff,Author';
      const filter = `Id eq '${id}'`;
      const results = await clientService.getClientExpand('Client_Informations', select, expand, filter);
      // setClientData(results?.updatedResults[0].TableData);
      // setAllClientData(results?.updatedResults);
      setIsLoading(false);
      setSelected([]);
      return results?.updatedResults;
    } catch (error) {
      setIsLoading(false);
      console.error('Error fetching data:', error);
    }
  };

  const modifiedAssignedStaff = (data: any) => {
    if (!data) return null;
    const words = data.split(' ');
    return (
      <Box>
        {words.map((word: string, index: number) => (
          <p key={index}>{word}</p>
        ))}
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
      assignedStaff: modifiedAssignedStaff(item?.assignStaff),
    };
  });



  React.useEffect(() => {
    fetchData();
  }, []);
  React.useEffect(() => {
    if (editClientId || viewClientId)
      fetchDataByuserId();
  }, [editClientId, viewClientId]);
  // React.useEffect(() => {
  // 
  // }, [addClientDialog, isViewDialogOpen, isDeleteDialogOpen, handleStaffDialog]);




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
          <Box sx={{ display: "flex", alignItems: "center", width: "21%", justifyContent: "space-between" }}>
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
          <Box style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <CustomSearch handleSearchChange={handleSearchChange} />
            <IconButton
              onClick={handleFilterClick}
            >
              <FilterAltIcon />
            </IconButton>
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
                  <label htmlFor="assignedStaffId">Assigned Staff<span style={{ color: 'red' }}>*</span></label>
                  <Controller
                    name="assignedStaffId"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: 'Assigned Staff is required',
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
        </Box>


        <Box >
          <GridTable
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

      </Stack>
      }
      {addClientDialog && <AddClientDialog open={addClientDialog} onClose={closeAddClientDialog} fetchData={fetchData} props={props} />}
      {handleStaffDialog && <AddStaffDialog props={props} open={handleStaffDialog} onClose={closeAddStaffDialog} particularClientAllData={particularClientAllData} selected={selected} />}
      <UploadDocument open={uploadDialogOpen} onClose={closeUploadDialog} particularClientAllData={particularClientAllData} />

      {isDeleteDialogOpen &&
        <DeleteDialog clientDetails={clientDetails} open={isDeleteDialogOpen} onClose={handleDeleteDialogClose} />}
      {isViewDialogOpen &&
        <ViewParticularClient
          props={props}
          clientDetails={clientDetails}
          setIsViewDialogOpen={setIsViewDialogOpen}
          setIsEdit={setIsEdit}
          setClientDetails={setClientDetails}
          isEdit={isEdit}
          particularClientAllData={particularClientAllData} selected={selected}
        />}
    </Box>

  );
};

export default ViewClient;


