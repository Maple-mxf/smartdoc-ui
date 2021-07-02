
const baseUri = "/restdoc"
// const baseUri = "https://admin.onepushing.com/cloudwebsite/"
export const getCreateProjectURL = () => (`${baseUri}/project?at=REST_WEB`)
export const getProjectListURL = () => (`${baseUri}/project/list?type=REST_WEB`)
// export const getCreateProjectURL = () => (`/restdoc/api/getUserInfo`)