import React, {useEffect} from "react";
import BaseInfoComponent from "./snippet/baseInfoComponent";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import {DOC_REDUCER_NAMESPACE, NAV_TREE_REDUCER_NAMESPACE} from "../../util/constants";
import {Route, Switch} from "react-router-dom";
import {parseResponseMsg} from "../../util/http";
import {getDocAction, getDocById} from "./store/actionCreators";
import {ApiDocComponent} from "./apidocComponent";

const useStyles = makeStyles((theme)=>(
    {
        root: {
            width: '100%',
            margin: theme.spacing(2),
        },
        grid:{
            flexGrow: 1,
        },
        button: {
            margin: theme.spacing(1),
        },
    }
));

export const FetchDocById = (docId,dispatch) => {
    getDocById(docId)
        .then(
            res => {
                let {succ,errorMsg,data} = parseResponseMsg(res)
                dispatch(getDocAction(data))
            },
            err => {
                console.info(err)
            }
        )
}

const ContentComponent = (props) =>{
    const {node,classes} = props
    const dispatch = useDispatch()

    // 请求数据
    useEffect(() => {
        FetchDocById(node.id,dispatch)
        return () => {
        }
    }, [])

    // 渲染页面
    const doc = useSelector(state => state[DOC_REDUCER_NAMESPACE].doc);

    return (
        <div>
            <BaseInfoComponent doc={doc}/>
            <ApiDocComponent doc={doc} classes={classes}/>
        </div>
    )
}

export default function ApiContent(){
   const classes = useStyles();
    const {nodes} = useSelector(state => state[NAV_TREE_REDUCER_NAMESPACE]);
    return (
        <div className={classes.root}>
            <Switch>
                {
                    mapToFlattenNodes(nodes)
                        .map((node,index) => {
                            let path=`/home/document/${node.id}`
                            return (
                                <Route exact={true}
                                       render={(props) => <ContentComponent node={node} classes={classes} {...props} /> }
                                       key={node.id}
                                       path={path} />
                            )
                        })
                }
            </Switch>
        </div>
    )
}

function doMapToFlattenNodes(node, routeNodes) {
    if (node.type === 'WIKI' || node.type === 'API') {
        routeNodes.push(node)
        return
    }
    for (let i = 0; i < node.children.length; i++) {
        doMapToFlattenNodes(node.children[i],routeNodes)
    }
}

function mapToFlattenNodes(nodes) {
    let routeNodes = [];
    for (let i = 0; i < nodes.length; i++) {
        doMapToFlattenNodes(nodes[i],routeNodes)
    }
    return routeNodes
}