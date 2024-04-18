// import * as React from 'react';
// import { Persona, PersonaSize } from '@fluentui/react/lib/Persona';
// import styles from '../Header/Header.module.scss';
// import { Link } from 'react-router-dom';


// const Header = ({ props }: any) => {
//     const [userName] = React.useState(props.props.userDisplayName);

//     return (
//         <div className={styles.HeaderPart}>
//             <div className={styles.row}>
//                 <div className={styles.column}>
//                     <div className={styles.col12}>
//                         <div className={`${styles.col8} `}>
//                         <Link to ='/'> 
//                             <img
//                                 src={require('/src/assets/Logo/freeholdsolutions.png')}
//                                 width="150"
//                                 height="50"
//                                 alt="Logo"
//                                 style={{ marginLeft: '7px' }}
//                             />
//                             </Link>
//                         </div>
//                         <div className={` ${styles.col2}`}>
//                             <Persona
//                                 imageUrl=""
//                                 text={userName}
//                                 size={PersonaSize.size32}
//                                 imageAlt={userName}
//                                 styles={{
//                                     primaryText: { fontSize: '14px' },
//                                     root: { margin: '10px', marginLeft:'52px' }
//                                 }}
//                             /></div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Header;





import * as React from 'react';
import { Persona, PersonaSize } from '@fluentui/react/lib/Persona';
import { Link } from 'react-router-dom';
import { Box, Grid, Stack } from "@mui/material";

const Header = ({ props }: any) => {
    const [userName] = React.useState(props.props.userDisplayName);

    return (
        <Box sx={{ backgroundColor: '#fff', padding: '10px' }} >
            <Stack direction={"column"} spacing={2}>
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <Grid container spacing={2} >
                        <Grid item xs={12} sm={8}>
                            <Box>
                                <Link to='/'>
                                    <img
                                        src={require('/src/assets/Logo/freeholdsolutions.png')}
                                        width="150"
                                        height="50"
                                        alt="Logo"
                                        style={{ marginLeft: '7px' }}
                                    />
                                </Link>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                <Persona
                                    imageUrl=""
                                    text={userName}
                                    size={PersonaSize.size32}
                                    imageAlt={userName}
                                    styles={{
                                        primaryText: { fontSize: '14px' },
                                    }}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Box >
            </Stack>
        </Box>
    );
};

export default Header;



