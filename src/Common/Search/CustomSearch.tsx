import * as React from 'react';
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import styles from './CustomSearch.module.scss';
import CloseIcon from '@mui/icons-material/Close';

interface ISearchPros {
    handleSearchChange?: any;
    searchQryTxt?: string;
}

const CustomSearch = ({ handleSearchChange, searchQryTxt }: ISearchPros) => {

    const [inputValue, setInputValue] = React.useState('');

    const clearInput = () => {
        setInputValue('');
        if (handleSearchChange) {
            handleSearchChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
        }
    };

    return (
        <Box>
            <TextField
                className={styles.searchBar}
                size="small"
                value={searchQryTxt}
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
                    endAdornment: (
                        <InputAdornment position="end">
                            {inputValue && (
                                <IconButton onClick={clearInput}>
                                    <CloseIcon />
                                </IconButton>
                            )}
                            <SearchIcon className={styles.IconSearch} />
                        </InputAdornment>
                    ),
                    style: { border: "none", color: "#125895", cursor: "pointer" }
                }}
                onChange={handleSearchChange}
            />

        </Box>
    );
};

export default CustomSearch;



