
const baseUri = "/restdoc"
// const baseUri = "https://admin.onepushing.com/cloudwebsite/"
export const getCreateProjectURL = () => (`${baseUri}/project?at=REST_WEB`)
export const getProjectListURL = (page,size) => (`${baseUri}/project/list?type=REST_WEB&page=${page}&size=${size}`)
// export const getCreateProjectURL = () => (`/restdoc/api/getUserInfo`)
export const getNavTreeNodeListURL=(projectId) => (`${baseUri}/${projectId}/resource/tree`)
export const getDocByIdURL=(docId) =>(`${baseUri}/document/${docId}/`)