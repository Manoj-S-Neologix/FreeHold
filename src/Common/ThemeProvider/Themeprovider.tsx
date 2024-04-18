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
            // MuiTextField: {
            //     styleOverrides: {
            //         root: {
            //             "& .MuiOutlinedInput-notchedOutline": {
            //                 borderColor: "#CACACA",
            //                 color: "black",
            //             },
            //             "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            //                 borderColor: "black",
            //                 borderWidth: "1px",
            //                 color: "black",
            //             },
            //         },
            //     },
            // },
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



            // MuiTableCell: {
            //     styleOverrides: {
            //         root: {
            //             '& .MuiButtonBase-root.MuiCheckbox-root.Mui-checked': {
            //                 color: secondary,
            //                 // backgroundColor: "#000",
            //             },
            //         },
            //     },
            // },

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
                        backgroundColor: "#000",
                        color: secondary,
                        '&.MuiActive': {
                            backgroundColor: "#000",
                            color: secondary,
                        },
                        '&.MuiSvgIcon-root': {
                            backgroundColor: "#000",
                            color: secondary,
                        }
                    },
                }
            },
            // MuiCheckbox: {
            //     styleOverrides: {
            //         root: {
            //             color: secondary,



            //             '&.Mui-checked': {
            //                 color: primary,
            //             },
            //             '&.MuiCheckbox-indeterminate': {
            //                 color: secondary,
            //             },
            //             '&.MuiCheckbox-indeterminate:hover': {
            //                 color: secondary,
            //             }, '&.MuiSvgIcon-root': {
            //                 color: secondary,
            //             }

            //         }
            //     }
            // },
            // MuiSvgIcon: {
            //         styleOverrides: {
            //             root: {
            //                 color: secondary,
            //             }
            //         }
            //     },


            MuiInputBase: {
                styleOverrides: {
                    root: {
                        // marginTop: '-20px'
                    }
                }
            },


            MuiTablePagination: {
                styleOverrides: {
                    selectLabel: {
                        margin: 0

                    },
                    displayedRows: {
                        margin: 0
                        // padding: 0 

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
            },

            //     MuiBreadcrumbsseperator:{
            //         styleOverrides: {
            //             root:{
            //             margin: 0
            //             }
            //     }
            // },

            MuiBreadcrumbs: {
                styleOverrides: {
                    separator: {
                        marginLeft: 0,
                        marginRight: 0
                    }
                }
            }


        },


        palette: {
            mode: "light",
            common: {
                black: "#000",
                white: secondary,

            },
            primary: { main: primary ? primary : "#000" },
            secondary: { main: secondary ? secondary : secondary },
        },
    });



    return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;

};
