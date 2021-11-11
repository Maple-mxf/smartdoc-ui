import React from 'react';
import {Box, useTheme} from "@mui/material";
import Typography from "@mui/material/Typography";
import CustomCodeComponent from "../../../style/component/code";

export default function BaseInfoComponent(props) {
    let theme = useTheme();
    const {doc,} = props;
    return (
        <Box>
            <Typography variant="h5" align='left' gutterBottom paragraph>
                {doc.name}
            </Typography>

            <CustomCodeComponent codeText={doc.curlCodeSample} language='shell' tag='request'/>
            <CustomCodeComponent codeText={doc.responseFakeCodeSample} language='json' tag='response'/>

        </Box>
    )
}