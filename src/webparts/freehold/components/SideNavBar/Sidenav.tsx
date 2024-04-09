import * as React from 'react';
import { initializeIcons } from '@fluentui/react/lib/Icons';
import { Stack, IStackTokens } from '@fluentui/react/lib/Stack';
import {  Nav } from 'react-bootstrap';
import styles from '../SideNavBar/Sidenav.module.scss';

initializeIcons();

const stackTokens: IStackTokens = { childrenGap: 10 };

const Sidenav = (props: any) => {
    return (
        <Stack horizontal tokens={stackTokens} style={{ height: '250px' }}>
            <Stack styles={{ root: { width: '85%' } }}>
                <img
                    src={require('/src/assets/images/Sideimage.png')}
                    height="250"
                    alt="Logo"
                />
            </Stack>
            <Stack  className={styles.sideMenuStack} >
            <Stack  > 
                <Nav defaultActiveKey="/home" className="flex-column">
                    <Nav.Link className={styles.sideNavMenu} href="/Addclient" >
                        <span className={styles.sideText} >View Clients</span>
                    </Nav.Link>
                    <Nav.Link href="/View Projects" style={{ color: 'white' }}>
                        <span style={{ borderBottom: '1px solid white', paddingBottom: '5px', display: 'inline-block', width: '100%' }}>View Projects</span>
                    </Nav.Link>
                    <Nav.Link href="/Checklist Validation" style={{ color: 'white' }}>
                        <span style={{ borderBottom: '1px solid white', paddingBottom: '5px', display: 'inline-block', width: '100%' }}>Checklist Validation</span>
                    </Nav.Link>
                    <Nav.Link href="/Checklist Configuration" style={{ color: 'white' }}>Checklist Configuration</Nav.Link>
                </Nav>
          </Stack>
            </Stack>
        </Stack>
    );
};

export default Sidenav;





