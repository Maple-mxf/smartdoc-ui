import ButtonGroup from "@material-ui/core/ButtonGroup";
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
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { render } from "react-dom";
import AceEditor from "react-ace";
import DeleteIcon from '@material-ui/icons/Delete';


import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";

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
        margin:theme.spacing(1)
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
    formDataTextField:{
        margin: theme.spacing(1),
    },
    margin:{
        margin: theme.spacing(1),
    }
}));

export const DocToolbar = (props)=> {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    return (
        <div className={classes.root}>
            <RunApiDocComponent open={open} classes={classes} handleClose={()=>{setOpen(false)}}/>
            <ButtonGroup color="secondary" aria-label="outlined secondary button group">
                <IconButton color="primary" aria-label="upload picture" component="span">
                    <PlayArrow style={{ color: green[500] }} onClick={()=>setOpen(true) }/>
                </IconButton>
            </ButtonGroup>
        </div>
    )
}
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const RunApiDocComponent = (props) => {
    const {classes,open,handleClose} = props;

    return (
        <RunApiComponent
            classes={classes}
            open={open}
            handleClose={handleClose}
        />
    )
}

const RunApiComponent = (props)=> {
    const {classes,open,handleClose} = props;
    return (
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon />
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
                    <RightComponent classes={classes} />
                </Grid>
            </Grid>
        </Dialog>
    )
}

const LeftComponent = (props) => {
    const {classes} = props;
    const [tabValue,setTabValue] =React.useState('1');
    const handleTagChange = (event, newValue) => {
        setTabValue(newValue);
    };
    return (
        <Paper elevation={4} style={{height:700,width:'100%'}} className={classes.paper}>
            <TabContext value={tabValue}>
                <TabList   aria-label="simple tabs example" onChange={handleTagChange}>
                    <Tab label="History"  value="1" icon={<HistoryIcon />} />
                    <Tab label="Environment" value="2" icon={<EcoIcon />} />
                </TabList>
                <TabPanel value='1' index={0}>
                </TabPanel>
                <TabPanel value='2' index={1}>
                </TabPanel>
            </TabContext>
        </Paper>
    )
}

const RightComponent = (props) => {
    const {classes} = props;

    const [method, setMethod] = React.useState('GET');
    const [open, setOpen] = React.useState(false);
    const [formDataTextFieldNum, setFormDataTextFieldNum] = React.useState(1)

    const handleChange = (event) => setMethod(event.target.value);;
    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);

    const [tabValue,setTabValue] =React.useState('1');
    const handleTagChange = (event, newValue) => setTabValue(newValue);
    const increFormDataTextFieldNum = (props)=> {
        console.info("props",props)
        setFormDataTextFieldNum(formDataTextFieldNum+1);
    }

    const formDataTextFields = []
    const createFormDataTextFields = (num) => {
        for (let i = 0; i < num; i++) {
            formDataTextFields.push(
                <div>
                    <TextField id="key-basic"
                               label="Key"
                               autoFocus
                               color="primary"
                               style={{width:'20%'}}
                               margin="dense"
                               className={classes.formDataTextField}

                               placeholder="Key"
                    />
                    <TextField id="Value-basic"
                               label="Value"
                               autoFocus
                               color="primary"
                               style={{width:'30%'}}
                               onClick={i===(num-1) ? increFormDataTextFieldNum:null}
                               className={classes.formDataTextField}
                               margin="dense"
                               placeholder="Value"
                    />
                    {
                        (i === 0) ? null:
                            <IconButton aria-label="delete" className={classes.margin} color='secondary'>
                            <DeleteIcon fontSize="medium" />
                        </IconButton>
                    }
                </div>
            )
        }

    }
    createFormDataTextFields(formDataTextFieldNum)

    return (
        <Paper elevation={4} style={{height:700,width:'100%'}} className={classes.paper}>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField id="standard-basic"
                           label="request URL"
                           autoFocus
                           color="primary"
                           style={{width:'80%'}}
                           margin="dense"
                           placeholder="Enter request URL here"
                />
                {/*<FormControl className={classes.formControl}>*/}
                {/*    <InputLabel id="method-label">method</InputLabel>*/}
                {/*    <Select*/}
                {/*        labelId="method-controlled-open-select-label"*/}
                {/*        id="method-controlled-open-select"*/}
                {/*        open={open}*/}
                {/*        onClose={handleClose}*/}
                {/*        onOpen={handleOpen}*/}
                {/*        onChange={handleChange}*/}
                {/*    >*/}

                {/*        <MenuItem value="GET">GET</MenuItem>*/}
                {/*        <MenuItem value="POST">POST</MenuItem>*/}
                {/*    </Select>*/}
                {/*</FormControl>*/}

                <div>
                    <TabContext value={tabValue}>
                        <TabList aria-label="simple tabs example" onChange={handleTagChange}>
                            <Tab label="Form-Data"  value="1"  />
                            <Tab label="x-www-form-urlencoded" value="2"  />
                            <Tab label="raw" value="3"   />
                        </TabList>
                        <TabPanel value='1' index={0}>
                            <div>
                                {formDataTextFields.map((item,index)=>{
                                    return (
                                        <div key={index}>{item}</div>
                                    )
                                })}
                            </div>
                        </TabPanel>
                        <TabPanel value='2' index={1}>
                        </TabPanel>
                        <TabPanel value='3' index={2}>
                            <AceEditor
                                placeholder="JSON code"
                                mode="json"
                                theme="terminal"
                                name="blah2"
                                onChange={(newValue)=>{}}
                                fontSize={14}
                                showPrintMargin={true}
                                showGutter={true}
                                highlightActiveLine={true}
                                setOptions={{
                                    enableBasicAutocompletion: true,
                                    enableLiveAutocompletion: true,
                                    enableSnippets: true,
                                    showLineNumbers: true,
                                    tabSize: 2,
                                }}/>
                        </TabPanel>
                    </TabContext>
                </div>
            </form>
        </Paper>
    )
}