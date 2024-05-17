import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
//import styles from './SearchResults.module.scss';

interface ISearchPros {
    handleSearchChange?: any;
}

const SearchResults = ({ handleSearchChange }: ISearchPros) => {

    return (
        <Box
            sx={{ width: 500 }}
            role="presentation"
        >
            <List>
                <ListItem alignItems="flex-start">
                    <ListItemText
                        primary="Summer BBQ"
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    to Scott, Alex, Jennifer
                                </Typography>
                                {" — Wish I could come, but I'm out of town this…"}
                            </React.Fragment>
                        }
                    />
                </ListItem>
                
                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start">
                    <ListItemText
                        primary="Oui Oui"
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Sandra Adams
                                </Typography>
                                {' — Do you have Paris recommendations? Have you ever…'}
                            </React.Fragment>
                        }
                    />
                </ListItem>
                
            </List>

        </Box>
    );
};

export default SearchResults;



