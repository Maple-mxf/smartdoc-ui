import {
    GET_DOC, SELECTED_DOC_NODE_ID
} from "./constants";

const initDoc = {
    "id": "",
    "method": "",
    "projectId": "",
    "url": "",
    "requestHeaderDescriptor": [],
    "requestBodyDescriptors": [],
    "responseBodyDescriptors": [],
    "queryParamDescriptors": [],
    "uriVarDescriptors": [],
    "responseHeaderDescriptors": [],
    "requestFakeCodeSample": "",
    "responseFakeCodeSample": "",
    "curlCodeSample": "",
    "javaCodeSample": "",
    "pythonCodeSample": "",
    "lastUpdateTime": null,

    //
    "selectedDocNodeId": "",
}

const doc = {doc: initDoc}


export default (state = doc, action) => {
    switch (action.type) {
        case GET_DOC:
            return {...state, doc: action.doc}
        case SELECTED_DOC_NODE_ID:
            return {...state, selectedDocNodeId: action.selectedDocNodeId};
        default:
            return state;
    }
}