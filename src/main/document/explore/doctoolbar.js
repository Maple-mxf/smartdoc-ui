import IconButton from "@material-ui/core/IconButton";
import {PlayArrow} from "@material-ui/icons";
import green from "@material-ui/core/colors/green";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import HistoryIcon from '@material-ui/icons/History';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import Tab from "@material-ui/core/Tab";
import EcoIcon from '@material-ui/icons/Eco';
import TabPanel from "@material-ui/lab/TabPanel";
import TextField from "@material-ui/core/TextField";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import List from "@material-ui/core/List";

// Code Editor plugin
import AceEditor from "react-ace";
import 'ace-builds/src-noconflict/mode-json'
import 'ace-builds/src-noconflict/mode-xml'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/ext-language_tools'
import 'ace-builds/src-noconflict/ext-beautify'
import "ace-builds/src-noconflict/worker-json";
import {EmptyTipComponent} from "../../../common/commonComponent";
import {BtnTabComponent} from "./btnTab";


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    grid: {
        margin: theme.spacing(1)
    },
    form: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    formDataTextField: {
        margin: theme.spacing(1),
    },
    margin: {
        margin: theme.spacing(1),
    },
    subheader: {
        backgroundColor: theme.palette.background.paper,
    },
    list: {
        marginBottom: theme.spacing(2),
    },
    paper: {
        paddingBottom: 50,
    },
}));

export const DocToolbar = (props) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    return (
        <div className={classes.root}>
            <RunApiDocComponent open={open} classes={classes} handleClose={() => {
                setOpen(false)
            }}/>
            <IconButton color="primary" aria-label="upload picture" component="span" onClick={() => setOpen(true)}>
                <PlayArrow style={{color: green[500]}} />
            </IconButton>
        </div>
    )
}
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const RunApiDocComponent = (props) => {
    const {classes, open, handleClose} = props;

    return (
        <RunApiComponent
            classes={classes}
            open={open}
            handleClose={handleClose}
        />
    )
}

const RunApiComponent = (props) => {
    const {classes, open, handleClose} = props;
    return (
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Smart API Caller
                    </Typography>
                    <Button autoFocus color="inherit" onClick={handleClose}>
                        save
                    </Button>
                </Toolbar>
            </AppBar>
            <Grid container spacing={0}>
                <Grid container item xs={12} sm={2} className={classes.grid}>
                    <LeftComponent classes={classes}/>
                </Grid>
                <Grid container item xs={12} sm={9} className={classes.grid}>
                    <RightComponent classes={classes}/>
                </Grid>
            </Grid>
        </Dialog>
    )
}

const LeftComponent = (props) => {
    const {classes} = props;
    const [tabValue, setTabValue] = React.useState('1');
    const handleTagChange = (event, newValue) => {
        setTabValue(newValue);
    };
    return (
        <Paper elevation={4} style={{height: '90vh', width: '100%'}} className={classes.paper}>
            <TabContext value={tabValue}>
                <TabList aria-label="simple tabs example" onChange={handleTagChange}>
                    <Tab label="History" value="1" icon={<HistoryIcon/>}/>
                    <Tab label="Environment" value="2" icon={<EcoIcon/>}/>
                </TabList>
                <TabPanel value='1' index={0}>
                    <EmptyTipComponent />
                </TabPanel>
                <TabPanel value='2' index={1}>
                    <EmptyTipComponent />
                </TabPanel>
            </TabContext>
        </Paper>
    )
}

const RightComponent = (props) => {
    const {classes} = props;

    return (
        <Paper elevation={4} style={{height: '90vh', width: '100%',overflow:'auto'}} className={classes.paper}>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField id="standard-basic"
                           label="request URL"
                           autoFocus
                           color="primary"
                           style={{width: '80%'}}
                           margin="dense"
                           placeholder="Enter request URL here"
                />


                <div>
                   {/* <TabContext value={tabValue}>
                        <TabList aria-label="simple tabs example" onChange={handleTagChange}>
                            <Tab label="form-Data" value="1"/>
                            <Tab label="x-www-form-urlencoded" value="2"/>
                            <Tab label="raw" value="3"/>
                        </TabList>
                        <TabPanel value='1' index={0}>
                            <FormDataParamBlock classes={classes}/>
                        </TabPanel>
                        <TabPanel value='2' index={1}>
                            <FormDataParamBlock classes={classes}/>
                        </TabPanel>
                        <TabPanel value='3' index={2}>
                            <CodeParamBlock classes={classes}/>
                        </TabPanel>
                    </TabContext>*/}

                    <BtnTabComponent classes={classes}/>
                </div>
            </form>
        </Paper>
    )
}