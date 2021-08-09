import {GET_NODES_TREE} from "./constants";

const init = {
    nodes : []
}

export default (state = init, action) => {
    switch (action.type) {
        case GET_NODES_TREE:
            return {...state, nodes: action.nodes}
        default:
            return state;
    }
}