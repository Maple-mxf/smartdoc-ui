import React from "react";
import BasicInfo from "./snippet/basicinfo";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import RequestTable from "./snippet/body";

const useStyles = makeStyles((theme)=>(
    {
        root: {
            width: '100%',
            // maxWidth: 500,
            margin: theme.spacing(2),
        },
        grid:{
            flexGrow: 1,
        }
    }
));
export default function ApiContent(){
   const classes = useStyles()
    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={10}>
                    <BasicInfo title="API Document Title" url="/api/user"/>
                </Grid>
                <Grid item xs={10}>
                    <RequestTable />
                </Grid>
            </Grid>
        </div>
    )
}