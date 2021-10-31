import {getNavTreeAction, getNavTreeNodeList} from "../store/actionCreators";
import {parseResponseMsg} from "../../../../util/http";
import TreeItem from "@material-ui/lab/TreeItem";
import ArrowDropDownOutlinedIcon from "@material-ui/icons/ArrowDropDownOutlined";
import ArrowRightOutlinedIcon from "@material-ui/icons/ArrowRightOutlined";
import {NavLink} from "react-router-dom";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NAV_TREE_REDUCER_NAMESPACE} from "../../../../util/constants";
import {CardContent} from "@material-ui/core";
import TreeView from "@material-ui/lab/TreeView";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme)=>(
    {
        root: {
            height: 216,
            flexGrow: 1,
            maxWidth: 400,
        },
        card: {
            padding: theme.spacing(1),
            textAlign: 'left',
        },
    }
));

const ApiNavigationTreeComponent = (props) => {
    const {nodes} = props;
    return (
        <div>
            {
                nodes.map((node,index)=>{
                    let path = `/home/document/${node.id}`
                    return (
                        node.type ==='RESOURCE' ?
                            <TreeItem key={node.id}
                                      nodeId={node.id}
                                      label={node.title}
                                      collapseIcon={ node.type ==='RESOURCE'? <ArrowDropDownOutlinedIcon />: null }
                                      expandIcon = { node.type ==='RESOURCE'? <ArrowRightOutlinedIcon />: null}
                            >
                                <ApiNavigationTreeComponent key={index} nodes={node.children} />
                            </TreeItem>
                            :
                            <NavLink to={path} key={node.id}>
                                <TreeItem key={node.id}
                                          nodeId={node.id}
                                          label={node.title}
                                          collapseIcon={ node.type ==='RESOURCE'? <ArrowDropDownOutlinedIcon />: null }
                                          expandIcon = { node.type ==='RESOURCE'? <ArrowRightOutlinedIcon />: null}
                                />
                            </NavLink>
                    )
                })
            }
        </div>
    )
}

export default function ControlledTreeView() {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState([]);
    const [selected, setSelected] = React.useState([]);

    const dispatch = useDispatch();

    const handleToggle = (event, nodeIds) => {
        setExpanded(nodeIds);
    };

    const handleSelect = (event, nodeIds) => {
        setSelected(nodeIds);
    };

    useEffect(() => {
        FetchNodeList("802736426121695232",dispatch)
        return () => {
        }
    }, [])
    const {nodes} = useSelector(state => state[NAV_TREE_REDUCER_NAMESPACE]);
    return (
        <CardContent className={classes.card}>
            <TreeView
                className={classes.root}
                expanded={expanded}
                selected={selected}
                onNodeToggle={handleToggle}
                onNodeSelect={handleSelect}
            >
                <ApiNavigationTreeComponent nodes={nodes} />
            </TreeView>
        </CardContent>
    );
}

const FetchNodeList = (projectId,dispatch) => {
    getNavTreeNodeList(projectId)
        .then(
            res => {
                let {succ,errorMsg,data} = parseResponseMsg(res)
                dispatch(getNavTreeAction(data))
            },
            err => {
                console.info(err)
            }
        )
}