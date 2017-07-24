/**
 * Created by guoyueting on 2017/7/4.
 */

var setting = require('./setting.js');

function getSearchParam(field, cSearch) {
    var search = '';
    if (cSearch) {
        search = cSearch;
    } else {
        search = location.search || '';
    }
    if (search === '') {
        return '';
    }
    var params = search.slice(1).split('&');
    for (var i = 0; i < params.length; i++) {
        var param = params[i];
        var param_name = param.split('=')[0];
        var param_value = decodeURIComponent(param.split('=')[1]);
        if (param_name == field) {
            return param_value;
        }
    }
    return '';
}

function isSupportStorage() {
    var isSupport = true;
    try {
        sessionStorage.setItem('00_test_00', '1');
        window.talent_support_webstorage = true;
    } catch (ext) {
        isSupport = false;
        window.talent_support_webstorage = false;
        alert('support出错');
    }
    return isSupport;
}

function getStorageObj(storage, name) {
    if (window.talent_support_webstorage || isSupportStorage()) {
        var result = localStorage.getItem(name);
        if (result == '' || result == undefined) {
            return {};
        } else {
            return JSON.parse(storage.getItem(name));
        }
    }
}

function setStorageObj(storage, name, value) {
    if (window.talent_support_webstorage || isSupportStorage()) {
        try {
            storage.setItem(name, JSON.stringify(value));
        } catch (exp) {
            // 写入数据出错,可能是webStorage已经写满,需要清空缓存
            alert('写入出错');
            storage.setItem(name, '');
        }
    }
}

function clearStorageObj(storage, name) {
    if (window.talent_support_webstorage || isSupportStorage()) {
        try {
            storage.removeItem(name, '');
        } catch (exp) {

        }
    }
}

function retainEnter(str) {
    if (!str) {
        return '';
    }
    var reg = new RegExp("\r\n", "gi");
    str = str.replace(reg, "<br/>");
    var reg2 = new RegExp("\n", "gi");
    str = str.replace(reg2, "<br/>");
    return str;
}


// 统一Ajax函数
function ajax(option) {
    var deferredObj = {};
    // 接口地址
    var url = option.url;
    // 参数
    var params = option.params || {};;
    // 成功的回调函数
    var success = option.success || function() {};
    // 发起请求前的回调函数
    var beforeSendCallBack = option.beforeSendCallBack || function() {};
    // 完成请求的回调函数
    var completeCallBack = option.completeCallBack || function() {};
    // 默认错误回调函数
    var errorCallBack = option.error || function() {};
    // 默认为异步请求
    var async = option.async !== undefined ? option.async : true;
    // 默认触发全局的Ajax 事件设置
    var global = option.global !== undefined ? option.global : true;
    // 定制的错误处理函数
    var errorHandler = option.errorHandler || function() {};
    // Ajax错误回调，如果没有定制，则执行一般的错误处理函数
    var ajaxErrorHandler = option.ajaxErrorHandler || errorCallBack;
    // 响应的数据类型
    var type = option.type === undefined ? 'json' : option.type;
    var needLoading = option.needLoading === undefined ? false : option.needLoading;
    // 请求方式: post ,get
    var method = option.method || 'get';
    // 请求内容编码
    var contentType = option.contentType || 'application/x-www-form-urlencoded';
    // 是否需要处理超时（默认true）
    var needHandleTimeout = option.needHandleTimeout == undefined ? true : option.needHandleTimeout;
    //  超时时间
    var timeout = option.timeout == undefined ? 20000 : option.timeout;

    params.rnd = Math.random();
    deferredObj = $.ajax({
        url: url,
        dataType: type,
        data: params,
        global: global,
        type: method,
        async: async,
        timeout: timeout,
        contentType: contentType,
        beforeSend: function() {
            beforeSendCallBack();
        },
        complete: function() {
            completeCallBack();
        },
        success: function(data) {
            if (data && parseInt(data.code, 10) == 0) {
                success(data);
            } else {
                // 如果有定制的错误处理函数，则执行错误的处理函数；否者执行一般的错误处理函数
                if (data && data.code && errorHandler[data.code]) {
                    errorHandler[data.code](data);
                } else {
                    errorCallBack(data);
                }
            }
        },
        error: function(data) {
            ajaxErrorHandler(data);
        }
    });
    return deferredObj;
}


function getAttr(obj, attr) {
    try {
        var result = eval('obj.' + attr);
        if (result === undefined || result === null) {
            result = '';
        }
        return result;
    } catch (exp) {}
    return '';
}

function getTimeSpan(day) {
    var now = new Date();
    var date = new Date(now.getTime() - (day * 24 * 3600 * 1000));
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    return year + '-' + padZero(month) + '-' + padZero(day)
}

function padZero(input) {
    if ((input + '').length == 1) {
        return '0' + input;
    }
    return input;
}

function checkLogin() {
    return ajax({
        url: setting.baseUrl + 'web/httpservice/userCheckLogin'
    });
}

function goLogin(backUrl) {
    location.href = 'goLogin?back=' + backUrl;
}

exports.goLogin = goLogin;
exports.checkLogin = checkLogin;
exports.getTimeSpan = getTimeSpan;
exports.ajax = ajax;
exports.getAttr = getAttr;
exports.retainEnter = retainEnter;
exports.clearStorageObj = clearStorageObj;
exports.getStorageObj = getStorageObj;
exports.setStorageObj = setStorageObj;
exports.getSearchParam = getSearchParam;
