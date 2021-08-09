import React from "react";
import BasicInfo from "./snippet/basicinfo";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import RequestTable from "./snippet/body";
import Button from "@material-ui/core/Button";
import {Add, PlayArrow} from "@material-ui/icons";

const useStyles = makeStyles((theme)=>(
    {
        root: {
            width: '100%',
            // maxWidth: 500,
            margin: theme.spacing(2),
        },
        grid:{
            flexGrow: 1,
        },
        button: {
            margin: theme.spacing(1),
        },
    }
));
export default function ApiContent(){
   const classes = useStyles()
    return (
        <div className={classes.root}>
            <Grid container spacing={3}>

                <Grid item xs={12}>
                    <BasicInfo title="API Document Title" url="/api/user"/>
                </Grid>
                <Grid item xs={12}>
                    <RequestTable />
                </Grid>
            </Grid>
        </div>
    )
}