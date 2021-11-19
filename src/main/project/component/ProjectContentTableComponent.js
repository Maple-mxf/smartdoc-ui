import {useDispatch, useSelector} from "react-redux";
import {useSnackbar} from "notistack";
import {PROJECT_REDUCER_NAMESPACE} from "../../../util/constants";
import React, {useEffect} from "react";


import {ProjectListComponent} from "./ListProjectComponent";
import {FetchProjectList} from "../index";

import useTheme from "@mui/material/styles/useTheme";

import {MainPagination} from "../../../style/component/pagination";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";

export const ProjectContentTableComponent = (props) => {
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
                                (<ProjectListComponent key={item.id}
                                                       classes = {classes}
                                                       projectItem={item}/>))
                        }
                    </List>
                </Paper>
                <div className={classes.pageableNumBtn}>
                    <MainPagination count={ Math.ceil(count/size) }
                                size="large"
                                color='primary'
                                page={page}
                                onChange={changePage}
                                showFirstButton showLastButton />
                </div>
            </Grid>
            <Grid item xs={6} sm={2} />
        </Grid>
    )
}