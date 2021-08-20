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
import Icon from '@material-ui/core/Icon';
import ClearIcon from '@material-ui/icons/Clear';

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
import Badge from "@material-ui/core/Badge";

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
        marginLeft:'3vh'
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
    button: {
        margin: theme.spacing(1),
    },
}));

export const DocToolbar = (props) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    return (
        <div className={classes.root}>
            <RunApiComponent open={open} classes={classes} handleClose={() => {
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

const RunApiComponent = (props) => {
    const {classes, open, handleClose} = props;
    const [url,setUrl] = React.useState('');
    return (
        <Dialog  fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
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
            <Grid container spacing={0}  >
                <Grid container item xs={12} sm={2} className={classes.grid}>
                    <LeftComponent classes={classes} />
                </Grid>
                <Grid container item xs={12} sm={8} className={classes.grid}>
                    <RightComponent classes={classes} url={url} setUrl={setUrl} />
                </Grid>
                <Grid container item xs={12} sm={1} className={classes.grid}>
                    <ExtensionComponent classes={classes} />
                </Grid>
            </Grid>
        </Dialog>
    )
}

const LeftComponent = (props) => {
    const {classes, } = props;
    const [tabValue, setTabValue] = React.useState('1');
    const handleTagChange = (event, newValue) => {
        setTabValue(newValue);
    };
    return (
        <Paper elevation={4} style={{ height:'85vh', width: '100%'}} className={classes.paper}>
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
    const {classes,url,setUrl} = props;
    const onUrlChange = (value)=> setUrl(value)
    return (
        <Paper elevation={4} style={{ height:'85vh',width: '100%',overflow:'auto'}} className={classes.paper}>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField id="standard-basic"
                           label="request URL"
                           autoFocus
                           size='small'
                           color="primary"
                           onChange={onUrlChange}
                           style={{width: '80%'}}
                           margin="dense"
                           placeholder="Enter request URL here"
                />
                <BtnTabComponent classes={classes}/>
                <div>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        endIcon={<Icon>send</Icon>}
                        disabled={url.length === 0  }
                    >
                        Send
                    </Button>

                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        endIcon={<ClearIcon />}
                    >
                        Clear
                    </Button>
                </div>
            </form>
        </Paper>
    )
}

const ExtensionComponent = (props) => {
    const {classes} = props;
    return (
        <Paper elevation={4} style={{height:'85vh',width: '100%',overflow:'auto', textAlign:'center'}}  className={classes.paper}>
            <Button size="medium"  variant="outlined" className={classes.margin} color="primary" style={{marginTop:'10vh'}}>
                Header VAR
            </Button>

            <Button size="medium"  variant="outlined" className={classes.margin} color="primary" style={{marginTop:'1vh'}}>
                URL Param
            </Button>

            <Badge color="secondary" overlap="circular" badgeContent=" " variant="dot">
                <Button size="medium"  variant="outlined" className={classes.margin} color="primary" style={{marginTop:'1vh'}}>
                    Matrix Var
                </Button>
            </Badge>
        </Paper>
    )
}