import * as React from 'react';
import { Box, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import styles from './CustomSearch.module.scss';
import Drawer from '@mui/material/Drawer';
import SearchResults from '../SearchResults/SearchResults';

interface ISearchPros {
    handleSearchChange?: any;
}

const CustomSearch = ({ handleSearchChange }: ISearchPros) => {

    const [opend, setOpend] = React.useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        //alert("Clicked");
        setOpend(newOpen);
    };

    return (
        <Box>
            <TextField
                className={styles.searchBar}
                size="small"
                fullWidth
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
                    endAdornment: <SearchIcon className={styles.IconSearch} onClick={toggleDrawer(true)} />,
                    style: { border: "none", color: "#125895", cursor: "pointer" }
                }}
                onChange={handleSearchChange}
            />

            <React.Fragment>
                <Drawer
                    anchor={"right"}
                    open={opend}
                    onClose={toggleDrawer(false)}
                >
                    <SearchResults />
                </Drawer>
            </React.Fragment>
        </Box>
    );
};

export default CustomSearch;



