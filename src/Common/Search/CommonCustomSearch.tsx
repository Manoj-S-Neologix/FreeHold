import * as React from 'react';
import { Box, TextField, CircularProgress } from "@mui/material";
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
    client: string;
    project: String;
    isExpand?: boolean;
}

const CommonCustomSearch = ({ handleSearchChange, spContext, siteUrl, client, project, isExpand }: ISearchPros) => {

    const [opend, setOpend] = React.useState(false);
    const spServiceInstance: SPServiceType = SPService;
    const [searchTxt, setsearchTxt] = React.useState("");
    const [searchResults, setSearchResults] = React.useState<any>([]);
    const [placeholder, setPlaceholder] = React.useState("Search...");
    const [isSearchIconEnabled, setIsSearchIconEnabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const toggleDrawer = (newOpen: boolean) => async () => {
        setLoading(true);
        try {
            if (spServiceInstance) {
                let qryTxt: string = `${searchTxt}* IsContainer:false path:${siteUrl}`;

                if (client) {
                    qryTxt += " DMSClient: " + client;
                }

                if (project) {
                    qryTxt += " DMSProject: " + project;
                }

                const results = await spServiceInstance.getFilteredResults(qryTxt);
                console.log("searchresults", results.PrimarySearchResults);
                setSearchResults(results.PrimarySearchResults);
                setOpend(newOpen);
            }
        } catch (error) {
            console.error('Error fetching SharePoint search data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e: any) => {
        const value = e.target.value;
        setsearchTxt(value);
        setIsSearchIconEnabled(value.length >= 4);
    };

    return (
        <Box>
            <TextField
                className={styles.searchBar}
                size="small"
                onFocus={() => setPlaceholder("Type at least 4 characters")}
                onBlur={() => setPlaceholder("Search...")}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && isSearchIconEnabled) {
                        toggleDrawer(true)();
                    }
                }}
                placeholder={placeholder}
                sx={{
                    width: isExpand ? '22rem' : "35rem",
                    '& .MuiInputBase-input': {
                        color: 'primary',
                        border: 'none',
                        fontSize: '16px',
                        fontWeight: 600
                    },
                    "& fieldset": { border: 'none' },
                }}
                InputProps={{
                    endAdornment: (
                        loading ? (
                            <CircularProgress size={24} className={styles.IconSearch} />
                        ) : (
                            <SearchIcon
                                className={styles.IconSearch}
                                onClick={isSearchIconEnabled ? toggleDrawer(true) : undefined}
                                style={{
                                    border: "none",
                                    color: isSearchIconEnabled ? "#125895" : "#A9A9A9",
                                    cursor: isSearchIconEnabled ? "pointer" : "default"
                                }}
                            />
                        )
                    ),
                }}
                onChange={handleInputChange}
            />

            <React.Fragment>
                <Drawer
                    anchor={"right"}
                    open={opend}
                    onClose={toggleDrawer(false)}
                >
                    <SearchResults searchResults={searchResults} handleClose={toggleDrawer(false)} />
                </Drawer>
            </React.Fragment>
        </Box>
    );
};

export default CommonCustomSearch;

