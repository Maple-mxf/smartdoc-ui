import Grid from "@material-ui/core/Grid";
import React from "react";
import NavTree from "./tree"
import ApiContent from "./apicontent";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Fab from "@material-ui/core/Fab";
import {PlayArrow} from "@material-ui/icons";

export default function Index() {
    const classes = useStyles()
    return (
        <BrowserRouter>
            <Grid container spacing={0}>
                <Grid container item xs={12} sm={3}>
                    <NavTree/>
                </Grid>
                <Grid container item xs={12} sm={8}>
                    <ApiContent />
                </Grid>
                <Grid container item xs={12} sm={1}>
                    <div className={classes.root}>
                        <Fab color="green" aria-label="Run The Document">
                            <PlayArrow />
                        </Fab>
                    </div>
                </Grid>
            </Grid>
        </BrowserRouter>
    )
}
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
}));
