import * as React from 'react';
import styles from './ProjectsClients.module.scss';


const ProjectsClient = ({ props }: any) => {
  return (
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
            <div className={`${styles.col3} ${styles.projectC3}`} >PROJECTS </div>
            <div className={`${styles.col3} ${styles.clientC3}`} >CLIENTS</div>
            <div className={styles.col3}> 
            <img src={require('/src/assets/Images/HomeBorderRight.png')}
                         
                            alt=""
                        /></div>

            </div>
          </div>
        </div>
 
      </div>
    </div>
  );
};

export default ProjectsClient;



