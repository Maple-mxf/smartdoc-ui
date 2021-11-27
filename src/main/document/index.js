import React from "react";
import ApiNavTreeComponent from "./tree"
import ApiContentComponent from "./component/ApiContentComponent";
import {BrowserRouter} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getNavTreeAction, getNavTreeNodeList} from "./tree/store/actionCreators";
import {parseResponseMsg} from "../../util/http";
import Grid from "@mui/material/Grid";
import {NAV_TREE_REDUCER_NAMESPACE} from "../../util/constants";


const FetchNodeList = (projectId, dispatch) => {
    getNavTreeNodeList(projectId)
        .then(
            res => {
                let {succ, errorMsg, data} = parseResponseMsg(res)
                dispatch(getNavTreeAction(data))
            },
            err => {
                // TODO 错误提示函数
                console.info(err)
            }
        )
}
export default function Index() {

    let dispatch = useDispatch();
    const {nodes} = useSelector(state => state[NAV_TREE_REDUCER_NAMESPACE]);
    if (nodes === undefined || nodes.length === 0) {
        FetchNodeList("802736426121695232", dispatch);
    }

    return (
        <BrowserRouter>
            <Grid container spacing={0}>
                <Grid item xs={12} sm={3}>
                    <ApiNavTreeComponent/>
                </Grid>
                <Grid item xs={12} sm={9}>
                    <ApiContentComponent/>
                </Grid>
            </Grid>
        </BrowserRouter>
    )
}


