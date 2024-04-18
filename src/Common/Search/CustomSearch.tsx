import * as React from 'react';
import { Box, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import styles from './CustomSearch.module.scss';

interface ISearchPros {
    handleSearchChange?: any;
}

const CustomSearch = ({ handleSearchChange }: ISearchPros) => {
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
                    endAdornment: <SearchIcon className={styles.IconSearch} />,
                    style: { border: "none", color: "#125895" }
                }}
                onChange={handleSearchChange}
            />
        </Box>
    );
};

export default CustomSearch;



