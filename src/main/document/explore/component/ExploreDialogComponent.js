import {ExploreLeftComponent} from "./ExploreLeftComponent";
import {ExploreRightMainComponent} from "./ExploreRightMainComponent";
import {RightControllerButtonComponent} from "./RightControllerButtonComponent";
import React from "react";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import {Close} from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const ExploreDialogComponent = (props) => {
    const { open, handleClose} = props;
    return (
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
            <AppBar>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <Close/>
                    </IconButton>
                    <Typography variant="h6">
                        Smart API Caller
                    </Typography>
                    <Button autoFocus color="inherit" onClick={handleClose}>
                        save
                    </Button>
                </Toolbar>
            </AppBar>
            <Grid container spacing={0}>
                <Grid container item xs={12} sm={2}>
                    <ExploreLeftComponent/>
                </Grid>
                <Grid container item xs={12} sm={7} >
                    <ExploreRightMainComponent />
                </Grid>
                <Grid container item xs={12} sm={1}>
                    <RightControllerButtonComponent />
                </Grid>
            </Grid>
        </Dialog>
    )
}