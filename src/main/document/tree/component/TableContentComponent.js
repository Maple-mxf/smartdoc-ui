import * as React from "react";
import PropTypes, {func, node} from "prop-types";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import TreeView from "@mui/lab/TreeView";
import TreeItem, {treeItemClasses} from "@mui/lab/TreeItem";
import Typography from "@mui/material/Typography";
import Description from "@mui/icons-material/Description";
import Api from "@mui/icons-material/Api";
import FolderOpen from "@mui/icons-material/FolderOpen";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useSelector} from "react-redux";
import {useCallback, useEffect, useState} from "react";
import {NAV_TREE_REDUCER_NAMESPACE} from "../../../../util/constants";
import {LeftTreeHeight, LeftTreeWidth} from "../index";
import {useTheme} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import {NavLink, useLocation} from "react-router-dom";

const StyledTreeItemRoot = styled(TreeItem)(({theme}) => ({
    color: theme.palette.text.primary,

    // 设置样式
    [`& .${treeItemClasses.content}`]: {
        color: theme.palette.text.secondary,
        paddingRight: theme.spacing(2),
        "&:hover": {
            color: theme.palette.primary.main,
            backgroundColor: theme.palette.action.hover,
         /*   transform: `scale(1.01)`*/
        },
        "&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused": {
            backgroundColor: `${theme.palette.action.selected}`,
            color: "var(--tree-view-color)",
            borderLeftStyle: 'solid',
            borderWidth: '5px'
        },
        [`& .${treeItemClasses.label}`]: {
            fontWeight: "inherit",
            color: "inherit"
        }
    },
    [`& .${treeItemClasses.group}`]: {
        marginLeft: 10,
        [`& .${treeItemClasses.content}`]: {
            paddingLeft: theme.spacing(2)
        }
    },
}));


function StyledTreeItem(props) {
    const {
        bgColor,
        color,
        id,
        labelIcon: LabelIcon,
        labelInfo,
        labelText,
        ...other
    } = props;

    return (
        <StyledTreeItemRoot
            label={
                <Box sx={{display: "flex", alignItems: "center", p: 0.8, pr: 10}}>
                    <Box component={LabelIcon} sx={{mr: 1}}/>
                    <Typography
                        variant="body2"
                        sx={{fontWeight: "inherit", flexGrow: 1}}
                    >
                        {id === 'root' ? 'Workspace' : labelText}
                    </Typography>
                </Box>
            }
            style={{
                "--tree-view-color": "#1a73e8",
                "--tree-view-bg-color": "#e8f0fe"
            }}
            {...other}
        />
    );
}

StyledTreeItem.propTypes = {
    bgColor: PropTypes.string,
    color: PropTypes.string,
    id: PropTypes.string,
    labelIcon: PropTypes.elementType.isRequired,
    labelText: PropTypes.string.isRequired
};


function TableContentTreeComponent(props) {
    const {nodes} = props;
    return (
        <div>
            {
                nodes.map((node, index) => {
                        let path = `/home/document/${node.id}`
                        return (
                            node.type === 'RESOURCE' ?
                                <StyledTreeItem
                                    key={node.id}
                                    nodeId={node.id}
                                    id={node.id}
                                    labelIcon={node.id === 'root' ? HomeIcon : FolderOpen}
                                    labelText={node.title}
                                    color="#1a73e8"
                                    bgColor="#e8f0fe"
                                >
                                    <TableContentTreeComponent
                                        key={index}
                                        nodes={node.children}
                                    />
                                </StyledTreeItem>
                                :
                                <NavLink to={path} key={node.id} style={{textDecoration: 'none'}}>
                                    <StyledTreeItem
                                        key={node.id}
                                        nodeId={node.id}
                                        id={node.id}
                                        labelIcon={(node.type === 'API' ? Api : Description)}
                                        labelText={node.title}
                                        color="#1a73e8"
                                        bgColor="#e8f0fe"
                                    />
                                </NavLink>
                        )
                    }
                )
            }
        </div>
    )
}

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
    const {search} = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

function getExpandNodeIds(nodes, selectedNodeId) {
    const defaultExpandedNodeIds = ['root'];
    const targetNode = {id: selectedNodeId};
    let flattenNodes = mapToFlattenNodes(nodes)
    for (let i = 0; i < flattenNodes.length; i++) {
        if (flattenNodes[i].id === targetNode.id) {
            getAllParentNodeIds(flattenNodes,
                {...targetNode, pid: flattenNodes[i].pid},
                defaultExpandedNodeIds);

            break;
        }
    }
    console.info('getExpandNodeIds=========' + JSON.stringify(defaultExpandedNodeIds) + "selectedNodeId" + selectedNodeId)
    return defaultExpandedNodeIds;
}

export default function TableContentTreeViewComponent(props) {
    const theme = useTheme();

    const {nodes} = useSelector(state => state[NAV_TREE_REDUCER_NAMESPACE]);


    let selectedNodeId = "root";
    let location = useLocation();
    var re = /^\/home\/document\/(.*)$/;
    let matchRes = location.pathname.match(re);
    if (matchRes && matchRes.length === 2) {
        selectedNodeId = matchRes[1]
    }

    let [defaultExpanded, setDefaultExpanded] = useState(['root']);
    const [targetSelectNode, setTargetSelectNode] = useState(selectedNodeId);

    // useCallback第二个参数设置的是依赖值
    // 只要依赖的值发生变化，就会触发此函数
    // 用useCallback包一层的目的是使得当前组件在被重新rerender的时候不会触发生成新的函数引用对象
    const setExpandFunc = useCallback(() => {
        if (selectedNodeId !== 'root') {
            let expandNodeIds = getExpandNodeIds(nodes, selectedNodeId);
            setDefaultExpanded(expandNodeIds)
        }
    }, [nodes]);

    useEffect(() => {
            // 组件挂载时执行
            setExpandFunc();

            // 组件卸载时执行的逻辑
            return () => {
            }
        },
        // 组件数据更新时执行的逻辑
        [setExpandFunc]);

    return (
        <TreeView
            aria-label="gmail"
            expanded={defaultExpanded}
            defaultCollapseIcon={<ArrowDropDownIcon/>}
            defaultExpandIcon={<ArrowRightIcon/>}
            defaultEndIcon={<div style={{width: 24}}/>}
            selected={targetSelectNode}
            onNodeSelect={(event, value) => {
                setTargetSelectNode(value)
            }}

            onNodeToggle={(event, nodeIds) => {
                console.info(event)
                console.info("onNodeToggle" + JSON.stringify(nodeIds))
                setDefaultExpanded(nodeIds)
            }}
            sx={{
                height: LeftTreeHeight-10,
                flexGrow: 1,
                maxWidth: LeftTreeWidth-10,
                overflowY: "auto",
                backgroundColor: theme.palette.background.paper,
            }}

        >
            <TableContentTreeComponent nodes={nodes}/>
        </TreeView>

    );
}


function getAllParentNodeIds(nodes, targetNode, res) {
    if (targetNode.id === 'root') return;
    for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].id === targetNode.pid && nodes[i].id !== 'root') {
            res.push(nodes[i].id)
            getAllParentNodeIds(nodes, {...nodes[i]}, res)
        }
    }
}

function doMapToFlattenNodes(node, routeNodes) {
    routeNodes.push(node)
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