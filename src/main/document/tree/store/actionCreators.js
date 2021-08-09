// 获取项目列表
import {get} from "../../../../util/http";
import {getNavTreeNodeListURL} from "../../../../util/uri";
import {GET_NODES_TREE} from "./constants";

export const getNavTreeAction = (nodes) => {
    return {
        type:GET_NODES_TREE,
        nodes
    }
}

export const getNavTreeNodeList = (projectId) => {
    return new Promise(((resolve, reject) => {
        get(getNavTreeNodeListURL(projectId))
            .then((res) => {
                resolve(res)
            })
            .catch((e) => {
                reject(e)
            })
    }))
}