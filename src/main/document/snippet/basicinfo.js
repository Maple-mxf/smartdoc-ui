import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Button from "@material-ui/core/Button";
import {Add, PlayArrow} from "@material-ui/icons";
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
const OperateBtns = (props) => {
    const {classes} = props;
    return (
        <div>
            <Button
                variant="contained"
                color="primary"
                title="create an document"
                className={classes.button}
                endIcon={<Add />}
            >
                New Document
            </Button>

            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                endIcon={<PlayArrow />}
            >
                API Explore
            </Button>
        </div>

    )
}

export default function BasicInfo(props){
    const  classes = useStyles()
    const {title,url} = props
    return (
        <div className={classes.root}>
            <div>
                <Grid container spacing={3}>
                    <Grid item xs={8}>
                        <Typography variant="h5"   gutterBottom>
                            {title}
                        </Typography>
                    </Grid>
                   {/* <Grid item xs={4} >
                        <OperateBtns classes={classes} />
                    </Grid>*/}
                </Grid>

            </div>
            <div>
                <SyntaxHighlighter language="http" style={darcula} showLineNumbers={true} wrapLongLines={true}>
                    HTTP1.1 GET /api/user/batch
                </SyntaxHighlighter>
            </div>
        </div>
    )
}