import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import ArticleIcon from '@mui/icons-material/Article';
import { ListItemAvatar } from '@mui/material';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { useNavigate } from "react-router-dom";
import CommonService from '../Common';
const { removeFilenameWithTimestamp } = CommonService();

interface ISearchPros {
    searchResults?: any;
    handleClose: () => void;
    spContext: WebPartContext;
    siteUrl: string;
}

const SearchResults = ({ searchResults, spContext, siteUrl, handleClose }: ISearchPros) => {

    const navigate = useNavigate();

    const getValue = (file: any, type: string) => {
        if (type === "project") {
            return (file.DMSProject !== null && file.DMSProject !== "") ? <a onClick={() => {handleClose();}} href={`#/ViewProject/${file.DMSProjectID}`}>&bull; {file.DMSProject}</a> : "";
        } else if (type === "client") {
            return (file.DMSClient !== null && file.DMSClient !== "") ? <a onClick={() => {handleClose();}} href={`#/ViewClient/${file.DMSClientID}`}>&bull; {file.DMSClient}</a> : "";
        } else if (type === "unit") {
            return (file.DMSUnit !== null && file.DMSUnit !== "") ? <span>&bull; {file.DMSUnit}</span> : "";
        }
    };

    const getRedirectUrl = (parentLink: string, filename: string) => {

        const parentlnk: string = parentLink.replace("/Forms/AllItems.aspx", "");
        return (`${parentlnk}/${filename}`);
    };

    const pageRedirect = (url: string, redirectType: string) => {

        if (redirectType === "other") {
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
                                primary={<a onClick={() => pageRedirect(`${siteUrl}/_layouts/download.aspx?SourceUrl=${getRedirectUrl(file.ParentLink, file.Filename)}`, "other")} target="_blank" href={"#"}>{removeFilenameWithTimestamp(file.Filename)}</a>}
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

                {searchResults.length === 0 && (
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



