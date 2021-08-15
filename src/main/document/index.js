import Grid from "@material-ui/core/Grid";
import React from "react";
import NavTree from "./tree"
import ApiContent from "./apicontent";
import {BrowserRouter } from "react-router-dom";
import {DocToolbar} from "./doctoolbar";

export default function Index() {
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
                    <DocToolbar />
                </Grid>
            </Grid>
        </BrowserRouter>
    )
}


