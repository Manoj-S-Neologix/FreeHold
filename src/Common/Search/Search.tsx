import React from 'react';
import styles from './Search.module.scss';
import { TextField, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import FilterListIcon from '@material-ui/icons/FilterList';
import Upload from "../Upload/Upload";

const Search = (props:any) => {
    const handleFilterClick = () => {
        console.log('Filter clicked');
    };

    return (
        <div className={styles.searchmodule}>
            <div className={styles.container}>
                <div className={styles.row}>
                    <div className={styles.column}>
                        <div className={styles.col12}>
                            <div className={`${styles.col8} ${styles.searchInput}`}>
                                 <TextField
                                    className={styles.searchBar}
                                    placeholder="Search..."
                                    InputProps={{ endAdornment: <SearchIcon 
                                        className={styles.IconSearch}/>,
                                        disableUnderline: true
                                     }} 
                                />
                                <IconButton
                                    onClick={handleFilterClick}
                                    className={styles.iconFilter}
                                >
                                    <FilterListIcon />
                                </IconButton>
                            </div>
                            <div className={` ${styles.col2} `}>
                                <Upload props={props} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Search;
