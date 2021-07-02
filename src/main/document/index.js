import Grid from "@material-ui/core/Grid";
import React from "react";

export default function Index(){
    return (
        <Grid container spacing={1}>
            <Grid container item xs={12} spacing={3}>
                <FormRow />
            </Grid>
            <Grid container item xs={12} spacing={3}>
                <FormRow />
            </Grid>
            <Grid container item xs={12} spacing={3}>
                <FormRow />
            </Grid>
        </Grid>
        )
}