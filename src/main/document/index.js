import Grid from "@material-ui/core/Grid";
import React from "react";
import ApiNavTreeComponent from "./tree"
import ApiContent from "./component/ApiContentComponent";
import {BrowserRouter} from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Divider from "@mui/material/Divider";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
}));

export default function Index(props) {

    const classes = useStyles();

    return (
        <BrowserRouter>
            <div className={classes.root}>
                <Grid container spacing={0}>
                    <Grid item xs={12} sm={3}>
                        <ApiNavTreeComponent/>
                    </Grid>
                    <Divider orientation="vertical" flexItem light variant='fullWidth'/>
                    <Grid item xs={12} sm={8}>
                        <Paper style={{width: '130vh',}}
                               elevation={4}>
                            <ApiContent/>
                        </Paper>
                    </Grid>
                    {/* <Grid item xs={1} sm={1}>
                        <ExploreComponent/>
                    </Grid>*/}
                </Grid>
            </div>
        </BrowserRouter>
    )
}


