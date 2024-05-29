
/* eslint-disable @typescript-eslint/no-var-requires */

import React from 'react';
import { initializeIcons } from '@fluentui/react/lib/Icons';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../SideNavBar/Sidenav.module.scss';
import { IFreeholdChildProps } from '../IFreeholdChildProps';
const homeImage: string = require('../../../../assets/Images/Home.png');

initializeIcons();

const Sidenav = (props: IFreeholdChildProps) => {
    const navigate = useNavigate();
    //console.log(props);

    let menuItems: any[] = [];

    if (props.userRole === "staff") {
        menuItems = [
            { to: '/ViewClient', text: 'View Clients' },
            { to: '/ViewProject', text: 'View Projects' },
            { to: '/ChecklistValidation', text: 'Checklist Validation' }
        ];
    } else {
        menuItems = [
            { to: '/ViewClient', text: 'View Clients' },
            { to: '/ViewProject', text: 'View Projects' },
            { to: '/ChecklistValidation', text: 'Checklist Validation' },
            { to: '/ChecklistConfiguration', text: 'Checklist Configuration' }
        ];
    }
    /* const menuItems = [
        { to: '/ViewClient', text: 'View Clients' },
        { to: '/ViewProjects', text: 'View Projects' },
        { to: '/ChecklistValidation', text: 'Checklist Validation' },
        { to: '/ChecklistConfiguration', text: 'Checklist Configuration' }
    ]; */

    return (
        <div className={styles.sideNav}>
            <div className={`${styles.container} ${styles.sideContainer}`}>
                <div className={`${styles.row} ${styles.sideRowContainer}`}>
                    <div className={`${styles.column} ${styles.sideNavColumn}`}>
                        <div className={`${styles.col12} ${styles.sideContainer}`}>
                            <div style={{ backgroundImage: `url(${homeImage})` }}
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

