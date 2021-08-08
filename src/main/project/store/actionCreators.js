import {CLOSE_NEW_PROJECT_FORM, GET_PROJECT_LIST, OPEN_NEW_PROJECT_FORM} from "./constants";
import {getCreateProjectURL, getProjectListURL} from '../../../util/uri'
import {get,post} from '../../../util/http'

export const openCreateProjectWindow = {
    type : OPEN_NEW_PROJECT_FORM,
    openNewProjectForm:true
}

export const closeCreateProjectWindow = {
    type : CLOSE_NEW_PROJECT_FORM,
    openNewProjectForm:false
}

export const getProjectAction = (projects,page,size,count)=> {
    return {
        type:GET_PROJECT_LIST,
        projects,
        page,
        size,
        count
    }
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
export const getProjectList = (page,size) => {
    return new Promise(((resolve, reject) => {
        get(getProjectListURL(page-1,size))
            .then((res) => {
                resolve(res)
            })
            .catch((e) => {
                reject(e)
            })
    }))
}


