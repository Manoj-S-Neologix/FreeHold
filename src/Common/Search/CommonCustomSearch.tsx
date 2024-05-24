import * as React from 'react';
import { Box, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import styles from './CustomSearch.module.scss';
import Drawer from '@mui/material/Drawer';
import SearchResults from '../SearchResults/SearchResults';
import SPService, { SPServiceType } from '../../webparts/freehold/Services/Core/SPService';
import { WebPartContext } from '@microsoft/sp-webpart-base';

interface ISearchPros {
    handleSearchChange?: any;
    spContext: WebPartContext;
    siteUrl: string;
}

const CommonCustomSearch = ({ handleSearchChange, spContext, siteUrl }: ISearchPros) => {

    const [opend, setOpend] = React.useState(false);
    const spServiceInstance: SPServiceType = SPService;
    const [searchTxt, setsearchTxt] = React.useState("");
    const [searchResults, setSearchResults] = React.useState<any>([]);

    const toggleDrawer = (newOpen: boolean) => () => {
        //alert("Clicked");

        if (spServiceInstance) {
            spServiceInstance.getFilteredResults(`${searchTxt}* IsContainer:false path:${siteUrl}`).then((results) => {
                console.log("searchresults", results.PrimarySearchResults);
                setSearchResults(results.PrimarySearchResults);
                setOpend(newOpen);

            }).catch((error) => {
                console.error('Error fetching SharePoint serach data:', error);
            });
        }
    };

    return (
        <Box>
            <TextField
                className={styles.searchBar}
                size="small"
                fullWidth
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        toggleDrawer(true);
                    }
                }}
                placeholder="Search..."
                sx={{
                    '& .MuiInputBase-input': {
                        color: 'primary',
                        border: 'none',
                        fontSize: '16px',
                        fontWeight: 600
                    },
                    "& fieldset": { border: 'none' },
                }}
                InputProps={{
                    endAdornment:
                        <SearchIcon
                            className={styles.IconSearch}
                            onClick={toggleDrawer(true)}
                        />,
                    style: { border: "none", color: "#125895", cursor: "pointer" }
                }}
                onChange={(e: any) => {
                    setsearchTxt(e.target.value);
                }}
            />

            <React.Fragment>
                <Drawer
                    anchor={"right"}
                    open={opend}
                    onClose={toggleDrawer(false)}
                >
                    <SearchResults searchResults={searchResults} />
                </Drawer>
            </React.Fragment>
        </Box>
    );
};

export default CommonCustomSearch;



