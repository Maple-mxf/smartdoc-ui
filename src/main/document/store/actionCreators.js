import {fetchServerData, get, patch} from "../../../util/http";
import {
    CHANGE_OPEN_HEADER_FORM_SWITCH,
    CHANGE_PARAM_TYPE,
    CHANGE_REQUEST_FORM_LINE,
    CHANGE_REQUEST_X_FORM_LINE,
    CHANGE_URL_VALUE,
    GET_DOC,
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

export const changeFormLinesAction = ( lines) => (
    {
        type:CHANGE_REQUEST_FORM_LINE,
        lines
    }
)

export const changeXFormLinesAction = ( lines) => (
    {
        type:CHANGE_REQUEST_X_FORM_LINE,
        lines
    }
)

export const changeParamTypeTagAction = (bodyParamTypeTabs) => {
    return {
        type: CHANGE_PARAM_TYPE,
        bodyParamTypeTabs
    }
}

export const changeUrlValueAction = (urlValue) => {
    return {
        type: CHANGE_URL_VALUE,
        url: urlValue
    }
}

export const changeOpenHeaderFormSwitch = (exploreOpenHeaderForm)=>{
    console.info("exploreOpenHeaderForm",exploreOpenHeaderForm)
    return {
        type:CHANGE_OPEN_HEADER_FORM_SWITCH,
        exploreOpenHeaderForm
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