import Grid from "@material-ui/core/Grid";
import React from "react";
import NavTree from "./tree"
import ApiContent from "./apicontent";

export default function Index(){
    return (
        <Grid container spacing={0}>
            <Grid container item xs={12} sm={2}>
                <NavTree />
            </Grid>
            <Grid container item xs={12} sm={8}>
                <ApiContent />
            </Grid>
            <Grid container item xs={12} sm={2}>
            </Grid>
        </Grid>
        )
}