import {CLOSE_NEW_PROJECT_FORM, CREATE_PROJECT, GET_PROJECT_LIST, OPEN_NEW_PROJECT_FORM} from "./constants";
import {getCreateProjectURL, getProjectListURL} from '../../../common/uri'
import {get,post} from '../../../common/http'

export const openCreateProjectWindow = {
    type : OPEN_NEW_PROJECT_FORM,
    openNewProjectForm:true
}

export const closeCreateProjectWindow = {
    type : CLOSE_NEW_PROJECT_FORM,
    openNewProjectForm:false
}

// 创建项目
export const createProject = (data) => {
    return new Promise(((resolve, reject) => {
        post(getCreateProjectURL(),data)
            .then((res) => {
                resolve(res)
            })
            .catch((e) => {
                reject(e)
            })
    }))
}

// 获取项目列表
export const getProjectList = () => {
    return new Promise(((resolve, reject) => {
        get(getProjectListURL())
            .then((res) => {
                resolve(res)
            })
            .catch((e) => {
                reject(e)
            })
    }))
}


