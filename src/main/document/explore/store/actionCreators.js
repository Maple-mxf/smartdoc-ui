import {
    CHANGE_OPEN_HEADER_FORM_SWITCH,
    CHANGE_PARAM_TYPE,
    CHANGE_REQUEST_FORM_LINE,
    CHANGE_REQUEST_HEADER_LINE,
    CHANGE_REQUEST_X_FORM_LINE,
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

export const changeRequestHeaderLinesAction = (lines)=> (
    {
        type:CHANGE_REQUEST_HEADER_LINE,
        lines
    }
)