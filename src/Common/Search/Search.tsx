
import * as React from 'react';
import { TextField, IconButton } from '@fluentui/react';
import styles from './Search.module.scss';
import Upload from "../Upload/Upload";

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
