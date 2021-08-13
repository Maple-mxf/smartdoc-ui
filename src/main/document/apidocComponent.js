import Grid from "@material-ui/core/Grid";
import React from "react";
import Typography from "@material-ui/core/Typography";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import {darcula} from "react-syntax-highlighter/dist/cjs/styles/prism";
import BasicEditingGrid from "./sample";


export const ApiDocComponent = (props)=>{
    // 渲染页面
    const {doc,classes} = props

    return (
        /*<Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                    Request Example
                </Typography>

                <SyntaxHighlighter language="http" style={darcula} showLineNumbers={true} wrapLongLines={true}>
                    {doc.requestFakeCodeSample === undefined ? "": doc.requestFakeCodeSample}
                </SyntaxHighlighter>

                <br/>

                <Typography variant="subtitle1" gutterBottom>
                    Response Example
                </Typography>

                <SyntaxHighlighter language="http" style={darcula} showLineNumbers={true} wrapLongLines={true}>
                    {doc.responseFakeCodeSample === undefined ? "":doc.responseFakeCodeSample}
                </SyntaxHighlighter>



            </Grid>

        </Grid>*/
        <div>
            <BasicEditingGrid />
        </div>
    )
}