import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => (
    {
        root: {
            width: '100%',
        },
        button: {
            margin: theme.spacing(1),
        },
    }
));

export default function BasicInfo(props){
    const  classes = useStyles()
    const {doc, } = props;
    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={8}>
                    <Typography variant="h4"   gutterBottom>
                        {doc.name}
                    </Typography>
                </Grid>
            </Grid>
        </div>
    )
}