import React from 'react';
import {Box} from "@mui/material";
import Typography from "@mui/material/Typography";
import {FakeSampleComponent} from "../component/FakeSampleComponent";
import LeftTableTabComponent from "../component/LeftTableTabComponent";

export default function BaseInfoComponent(props) {
    const {doc,} = props;
    return (
        <Box>
            <Typography variant="h5" align='left' gutterBottom paragraph>
                {doc.name}
            </Typography>

            <FakeSampleComponent doc={doc}/>

            <LeftTableTabComponent doc={doc}/>

        </Box>
    )
}