
import * as React from 'react';
import { PrimaryButton, TextField, IconButton } from '@fluentui/react';
import styles from './Search.module.scss';

const Search = (props: any) => {
    return (
        <div className={styles.searchmodule}>
            <div className={styles.container}>
                <div className={styles.row}>
                    <div className={styles.column}>
                        <div className={styles.col12}>
                            <div className={`${styles.col8} ${styles.searchInput}`}>

                                <TextField 
                                    placeholder="Search..."
                                    className={styles.searchBar}
                                    iconProps={{ iconName: 'Search' }}

                                />

                                <IconButton 
                                    iconProps={{ iconName: 'Filter' }} 
                                    className={styles.iconFilter}
                                />
                            </div>

                            <div className={` ${styles.col2} ` }>
                                    <PrimaryButton 
                                        iconProps={{ iconName: 'Upload' }}
                                        className={styles.uploadButton} >
                                        <span>UPLOAD DOCUMENTS</span>
                                    </PrimaryButton>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Search;
