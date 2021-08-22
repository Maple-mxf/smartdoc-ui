import {
    CHANGE_OPEN_HEADER_FORM_SWITCH,
    CHANGE_PARAM_TYPE,
    CHANGE_URL_VALUE,
    GET_DOC,
    CHANGE_REQUEST_X_FORM_LINE,
    CHANGE_REQUEST_FORM_LINE
} from "./constants";

const initDoc = {
    "id": "",
    "method": "",
    "projectId": "",
    "url": "",
    "requestHeaderDescriptor": [],
    "formLines": [],
    "xformLines": [],
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

const initIncreaseFormLine = [{id: 1, value1: '', value2: '', showDelBtn: false}]

const init = {
    doc: {...initDoc},
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
    ],
    exploreDocData: {
        ...initDoc, method: 'GET',
        requestHeaderFormLines: initIncreaseFormLine,
        formLines: initIncreaseFormLine,
        xformLines: initIncreaseFormLine
    },
    exploreOpenHeaderForm: false,
    exploreOpenURLParamForm: false,
    exploreOpenMatrixVarForm: false,
    exploreOpenURIVarVarForm: false,
}

export default (state = init, action) => {
    switch (action.type) {
        case GET_DOC:
            return {...state, doc: action.doc}
        case CHANGE_PARAM_TYPE:
            return {...state, bodyParamTypeTabs: action.bodyParamTypeTabs}
        case CHANGE_URL_VALUE:
            const docData = {...state.exploreDocData, url: action.url}
            return {...state, exploreDocData: docData}
        case CHANGE_OPEN_HEADER_FORM_SWITCH:
            return {...state, exploreOpenHeaderForm: action.exploreOpenHeaderForm}
        case CHANGE_REQUEST_X_FORM_LINE:
            return  {...state, exploreDocData: {...state.exploreDocData, xformLines: action.lines}};
        case CHANGE_REQUEST_FORM_LINE:
            return {...state, exploreDocData: {...state.exploreDocData, formLines: action.lines}};
        default:
            return state;
    }
}