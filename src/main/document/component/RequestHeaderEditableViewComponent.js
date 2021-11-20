import React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import CodeEditorComponent from "../../../style/component/editor";
import MainDataGrid from "../../../style/component/datagrid";
import wrapperWithID from "../../../common/wrapperDocRows";
import CodeIcon from '@mui/icons-material/Code';
import TableViewIcon from '@mui/icons-material/TableView';
import {useTheme} from "@mui/material";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Tabs from "@mui/material/Tabs";

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 0}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function RequestHeaderEditableViewComponent(props) {
    let theme = useTheme();
    const {doc} = props;
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Box sx={{width: '100%', height: '100%', padding: 0}}>
            <Grid container spacing={0} sx={{width: '100%', height: '100%', padding: 0}}>
                <Grid item xs={12} sm={11} sx={{width: '100%', height: '100%', padding: 0}} spacing={0}>
                    <TabPanel value={value} index={0} sx={{width: '100%', height: '100%', padding: 0}}>
                        <MainDataGrid rows={wrapperWithID(doc.requestHeaderDescriptor)}/>
                    </TabPanel>
                    <TabPanel value={value} index={1} sx={{width: '100%', height: '100%', padding: 0}}>
                        <EditableTextComponent/>
                    </TabPanel>
                </Grid>
                <Grid item xs={12} sm={1}>
                    <Tabs
                        orientation="vertical"
                        variant="fullWidth"
                        centered
                        value={value}
                        onChange={handleChange}
                        aria-label="Vertical tabs example"
                        sx={{
                            border: 'solid',
                            borderWidth: '0.5px',
                            borderLeftWidth: '0px',
                            height:'100%',
                            borderColor: `${theme.palette.divider}`,
                            backgroundColor: `${theme.palette.background.default}`
                        }}
                    >
                        <Tab icon={<TableViewIcon fontSize='medium'/>}   {...a11yProps(0)} />
                        <Tab icon={<CodeIcon fontSize='medium'/>} {...a11yProps(1)} />
                    </Tabs>
                </Grid>
            </Grid>
        </Box>
    )
}

function EditableTextComponent(props) {
    const [codeContent, setCodeContent] = React.useState("");
    return (
        <CodeEditorComponent
            tag="http header"
            codeContent={codeContent}
            setCodeContent={setCodeContent}
            language='http'
        />
    )
}