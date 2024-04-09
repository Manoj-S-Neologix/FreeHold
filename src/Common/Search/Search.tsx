import * as React from 'react';
import { Stack, PrimaryButton, TextField, IconButton } from '@fluentui/react';
import styles from './Search.module.scss'; 

const Search = (props: any) => {
    return (
        <div className={styles.searchContainer}>

            <Stack horizontal styles={{ root: { padding: '4px' } }}>
                <Stack.Item grow={8}>
                    <Stack horizontal styles={{ root: { alignItems: 'center' } }}>
                        <TextField placeholder="Search" styles={{ root: { width: '100%', borderRadius: '5px', } }} />
                        <IconButton iconProps={{ iconName: 'Search' }} styles={{ root: { marginLeft: '-2rem' }, rootHovered: { background: 'none' }, rootPressed: { background: 'none' } }} />
                        <IconButton iconProps={{ iconName: 'Filter' }} styles={{
                            root: {
                                color: 'white',

                            },
                            rootHovered: { background: 'none' },
                            rootPressed: { background: 'none' }
                        }} />
                    </Stack>
                </Stack.Item>
                <Stack.Item grow={4} align="end">
                    <Stack horizontalAlign="end">
                        <PrimaryButton iconProps={{ iconName: 'Upload' }}
                            text="UPLOAD DOCUMENTS"
                            className={styles['uploadButton']} />
                    </Stack>
                </Stack.Item>
            </Stack>

        </div>
    );
};

export default Search;








