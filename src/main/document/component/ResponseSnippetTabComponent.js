import {Box, useTheme} from "@mui/material";
import React from "react";
import Tabs from "@mui/material/Tabs";
import {a11yProps, StyledTab, TabPanel} from "./common";
import ResponseHeaderEditableViewComponent from "./response/ResponseHeaderEditableViewComponent";
import ResponsetBodyEditableViewComponent from "./response/ResponsetBodyEditableViewComponent";

// ResponseSnippetTabComponent
export default function ResponseSnippetTabComponent(props) {
    const {doc} = props;
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{width: '100%', typography: 'body1', height: '50vh', position: 'relative'}}>
            <Tabs value={value}
                  onChange={handleChange}
                  aria-label="request tabs"
                  variant='fullWidth'
                  centered
                  sx={{height: '10%', border: 1, borderColor: 'divider'}}
            >
                <StyledTab label="Header" {...a11yProps(0)} />
                <StyledTab label="Body" {...a11yProps(1)} />
                <Box
                    sx={{
                        position: 'absolute',
                        top: '1px',
                        left: '0.5%',
                        color: `${theme.palette.info.light}`,
                        fontSize: '14px',
                        fontStyle: 'italic',
                        fontWeight: 'medium',
                        borderRadius: '2rem'
                    }}>
                    response
                </Box>
            </Tabs>
            <Box sx={{height: '80%'}}>
                <TabPanel value={value} index={0}>
                    <ResponseHeaderEditableViewComponent doc={doc}/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <ResponsetBodyEditableViewComponent doc={doc}/>
                </TabPanel>
            </Box>
        </Box>
    )
}
