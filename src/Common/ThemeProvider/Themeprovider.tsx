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
                styleOverrides: {
                    startIcon: {
                        '& > *:nth-of-type(1)': {
                            fontSize: '0px !important',
                        }
                    }
                }
            },
            MuiTableHead: {
                styleOverrides: {
                    root: {
                        backgroundColor: primary,
                        color: secondary,
                        '& .MuiTableCell-head': {
                            backgroundColor: primary,
                            color: "#fff",
                        },
                        '&.MuiTableHead-root': {
                            backgroundColor: primary,
                            color: "#fff",
                        }
                    }
                }
            },
            MuiTableCell: {
                styleOverrides: {
                    root: {
                        '& .MuiTableCell-root .MuiButtonBase-root.MuiCheckbox-root.Mui-checked': {
                            color: secondary,
                        },
                    },
                },
            },


            MuiToolbar: {
                styleOverrides: {
                    root: {
                        marginTop: "0rem"
                    }
                }
            },
            MuiTableSortLabel: {
                styleOverrides: {
                    root: {
                        backgroundColor: primary,
                        color: secondary,
                        '&.MuiActive': {
                            backgroundColor: primary,
                            color: secondary,
                        },
                        '&.MuiSvgIcon-root': {
                            backgroundColor: primary,
                            color: secondary,
                        },
                        '&.Mui-active': {
                            color: secondary, 
                            '& .MuiSvgIcon-root': {
                                color: secondary, 
                            },
                        },
                        
                    },
                }
            },

            MuiTablePagination: {
                styleOverrides: {
                    selectLabel: {
                        margin: 0

                    },
                    displayedRows: {
                        margin: 0
                    }
                }
            },

            MuiBreadcrumbs: {
                styleOverrides: {
                    separator: {
                        marginLeft: 0,
                        marginRight: 0
                    }
                }
            },

            // MuiStack: {
            //     styleOverrides: {
            //         root: {
            //             '& .MuiFormLabel-root': {
            //                 color: 'black'
            //             }
            //         }
            //     }
            // }
            MuiStack: {
                styleOverrides: {
                    root: {
                        color: 'black'
                    }
                }
            },
            MuiGrid: {
                styleOverrides: {
                    root: {
                        color: 'black'
                    },
                    item: {
                        color: 'black'
                    }
                }
            },
            MuiFormLabel: {
                styleOverrides: {
                    root: {
                        color: 'black'
                    }
                }
            },
            MuiInputLabel: {
                styleOverrides: {
                    root: {
                        color: 'black'
                    }
                }
            },
            MuiFormHelperText: {
                styleOverrides: {
                    root: {
                        marginRight: 0,
                        marginLeft: 0
                    }
                }
            }




        },

        palette: {
            mode: "light",
            common: {
                black: "#000",
                white: "#fff",
            },
            primary: {
                main: primary ? primary : "#000",

            },
            secondary: { main: secondary ? secondary : secondary },

        },
    });

    return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;

};

