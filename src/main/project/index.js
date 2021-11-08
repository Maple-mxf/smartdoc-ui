import React, {useEffect} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import deepPurple from "@material-ui/core/colors/deepPurple";
import deepOrange from "@material-ui/core/colors/deepOrange";
import {getProjectAction, getProjectList} from "./store/actionCreators";
import {parseResponseMsg} from '../../util/http'
import {ErrorVariant} from "../../common/tip";
import {CreateProjectComponent} from "./component/CreateProjectComponent";
import {ProjectToolBarComponent} from "./component/ProjectToolBarComponent";
import {ProjectContentTableComponent} from "./component/ProjectContentTableComponent";
import {useDispatch} from "react-redux";
import {getSwitchLeftMenuAction} from "../../store/actionCreators";
import {node} from "prop-types";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },

    listRoot: {
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
            width: '100%'
        },
    },
}));

export const FetchProjectList = (page, size, dispatch, handleVariant) => {
    getProjectList(page, size)
        .then(
            (res) => {
                let {succ, errorMsg, data} = parseResponseMsg(res)
                if (!succ) {
                    handleVariant(errorMsg, ErrorVariant)
                } else {
                    dispatch(getProjectAction(data.content, data.pageable.pageNumber + 1,
                        data.pageable.pageSize, data.totalElements))
                }
            },
            (err) => {
                console.info("error ", err)
                handleVariant(JSON.stringify(err), ErrorVariant)
            }
        )
}

export default function Project(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <ProjectToolBarComponent classes={classes}/>
            <ProjectContentTableComponent classes={classes}/>
            <CreateProjectComponent classes={classes}/>
        </div>
    )
}