import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

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

export default function BaseInfoComponent(props){
    const  classes = useStyles()
    const {doc, } = props;
    return (
        <div className={classes.root}>
            <Typography variant="h4"   gutterBottom>
                {doc.name}
            </Typography>
        </div>
    )
}