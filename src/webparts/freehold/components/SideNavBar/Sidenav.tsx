// import * as React from 'react';
// import { initializeIcons } from '@fluentui/react/lib/Icons';
// import { Link } from 'react-router-dom';
// import styles from '../SideNavBar/Sidenav.module.scss';
// import { Nav } from 'react-bootstrap';

// initializeIcons();

// const Sidenav = (props: any) => {
//     return (
//         <div className={styles.sideNav}>
//             <div className={`${styles.container} ${styles.sideContainer}`}>
//                 <div className={`${styles.row} ${styles.sideRowContainer}`}>
//                     <div className={`${styles.column} ${styles.sideNavColumn}`}>
//                         <div className={`${styles.col12} ${styles.sideContainer}`}>
//                             <div className={`${styles.col8} ${styles.sideImage}`} />
//                             <div className={` ${styles.col2} 
//                             ${styles.sideNavContainer}`} style={{ float: 'right' }}>
//                                 <Nav defaultActiveKey="/"
//                                     className={styles.sidenavBar}>
//                                     <Nav.Link as={Link}
//                                         to="/Addclient"
//                                         className={`${styles.sideNavMenu} 
//                                         ${styles.hoverEffect}`}>
//                                         <span className={styles.sideText}>
//                                             View Clients</span>
//                                     </Nav.Link>
//                                     <Nav.Link as={Link}
//                                         to="/ViewProjects"
//                                         className={`${styles.hoverEffect}`}
//                                         style={{ color: 'white' }}>
//                                         <span
//                                             style={{
//                                                 borderBottom: '1px solid white',
//                                                 paddingBottom: '5px',
//                                                 display: 'inline-block',
//                                                 width: '100%'
//                                             }}>
//                                             View Projects
//                                         </span>
//                                     </Nav.Link>
//                                     <Nav.Link as={Link}
//                                         to="/ChecklistValidation"
//                                         className={`${styles.hoverEffect}`}
//                                         style={{ color: 'white' }}>
//                                         <span style={{
//                                             borderBottom: '1px solid white',
//                                             paddingBottom: '5px',
//                                             display: 'inline-block',
//                                             width: '100%'
//                                         }}>
//                                             Checklist Validation
//                                         </span>
//                                     </Nav.Link>
//                                     <Nav.Link as={Link}
//                                         to="/ChecklistConfiguration"
//                                         className={`${styles.hoverEffect}`}
//                                         style={{ color: 'white' }}>
//                                         Checklist Configuration
//                                     </Nav.Link>
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

// import * as React from 'react';
// import { initializeIcons } from '@fluentui/react/lib/Icons';
// import { Link } from 'react-router-dom';
// import styles from '../SideNavBar/Sidenav.module.scss';
// import { Nav } from 'react-bootstrap';

// initializeIcons();

// const Sidenav = (props: any) => {
//     return (
//         <div className={styles.sideNav}>
//             <div className={`${styles.container} ${styles.sideContainer}`}>
//                 <div className={`${styles.row} ${styles.sideRowContainer}`}>
//                     <div className={`${styles.column} ${styles.sideNavColumn}`}>
//                         <div className={`${styles.col12} ${styles.sideContainer}`}>
//                             <div className={`${styles.col8} ${styles.sideImage}`} />
//                             <div className={`${styles.col2} ${styles.sideNavContainer}`} style={{ float: 'right' }}>
//                                 <Nav defaultActiveKey="/" className={styles.sidenavBar}>
//                                     <Nav.Link as={Link} to="/Addclient"
//                                         style={{ borderBottom: '1px solid white', paddingBottom: '5px', display: 'inline-block', width: '100%' }}
//                                         className={`${styles.sideNavMenu} 
//                                     ${styles.hoverEffect}`}>
//                                         <span className={styles.sideText}>View Clients</span>
//                                     </Nav.Link>
//                                     <Nav.Link as={Link} to="/ViewProjects"
//                                     style={{ color: 'white', borderBottom: '1px solid white', paddingBottom: '5px', display: 'inline-block',  width: '100%'}}
//                                     >
//                                         <div
//                                         >
//                                             <p className={`${styles.hoverEffect}`}>View Projects</p>
//                                         </div>

//                                     </Nav.Link>

//                                     <Nav.Link as={Link} to="/ChecklistValidation" className={`${styles.hoverEffect}`} style={{ color: 'white' }}>
//                                         <span style={{ borderBottom: '1px solid white', paddingBottom: '5px', display: 'inline-block', width: '100%' }}>
//                                             Checklist Validation
//                                         </span>
//                                     </Nav.Link>
//                                     <Nav.Link as={Link} to="/ChecklistConfiguration" className={`${styles.hoverEffect}`} style={{ color: 'white' }}>
//                                         Checklist Configuration
//                                     </Nav.Link>
//                                 </Nav>
//                             </div>
//                             {/* New code for Lorem text */}
//                             <div className={`${styles.col2} ${styles.loremTextContainer}`}>
//                                 <div className={styles.loremText}>
//                                     <h1 className={styles.heading}>Lorem ipsum </h1>
//                                     <p>Sed solicitude tell us ac elite elided, id labret ex farci bus…
//                                     </p>
//                                 </div>
//                             </div>
//                             {/* End of new code */}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Sidenav;


import React from 'react';
import { initializeIcons } from '@fluentui/react/lib/Icons';
import { Link } from 'react-router-dom';
import styles from '../SideNavBar/Sidenav.module.scss';

initializeIcons();

const menuItems = [
    { to: '/ViewClient', text: 'View Clients' },
    { to: '/ViewProjects', text: 'View Projects' },
    { to: '/ChecklistValidation', text: 'Checklist Validation' },
    { to: '/ChecklistConfiguration', text: 'Checklist Configuration' }

];

const Sidenav = (props: any) => {
    return (
        <div className={styles.sideNav}>
            <div className={`${styles.container} ${styles.sideContainer}`}>
                <div className={`${styles.row} ${styles.sideRowContainer}`}>
                    <div className={`${styles.column} ${styles.sideNavColumn}`}>
                        <div className={`${styles.col12} ${styles.sideContainer}`}>
                            <div className={`${styles.col8} ${styles.sideImage}`} />
                            <div className={`${styles.col2} ${styles.sideNavContainer}`} style={{ float: 'right' }}>
                                <ul className={styles.sidenavBar}>
                                    {menuItems.map((item, index) => (
                                        <React.Fragment key={index}>
                                            <li className={styles.sideNavItem}>
                                                <Link to={item.to} className={styles.sideNavLink}>
                                                    {item.text}
                                                </Link>
                                            </li>
                                            {index !== menuItems.length - 1 && <div className={styles.divider} />}
                                        </React.Fragment>
                                    ))}
                                </ul>
                            </div>
                            {/* New code for Lorem text */}
                            <div className={`${styles.col2} ${styles.loremTextContainer}`}>
                                <div className={styles.loremText}>
                                    <h1 className={styles.heading}>Lorem ipsum </h1>
                                    <p>Sed solicitude tell us ac elite elided, id labret ex farci bus…</p>
                                </div>
                            </div>
                            {/* End of new code */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidenav;

