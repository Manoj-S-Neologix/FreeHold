import React, { useState } from 'react';
import { Breadcrumbs, Button, TextField, Grid, Box, Stack } from '@mui/material'; 
import SearchIcon from '@mui/icons-material/Search'; 
// import { ThemeProvider, createTheme } from '@mui/material/styles'; 
import GridTable from "../../../../Common/Table/Table";
import { useNavigate } from 'react-router-dom'; 
import AddClientDialog from '../AddClient/AddClient'; 
import styles from './ViewClient.module.scss';
// import { ThemeProvider } from '../../../../Common/ThemeProvider/Themeprovider';




function ViewClient(props:any) {
  const [searchQuery, setSearchQuery] = useState('');
  const [addClientDialogOpen, setAddClientDialogOpen] = useState(false); 
  const navigate = useNavigate(); 

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  // const projectHeaders = [
  //   { id: 'name', numeric: false, disablePadding: true, label: 'Project Name' },
  //   // Add other project-specific headers if needed
  // ];

  // const theme = createTheme({ 
  //   palette: {
  //     primary: {
  //       main: '#125895', 
  //     },
  //     secondary: {
  //       main: '#fff',
  //     },
  //   },
  // });
  

  return (
<Box sx={{width:'100', padding:'20px' }} > 
<Stack direction ='column' spacing={2} >

  <Grid item xs={12} className={styles.Homebreadcrumb} >
    <Breadcrumbs aria-label="breadcrumb">
      <Button onClick={navigateToHome} >Home</Button>
      <Button disabled>View Client</Button>
    </Breadcrumbs>
  </Grid>
  <Grid item xs={12} className={styles.Addcontainer} style={{ margin: '0px' }}>
    <Button className={styles.Addbutton} onClick={openAddClientDialog} >Add Client</Button>
    <div className={styles.searchInput}>
      <TextField
        className={styles.searchBar}
        placeholder="Search..."
        InputProps={{ endAdornment: <SearchIcon className={styles.iconFilter}/> }} 
        onChange={handleSearchChange}
      />
    </div>
    <Button className={styles.Assignbutton}>Assign Staff</Button>
  </Grid>



    <Grid item xs={12}>
      <GridTable props={props} searchQuery={searchQuery} />
    </Grid>

  <AddClientDialog open={addClientDialogOpen} onClose={closeAddClientDialog} />
  </Stack>
</Box>

  
  );
}

export default ViewClient;






// //people picker

// import React, { useState } from 'react';
// import { Breadcrumbs, Button, TextField, Grid, Box, Stack, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import GridTable from "../../../../Common/Table/Table";
// import { useNavigate } from 'react-router-dom';
// import AddClientDialog from '../AddClient/AddClient';
// import styles from './ViewClient.module.scss';
// import { PeoplePicker, PrincipalType } from '@pnp/spfx-controls-react/lib/PeoplePicker';

// function AssignStaffDialog({ open, onClose, context }: { open: boolean, onClose: () => void, context: any }) {
//   const [selectedStaff, setSelectedStaff] = useState<any[]>([]);

//   console.log(selectedStaff);

//   const handleClose = () => {
//     onClose();
//   };

//   const handleSave = () => {
//     // Logic for saving staff assignment
//     onClose();
//   };

//   const handleStaffSelectionChange = (items: any) => {
//     setSelectedStaff(items);
//   };

//   return (
//     <Dialog open={open} onClose={handleClose}>
//       <DialogTitle>Assign Staff</DialogTitle>
//       <DialogContent>
//         <DialogContentText>
//           <PeoplePicker
//             context={context}
//             titleText="Select Staff"
//             personSelectionLimit={1}
//             groupName={''}
//             showtooltip={true}
//             required={true}
//             disabled={false}
//             ensureUser={true}
//             onChange={handleStaffSelectionChange}
//             principalTypes={[PrincipalType.User]}
//             resolveDelay={1000}
//           />
//         </DialogContentText>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={handleClose}>Cancel</Button>
//         <Button onClick={handleSave}>Save</Button>
//       </DialogActions>
//     </Dialog>
//   );
// }

// function ViewClient(props: any) {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [addClientDialogOpen, setAddClientDialogOpen] = useState(false);
//   const [assignStaffDialogOpen, setAssignStaffDialogOpen] = useState(false);
//   const navigate = useNavigate();

//   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(event.target.value);
//   };

//   const navigateToHome = () => {
//     navigate('/');
//   };

//   const openAddClientDialog = () => {
//     setAddClientDialogOpen(true);
//   };

//   const closeAddClientDialog = () => {
//     setAddClientDialogOpen(false);
//   };

//   const openAssignStaffDialog = () => {
//     setAssignStaffDialogOpen(true);
//   };

//   const closeAssignStaffDialog = () => {
//     setAssignStaffDialogOpen(false);
//   };

//   const theme = createTheme({
//     palette: {
//       primary: {
//         main: '#125895',
//       },
//       secondary: {
//         main: '#fff',
//       },
//     },
//   });

//   return (
//     <Box sx={{ width: '100', padding: '20px' }} >
//       <Stack direction='column' spacing={2} >

//         <Grid item xs={12} className={styles.Homebreadcrumb} >
//           <Breadcrumbs aria-label="breadcrumb">
//             <Button onClick={navigateToHome} >Home</Button>
//             <Button disabled>View Client</Button>
//           </Breadcrumbs>
//         </Grid>
//         <Grid item xs={12} className={styles.Addcontainer} style={{ margin: '0px' }}>
//           <Button className={styles.Addbutton} onClick={openAddClientDialog}>Add Client</Button>
//           <div className={styles.searchInput}>
//             <TextField
//               className={styles.searchBar}
//               placeholder="Search..."
//               InputProps={{ endAdornment: <SearchIcon className={styles.iconFilter} /> }}
//               onChange={handleSearchChange}
//             />
//           </div>
//           <Button className={styles.Assignbutton} onClick={openAssignStaffDialog}>Assign Staff</Button>
//         </Grid>

//         <ThemeProvider theme={theme}>
//           <Grid item xs={12}>
//             <GridTable props={props} searchQuery={searchQuery} />
//           </Grid>
//         </ThemeProvider>
//         <AddClientDialog open={addClientDialogOpen} onClose={closeAddClientDialog} />
//         <AssignStaffDialog open={assignStaffDialogOpen} onClose={closeAssignStaffDialog} context={props.context} />
//       </Stack>
//     </Box>
//   );
// }

// export default ViewClient;