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
    CHANGE_URI_VAR_LINE, CHANGE_URL_PARAM_LINE,
    CHANGE_URL_VALUE
} from "./constants";


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
    return {
        type:CHANGE_OPEN_HEADER_FORM_SWITCH,
        exploreOpenHeaderForm
    }
}

export const changeOpenURIVarFormSwitch = (exploreOpenURIVarVarForm) => {
    return {
        type:CHANGE_OPEN_URI_VAR_FORM_SWITCH,
        exploreOpenURIVarVarForm
    }
}

export const changeOpenMatrixVarFormSwitch = (exploreOpenMatrixVarForm) => {
    return {
        type:CHANGE_OPEN_MATRIX_VAR_FORM_SWITCH,
        exploreOpenMatrixVarForm
    }
}

export const changeOpenURLParamFormSwitch = (exploreOpenURLParamForm) => {
    return {
        type:CHANGE_OPEN_URL_PARAM_FORM_SWITCH,
        exploreOpenURLParamForm
    }
}

export const changeRequestHeaderLinesAction = (lines)=> (
    {
        type:CHANGE_REQUEST_HEADER_LINE,
        lines
    }
)

export const changeURIVarLinesAction = (lines)=> (
    {
        type:CHANGE_URI_VAR_LINE,
        lines
    }
)

export const changeURLParamLinesAction = (lines)=> (
    {
        type:CHANGE_URL_PARAM_LINE,
        lines
    }
)

export const changeMatrixVarLinesAction = (lines)=> (
    {
        type:CHANGE_MATRIX_VAR_LINE,
        lines
    }
)

