// import * as React from 'react';
// import { initializeIcons } from '@fluentui/react/lib/Icons';
// import { Nav } from 'react-bootstrap';

// import styles from '../SideNavBar/Sidenav.module.scss';

// initializeIcons();

// const Sidenav = (props: any) => {
//     return (
//         <div className={styles.sideNav}>
//             <div className={`${styles.container} ${styles.sideContainer}`}>
//                 <div className={'${styles.row} ${styles.sideRowContainer}'}>
//                     <div className={`${styles.column} ${styles.sideNavColumn}`}>

//                         <div className={`${styles.col12} ${styles.sideContainer}`}>
//                             <div className={`${styles.col8} 

//                             ${styles.sideImage}`}>

//                             </div>


//                             <div className={` ${styles.col2} ${styles.sideNavContainer}`}
//                                 style={{ float: 'right' }}>

//                                 <Nav defaultActiveKey="/home" className={styles.sidenavBar}>
//                                     <Nav.Link className={`${styles.sideNavMenu} ${styles.hoverEffect}`} href="/Addclient">
//                                         <span className={styles.sideText}>View Clients</span>
//                                     </Nav.Link>
//                                     <Nav.Link className={`${styles.hoverEffect}`} href="/View Projects" style={{ color: 'white' }}>
//                                         <span style={{ borderBottom: '1px solid white', paddingBottom: '5px', display: 'inline-block', width: '100%' }}>View Projects</span>
//                                     </Nav.Link>
//                                     <Nav.Link className={`${styles.hoverEffect}`} href="/Checklist Validation" style={{ color: 'white' }}>
//                                         <span style={{ borderBottom: '1px solid white', paddingBottom: '5px', display: 'inline-block', width: '100%' }}>Checklist Validation</span>
//                                     </Nav.Link>
//                                     <Nav.Link className={`${styles.hoverEffect}`} href="/Checklist Configuration" style={{ color: 'white' }}>Checklist Configuration</Nav.Link>
//                                 </Nav>
//                             </div>


//                         </div>
//                     </div>
//                 </div>
//             </div>

//         </div>


//     );
// };

// export default Sidenav;


//hash routes


// import * as React from 'react';
// import { initializeIcons } from '@fluentui/react/lib/Icons';
// import { HashRouter, Routes, Route} from 'react-router-dom';
// import Addclient from '../AddClient/Addclient';

// import styles from '../SideNavBar/Sidenav.module.scss';
// import { Nav } from 'react-bootstrap';

// initializeIcons();

// const Sidenav = (props: any) => {
//     return (
//         <HashRouter basename='/'>
//             <Routes>
//                 <Route
//                     path='/Addclient'
//                     element={<Addclient />}
//                 />
//                 {/* <Route
//                     path='/ViewProjects'
//                     element={<ViewProjects />}
//                 />
//                 <Route
//                     path='/ChecklistValidation'
//                     element={<ChecklistValidation />}
//                 />
//                 <Route
//                     path='/ChecklistConfiguration'
//                     element={<ChecklistConfiguration />}
//                 /> */}
//             </Routes>

//             <div className={styles.sideNav}>
//                 <div className={`${styles.container} ${styles.sideContainer}`}>
//                     <div className={'${styles.row} ${styles.sideRowContainer}'}>
//                         <div className={`${styles.column} ${styles.sideNavColumn}`}>

//                             <div className={`${styles.col12} ${styles.sideContainer}`}>
//                                 <div className={`${styles.col8} ${styles.sideImage}`}>
//                                 </div>

//                                 {/* <div className={` ${styles.col2} ${styles.sideNavContainer}`} style={{ float: 'right' }}>
//                                     <ul className={styles.sidenavBar}>
//                                         <li className={styles.sideNavMenu}>
//                                             <Link to="/Addclient" className={styles.hoverEffect}>
//                                                 <span className={styles.sideText}>View Clients</span>
//                                             </Link>
//                                         </li>
//                                         <li>
//                                             <Link to="/ViewProjects" className={styles.hoverEffect} style={{ color: 'white' }}>
//                                                 <span style={{ borderBottom: '1px solid white', paddingBottom: '5px', display: 'inline-block', width: '100%' }}>View Projects</span>
//                                             </Link>
//                                         </li>
//                                         <li>
//                                             <Link to="/ChecklistValidation" className={styles.hoverEffect} style={{ color: 'white' }}>
//                                                 <span style={{ borderBottom: '1px solid white', paddingBottom: '5px', display: 'inline-block', width: '100%' }}>Checklist Validation</span>
//                                             </Link>
//                                         </li>
//                                         <li>
//                                             <Link to="/ChecklistConfiguration" className={styles.hoverEffect} style={{ color: 'white' }}>
//                                                 Checklist Configuration
//                                             </Link>
//                                         </li>
//                                     </ul>
//                                 </div> */}
//                                 <div className={` ${styles.col2} ${styles.sideNavContainer}`}
//                                 style={{ float: 'right' }}>

//                                 <Nav defaultActiveKey="/home" className={styles.sidenavBar}>
//                                     <Nav.Link className={`${styles.sideNavMenu} ${styles.hoverEffect}`} href="/Addclient">
//                                         <span className={styles.sideText}>View Clients</span>
//                                     </Nav.Link>
//                                     <Nav.Link className={`${styles.hoverEffect}`} href="/View Projects" style={{ color: 'white' }}>
//                                         <span style={{ borderBottom: '1px solid white', paddingBottom: '5px', display: 'inline-block', width: '100%' }}>View Projects</span>
//                                     </Nav.Link>
//                                     <Nav.Link className={`${styles.hoverEffect}`} href="/Checklist Validation" style={{ color: 'white' }}>
//                                         <span style={{ borderBottom: '1px solid white', paddingBottom: '5px', display: 'inline-block', width: '100%' }}>Checklist Validation</span>
//                                     </Nav.Link>
//                                     <Nav.Link className={`${styles.hoverEffect}`} href="/Checklist Configuration" style={{ color: 'white' }}>Checklist Configuration</Nav.Link>
//                                 </Nav>
//                             </div>


//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </HashRouter>
//     );
// };

// // const ViewClients = () => {
// //     return <h2>View Clients Component</h2>;
// // };

// // const ViewProjects = () => {
// //     return <h2>View Projects Component</h2>;
// // };

// // const ChecklistValidation = () => {
// //     return <h2>Checklist Validation Component</h2>;
// // };

// // const ChecklistConfiguration = () => {
// //     return <h2>Checklist Configuration Component</h2>;
// // };

// export default Sidenav;

import * as React from 'react';
import { initializeIcons } from '@fluentui/react/lib/Icons';
import { HashRouter, Routes, Route, Link } from 'react-router-dom'; 
import Addclient from '../AddClient/Addclient';

import styles from '../SideNavBar/Sidenav.module.scss';
import { Nav } from 'react-bootstrap';

initializeIcons();

const Sidenav = (props: any) => {
    return (
        <HashRouter basename='/'>
            <Routes>
                {/* <Route
                    path='/Addclient'
                    element={<Addclient />}
                /> */}

                <Route
                    path='/View Cleints'
                    element={<Addclient />}
                />
            </Routes>

            <div className={styles.sideNav}>
                <div className={`${styles.container} ${styles.sideContainer}`}>
                    <div className={'${styles.row} ${styles.sideRowContainer}'}>
                        <div className={`${styles.column} ${styles.sideNavColumn}`}>

                            <div className={`${styles.col12} ${styles.sideContainer}`}>
                                <div className={`${styles.col8} ${styles.sideImage}`}>
                                </div>

                                <div className={` ${styles.col2} ${styles.sideNavContainer}`} style={{ float: 'right' }}>
                                    <Nav defaultActiveKey="/ViewClients" className={styles.sidenavBar}>
                                        <Nav.Link as={Link} to="/Addclient" className={`${styles.sideNavMenu} ${styles.hoverEffect}`}>
                                            <span className={styles.sideText}>View Clients</span>
                                        </Nav.Link>
                                        <Nav.Link as={Link} to="/ViewProjects" className={`${styles.hoverEffect}`} style={{ color: 'white' }}>
                                            <span style={{ borderBottom: '1px solid white', paddingBottom: '5px', display: 'inline-block', width: '100%' }}>View Projects</span>
                                        </Nav.Link>
                                        <Nav.Link as={Link} to="/ChecklistValidation" className={`${styles.hoverEffect}`} style={{ color: 'white' }}>
                                            <span style={{ borderBottom: '1px solid white', paddingBottom: '5px', display: 'inline-block', width: '100%' }}>Checklist Validation</span>
                                        </Nav.Link>
                                        <Nav.Link as={Link} to="/ChecklistConfiguration" className={`${styles.hoverEffect}`} style={{ color: 'white' }}>Checklist Configuration</Nav.Link>
                                    </Nav>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </HashRouter>
    );
};

export default Sidenav;

