import * as React from 'react';
import { Box, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import styles from './CustomSearch.module.scss';

const CustomSearch = (props: any) => {
    return (
        <Box>
            <TextField
                className={styles.searchBar}
                size="small"
                fullWidth
                placeholder="Search..."

                InputProps={{
                    endAdornment: <SearchIcon className={styles.IconSearch} />,
                    style: { border: "none" } // Remove default border
                }}
            />
        </Box>
    );
};

export default CustomSearch;



