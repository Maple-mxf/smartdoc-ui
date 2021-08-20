import {CHANGE_PARAM_TYPE, GET_DOC} from "./constants";

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
    },

    bodyParamTypeTabs: [
        {
            id: 2,
            name: "form-data",
            active: false,
            color: 'default',
        },
        {
            id: 3,
            name: "x-www-form-urlencoded",
            active: false,
            color: 'default',
        },
        {
            id: 1,
            name: "raw",
            active: true,
            color: 'primary',
        },
    ]
}

export default (state = init, action) => {
    switch (action.type) {
        case GET_DOC:
            return {...state, doc: action.doc}
        case CHANGE_PARAM_TYPE:
            return {...state, bodyParamTypeTabs: action.bodyParamTypeTabs}
        default:
            return state;
    }
}