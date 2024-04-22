
/* eslint-disable @typescript-eslint/no-var-requires */

import React from 'react';
import { initializeIcons } from '@fluentui/react/lib/Icons';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../SideNavBar/Sidenav.module.scss';

initializeIcons();

const menuItems = [
    { to: '/ViewClient', text: 'View Clients' },
    { to: '/ViewProjects', text: 'View Projects' },
    { to: '/ChecklistValidation', text: 'Checklist Validation' },
    { to: '/ChecklistConfiguration', text: 'Checklist Configuration' }

];
const images = require("../../../../assets/Images/Home.png");
const Sidenav = (props: any) => {
    const navigate = useNavigate();
    console.log(props)
    return (
        <div className={styles.sideNav}>
            <div className={`${styles.container} ${styles.sideContainer}`}>
                <div className={`${styles.row} ${styles.sideRowContainer}`}>
                    <div className={`${styles.column} ${styles.sideNavColumn}`}>
                        <div className={`${styles.col12} ${styles.sideContainer}`}>
                            <div style={{ backgroundImage: images }}
                                className={`${styles.col8} ${styles.sideImage}`} />
                            <div className={`${styles.col2} ${styles.sideNavContainer}`} style={{ float: 'right' }}>
                                <ul className={styles.sidenavBar}>
                                    {menuItems.map((item, index) => (
                                        <React.Fragment key={index}>
                                            <li onClick={() => { navigate(`${item.to}`); }} className={styles.sideNavItem}>
                                                <Link to={item.to} className={styles.sideNavLink}>
                                                    {item.text}
                                                </Link>
                                            </li>
                                            {index !== menuItems.length - 1 && <div className={styles.divider} />}
                                        </React.Fragment>
                                    ))}
                                </ul>
                            </div>
                            <div className={`${styles.col2} ${styles.loremTextContainer}`}>
                                <div className={styles.loremText}>
                                    <h1 className={styles.heading}>Lorem ipsum </h1>
                                    <p>Sed solicitude tell us ac elite elided, id labret ex farci bus…</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidenav;

