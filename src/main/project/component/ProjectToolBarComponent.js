import {useDispatch} from "react-redux";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {Add} from "@material-ui/icons";
import {OPEN_NEW_PROJECT_FORM} from "../store/constants";
import React from "react";

export const ProjectToolBarComponent = (props)=>{
    const {classes} =props;
    const dispatch = useDispatch();
    return (
        <Grid container spacing={3}>
            <Grid item xs={6} sm={2} />
            <Grid item xs={6} sm={8} >
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    endIcon={<Add />}
                    onClick={()=> dispatch({
                        type:OPEN_NEW_PROJECT_FORM,
                        openNewProjectForm:true
                    })}
                >
                    Create
                </Button>
            </Grid>
            <Grid item xs={6} sm={2} />
        </Grid>
    )
}