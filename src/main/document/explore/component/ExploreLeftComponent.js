import React from "react";
import {HistoryComponent} from "./HistoryComponent";
import {EnvironmentComponent} from "./EnvironmentComponent";
import Paper from "@mui/material/Paper";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import {History} from "@mui/icons-material";

export const ExploreLeftComponent = (props)=>{
    const [tabValue, setTabValue] = React.useState('1');
    const handleTagChange = (event, newValue) => {
        setTabValue(newValue);
    };
    return (
        <Paper elevation={4} style={{height: '85vh', width: '100%'}}>
            <TabContext value={tabValue}>
                <TabList aria-label="simple tabs example" onChange={handleTagChange}>
                    <Tab label="History" value="1" icon={<History/>}/>
                    <Tab label="Environment" value="2" icon={<History/>}/>
                </TabList>
                <TabPanel value='1' index={0}>
                    <HistoryComponent />
                </TabPanel>
                <TabPanel value='2' index={1}>
                    <EnvironmentComponent/>
                </TabPanel>
            </TabContext>
        </Paper>
    )
}