import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import {MoreVert} from "@material-ui/icons";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";

export const ProjectListComponent = (props) => {
    const {classes, projectItem} = props;

    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    let homeChar = projectItem.name.substr(0, 1).toUpperCase()
    return (
        <div>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar className={classes.orange}>{homeChar}</Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={projectItem.name}
                    secondary={
                        <React.Fragment>
                            <Typography
                                component="span"
                                variant="body2"
                                className={classes.inline}
                                color="textPrimary"
                            >
                                {projectItem.desc}
                            </Typography>

                        </React.Fragment>
                    }
                />
                <IconButton aria-label="delete" color="primary" onClick={handleClick}>
                    <MoreVert />
                </IconButton>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose}>Detail</MenuItem>
                    <MenuItem onClick={handleClose}>Delete</MenuItem>
                </Menu>
            </ListItem>
            <Divider variant="inset" component="li" />
        </div>
    )

}