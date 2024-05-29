import * as React from 'react';
import { Box, TextField, CircularProgress, IconButton } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

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
                let qryTxt: string = `Filename:${searchTxt}* contentclass:STS_ListItem_DocumentLibrary IsContainer:false path:${siteUrl}`;

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

    const handleClear = () => {
        setsearchTxt("");
        setIsSearchIconEnabled(false);
    };

    return (
        <Box>
            <TextField
                className={styles.searchBar}
                size="small"
                value={searchTxt}
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
                        <>
                        {loading ? (
                            <CircularProgress size={24} className={styles.IconSearch} />
                        ) : (
                            <>
                                {searchTxt && (
                                    <IconButton
                                        size="small"
                                        onClick={handleClear}
                                        style={{
                                            color: "#125895",
                                            cursor: "pointer"
                                        }}
                                    >
                                        <ClearIcon />
                                    </IconButton>
                                )}
                                <SearchIcon
                                    className={`${styles.IconSearchCommon} ${isSearchIconEnabled ? styles.IconSearchEnabledCommon : styles.IconSearchDisabledCommon}`}
                                    onClick={isSearchIconEnabled ? toggleDrawer(true) : undefined}
                                />

                            </>
                        )}
                    </>
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
                    <SearchResults searchResults={searchResults} handleClose={toggleDrawer(false)} spContext={spContext} siteUrl={siteUrl} />
                </Drawer>
            </React.Fragment>
        </Box>
    );
};

export default CommonCustomSearch;

