'use strict';

const API_HOME = 'http://localhost:3000';

function GET(url,params,callback) {

    var newParams = '';
    if(params) {
        newParams += '?';
        for(var key in params) {
            newParams += key + '=' + params[key] + '&';
        }
    }

    fetch(API_HOME+url+newParams,{
        method:'GET',
        headers:{'Content-Type':'application/json'}
    }).then(res=>
        res.json()
    ).then(json => {
        if(json.status == 100) {
            if(json.dataList)
                callback&&callback(undefined,json.dataList);
            else
                callback&&callback(undefined,json.data);
        } else {
            callback&&callback(json.message);
        }
    });
}

function POST(url,params,callback) {
    fetch(API_HOME + url,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(params),
        credentials:'include'
    }).then(res => {return res.json();}
    ).then(json => {

        if(json.status == -700) {
            callback('权限不足');
            return ;
        }

        if(json.status == 100) {
            console.log(json);
            if(json.dataList)
                callback&&callback(undefined,json.dataList);
            else
                callback&&callback(undefined,json.data);
        } else {
            callback&&callback(json.message);
        }
    })
}

var API = {
    GET_CATEGORY:'/get/category',
    GET_TAGS:'/get/tags',
    GET_ARTICLE_LIST:'/get/articleList',
    GET_ARTICLE:'/get/article',

    PUT_CATEGORY:'/put/category',
    PUT_TAGS:'/put/tags',
    PUT_ARTICLE:'/put/article',

    REMOVE_CATEGORY:'/remove/category',
    REMOVE_TAGS:'/remove/tags',
    REMOVE_ARTICLE:'/remove/article',

    UPDATE_CATEGORY:'/update/category',
    UPDATE_TAGS:'/update/tags',
    UPDATE_ARTICLE:'/update/article',

    LIKE_ARTICLE:'/like/article',

    ADMIN_LOGIN:'/admin/login',
    ADMIN_LOGOUT:'/admin/logout',
    ADMIN_CHECKLOGIN:'/checkLogin',

    LOGGED:false
};

module.exports.GET = GET;
module.exports.POST = POST;
module.exports.API = API;