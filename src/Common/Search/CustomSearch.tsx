import * as React from 'react';
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import styles from './CustomSearch.module.scss';

interface ISearchPros {
    handleSearchChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    searchQryTxt?: string;
}

const CustomSearch = ({ handleSearchChange, searchQryTxt = '' }: ISearchPros) => {
    const [inputValue, setInputValue] = React.useState(searchQryTxt);

    React.useEffect(() => {
        setInputValue(searchQryTxt);
    }, [searchQryTxt]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setInputValue(value);
        if (handleSearchChange) {
            handleSearchChange(event);
        }
    };

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
                value={inputValue}
                fullWidth
                placeholder="Search..."
                onChange={handleInputChange}
                sx={{
                    '& .MuiInputBase-input': {
                        color: 'primary',
                        border: 'none',
                        fontSize: '16px',
                        fontWeight: 600
                    },
                    "& fieldset": { border: 'none' },
                    width: '250px'
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
            />
        </Box>
    );
};

export default CustomSearch;
