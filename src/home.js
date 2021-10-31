import React from 'react';
import clsx from 'clsx';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {useDispatch, useSelector} from "react-redux";
import {Dehaze} from "@material-ui/icons";
import {Switch, Route, NavLink, Link} from 'react-router-dom'
import {GLOBAL_REDUCER_NAMESPACE} from './util/constants'
import {SnackbarProvider} from "notistack";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },

    itemsRoot: {
        '&$selected': {
            backgroundColor: 'white',
            '&:hover': {
                backgroundColor: 'orange',
            }
        },
    },

    selected: {
        backgroundColor: "red",
    },

    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },

    menu: {
        textDecoration: 'none',
        color: '#424242'
    }
}));

export default function HomeComponent() {
    const classes = useStyles();


    const theme = useTheme();
    const [open, setOpen] = React.useState(true);

    const routeList = useSelector(state => state[GLOBAL_REDUCER_NAMESPACE].routeList);
    const dispatch = useDispatch();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <SnackbarProvider maxSnack={5}>
            <div className={classes.root}>
                <CssBaseline/>
                <AppBar
                    position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, open && classes.hide)}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" noWrap>

                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={open}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={handleDrawerClose}>
                            <Dehaze/>
                        </IconButton>
                    </div>
                    <Divider/>
                    <List>
                        {routeList.map((groups, index) => {
                            return (
                                <div key={index}>
                                    {
                                        groups.map((item, index) => (
                                            <NavLink to={item.path}
                                                     key={index}
                                                     exact={item.exact}
                                                     style={{textDecoration: 'none', color: '#424242'}}
                                            >
                                                <ListItem button
                                                          key={item.title}
                                                          selected={true}
                                                          classes={{
                                                              root: classes.itemsRoot,
                                                              selected: classes.selected
                                                          }}

                                                >
                                                    <ListItemIcon>
                                                        <div>{item.iconComponent()}</div>
                                                    </ListItemIcon>
                                                    <ListItemText primary={item.title}/>
                                                </ListItem>
                                            </NavLink>
                                        ))
                                    }
                                    {index === (routeList.length - 1) ? null : <Divider/>}
                                </div>
                            )
                        })}
                    </List>
                </Drawer>
                <main
                    className={clsx(classes.content, {
                        [classes.contentShift]: open,
                    })}
                >
                    <div className={classes.drawerHeader}/>
                    <div>
                        <Switch>
                            {
                                routeList.length ? routeList.map((groups, index) => {
                                    return groups.map((item, i) => (
                                        <Route key={i + index} path={item.path} exact={item.exact}
                                               component={item.mainComponent}/>
                                    ))
                                }) : null
                            }
                        </Switch>
                    </div>
                </main>
            </div>
        </SnackbarProvider>
    );
}
