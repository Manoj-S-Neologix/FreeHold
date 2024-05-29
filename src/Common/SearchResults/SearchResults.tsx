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
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { useNavigate } from "react-router-dom";
//import styles from './SearchResults.module.scss';

interface ISearchPros {
    searchResults?: any;
    handleClose: () => void;
    spContext: WebPartContext;
    siteUrl: string;
}

const SearchResults = ({ searchResults, spContext, siteUrl, handleClose }: ISearchPros) => {

    let navigate = useNavigate();

    const getValue = (file: any, type: string) => {

        if (type === "project") {
            return (file.DMSProject !== null && file.DMSProject !== "") ? <a onClick={() => pageRedirect(`/ViewProject/${file.DMSProjectID}`, "same")} href={`#`}>&bull; {file.DMSProject}</a> : "";
        } else if (type === "client") {
            return (file.DMSClient !== null && file.DMSClient !== "") ? <a onClick={() => pageRedirect(`/ViewClient/${file.DMSClientID}`, "same")} href={`#`}>&bull; {file.DMSClient}</a> : "";
            //return (file.DMSClient !== null && file.DMSClient !== "") ? <a onClick={pageRedirect(`/ViewClient/${file.DMSClientID}`, "same")} href={`#/ViewClient/${file.DMSClientID}`}>&bull; {file.DMSClient}</a> : "";
        } else if (type === "unit") {
            return (file.DMSUnit !== null && file.DMSUnit !== "") ? <span>&bull; {file.DMSUnit}</span> : "";
        }

    };

    const getRedirectUrl = (parentLink: String, filename: string) => {

        const parentlnk: string = parentLink.replace("/Forms/AllItems.aspx", "");
        return (`${parentlnk}/${filename}`);
    };

    const pageRedirect = (url: string, redirectType: string) => {

        if (redirectType == "other") {
            window.open(url, "_blank", "noreferrer");
        } else {
            handleClose();
            navigate(url);
        }
    };

    return (
        <Box
            sx={{ width: 500 }}
            role="presentation"
        >
            <List>

                {searchResults?.map((file: any) => (

                    <>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar>
                                    <ArticleIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={<a onClick={() => pageRedirect(`${siteUrl}/_layouts/download.aspx?SourceUrl=${getRedirectUrl(file.ParentLink, file.Filename)}`, "other")} target="_blank" href={"#"}>{file.Filename}</a>}
                                secondary={
                                    <>
                                        <li>{getValue(file, "project")} {getValue(file, "client")} {getValue(file, "unit")}</li>
                                        <li>&bull; {file.DMSTags}</li>
                                    </>
                                }
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </>
                ))}

                {searchResults.length == 0 && (
                    <ListItem alignItems="flex-start">

                        <ListItemText
                            primary={`No results found`}
                        />
                    </ListItem>
                )}

            </List>

        </Box>
    );
};

export default SearchResults;



