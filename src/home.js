import * as React from 'react';
import {styled, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MuiAppBar from '@mui/material/AppBar';
import {ListItemButton} from "@mui/material";
import {useSelector} from "react-redux";
import {GLOBAL_REDUCER_NAMESPACE} from "./util/constants";
import {NavLink, Route, Switch, useLocation} from "react-router-dom";
import {getRouteItemByPath} from "./route";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const drawerWidth = 250;

const StyleListItemLabComponent = styled(ListItemButton)(({theme}) => ({
    "&.Mui-selected": {
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.action.selected,
        borderLeftStyle: 'solid',
        borderWidth: '5px',
    },
    "&:hover": {
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.action.hover,
        transform: `scale(1.01)`
    },

}));

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(9)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({theme, open}) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: theme.palette.background.paper,
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));


const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function HomeComponent() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const routeList = useSelector(state => state[GLOBAL_REDUCER_NAMESPACE].routeList);
    let location = useLocation();
    let routeItem = getRouteItemByPath(location.pathname);
    const initLabId = (routeItem === undefined || routeItem === null) ? "" : routeItem.id;
    const [selectedLab, setSelectedLab] = React.useState(initLabId);
    const handleListItemClick = (event, index) => {
        setSelectedLab(index);
    };

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: '36px',
                            ...(open && {display: 'none'}),
                        }}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Mini variant drawer
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                    </IconButton>
                </DrawerHeader>
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
                                                 strict={false}
                                                 style={{textDecoration: 'none', color: '#424242'}}
                                        >
                                            <StyleListItemLabComponent
                                                selected={selectedLab === item.id}
                                                onClick={(event) => handleListItemClick(event, item.id)}
                                            >
                                                <ListItemIcon>
                                                    {selectedLab === item.id ? item.filledIcon(theme) : item.outlinedIcon()}
                                                </ListItemIcon>
                                                <ListItemText primary={item.title}/>
                                            </StyleListItemLabComponent>
                                        </NavLink>
                                    ))
                                }
                                {index === (routeList.length - 1) ? null : <Divider/>}
                            </div>
                        )
                    })}
                </List>
            </Drawer>
            <Box component="main" sx={{flexGrow: 1, p: 3}}>
                <DrawerHeader/>
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
            </Box>
        </Box>
    );
}
