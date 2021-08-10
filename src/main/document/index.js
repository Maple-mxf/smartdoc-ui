import Grid from "@material-ui/core/Grid";
import React from "react";
import NavTree from "./tree"
import ApiContent from "./apicontent";
import {BrowserRouter, Route, Switch} from "react-router-dom";

export default function Index() {
    return (
        <BrowserRouter>
            <Grid container spacing={0}>
                <Grid container item xs={12} sm={2}>
                    <NavTree/>
                </Grid>
                <Grid container item xs={12} sm={8}>
                    <ApiContent />
                </Grid>
                <Grid container item xs={12} sm={2}>
                </Grid>
            </Grid>
        </BrowserRouter>
    )
}