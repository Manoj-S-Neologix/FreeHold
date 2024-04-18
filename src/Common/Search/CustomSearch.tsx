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
                sx={{
                    '& .MuiInputBase-input': {
                        color: 'primary',
                        border: 'none',
                        fontSize: '16px'
                    }
                }}
                InputProps={{
                    endAdornment: <SearchIcon className={styles.IconSearch} />,
                    style: { border: "none", color: "#125895" }
                }}
            />
        </Box>
    );
};

export default CustomSearch;



