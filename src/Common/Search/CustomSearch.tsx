import * as React from 'react';
import { Box, TextField, IconButton, InputAdornment } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import styles from './CustomSearch.module.scss';
import Drawer from '@mui/material/Drawer';
import SearchResults from '../SearchResults/SearchResults';

interface ISearchPros {
    handleSearchChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomSearch = ({ handleSearchChange }: ISearchPros) => {
    const [inputValue, setInputValue] = React.useState('');
    const [opend, setOpend] = React.useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpend(newOpen);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
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
                fullWidth
                placeholder="Search..."
                value={inputValue}
                onChange={handleInputChange}
                sx={{
                    '& .MuiInputBase-input': {
                        color: 'primary',
                        border: 'none',
                        fontSize: '16px',
                        fontWeight: 600
                    },
                    "& fieldset": { border: 'none' },
                    width:'250px'
                }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            {inputValue && (
                                <IconButton onClick={clearInput}>
                                    <CloseIcon />
                                </IconButton>
                            )}
                            <SearchIcon className={styles.IconSearch} onClick={toggleDrawer(true)} />
                        </InputAdornment>
                    ),
                    style: { border: "none", color: "#125895", cursor: "pointer" }
                }}
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


