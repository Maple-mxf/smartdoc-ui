import React from "react";
import ApiNavTreeComponent from "./tree"
import ApiContent from "./component/ApiContentComponent";
import {BrowserRouter} from "react-router-dom";
import Divider from "@mui/material/Divider";
import {useDispatch} from "react-redux";
import {getNavTreeAction, getNavTreeNodeList} from "./tree/store/actionCreators";
import {parseResponseMsg} from "../../util/http";
import Grid from "@mui/material/Grid";


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
    FetchNodeList("802736426121695232", dispatch)

    return (
        <BrowserRouter>
            <Grid container spacing={0}>
                <Grid item xs={12} sm={3}>
                    <ApiNavTreeComponent/>
                </Grid>
                <Divider orientation="vertical" flexItem light variant='fullWidth'/>
                <Grid item xs={12} sm={8}>
                    <ApiContent/>
                </Grid>
                {/* <Grid item xs={1} sm={1}>
                        <ExploreComponent/>
                    </Grid>*/}
            </Grid>
        </BrowserRouter>
    )
}


