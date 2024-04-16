// import React, { useState } from 'react';
// import { Breadcrumbs, Button, TextField, Grid } from '@mui/material'; 
// import SearchIcon from '@mui/icons-material/Search'; 
// import { ThemeProvider, createTheme } from '@mui/material/styles'; 
// // import GridTable from "../../../../Common/Table/Table";
// import { useNavigate } from 'react-router-dom'; 
// import AddProjectDialog from '../AddProjects/AddProject';
// import styles from '../ViewClient/ViewClient.module.scss';
// import GridTableProjects from '../Table/GridTableProjects';


// function ViewProjects(props:any) {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [addClientDialogOpen, setAddClientDialogOpen] = useState(false); 
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
// <Grid container className={styles.container} spacing={2}> 
//   <Grid item xs={12} className={styles.Homebreadcrumb}>
//     <Breadcrumbs aria-label="breadcrumb">
//       <Button onClick={navigateToHome}>Home</Button>
//       <Button disabled>View Projects</Button>
//     </Breadcrumbs>
//   </Grid>
//   <Grid item xs={12} className={styles.Addcontainer}>
//     <Button className={styles.Addbutton} onClick={openAddClientDialog}>Add Projects</Button>
//     <div className={styles.searchInput}>
//       <TextField
//         className={styles.searchBar}
//         placeholder="Search..."
//         InputProps={{ endAdornment: <SearchIcon className={styles.iconFilter}/> }} 
//         onChange={handleSearchChange}
//       />
//     </div>
//     <Button className={styles.Assignbutton}>Assign Client</Button>
//   </Grid>

//   <ThemeProvider theme={theme}>
//     <Grid item xs={12}>
//       <GridTableProjects props={props} searchQuery={searchQuery} />
//     </Grid>
//   </ThemeProvider>
//   <AddProjectDialog open={addClientDialogOpen} onClose={closeAddClientDialog} />
// </Grid>

  
//   );
// }

// export default ViewProjects;


import React, { useState } from 'react';
import { Breadcrumbs, Button, TextField, Grid, Box, Stack } from '@mui/material'; 
import SearchIcon from '@mui/icons-material/Search'; 
import { ThemeProvider, createTheme } from '@mui/material/styles'; 
import { useNavigate } from 'react-router-dom'; 
import styles from './ViewProjects.module.scss';
import GridTableProjects from '../Table/GridTableProjects';
import AddProjectDialog from '../AddProjects/AddProject';

function ViewProjects (props:any) {
  const [searchQuery, setSearchQuery] = useState('');
  const [addProjectDialogOpen, setAddClientDialogOpen] = useState(false); 
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

  const theme = createTheme({ 
    palette: {
      primary: {
        main: '#125895', 
      },
      secondary: {
        main: '#fff',
      },
    },
  });

  return (
<Box sx={{width:'100', padding:'20px' }} > 
<Stack direction ='column' spacing={2} >

  <Grid item xs={12} className={styles.Homebreadcrumb} >
    <Breadcrumbs aria-label="breadcrumb">
      <Button onClick={navigateToHome} >Home</Button>
      <Button disabled>View Project</Button>
    </Breadcrumbs>
  </Grid>
  <Grid item xs={12} className={styles.Addcontainer} style={{ margin: '0px' }}>
    <Button className={styles.AddProjectbutton} onClick={openAddClientDialog}>Add Project</Button>
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


  <ThemeProvider theme={theme}>
    <Grid item xs={12}>
      <GridTableProjects props={props} searchQuery={searchQuery} />


    </Grid>
  </ThemeProvider>
  <AddProjectDialog open={addProjectDialogOpen} onClose={closeAddClientDialog} />
  </Stack>
</Box>

  
  );
}

export default ViewProjects;