import React, {useEffect} from "react";
import BaseInfoComponent from "../snippet/baseInfoComponent";
import {useDispatch, useSelector} from "react-redux";
import {DOC_REDUCER_NAMESPACE, NAV_TREE_REDUCER_NAMESPACE} from "../../../util/constants";
import {Route, Switch} from "react-router-dom";
import {parseResponseMsg} from "../../../util/http";
import {getDocAction, getDocById} from "../store/actionCreators";
import NotFoundComponent from "../../../404";
import {Box, useTheme} from "@mui/material";
import Grid from "@mui/material/Grid";
import ApiDocumentToobarListComponent from "./ApiDocumentToobarListComponent";


export const FetchDocById = (docId, dispatch) => {
    getDocById(docId)
        .then(
            res => {
                let {succ, errorMsg, data} = parseResponseMsg(res)
                dispatch(getDocAction(data))
            },
            err => {
                console.info(err)
            }
        )
}

const ContentComponent = (props) => {
    const {node} = props
    const dispatch = useDispatch()

    const theme = useTheme();

    // 请求数据
    useEffect(() => {
        FetchDocById(node.id, dispatch)
        return () => {
        }
    }, [])

    // 渲染页面
    const doc = useSelector(state => state[DOC_REDUCER_NAMESPACE].doc);

    return (
        <Box sx={{
            padding: theme.spacing(1)
        }}>
            <Grid container spacing={0}>
                <Grid item xs={12} sm={11}>
                    <BaseInfoComponent doc={doc}/>
                </Grid>
                <Grid item xs={12} sm={1}>
                    <ApiDocumentToobarListComponent doc={doc}/>
                </Grid>
            </Grid>
        </Box>
    )
}


export default function ApiContentComponent() {
    const {nodes} = useSelector(state => state[NAV_TREE_REDUCER_NAMESPACE]);
    return (
        <Switch>
            {
                mapToFlattenNodes(nodes)
                    .map((node, index) => {
                        let path = `/home/document/:id`
                        return (
                            <Route exact={true}
                                   key={node.id}
                                   render={() => {
                                       return <ContentComponent node={node}/>
                                   }}
                                   path={path}

                            />
                        )
                    })
            }
            <Route component={NotFoundComponent}/>
        </Switch>
    )
}

function doMapToFlattenNodes(node, routeNodes) {
    if (node.type === 'WIKI' || node.type === 'API') {
        routeNodes.push(node)
        return
    }
    for (let i = 0; i < node.children.length; i++) {
        doMapToFlattenNodes(node.children[i], routeNodes)
    }
}

function mapToFlattenNodes(nodes) {
    let routeNodes = [];
    for (let i = 0; i < nodes.length; i++) {
        doMapToFlattenNodes(nodes[i], routeNodes)
    }
    return routeNodes
}