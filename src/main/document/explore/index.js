import IconButton from "@material-ui/core/IconButton";
import {PlayArrow} from "@material-ui/icons";
import green from "@material-ui/core/colors/green";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";

// Code Editor plugin
import AceEditor from "react-ace";
import 'ace-builds/src-noconflict/mode-json'
import 'ace-builds/src-noconflict/mode-xml'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/ext-language_tools'
import 'ace-builds/src-noconflict/ext-beautify'
import "ace-builds/src-noconflict/worker-json";
import {ExploreDialogComponent} from "./component/ExploreDialogComponent";

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
        marginLeft: '3vh'
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

export const ExploreComponent = (props) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    return (
        <div className={classes.root}>
            <ExploreDialogComponent open={open} classes={classes} handleClose={() => {
                setOpen(false)
            }}/>
            <IconButton color="primary" aria-label="upload picture" component="span" onClick={() => setOpen(true)}>
                <PlayArrow style={{color: green[500]}}/>
            </IconButton>
        </div>
    )
}



