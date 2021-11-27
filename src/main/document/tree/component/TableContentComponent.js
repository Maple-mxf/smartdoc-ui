import * as React from "react";
import {useSelector} from "react-redux";
import {useCallback, useEffect, useState} from "react";
import {NAV_TREE_REDUCER_NAMESPACE} from "../../../../util/constants";
import {useLocation} from "react-router-dom";
import NavigationTableContent from "../../../../style/component/tableContent";

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
    return defaultExpandedNodeIds;
}

export default function TableContentTreeViewComponent() {
    console.log("rerender TableContentTreeViewComponent")
    const {nodes} = useSelector(state => state[NAV_TREE_REDUCER_NAMESPACE]);

    let selectedNodeId = "root";
    let location = useLocation();
    const re = /^\/home\/document\/(.*)$/;
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
        <NavigationTableContent nodes={nodes}
                                genLinkFunc={(node) => {
                                    return "/home/document/" + node.id;
                                }}

                                expanded={defaultExpanded}
                                selected={targetSelectNode}

                                setTargetSelectNode={setTargetSelectNode}
                                setDefaultExpanded={setDefaultExpanded}
        />
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