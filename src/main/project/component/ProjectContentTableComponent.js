import {useDispatch, useSelector} from "react-redux";
import {useSnackbar} from "notistack";
import {PROJECT_REDUCER_NAMESPACE} from "../../../util/constants";
import React, {useEffect} from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import {ProjectListComponent} from "./ListProjectComponent";
import Pagination from "@material-ui/lab/Pagination";
import {FetchProjectList} from "../index";

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