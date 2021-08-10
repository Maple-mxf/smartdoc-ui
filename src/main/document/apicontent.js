import React, {useEffect} from "react";
import BasicInfo from "./snippet/basicinfo";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import {useDispatch, useSelector} from "react-redux";
import {DOC_REDUCER_NAMESPACE, NAV_TREE_REDUCER_NAMESPACE} from "../../util/constants";
import {Route, Switch} from "react-router-dom";
import {getNavTreeAction, getNavTreeNodeList} from "./tree/store/actionCreators";
import {parseResponseMsg} from "../../util/http";
import {getDocAction, getDocById} from "./store/actionCreators";

const useStyles = makeStyles((theme)=>(
    {
        root: {
            width: '100%',
            // maxWidth: 500,
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

const FetchDocById = (docId,dispatch) => {
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
    const {node} = props
    const dispatch = useDispatch()

    // 请求数据
    useEffect(() => {
        FetchDocById(node.id,dispatch)
        return () => {
        }
    }, [])

    // 渲染页面
    const {doc} = useSelector(state => state[DOC_REDUCER_NAMESPACE]);
    console.info("doc : ", doc)

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <BasicInfo name={doc.name} url={doc.url} method={doc.method} pythonCodeSample={doc.pythonCodeSample}/>
            </Grid>
            <Grid item xs={12}>
                <h1>{node.id}</h1>
            </Grid>
        </Grid>
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
                                       render={(props) => <ContentComponent node={node} {...props} /> }
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