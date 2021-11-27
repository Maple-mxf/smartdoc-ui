import {Box, useTheme} from "@mui/material";
import React from "react";
import RequestHeaderEditableViewComponent from "./request/RequestHeaderEditableViewComponent";
import Tabs from "@mui/material/Tabs";
import {a11yProps, StyledTab, TabPanel} from "./common/common";
import RequestURIVarEditableViewComponent from "./request/RequestURIVarEditableViewComponent";
import RequestQueryParamEditableViewComponent from "./request/RequestQueryParamEditableViewComponent";
import RequestBodyEditableViewComponent from "./request/RequestBodyEditableViewComponent";

export default function RequestSnippetTabComponent(props) {
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

                <StyledTab label="Path Var" {...a11yProps(1)} />

                <StyledTab label="Query Param" {...a11yProps(2)} />

                <StyledTab label="Body" {...a11yProps(3)} />
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
                    request
                </Box>
            </Tabs>
            <Box sx={{height: '80%'}}>
                <TabPanel value={value} index={0}>
                    <RequestHeaderEditableViewComponent doc={doc}/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <RequestURIVarEditableViewComponent doc={doc}/>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <RequestQueryParamEditableViewComponent doc={doc}/>
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <RequestBodyEditableViewComponent doc={doc}/>
                </TabPanel>
            </Box>
        </Box>
    )
}
