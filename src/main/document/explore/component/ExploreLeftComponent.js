import React from "react";
import Paper from "@material-ui/core/Paper";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import Tab from "@material-ui/core/Tab";
import HistoryIcon from "@material-ui/icons/History";
import EcoIcon from "@material-ui/icons/Eco";
import TabPanel from "@material-ui/lab/TabPanel";
import {HistoryComponent} from "./HistoryComponent";
import {EnvironmentComponent} from "./EnvironmentComponent";

export const ExploreLeftComponent = (props)=>{
    const {classes,} = props;
    const [tabValue, setTabValue] = React.useState('1');
    const handleTagChange = (event, newValue) => {
        setTabValue(newValue);
    };
    return (
        <Paper elevation={4} style={{height: '85vh', width: '100%'}} className={classes.paper}>
            <TabContext value={tabValue}>
                <TabList aria-label="simple tabs example" onChange={handleTagChange}>
                    <Tab label="History" value="1" icon={<HistoryIcon/>}/>
                    <Tab label="Environment" value="2" icon={<EcoIcon/>}/>
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