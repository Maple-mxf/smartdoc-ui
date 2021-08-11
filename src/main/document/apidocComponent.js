import Grid from "@material-ui/core/Grid";
import React from "react";
import Typography from "@material-ui/core/Typography";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import {darcula} from "react-syntax-highlighter/dist/cjs/styles/prism";
import { DataGrid } from '@material-ui/data-grid';
import RequestBodyTable from "./snippet/body";
import ResponseHeaderTable from "./snippet/responseHeader";
import ResponseBodyTable from "./snippet/responseBody";
import {HeaderSchema, mapArrayKey} from "./tableSchema";


export const ApiDocComponent = (props)=>{
    // 渲染页面
    const {doc,classes} = props

    return (
        <Grid container spacing={3}>
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

                {(doc.requestHeaderDescriptor=== undefined || doc.requestHeaderDescriptor.length===0 ) ?  null :
                    <DataGrid rows={ mapArrayKey(doc.requestHeaderDescriptor) } columns={HeaderSchema} />
                }

                {(doc.requestBodyDescriptor=== undefined || doc.requestBodyDescriptor.length===0 ) ?  null :
                    <RequestBodyTable rows={doc.requestBodyDescriptor}
                                        classes={classes}
                    />}

                {(doc.responseHeaderDescriptors === undefined || doc.responseHeaderDescriptors.length===0 ) ?  null :
                    <ResponseHeaderTable rows={doc.responseHeaderDescriptors}
                                      classes={classes}
                    />}

                {(doc.responseBodyDescriptors === undefined || doc.responseBodyDescriptors.length===0 ) ?  null :
                    <ResponseBodyTable rows={doc.responseBodyDescriptors}
                                         classes={classes}
                    />}

            </Grid>

        </Grid>
    )
}