import Grid from "@material-ui/core/Grid";
import React, {useEffect} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import Paper from "@material-ui/core/Paper";
import deepPurple from "@material-ui/core/colors/deepPurple";
import deepOrange from "@material-ui/core/colors/deepOrange";
import Button from "@material-ui/core/Button";
import {Add, MoreVert} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {OPEN_NEW_PROJECT_FORM} from "./store/constants";
import {useDispatch, useSelector} from "react-redux";
import CreateProjectComponent from './create'
import {getProjectAction, getProjectList} from "./store/actionCreators";
import {  PROJECT_REDUCER_NAMESPACE} from "../../util/constants";
import {parseResponseMsg} from '../../util/http'
import {  useSnackbar } from 'notistack';
import Pagination from "@material-ui/lab/Pagination";
import {ErrorVariant} from "../../common/tip";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },

    listRoot :{
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
    },
    margin: {
        margin: theme.spacing(1),
    },
    button: {
        margin: theme.spacing(1),
    },
    pageableNumBtn: {
        '& > *': {
            marginTop: theme.spacing(2),
            width:'100%'
        },
    },
}));

const ProjectBar = ()=>{
    const classes = useStyles();
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

const ProjectListItem = (props) => {
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

export const FetchProjectList = (page,size,dispatch,handleVariant) => {
    getProjectList(page,size)
        .then(
            (res) =>{
                let {succ,errorMsg,data} = parseResponseMsg(res)
                if (!succ){
                    handleVariant(errorMsg,ErrorVariant)
                }else{
                    dispatch(getProjectAction(data.content,data.pageable.pageNumber+1,
                        data.pageable.pageSize,data.totalElements))
                }
            },
            (err) => {
                console.info("error ",err)
                handleVariant(JSON.stringify(err),ErrorVariant)
            }
        )
}

const ProjectContent = (props)=> {
    const {classes} = props
    const dispatch = useDispatch();

    const { enqueueSnackbar } = useSnackbar();
    const handleVariant = (msg,variant)  => {
        enqueueSnackbar(msg, { variant });
    };

    const {projects,count,size,page} = useSelector(state => state[PROJECT_REDUCER_NAMESPACE]);

    useEffect(() => {
        FetchProjectList(page,size,dispatch,handleVariant)
        return () => {
        }
    }, [])

    const changePage = (event,currentPage) => {
        FetchProjectList(currentPage,size,dispatch,handleVariant)
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={6} sm={2} />
            <Grid item xs={6} sm={8}>
                <Paper className={classes.paper}>
                    <List className={classes.listRoot}>
                        {
                            projects.map((item,index) =>
                                (<ProjectListItem key={item.id}
                                                  classes = {classes}
                                                  projectItem={item}/>))
                        }
                    </List>
                </Paper>
                <div className={classes.pageableNumBtn}>
                    <Pagination count={ Math.ceil(count/size) }
                                size="large"
                                page={page}
                                onChange={changePage}
                                showFirstButton showLastButton />
                </div>
            </Grid>
            <Grid item xs={6} sm={2} />
        </Grid>
    )
}

export default function Project(){
    const classes = useStyles();
    return (
        <div className={classes.root}>
               <ProjectBar />
               <ProjectContent  classes={classes} />
               <CreateProjectComponent />
        </div>
    )
}