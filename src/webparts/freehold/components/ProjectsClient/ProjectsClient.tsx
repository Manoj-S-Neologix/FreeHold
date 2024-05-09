import * as React from 'react';
import styles from './ProjectsClients.module.scss';
import { Box, Stack } from '@mui/material';
import { Link } from "react-router-dom";
// import ClientService from '../../Services/Business/ClientService';


const ProjectsClient = ({ props }: any) => {
  // const [clientData, setClientData] = React.useState<any[]>([]);
  // const [projectData, setProjectData] = React.useState<any[]>([]);

  // const fetchData = async () => {
  //   try {
  //     const clientService = ClientService();
  //     const select = '*,AssignedStaff/Title,AssignedStaff/Id,Author/Title,Author/EMail,ProjectId/Id,ProjectId/Title';
  //     const expand = 'AssignedStaff,Author,ProjectId';
  //     const filter = "";
  //     const results = await clientService.getClientExpand('Client_Informations', select, expand, filter);
  //     setClientData(results.length)
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };
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
                        <div className={styles.projectNumber}>351</div>
                        <div className={styles.projectHeading}>PROJECTS</div>
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
                        <div className={styles.clientNumber}>52</div>
                        <div className={styles.clientText}>CLIENTS</div>
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



