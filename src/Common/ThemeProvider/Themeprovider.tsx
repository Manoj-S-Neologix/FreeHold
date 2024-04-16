import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material";
import React, { ReactNode } from "react";

interface ThemeProps {
    primary: string;
    secondary: string;
    children: ReactNode;
}

export const ThemeProvider = ({ primary, secondary, children }: ThemeProps) => {
    const theme = createTheme({
        components: {
            MuiButton: {
                variants: [
                    {
                        props: { variant: "outlined" },
                        style: {
                            textTransform: "none",
                            '&:hover': {
                                boxShadow: 'none'
                            }
                        },
                    },
                    {
                        props: { variant: "contained" },
                        style: {
                            textTransform: "none",
                            '&:hover': {
                                boxShadow: 'none'
                            }
                        },
                    },
                ],
            },
            MuiTextField: {
                styleOverrides: {
                    root: {
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#CACACA",
                            color: "black",
                        },
                        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "black",
                            borderWidth: "1px",
                            color: "black",
                        },
                    },
                },
            },
            MuiTableHead: {
                styleOverrides: {
                    root: {
                        backgroundColor: "#125895",
                        color: "#fff",
                        '& .MuiTableCell-head': {
                            backgroundColor: "#125895",
                            color: "#fff"
                        },
                        '&.MuiTableHead-root': {
                            backgroundColor: "#125895",
                            color: "#fff"
                        },
                        // '&.Hover': {
                        //     backgroundColor: "#000",
                        //     color: "#fff"
                        // }

                    }
                }
            },
            MuiToolbar: {
                styleOverrides: {
                    root: {
                        marginTop: "1rem"
                    }
                }
            },
            MuiTableSortLabel: {
                styleOverrides: {
                    root: {
                        backgroundColor: "#000",
                        color: "#fff",
                        '&.MuiActive': {
                            backgroundColor: "#000",
                            color: "#fff",
                        },
                        '&.MuiSvgIcon-root': {
                            backgroundColor: "#000",
                            color: "#fff",
                        }
                    },
                }
            },
            MuiCheckbox: {
                styleOverrides: {
                    root: {
                        color: "#fff",
                        '&.Mui-checked': {
                            color: "#fff",
                        },
                        '&.MuiCheckbox-indeterminate': {
                            color: "#fff",
                        },
                        '&.MuiCheckbox-indeterminate:hover': {
                            color: "#fff",
                        }, '&.MuiSvgIcon-root': {
                            color: "#fff",
                        }

                    }
                }
            },
            // MuiSvgIcon: {
            //         styleOverrides: {
            //             root: {
            //                 color: "#fff",
            //             }
            //         }
            //     },


            MuiInputBase: {
                styleOverrides: {
                    root: {
                        marginTop: '-20px'
                    }
                }
            },

   
           
            MuiTablePagination: {
                styleOverrides: {
                    actions: {
                        marginTop: '-20px'
                    }
                }
            },

            MuiTableBody: {
                styleOverrides: {
                    // root: {
                    //     '&:nth-of-type(odd)': {
                    //         backgroundColor: '#f5f5f5',
                    //     },
                    //     '&:last-child td, &:last-child th': {
                    //         border: 0,
                    //     },
                    // }
                }
            }
        },
        palette: {
            mode: "light",
            common: {
                black: "#000",
                white: "#fff",
            },
            primary: { main: primary ? primary : "#000" },
            secondary: { main: secondary ? secondary : "#fff" },
        },
    });

    return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};