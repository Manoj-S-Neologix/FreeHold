import React from 'react';
import { Navbar, Container, Form, InputGroup, FormControl, Nav, Button } from 'react-bootstrap';
import { FaSearch, FaFilter, FaUpload } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../Home/Home.module.scss';
// import { Stylesheet } from '@fluentui/react';

const Home = () => {
    return (
        <div>
            <Navbar className="Logo-navbar" >
                <Container>
                    <Navbar.Brand href="#home">
                        <img
                            src={require('/src/assets/images/freeholdsolutions.png')}
                            width="150"
                            height="50"
                            // className="d-inline-block align-top"
                            alt="Logo"
                            style={{ marginLeft: '30px' }}
                        />

                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            User Name
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>



            <Navbar className={styles.customNavbar}>
                <Form className="d-flex">
                    <InputGroup>
                        <FormControl className={styles.searchBar}
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                        />

                        <FaSearch className={styles['search-icon']} />

                    </InputGroup>

                    <FaFilter style={{ fontSize: '1.2rem', marginLeft: '5px', color: 'white', height: '1.2rem' }} />


                </Form>
                <div className={styles['custom-upload-container']}>
  <FaUpload
    className={`${styles['upload-icon']} rounded-circle`}
  />
  <Button className={styles['uploadButton']}  > Upload Documents </Button>
</div>


            </Navbar>



            <div className={styles.sideMenu}>
                <Nav defaultActiveKey="/home" className="flex-column">
                    <Nav.Link className={styles.sideNavMenu} href="/View Clients" >
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
            </div>




        </div>
    );
}

export default Home;



