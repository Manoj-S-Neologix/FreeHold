import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
/* import Typography from '@mui/material/Typography'; */
import Avatar from '@mui/material/Avatar';
import ArticleIcon from '@mui/icons-material/Article';
import { ListItemAvatar } from '@mui/material';
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
                    <ListItemAvatar>
                        <Avatar>
                            <ArticleIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={<a href="#">sample.docx</a>}
                        secondary={
                            <>
                                <li>&bull; Project &bull; Client &bull; Unit</li>
                                <li>&bull; Engagment letter</li>
                            </>
                        }
                    />
                </ListItem>

                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar>
                            <ArticleIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={<a href="#">sample2.docx</a>}
                        secondary={
                            <>
                                <li>&bull; Project &bull; Client &bull; Unit</li>
                                <li>&bull; Power of attorny</li>
                            </>
                        }
                    />
                </ListItem>

                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar>
                            <ArticleIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={<a href="#">sample3.docx</a>}
                        secondary={
                            <>
                                <li>&bull; Project &bull; Client &bull; Unit</li>
                                <li>&bull; National Id</li>
                            </>
                        }
                    />
                </ListItem>

                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar>
                            <ArticleIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={<a href="#">sample4.docx</a>}
                        secondary={
                            <>
                                <li>&bull; Project &bull; Client &bull; Unit</li>
                                <li>&bull; Passport copy</li>
                            </>
                        }
                    />
                </ListItem>

            </List>

        </Box>
    );
};

export default SearchResults;



