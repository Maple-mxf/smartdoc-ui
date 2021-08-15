import {GET_DOC} from "./constants";

const init = {
    doc: {
        "id": "",
        "method": "",
        "projectId": "",
        "name": "",
        "resource": "",
        "url": "",
        "description": "",
        "requestHeaderDescriptor": [],
        "requestBodyDescriptor": [],
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
}

export default (state = init, action) => {
    switch (action.type) {
        case GET_DOC:
            return {...state, doc: action.doc}
        default:
            return state;
    }
}