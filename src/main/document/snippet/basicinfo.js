import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';

const useStyles = makeStyles({
    root: {
        width: '100%',
        // maxWidth: 500,
    },
});

export default function BasicInfo(props){
    const  classes = useStyles()
    const {title,url} = props
    return (
        <div className={classes.root}>
            <div>
                <Typography variant="h4"   gutterBottom>
                    {title}
                </Typography>
            </div>
            <div>
                <SyntaxHighlighter language="http" style={darcula}>
                    HTTP1.1 GET /api/user/batch
                </SyntaxHighlighter>
            </div>
        </div>
    )
}