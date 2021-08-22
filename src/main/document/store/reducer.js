import {
    GET_DOC
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
    "lastUpdateTime": null
}

const doc={doc:initDoc}


export default (state = doc, action) => {
    switch (action.type) {
        case GET_DOC:
            return {...state, doc: action.doc}
        default:
            return state;
    }
}