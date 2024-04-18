import React, { useState } from 'react';
import { Breadcrumbs, Button, TextField, Grid, Box, Stack } from '@mui/material'; 
import SearchIcon from '@mui/icons-material/Search'; 
import { emphasize, styled } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom'; 
import styles from './ViewProjects.module.scss';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import GridTableProjects from '../Table/GridTableProjects';
import AddProjectDialog from '../AddProjects/AddProject';

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
        </Grid>
        <Grid item xs={12} className={styles.Addcontainer} style={{ margin: '0px' }}>
          <Button className={styles.Addbutton} onClick={openAddClientDialog} >Add Project</Button>
          <div className={styles.searchInput}>
            <TextField
              className={styles.searchBar}
              placeholder="Search..."
              InputProps={{ endAdornment: <SearchIcon className={styles.iconFilter}/> }} 
              onChange={handleSearchChange}
            />
          </div>
          <Button className={styles.Assignbutton}>Assign Client</Button>
        </Grid>
        <Grid item xs={12}>
          <GridTableProjects props={props} searchQuery={searchQuery} />
        </Grid>
        <AddProjectDialog open={addClientDialogOpen} onClose={closeAddClientDialog} />
      </Stack>
    </Box>
  );
}

export default ViewClient;