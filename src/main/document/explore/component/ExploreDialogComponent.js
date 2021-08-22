import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {ExploreLeftComponent} from "./ExploreLeftComponent";
import {ExploreRightMainComponent} from "./ExploreRightMainComponent";
import {RightControllerButtonComponent} from "./RightControllerButtonComponent";
import React from "react";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const ExploreDialogComponent = (props) => {
    const {classes, open, handleClose} = props;
    return (
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Smart API Caller
                    </Typography>
                    <Button autoFocus color="inherit" onClick={handleClose}>
                        save
                    </Button>
                </Toolbar>
            </AppBar>
            <Grid container spacing={0}>
                <Grid container item xs={12} sm={2} className={classes.grid}>
                    <ExploreLeftComponent classes={classes}/>
                </Grid>
                <Grid container item xs={12} sm={8} className={classes.grid}>
                    <ExploreRightMainComponent classes={classes}/>
                </Grid>
                <Grid container item xs={12} sm={1} className={classes.grid}>
                    <RightControllerButtonComponent classes={classes}/>
                </Grid>
            </Grid>
        </Dialog>
    )
}