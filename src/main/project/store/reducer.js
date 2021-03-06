import {CLOSE_NEW_PROJECT_FORM, OPEN_NEW_PROJECT_FORM,
    CREATE_PROJECT, API_ERROR, GET_PROJECT_LIST} from "./constants";

const init = {
    openNewProjectForm:false,
    projects:[],
    page:1,
    size:5,
    count:0,
}

export default (state = init, action) => {
    console.info("action",action)
    switch (action.type) {
        case CLOSE_NEW_PROJECT_FORM:
            return {...state, openNewProjectForm: false}
        case OPEN_NEW_PROJECT_FORM:
            return {...state, openNewProjectForm: true}
        case CREATE_PROJECT:
            return {...state, openNewProjectForm: false}
        case GET_PROJECT_LIST:
            return {...state,
                projects:action.projects,
                page:action.page,
                size:action.size,
                count:action.count}

        case API_ERROR:
            return {...state,   code:action.code, msg:action.errorMsg}

        default:
            return state
    }
}
