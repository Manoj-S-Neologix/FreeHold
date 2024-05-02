import { Box, Breadcrumbs, Button, Typography } from '@mui/material';
import React from 'react';
import { emphasize, styled } from '@mui/material/styles';
import { Button as MuiButton } from "@mui/material";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
// import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Accordion from '@mui/material/Accordion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

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

const commonStyles = {
  bgcolor: 'background.paper',
  m: 1,
  width: '80%',
  height: '8rem',
}

const nodes = {
  id: 1,
  name: "Project 1",
  children: [
    {
      id: 2,
      name: "Client 1",
      children: [
        {
          id: 4,
          name: "Unit 1",
        },
        {
          id: 5,
          name: "Unit 2",
        }
      ]
    },
    {
      id: 3,
      name: "Client 2",
      children: [
        {
          id: 10,
          name: "Unit 3",
        },
        {
          id: 13,
          name: "Unit 4",
        }
      ]
    }
  ]
};

const renderChildren = (children: any[]) => {
  return (
    <Accordion>
      {children.map((c) => (
        <>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} key={c.id}>
            <Typography key={c.id}>{c.name}</Typography>
          </AccordionSummary>
          <AccordionDetails key={c.id}></AccordionDetails>
        </>
      ))}
    </Accordion>
  );
};

const renderNode = (node: any) => {
  return (
    <Accordion key={node.id}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} key={node.id}>
        <Typography>{node.name}</Typography>
      </AccordionSummary>
      <AccordionDetails key={node.id}>
        {renderChildren(node.children)}
      </AccordionDetails>
    </Accordion>
  );
};

const ChecklistValidation = (props: any) => {
  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate('/');
  };
  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };
  return (
    <div>
      <Box>
        <Breadcrumbs
            separator={<NavigateNextIcon fontSize="medium" />}
            aria-label="breadcrumb"
        >
          <StyledBreadcrumb onClick={navigateToHome} startIcon={<HomeIcon />} >
            Home
          </StyledBreadcrumb>
          <StyledBreadcrumb disabled>
            CheckListValidation
          </StyledBreadcrumb>
        </Breadcrumbs>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ ...commonStyles, border: 1, borderRadius:2, borderColor:'primary.main' }}>
            <div  style={{display:'flex', flexDirection:'row', alignItems:'center', 
            justifyContent:'center', padding:'20px', gap:'20px', position:'relative'}}>
              <Typography>
                Project
                  <Box>
                    <FormControl>
                      {/* <InputLabel id="demo-simple-select-label">Project</InputLabel> */}
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={age}
                        label="Project"
                        onChange={handleChange}
                        sx={{
                          display: 'flex',
                          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
                          color: (theme) =>
                            theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
                          border: '1px solid',
                          borderColor: (theme) =>
                            theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
                          borderRadius: 2,
                          width:'15rem',
                          height:'2rem'
                        }}
                        placeholder='project'
                      >
                        <MenuItem>Project 1</MenuItem>
                        <MenuItem>Project 2</MenuItem>
                        <MenuItem>Project 3</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
              </Typography>
              <Typography>Client
                <Box>
                    <FormControl fullWidth>
                      {/* <InputLabel id="demo-simple-select-label">Client</InputLabel> */}
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={age}
                        label="Client"
                        onChange={handleChange}
                        sx={{
                          display: 'flex',
                          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
                          color: (theme) =>
                            theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
                          border: '1px solid',
                          borderColor: (theme) =>
                            theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
                          borderRadius: 2,
                          width:'15rem',
                          height:'2rem'
                        }}
                      >
                        <MenuItem>Client 1</MenuItem>
                        <MenuItem>Client 2</MenuItem>
                        <MenuItem>Client 3</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
              </Typography>
              <Typography>Unit
              <Box >
                    <FormControl fullWidth>
                      {/* <InputLabel id="demo-simple-select-label">Unit</InputLabel> */}
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={age}
                        label="Unit"
                        onChange={handleChange}
                        sx={{
                          display: 'flex',
                          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
                          color: (theme) =>
                            theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
                          border: '1px solid',
                          borderColor: (theme) =>
                            theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
                          borderRadius: 2,
                          width:'15rem',
                          height:'2rem'
                        }}
                      >
                        <MenuItem>Unit 1</MenuItem>
                        <MenuItem>Unit 2</MenuItem>
                        <MenuItem>Unit 3</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
              </Typography>
            </div>
            <FormControl sx={{display:'flex', justifyContent:'center', alignItems:'center', width:'maxContent'}}>
              <Button variant='contained' style={{height:'1.5rem', backgroundColor:'#dba236', color:'#000'}}>Search</Button>
            </FormControl>
             <div style={{display:'flex', position:'relative', margin:'2s0px', flexDirection:'column', justifyContent:'center'}}>
               {renderNode(nodes)}
            </div>
          </Box>
        </Box>
      </Box>
    </div>
  );
};
export default ChecklistValidation

