import axios from 'axios';
import Util from './util';

function Request(opt = {}) {
    this.status = 0;// -1失败 0初始化 1成功 2无数据
    this.opt = opt;
    this.init(opt);
}
const PtoString = function(param) {
    return Object.prototype.toString.call(param);
};
// const reqAlmost = (r) => Promise.all(r.map(p => (p.catch ? p.catch(e => e) : p)));
const reqAlmost = function(r) {
    return Promise.all(r.map(p => {
        if (p.catch) {
            return p.catch((err) => {
                err.failed = true;
                return err;
            });
        } else {
            return p;
        }
    }));
};

// feed 流缓存到 sessionStorage 的时间
export const FEED_CACHE_TIME = 3 * 60 * 1000;

export const checkDataEmpty = function(data) {
    let status = 2;
    let type = PtoString(data);
    let keys, flag = true;
    if (type === '[object Object]') {
        keys = Object.keys(data);

        if (keys.length > 0) {
            keys.forEach((key) => {
                if (PtoString(data[key]) === '[object Null]') flag = false;
            });
        } else {
            flag = false;
        }
        if (flag) {
            status = 1;
        }
    } else if (type === '[object Array]' || type === '[object String]') {
        if (data.length > 0) {
            status = 1;
        }
    } else {
        console.warn('result data type invalid !');
    }
    // 例外单独处理
    if (data.hTeamCast && data.vTeamCast) {
        if (data.hTeamCast.startCast.length > 0 || data.vTeamCast.subCast.length > 0) {
            status = 1;
        } else {
            status = 2;
        }
    }
    // 处理 response
    if (data && Array.isArray(data.data)) {
        if (data.data.length > 0) {
            status = 1;
        } else {
            status = 2;
        }
    }

    return status;
};

Request.prototype = {
    init(opt){
        let baseUrl = '';
        if (opt && opt.baseURL) {
            baseUrl = opt.baseURL;
        } else if (opt && opt.type === 'recommend') {
            baseUrl = '//v2.sohu.com/integration-api/';
        } else {
            baseUrl = Util.isTestEnvironment() ? 'http://10.16.58.120:8988/' : '//v2.sohu.com/sports-data/';
        }
        this.axios = axios.create({
            baseURL: baseUrl,
            timeout: opt.timeout || 3000,
            withCredentials: false
        });
    },
    fetch(opt){
        let method = opt.method || 'GET';
        let params = opt.params || {};
        this.status = 0;
        // start Request …
        return new Promise((resolve, reject) => {
            if (opt.url) {
                this.axios.request({
                    url: opt.url,
                    method: method.toUpperCase(),
                    params: params
                }).then((result) => {
                    let errFlag = false;
                    let resultData = result.data;
                    if (typeof resultData === 'string') {
                        try {
                            resultData = JSON.parse(resultData);
                        } catch (e) {
                            console.warn(e);
                            reject(e);
                        }
                    }
                    if (resultData) {
                        if (typeof resultData.code !== 'undefined') {
                            if (resultData.code === 0 || resultData.code === 200) {
                                resultData = resultData.data;
                            } else {
                                errFlag = true;
                            }
                        }
                    } else {
                        errFlag = true;
                    }
                    if (errFlag) {
                        this.status = -1;
                        reject(resultData);
                    } else {
                        this.status = checkDataEmpty(resultData);
                        resolve(resultData);
                    }

                }).catch((err) => {
                    this.status = -1;
                    reject(err);
                });
            } else {
                reject('URL cannnot be empty !');
            }

        });
    },
    lazyFetch(opt) {
        const MIN_REQ_TIME = 1000;
        let startReqTime = Date.now(), realTime, timer = null;
        let method = opt.method || 'GET';
        let params = opt.params || {};
        return new Promise((resolve, reject) => {
            if (opt.url) {
                this.axios.request({
                    url: opt.url,
                    method: method.toUpperCase(),
                    params: params
                }).then((result) => {
                    let errFlag = false;
                    let resultData = result.data;
                    if (resultData) {
                        if (typeof resultData.code !== 'undefined') {
                            if (resultData.code === 0) {
                                resultData = resultData.data;
                            } else {
                                errFlag = true;
                            }
                        }
                    }
                    if (errFlag) {
                        reject(resultData);
                    } else {
                        realTime = Date.now();
                        if (realTime - startReqTime >= MIN_REQ_TIME) {
                            resolve(resultData);
                        } else {
                            timer = setTimeout(() => {
                                resolve(resultData);
                                clearTimeout(timer);
                                timer = null;
                            }, MIN_REQ_TIME + startReqTime - realTime);
                        }
                    }
                }).catch((err) => {
                    reject(err);
                });
            } else {
                reject('URL cannnot be empty !');
            }

        });
    },
    almost(requestArr) {
        let oneHasData = false;
        let oneSuccess = false;
        let outPut = [];
        return new Promise((resolve, reject) => {
            reqAlmost(requestArr).then((result) => {
                result.forEach((item) => {
                    if (checkDataEmpty(item) === 1) {
                        oneHasData = true;
                    }
                    if (item.failed) {
                        outPut.push({});
                    } else {
                        oneSuccess = true;
                        outPut.push(item);
                    }
                });
                if (oneSuccess) {
                    if (oneHasData) {
                        this.status = 1;
                    } else {
                        this.status = 2;
                    }
                    resolve(outPut);
                } else {
                    this.status = -1;
                    reject(result);
                }
            }).catch((err) => {
                reject(err);
            });
        });

    }
};

export default Request;