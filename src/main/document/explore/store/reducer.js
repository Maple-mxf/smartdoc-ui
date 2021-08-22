import {
    CHANGE_MATRIX_VAR_LINE,
    CHANGE_OPEN_HEADER_FORM_SWITCH,
    CHANGE_OPEN_MATRIX_VAR_FORM_SWITCH,
    CHANGE_OPEN_URI_VAR_FORM_SWITCH,
    CHANGE_OPEN_URL_PARAM_FORM_SWITCH,
    CHANGE_PARAM_TYPE,
    CHANGE_REQUEST_FORM_LINE,
    CHANGE_REQUEST_HEADER_LINE,
    CHANGE_REQUEST_X_FORM_LINE,
    CHANGE_URI_VAR_LINE,
    CHANGE_URL_PARAM_LINE,
    CHANGE_URL_VALUE
} from "./constants";

const initIncreaseFormLine = [{id: 1, value1: '', value2: '', showDelBtn: false}]
const requestHeaderIncreaseFormLine = [{id: 1, value1: 'Content-Type', value2: 'application/json', showDelBtn: false}]

const initExploreDoc = {
    "id": "",
    "method": "",
    "projectId": "",
    "url": "",
    "requestHeaderDescriptor": [],
    "queryParamDescriptors": [],
    "uriVarDescriptors": [],
    "responseHeaderDescriptors": [],
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
    requestHeaderLines: [...requestHeaderIncreaseFormLine],
    uriVarLines: [...initIncreaseFormLine],
    urlParamLines: [...initIncreaseFormLine],
    matrixVarLines: [...initIncreaseFormLine],
    formLines: [...initIncreaseFormLine],
    xformLines: [...initIncreaseFormLine],
    exploreOpenHeaderForm: false,
    exploreOpenURLParamForm: false,
    exploreOpenMatrixVarForm: false,
    exploreOpenURIVarVarForm: false,
}

export default (state = initExploreDoc, action) => {
    switch (action.type) {
        case CHANGE_PARAM_TYPE:
            return {...state, bodyParamTypeTabs: action.bodyParamTypeTabs}
        case CHANGE_URL_VALUE:
            return {...state,url: action.url}
        case CHANGE_OPEN_HEADER_FORM_SWITCH:
            return  {...state, exploreOpenHeaderForm: action.exploreOpenHeaderForm};
        case CHANGE_OPEN_URI_VAR_FORM_SWITCH:
            return  {...state, exploreOpenURIVarVarForm: action.exploreOpenURIVarVarForm};
        case CHANGE_OPEN_URL_PARAM_FORM_SWITCH:
            return  {...state, exploreOpenURLParamForm: action.exploreOpenURLParamForm};
        case CHANGE_OPEN_MATRIX_VAR_FORM_SWITCH:
            return  {...state, exploreOpenMatrixVarForm: action.exploreOpenMatrixVarForm};

        case CHANGE_REQUEST_X_FORM_LINE:
            return  {...state, xformLines: action.lines};
        case CHANGE_REQUEST_FORM_LINE:
            return {...state, formLines: action.lines};
        case CHANGE_REQUEST_HEADER_LINE:
            return {...state, requestHeaderLines: action.lines};
        case CHANGE_URI_VAR_LINE:
            return {...state, uriVarLines: action.lines};
        case CHANGE_URL_PARAM_LINE:
            return {...state, urlParamLines: action.lines};
        case CHANGE_MATRIX_VAR_LINE:
            return {...state, matrixVarLines:action.lines}

        default:
            return state;
    }
}