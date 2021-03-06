import {fetchServerData, get, patch} from "../../../util/http";
import {
    GET_DOC, SELECTED_DOC_NODE_ID,
    SnippetType_RequestHeader
} from "./constants";
import {
    getBatchDeleteDocSnippet, getCreateDocSnippet, getDocByIdURL,
    getEditDocRequestHeaderURL
} from "../../../util/uri";

export const getDocAction = (doc) => {
    return {
        type: GET_DOC,
        doc
    }
}


// 过时
export const getDocById = (docId) => {
    return new Promise(((resolve, reject) => {
        get(getDocByIdURL(docId))
            .then((res) => {
                resolve(res)
            })
            .catch((e) => {
                reject(e)
            })
    }))
}

// 过时
export const editDocRequestHeader = (docId, data) => {
    return new Promise(((resolve, reject) => {
        patch(getEditDocRequestHeaderURL(docId), data)
            .then((res) => {
                resolve(res)
            })
            .catch((e) => {
                reject(e)
            })
    }))
}

//
export const getSelectedDocNodeIdAction = (nodeId) => {
    return {
        type: SELECTED_DOC_NODE_ID,
        nodeId
    }
}

export const batchDeleteSnippets = (docId, data) => {
    return fetchServerData("delete", getBatchDeleteDocSnippet(docId), data)
}

export const createSnippets = (docId, snippetType, data) => {
    let submitData = {
        "snippetType": snippetType,
        "matrixVariableDescriptor": null,
        "responseHeaderFieldDescriptor": null,
        "responseBodyFieldDescriptor": null,
        "requestBodyFieldDescriptor": null,
        "queryParamDescriptor": null,
        "uriVarDescriptor": null
    };
    switch (snippetType) {
        case SnippetType_RequestHeader:
            submitData['requestHeaderFieldDescriptor'] = {
                field: data.field,
                value: data.value,
                optional: data.optional,
                description: data.description,
            }
            break;
    }
    return fetchServerData("post", getCreateDocSnippet(docId), submitData)
}