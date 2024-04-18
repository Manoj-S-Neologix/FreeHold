// import React, { useState } from 'react';
// import { Breadcrumbs, Button, TextField, Grid, Box, Stack } from '@mui/material'; 
// import SearchIcon from '@mui/icons-material/Search'; 
// // import { ThemeProvider, createTheme } from '@mui/material/styles'; 
// import GridTable from "../../../../Common/Table/Table";
// import { useNavigate } from 'react-router-dom'; 
// import AddClientDialog from '../AddClient/AddClient'; 
// import styles from './ViewClient.module.scss';
// // import { ThemeProvider } from '../../../../Common/ThemeProvider/Themeprovider';




// function ViewClient(props:any) {
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

//   // const projectHeaders = [
//   //   { id: 'name', numeric: false, disablePadding: true, label: 'Project Name' },
//   //   // Add other project-specific headers if needed
//   // ];

//   // const theme = createTheme({ 
//   //   palette: {
//   //     primary: {
//   //       main: '#125895', 
//   //     },
//   //     secondary: {
//   //       main: '#fff',
//   //     },
//   //   },
//   // });
  

//   return (
// <Box sx={{width:'100', padding:'20px' }} > 
// <Stack direction ='column' spacing={2} >

//   <Grid item xs={12} className={styles.Homebreadcrumb} >
//     <Breadcrumbs aria-label="breadcrumb">
//       <Button onClick={navigateToHome} >Home</Button>
//       <Button disabled>View Client</Button>
//     </Breadcrumbs>
//   </Grid>
//   <Grid item xs={12} className={styles.Addcontainer} style={{ margin: '0px' }}>
//     <Button className={styles.Addbutton} onClick={openAddClientDialog} >Add Client</Button>
//     <div className={styles.searchInput}>
//       <TextField
//         className={styles.searchBar}
//         placeholder="Search..."
//         InputProps={{ endAdornment: <SearchIcon className={styles.iconFilter}/> }} 
//         onChange={handleSearchChange}
//       />
//     </div>
//     <Button className={styles.Assignbutton}>Assign Staff</Button>
//   </Grid>



//     <Grid item xs={12}>
//       <GridTable props={props} searchQuery={searchQuery} />
//     </Grid>

//   <AddClientDialog open={addClientDialogOpen} onClose={closeAddClientDialog} />
//   </Stack>
// </Box>

  
//   );
// }

// export default ViewClient;



import React, { useState } from 'react';
import { Breadcrumbs, Button, TextField, Grid, Box, Stack } from '@mui/material'; 
import SearchIcon from '@mui/icons-material/Search'; 
import { emphasize, styled } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddClientDialog from '../AddClient/AddClient'; 
import GridTable from "../../../../Common/Table/Table";
import { useNavigate } from 'react-router-dom'; 
import styles from './ViewClient.module.scss';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const StyledBreadcrumb = styled(Button)(({ theme }) => ({
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

function ViewClient(props:any) {
  const [searchQuery, setSearchQuery] = useState('');
  const [addClientDialogOpen, setAddClientDialogOpen] = useState(false); 
  const navigate = useNavigate(); 

  const handleSearchChange = (event:any) => {
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

  return (
    <Box sx={{width:'100', padding:'20px' }} > 
      <Stack direction ='column' spacing={2} >
        <Grid item xs={12} className={styles.Homebreadcrumb} style={{padding:'0 10px !important'}}>
          {/* <Breadcrumbs separator="›"  aria-label="breadcrumb" > */}
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


