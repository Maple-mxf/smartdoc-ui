import {CLOSE_MENU, OPEN_MENU} from './constants'
import routeList from "../route";

const init = {
    menuIsOpen: true,
    "routeList": routeList,
}

export default (state = init, action) => {
    switch (action.type) {
        case CLOSE_MENU:
            return {...state, menuIsOpen: false}
        case OPEN_MENU:
            return {...state, menuIsOpen: true}
        default:
            return state
    }
}
