import * as React from 'react';
import { Persona, PersonaSize } from '@fluentui/react/lib/Persona';
import { Link } from 'react-router-dom';
import { Box, Grid, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Header = ({ props }: any) => {
    const [userName] = React.useState(props);
    const theme = useTheme();

    return (
        <Box sx={{ backgroundColor: theme.palette.background.paper, padding: '10px' }} >
            <Stack direction={"column"} spacing={2}>
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <Grid container spacing={2} sx={{
                        display: "flex",
                        alignItems: "center",
                    }} >
                        <Grid item xs={12} sm={8}>
                            <Box>
                                <Link to='/'>
                                    <img
                                        src={require('/src/assets/Logo/freeholdsolutions.png')}
                                        width="150"
                                        height="50"
                                        alt="Logo"
                                    />
                                </Link>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={4} sx={{position:'relative', left:'10px'}}>
                            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                <Persona
                                    imageUrl=""
                                    text={userName}
                                    size={PersonaSize.size32}
                                    imageAlt={userName}
                                    styles={{
                                        primaryText: {
                                            fontSize: '14px',
                                            fontWeight: "600",
                                            color: theme.palette.text.primary
                                        },
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
