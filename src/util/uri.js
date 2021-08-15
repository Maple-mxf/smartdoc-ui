
const baseUri = "/restdoc"
export const getCreateProjectURL = () => (`${baseUri}/project?at=REST_WEB`)
export const getProjectListURL = (page,size) => (`${baseUri}/project/list?type=REST_WEB&page=${page}&size=${size}`)
export const getNavTreeNodeListURL=(projectId) => (`${baseUri}/${projectId}/resource/tree`)
export const getDocByIdURL=(docId) =>(`${baseUri}/document/${docId}/`)


//
export const getEditDocRequestHeaderURL=(docId)=>(`${baseUri}/document/${docId}/snippet/requestHeader`)

// 批量删除
export const getBatchDeleteDocSnippet=(docId)=>(`${baseUri}/document/${docId}/snippet/batch`)

// 创建文档片段 POST 请求
export const getCreateDocSnippet=(docId)=>(`${baseUri}/document/${docId}/snippet`)