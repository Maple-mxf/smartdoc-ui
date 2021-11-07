import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import {MoreVert} from "@mui/icons-material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import {useTheme} from "@mui/material";


export const ProjectListComponent = (props) => {
    const {classes, projectItem} = props;

    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    let theme = useTheme();

    let homeChar = projectItem.name.substr(0, 1).toUpperCase()
    return (
        <div>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar sx={{bgcolor: theme.palette.primary.dark}}>{homeChar}</Avatar>
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
                    <MoreVert/>
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
            <Divider variant="inset" component="li"/>
        </div>
    )

}