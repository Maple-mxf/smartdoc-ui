import axios from 'axios'

axios.defaults.timeout = 10000
axios.defaults.headers['custom-defined-header-key'] = 'custom-defined-header-value'
axios.defaults.headers.common['common-defined-key-b'] = 'custom value: for all methods'
axios.defaults.withCredentials=true

// 临时token
axios.defaults.headers.common['restdoc_console_access_token'] = "ae9123f3da8a4e31b21ed33f67f63836"

export function get(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params,
        }).then((response) => {
            landing(url, params, response.data);
            resolve(response.data);
        })
            .catch((error) => {
                reject(error);
            });
    });
}

export function post(url, data) {
    return new Promise((resolve, reject) => {
        axios.post(url, data).then(
            (response) => {
                //关闭进度条
                resolve(response.data);
            },
            (err) => {
                reject(err);
            }
        );
    });
}

export function del(url, data) {
    console.info("del",data)
    return new Promise((resolve, reject) => {
        axios.delete(url,  {data: data}).then(
            (response) => {
                resolve(response.data);
            },
            (err) => {
                reject(err);
            }
        );
    });
}

export function patch(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.patch(url, data).then(
            (response) => {
                resolve(response.data);
            },
            (err) => {
                reject(err);
            }
        );
    });
}

export function put(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.put(url, data).then(
            (response) => {
                resolve(response.data);
            },
            (err) => {
                reject(err);
            }
        );
    });
}

//统一接口处理，返回数据
export  function fetchServerData(method, url, param) {
    return new Promise((resolve, reject) => {
        switch (method) {
            case "get":
                get(url, param)
                    .then(function (response) {
                        resolve(response);
                    })
                    .catch(function (error) {
                        console.log("get request GET failed.", error);
                        reject(error);
                    });
                break;
            case "post":
                post(url, param)
                    .then(function (response) {
                        resolve(response);
                    })
                    .catch(function (error) {
                        console.log("get request POST failed.", error);
                        reject(error);
                    });
                break;
            case "delete":
                del(url, param)
                    .then(function (response) {
                        resolve(response);
                    })
                    .catch(function (error) {
                        reject(error);
                    });
                break;
            case "patch":
                patch(url, param)
                    .then(function (response) {
                        resolve(response);
                    })
                    .catch(function (error) {
                        reject(error);
                    });
                break;
            default:
                break;
        }
    });
}

//失败提示
function msag(err) {
    if (err && err.response) {
        switch (err.response.status) {
            case 400:
                alert(err.response.data.error.details);
                break;
            case 401:
                alert("未授权，请登录");
                break;

            case 403:
                alert("拒绝访问");
                break;

            case 404:
                alert("请求地址出错");
                break;

            case 408:
                alert("请求超时");
                break;

            case 500:
                alert("服务器内部错误");
                break;

            case 501:
                alert("服务未实现");
                break;

            case 502:
                alert("网关错误");
                break;

            case 503:
                alert("服务不可用");
                break;

            case 504:
                alert("网关超时");
                break;

            case 505:
                alert("HTTP版本不受支持");
                break;
            default:
        }
    }
}

function landing(url, params, data) {

}

/**
 *
 * 输入参数：
 * 解析服务端消息
 * {succ:"succ",errorMsg:"",data:object}
 */
export function parseResponseMsg(res){
    if (res === undefined){
        return {succ:false, errorMsg:`impossible parse data : ${res}`,data:{}}
    }
    if (res.status === undefined){
        return {succ:false, errorMsg:`impossible parse data : ${JSON.stringify(res)}`,data:{}}
    }
    if (res.status === "OK"){
        return {succ:true, errorMsg:``,data:res.data}
    }
    if (res.status !== "OK"){
        return {succ:false, errorMsg:res.message,data:res.data}
    }
}
