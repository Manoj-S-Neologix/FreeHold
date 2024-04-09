
// import * as React from 'react';
// import { Navbar, Container, Row, Col } from 'react-bootstrap';
// import { useState, useEffect } from 'react';
// import styles from '../Header/Header.module.scss';
// import { Persona, PersonaSize } from '@fluentui/react';

// const Header = (props: any) => {
//     const [userName, setUserName] = useState(props?.userDisplayName);

//     useEffect(() => {
//         const fetchUserName = async () => {
//             try {
//                 const response = await fetch("https://freeholddxb.sharepoint.com/_api/web/currentuser", {
//                     headers: {
//                         "Accept": "application/json;odata=verbose",
//                         "Content-Type": "application/json;odata=verbose"
//                     },
//                     credentials: 'include' 
//                 });
//                 const data = await response.json();
//                 setUserName(data.d.Title); 
//             } catch (error) {
//                 console.error('Error fetching user name:', error);
//             }
//         };

//         fetchUserName();
//     }, []);

//     return (

//         <Container>
//             <Navbar className={styles.Headernavbar}>
//                 <Row>
//                     <Col xs={8}>
//                         <Navbar.Brand href="#home">
//                             <img
//                                 src={require('/src/assets/Logo/freeholdsolutions.png')}
//                                 width="150"
//                                 height="50"
//                                 alt="Logo"
//                                 style={{ marginLeft: '30px' }}
//                             />
//                         </Navbar.Brand>
//                     </Col>
//                     <Col xs={4}>
//                         <Navbar.Toggle />
//                         <Navbar.Collapse className="justify-content-end">
//                             {false && <Navbar.Text>
//                                 {userName}
//                             </Navbar.Text>}
//                             <Persona
//                                 imageUrl={""}
//                                 text={userName}
//                                 size={PersonaSize.size32}
//                                 imageAlt={userName}
//                                 styles={{ primaryText: { fontSize: '14px' }, root: { margin: '10px' } }}
//                             />
//                         </Navbar.Collapse>
//                     </Col>
//                 </Row>
//             </Navbar>
//         </Container>
//     );
// };

// export default Header;



// // //moved api service code normal way

// import * as React from 'react';
// import { Navbar, Container, Row, Col } from 'react-bootstrap';
// import { useState, useEffect } from 'react';
// import styles from '../Header/Header.module.scss';
// import { Persona, PersonaSize } from '@fluentui/react';
// import fetchUserName from '../Header/apiService'; 

// const Header = (props: any) => {
//     const [userName, setUserName] = useState(props?.userDisplayName);

//     useEffect(() => {
//         const fetchUserData = async () => {
//             const userData = await fetchUserName();
//             if (userData) {
//                 setUserName(userData);
//             }
//         };

//         fetchUserData();
//     }, []);

//     return (
//         <Container>
//             <Navbar className={styles.Headernavbar}>
//                 <Row>
//                     <Col xs={8}>
//                         <Navbar.Brand href="#home">
//                             <img
//                                 src={require('/src/assets/Logo/freeholdsolutions.png')}
//                                 width="150"
//                                 height="50"
//                                 alt="Logo"
//                                 style={{ marginLeft: '30px' }}
//                             />
//                         </Navbar.Brand>
//                     </Col>
//                     <Col xs={4}>
//                         <Navbar.Toggle />
//                         <Navbar.Collapse className="justify-content-end">
//                             {false && <Navbar.Text>
//                                 {userName}
//                             </Navbar.Text>}
//                             <Persona
//                                 imageUrl={""}
//                                 text={userName}
//                                 size={PersonaSize.size32}
//                                 imageAlt={userName}
//                                 styles={{ primaryText: { fontSize: '14px' }, root: { margin: '10px' } }}
//                             />
//                         </Navbar.Collapse>
//                     </Col>
//                 </Row>
//             </Navbar>
//         </Container>
//     );
// };

// export default Header;



import * as React from 'react';
import { Persona, PersonaSize } from '@fluentui/react/lib/Persona';
import { Stack, IStackTokens } from '@fluentui/react/lib/Stack';
import fetchUserName from '../Header/apiService'; 

const Header = (props: any) => {
    const [userName, setUserName] = React.useState(props?.userDisplayName);

    React.useEffect(() => {
        const fetchUserData = async () => {
            const userData = await fetchUserName();
            if (userData) {
                setUserName(userData);
            }
        };

        fetchUserData();
    }, []);

    const stackTokens: IStackTokens = { childrenGap: 10 };

    return (
        <Stack horizontal tokens={stackTokens} styles={{ root: { padding: '10px' } }}>
            <Stack.Item grow={8}>
                <img
                    src={require('/src/assets/Logo/freeholdsolutions.png')}
                    width="150"
                    height="50"
                    alt="Logo"
                    style={{ marginLeft: '30px' }}
                />
            </Stack.Item>
            <Stack.Item grow={4} align="end">
                <Stack horizontalAlign="end">
                    <Persona
                        imageUrl=""
                        text={userName}
                        size={PersonaSize.size32}
                        imageAlt={userName}
                        styles={{ primaryText: { fontSize: '14px' }, root: { margin: '10px' } }}
                    />
                </Stack>
            </Stack.Item>
        </Stack>
    );
};

export default Header;


