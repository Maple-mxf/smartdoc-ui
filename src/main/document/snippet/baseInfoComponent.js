import React from 'react';
import {Box} from "@mui/material";
import Typography from "@mui/material/Typography";
import RequestSnippetTabComponent from "../component/RequestSnippetTabComponent";
import ResponseSnippetTabComponent from "../component/ResponseSnippetTabComponent";
// import ResponseSnippetTabComponent from "../component/ResponseSnippetTabComponent";

export default function BaseInfoComponent(props) {
    const {doc,} = props;
    return (
        <Box>
            <Typography variant="h6" align='left' gutterBottom paragraph>
                {doc.name}
            </Typography>

            <RequestSnippetTabComponent doc={doc}/>
            <ResponseSnippetTabComponent doc={doc}/>
        </Box>
    )
}