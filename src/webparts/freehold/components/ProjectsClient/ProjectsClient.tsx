import * as React from 'react';
import styles from './ProjectsClients.module.scss';
import { Box, Stack } from '@mui/material';
import { Link } from "react-router-dom";
import ClientService from '../../Services/Business/ClientService';
import ProjectService from '../../Services/Business/ProjectService';


const ProjectsClient = ({ props }: any) => {
  const [clientData, setClientData] = React.useState<number>(0);
  const [projectData, setProjectData] = React.useState<number>(0);

  React.useEffect (()=>{
    fetchData();
  },[]
)
   
  

  console.log(clientData, "countclient")
  console.log(projectData, "countproject")

  const fetchData = async () => {
    try {
      const clientService = ClientService();
      const projectService = ProjectService();


      const results = await clientService.getListCounts('Client_Informations');
      const projectResults = await projectService.getListCounts('Project_Informations');
      if(results)
      setClientData(results)
    if(projectResults)
      setProjectData(projectResults)
    } catch (error) {

      console.error('Error fetching data:', error);
    }
  };

  const getProjectText = (count: number) => count === 1 ? 'PROJECT' : 'PROJECTS';
  const getClientText = (count: number) => count === 1 ? 'CLIENT' : 'CLIENTS';


  return (
    <Box >
      <Stack>
        <div className={styles.projectsClient}>
          {/* <div className={styles.container}> */}
          <div className={`${styles.container} ${styles.projectContainer}`}>
            <div className={`${styles.row} ${styles.projectRow}`}>
              <div className={`${styles.column} ${styles.projectColumn}`}>
                <div className={`${styles.col12} ${styles.projectCol12}`}>
                  <div className={`${styles.col3} ${styles.projectCol13}`}>
                    <img src={require('/src/assets/Images/HomeBorderLeft.png')}
                      alt=""
                    />
                  </div>
                  {/* <div className={`${styles.col3} ${styles.projectC3}`} >PROJECTS </div> */}
                  <Link to={"/ViewProjects"}>
                    <div className={`${styles.col3} ${styles.projectC3}`}>
                      <img
                        src={require('/src/assets/Images/ProjectsClients.png')}
                        alt=""
                        className={styles.projectImage}
                      />
                      <div className={styles.projectContent}>
                        <div className={styles.projectNumber}>{projectData}</div>
                        <div className={styles.projectHeading}>{getProjectText(projectData)}</div>
                      </div>
                    </div>
                  </Link>

                  {/* <div className={`${styles.col3} ${styles.clientC3}`} >CLIENTS</div> */}
                  <Link to={"/ViewClient"}>
                    <div className={`${styles.col3} ${styles.clientC3}`}>
                      <img
                        src={require('/src/assets/Images/ProjectsClients.png')}
                        alt=""
                        className={styles.projectImage}
                      />
                      <div className={styles.clientContent}>
                        <div className={styles.clientNumber}>{clientData}</div>
                        <div className={styles.clientText}>{getClientText(clientData)}</div>
                      </div>
                    </div>
                  </Link>



                  <div className={styles.col3}>
                    <img src={require('/src/assets/Images/HomeBorderRight.png')}

                      alt=""
                    /></div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </Stack >
    </Box >
  );
};

export default ProjectsClient;
