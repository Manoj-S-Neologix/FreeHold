import { Box, Breadcrumbs, Button, TextField, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import { emphasize, styled } from '@mui/material/styles';
import { Button as MuiButton } from "@mui/material";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
// import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Accordion from '@mui/material/Accordion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionSummary from '@mui/material/AccordionSummary';
import Stack from '@mui/material/Stack';
// import AccordionDetails from '@mui/material/AccordionDetails';

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
  width: '100%',
  height: '8rem',
}

// const nodes = {
//   id: 1,
//   name: "Project 1",
//   children: [
//     {
//       id: 2,
//       name: "Client 1",
//       children: [
//         {
//           id: 4,
//           name: "Unit 1",
//         },
//         {
//           id: 5,
//           name: "Unit 2",
//         }
//       ]
//     },
//     {
//       id: 3,
//       name: "Client 2",
//       children: [
//         {
//           id: 10,
//           name: "Unit 3",
//         },
//         {
//           id: 13,
//           name: "Unit 4",
//         }
//       ]
//     }
//   ]
// };

// const renderChildren = (children: any[]) => {
//   return (
//     <Accordion>
//       {children.map((c) => (
//         <>
//           <AccordionSummary expandIcon={<ExpandMoreIcon />} key={c.id}>
//             <Typography key={c.id}>{c.name}</Typography>
//           </AccordionSummary>
//           <AccordionDetails key={c.id}></AccordionDetails>
//         </>
//       ))}
//     </Accordion>
//   );
// };

// const renderNode = (node: any) => {
//   return (
//     <Accordion key={node.id}>
//       <AccordionSummary expandIcon={<ExpandMoreIcon />} key={node.id}>
//         <Typography>{node.name}</Typography>
//       </AccordionSummary>
//       <AccordionDetails key={node.id}>
//         {renderChildren(node.children)}
//       </AccordionDetails>
//     </Accordion>
//   );
// };

const ChecklistValidation = (props: any) => {
  const ProjectRef = useRef<HTMLInputElement>(null);
  const ClientRef = useRef<HTMLInputElement>(null);
  const UnitRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate('/');
  };
  const [projectValue, setProjectValue] = useState<string>('');
  const [clientValue, setClientValue] = useState<string>('');
  const [unitValue, setUnitValue] = useState<string>('');
  const handleSearch = () => {
    setProjectValue(ProjectRef.current?.value || '');
    setClientValue(ClientRef.current?.value || '');
    setUnitValue(UnitRef.current?.value || '')

  }



  return (
    <div>
      <Box sx={{ width: '100', padding: '20px', marginTop: '10px' }}>
        <Stack direction='column' sx={{ gap: "30px" }} >
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="medium" />}
            aria-label="breadcrumb"
          >
            <StyledBreadcrumb onClick={navigateToHome} startIcon={<HomeIcon />} >
              Home
            </StyledBreadcrumb>
            <StyledBreadcrumb disabled>
              CheckList Validation
            </StyledBreadcrumb>
          </Breadcrumbs>
          <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
            <Box sx={{ ...commonStyles, border: 1, borderRadius: 2, borderColor: 'primary.main', mt: 1 }}>
              <div style={{
                display: 'flex', flexDirection: 'row', alignItems: 'flex-start',
                justifyContent: 'flex-start', padding: '20px', gap: '20px', position: 'relative'
              }}>
                <Typography>
                  Project
                  <Box>
                    <FormControl>
                      <TextField
                        id="Project"
                        fullWidth
                        variant="outlined"
                        select
                        size="small"
                        required
                        label=""
                        inputRef={ProjectRef}
                        sx={{
                          width: '15rem',
                          height: '2rem'
                        }}
                      >
                        <MenuItem value="Project A">Project A</MenuItem>
                        <MenuItem value="Project B">Project B</MenuItem>
                        <MenuItem value="Project C">Project C</MenuItem>
                      </TextField>
                    </FormControl>
                  </Box>
                </Typography>
                <Typography>Client
                  <Box>
                    <FormControl fullWidth>
                      <TextField
                        id="Client"
                        fullWidth
                        variant="outlined"
                        select
                        size="small"
                        inputRef={ClientRef}
                        required
                        label=""
                        sx={{
                          width: '15rem',
                          height: '2rem'
                        }}
                      >
                        <MenuItem value="Client A">Client A</MenuItem>
                        <MenuItem value="Client B">Client B</MenuItem>
                        <MenuItem value="Client C">Client C</MenuItem>
                      </TextField>
                    </FormControl>
                  </Box>
                </Typography>
                <Typography>Unit
                  <Box >
                    <FormControl fullWidth>
                      <TextField
                        id="Unit"
                        fullWidth
                        variant="outlined"
                        select
                        size="small"
                        inputRef={UnitRef}
                        required
                        label=""
                        sx={{
                          width: '15rem',
                          height: '2rem'
                        }}
                      >
                        <MenuItem value="Unit A">Unit A</MenuItem>
                        <MenuItem value="Unit B">Unit B</MenuItem>
                        <MenuItem value="Unit C">Unit C</MenuItem>
                      </TextField>
                    </FormControl>
                  </Box>
                </Typography>
                <FormControl sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 'maxContent', marginTop:'2rem' }}>
                  <Button variant='contained' style={{ height: '1.5rem', backgroundColor: '#dba236', color: '#000' }} onClick={() => {
                    handleSearch();
                    setIsOpen(!isOpen);
                  }}>Search</Button>
                </FormControl>
              </div>
              {isOpen && <div style={{ display: 'flex', position: 'relative', flexDirection: 'column', justifyContent: 'flex-start', marginTop: '2rem' }}>
                <Stack spacing={1}>
                  <Accordion sx={{ backgroundColor: 'primary.main', color: '#fff' }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ '& .MuiAccordionSummary-expandIconWrapper .MuiSvgIcon-root': { color: '#fff' } }}>
                      <Typography>{projectValue}</Typography>
                    </AccordionSummary>
                  </Accordion>
                  <Accordion sx={{ backgroundColor: 'primary.main', color: '#fff' }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ '& .MuiAccordionSummary-expandIconWrapper .MuiSvgIcon-root': { color: '#fff' } }}>
                      <Typography>{clientValue}</Typography>
                    </AccordionSummary>
                  </Accordion>
                  <Accordion sx={{ backgroundColor: 'primary.main', color: '#fff' }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ '& .MuiAccordionSummary-expandIconWrapper .MuiSvgIcon-root': { color: '#fff' } }}>
                      <Typography>{unitValue}</Typography>
                    </AccordionSummary>
                  </Accordion>
                </Stack>
              </div>}

            </Box>
          </Box>
        </Stack>
      </Box>
    </div>
  );
};
export default ChecklistValidation

