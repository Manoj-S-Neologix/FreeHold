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
  const [selected, setSelected] = React.useState<any[]>([]);
  const [selectedDetails, setSelectedDetails] = React.useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterQuery, setFilterQuery] = useState('');
  const [searchText, setSearchText]= useState('');
  const [isPersona, setISPersona]= useState(false);

  // console.log(filterQuery, "filterQuery");
  const [searchQueryCall, setSearchQueryCall] = useState('');

  const [filterQueryCall, setFilterQueryCall] = useState('');

  const [handleStaffDialog, setHandleStaffDialog] = useState(false);
  const [addClientDialog, setAddClientDialog] = useState(false);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [clientData, setClientData] = useState<any>([]);
  const [AllClientData, setAllClientData] = useState<any>([]);
  const [particularClientAllData, setParticularClientAllData] = useState<any>([]);
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

  console.log(editClientId, viewClientId ,"editviewid")

  const fetchDataByuserId = async () => {
    if (viewClientId) {

      const data = await fetchDataById(viewClientId);
      console.log(data, "datadatadata");

      if (data && data.length > 0) {
        console.log(data[0].Id, "datadatadata");
        const ID = data[0].Id;
        const clientDetails = data[0];
        console.log(clientDetails, "datadatadata");
        setClientDetails(clientDetails); // Assuming data is an object
        console.log("datadatadata", AllClientData, ID);
        const getValue = AllClientData.map((data: any) => {
          if (data.Id === ID) {
            return data;
          }
          return;
        });

        const getUnique = AllClientData.filter((datas: any) => datas.Id === ID);
        setParticularClientAllData(getUnique);
        console.log("datadatadata", getValue, getUnique, "getUniquegetUnique");
        setIsViewDialogOpen(true);
        navigate('/ViewClient/' + String(data[0]?.Id));
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
        setParticularClientAllData([clientDetails]);
        console.log("datadatadata", getValue, getUnique, "getUniquegetUnique");
        navigate('/EditClient/' + String(data[0]?.Id));
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

  // const handleApply = () => {
  //   setSearchQuery(searchQueryCall);
  //   setOpen(false);
  //   setFilterPersonShown(true);
  // };


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

  // const hyperLink = (data: any, id: any) => {

  //   return (
  //     data !== '-' && <Box
  //       onClick={() => {
  //         navigate('/ViewClient/' + id);
  //         // setIsViewDialogOpen(true);
  //       }}
  //       style={{
  //         textDecoration: "underline", color: "blue", cursor: "pointer",
  //         listStyleType: "none", padding: 0
  //       }}>
  //       {data}

  //     </Box>
  //   );
  // };

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
        // const uniqueClientData = AllClientData.map((client: any) => console.log(client.Id, data));
        // setParticularClientAllData(uniqueClientData);
        // setIsViewDialogOpen(true);
        // setClientDetails(data);
        viewClientId = String(data.Id);
        if (data.Id) {
          console.log(data, "AllClientDataAllClientData");
          await fetchDataByuserId();
        }
        // navigate('/ViewClient/' + viewClientId);


        // // Filter out unique client data
        // const uniqueClientData = AllClientData.map((client: any) => console.log(client.Id, data));
        // setParticularClientAllData(uniqueClientData);
        // const getUnique = AllClientData.filter((datas: any) => datas.Id === data.Id);
        // setParticularClientAllData(getUnique);
      },
    },




    {
      label: 'Edit',
      icon: <EditIcon />,
      handler: async (data: any) => {
        // //console.log(`Edit clicked for row ${data}`);
        // const getUnique = AllClientData.filter((datas: any) => datas.Id === data.Id);
        // setParticularClientAllData(getUnique);
        // setIsViewDialogOpen(true);
        // setClientDetails(data);
        // setIsEdit(true);
        // editClientId = String(data.Id);
        // navigate('/EditClient/' + editClientId);
        // console.log(data, "AllClientDataAllClientData");
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

      // handler: async (data: any) => {
      //   const getUnique = AllClientData.filter((datas: any) => datas.Id === data.Id);
      //   setParticularClientAllData(getUnique);
      //   if (getUnique.length > 0) {
      //     const folderGUID = getUnique[0].GUID;
      //     try {
      //       const results = await ClientService().getDocumentsFromFolder(folderGUID);
      //       console.log('Documents fetched successfully:', results);
      //     } catch (error) {
      //       console.error('Error fetching documents:', error);
      //     }
      //   } else {
      //     console.warn('No client data found for the provided ID');
      //   }
      // },

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




  // const searchPeopleInTable = async (items: any[]) => {
  //   console.log(items[0].text, "itemsitemsitemsitems");
  //   setSearchQueryCall(items[0].text);
  //   setSelectedPersons(items);
  // };

  // const searchPeopleInTable = async (items: any[]) => {
  //   console.log(items[0].text, "itemsitemsitemsitems");
  //   setFilterQueryCall(items[0].text);
  //   const testing = clientData.filter((data: any) => data.includes(items[0].text));
  //   console.log(testing, "testing")
  //   setSelectedPersons(items);
  // };

  // const searchPeopleInTable = async (items: any[]) => {
  //   if (items.length > 0 && items[0]?.text) {
  //     const searchText = items[0].text.toLowerCase(); 
  //     const filteredData = clientData.filter((data: any) => {
  //       if (data.assignStaff && typeof data.assignStaff === 'string') {
  //         return data.assignStaff.toLowerCase().includes(searchText);
  //       }
  //       return false; 
  //     });
  //     console.log(filteredData, "filteredData");
  //     setClientData(filteredData);
  //     console.log(items[0].text, "itemsitemsitemsitems");
  //     setSearchQueryCall(items[0].text);
  //     setFilterQueryCall(items[0].text);
  //     setSelectedPersons(items);

  //   }
  // };

  const searchPeopleInTable = async (items: any[]) => {
    if (items.length > 0 && items[0]?.text) {
      const searchText = items[0].text.toLowerCase();
      setSearchText(searchText) 
      setSearchQueryCall(items[0].text);
      // setFilterQueryCall(items[0].text);
      setSelectedPersons(items);
    }
  };
  
  

  
  




  // console.log(selectedPersons, searchQueryCall, "DataparticularClientAllData");

  // console.log(selectedPersons, filterQueryCall, "DataparticularClientAllData");


  const fetchData = async () => {
    try {
      setIsLoading(true);
      const clientService = ClientService();
      const select = '*,AssignedStaff/Title,AssignedStaff/Id,Author/Title,Author/EMail,ProjectId/Id,ProjectId/Title, Editor/Id,Editor/Title,Editor/EMail';
      const expand = 'AssignedStaff,Author,ProjectId,Editor';
      const filter = "";
      const orderBy = 'Modified';
      console.log(orderBy,"orderByorderByorderBy....")
      const results = await clientService.getClientExpand('Client_Informations', select, expand, filter, orderBy);
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
      const results = await clientService.getClientExpand('Client_Informations', select, expand, filter, orderBy);
      const filteredResults = await clientService.getClientExpand('Client_Informations', select, expand,  "", orderBy);
      setAllClientData(filteredResults?.tableData);

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

  // const modifiedAssignedStaff = (data: any) => {
  //   if (!data) return null;
  //   const words = data?.split(',');
  //   return (
  //     <Box>
  //       {words.map((word: string, index: number) => (
  //         <p key={index}>{word}</p>
  //       ))}
  //     </Box>
  //   );
  // };

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

  console.log(tableData,"tableDatatableDatatableData")

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
            <CustomSearch handleSearchChange={handleSearchChange} />
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
                              context={props.props.props.context as any}
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
                        onClick={() => { handleApply(

                        ); handleFilterChange(new MouseEvent('click')); }}
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
                {/* {projectData?.map((data: any) => (
                  <Box key={data.Id}> 
                  {console.log(data?.clientDetails.length, 'length')}   
                  {data?.clientDetails?.length > 0 ? (data?.clientDetails?.map((client: any) => (
                  <Typography key={client.Id}>
                    {client.Title}
                    {console.log(client.Title, 'clientproject')}
                  </Typography>
                  ))) : (null)} 
                  
                  </Box>
                ))} */}
                {/* {projectData?.map((data: any) => (
                  <Box key={data.assignClientId}>    
                 {data.assignClient} 
                  </Box>
                ))} */}
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
            isPersona = {isPersona}
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
      {addClientDialog && <AddClientDialog open={addClientDialog} onClose={closeAddClientDialog} fetchData={fetchData} props={props} />}
      {handleStaffDialog && <AddStaffDialog selectedDetails={selectedDetails} props={props} open={handleStaffDialog} onClose={closeAddStaffDialog} particularClientAllData={particularClientAllData} selected={selected} fetchData={fetchData} />}
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
          particularClientAllData={particularClientAllData} selected={selected}
        />}
    </Box>

  );
};

export default ViewClient;


