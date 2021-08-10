import {GET_DOC} from "./constants";

const init = {
    doc : {}
}

export default (state = init, action) => {
    switch (action.type) {
        case GET_DOC:
            return {...state, doc: action.doc}
        default:
            return state;
    }
}