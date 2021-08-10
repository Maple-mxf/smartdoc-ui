import {get} from "../../../util/http";
import {GET_DOC} from "./constants";
import {getDocByIdURL} from "../../../util/uri";

export const getDocAction = (doc) => {
    return {
        type:GET_DOC,
        doc
    }
}

export const getDocById = (docId) => {
    return new Promise(((resolve, reject) => {
        get(getDocByIdURL(docId))
            .then((res) => {
                resolve(res)
            })
            .catch((e) => {
                reject(e)
            })
    }))
}