import fetch from 'isomorphic-fetch'

const PAGE_SIZE = 20;
const API_HOME = '';
const API = {
    GET_CATEGORY: '/get/category',
    GET_TAGS: '/get/tags',
    GET_ARTICLE_LIST: '/get/articleList',
    GET_ARTICLE: '/get/article',

    PUT_CATEGORY: '/put/category',
    PUT_TAGS: '/put/tags',
    PUT_ARTICLE: '/put/article',

    REMOVE_CATEGORY: '/remove/category',
    REMOVE_TAGS: '/remove/tags',
    REMOVE_ARTICLE: '/remove/article',

    UPDATE_CATEGORY: '/update/category',
    UPDATE_TAGS: '/update/tags',
    UPDATE_ARTICLE: '/update/article',

    LIKE_ARTICLE: '/like/article',

    ADMIN_LOGIN: '/admin/login',
    ADMIN_LOGOUT: '/admin/logout',
    ADMIN_CHECKLOGIN: '/checkLogin',

    LOGGED: false
};

function GET(url, params, callback) {

    var newParams = '';
    if (params) {
        newParams += '?';
        for (var key in params) {
            newParams += key + '=' + params[key] + '&';
        }
    }

    fetch(API_HOME + url + newParams, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    }).then(res =>
        res.json()
    ).then(json => {
        if (json.status == 100) {
            if (json.dataList)
                callback && callback(undefined, json.dataList);
            else
                callback && callback(undefined, json.data);
        } else {
            callback && callback(json.message);
        }
    });
}


function POST(url, params, callback) {
    fetch(API_HOME + url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(params),
        credentials: 'include'
    }).then(res => {
            return res.json();
        }
    ).then(json => {

        if (json.status == -700) {
            callback('权限不足');
            return;
        }

        if (json.status == 100) {
            if (json.dataList)
                callback && callback(undefined, json.dataList);
            else
                callback && callback(undefined, json.data);
        } else {
            callback && callback(json.message);
        }
    })
}


/**
 *   Fetch static data just like 'catogory' and 'tag'
 *
 *   fetchIfNeed -> shouldFetch?
 *               -> should -> fetch -> {isFetching:true,data:null}
 *                         -> done
 *                         -> {isFetching:false,status:success||fail}
 *               -> shouldn't -> do no thing
 */

export const FETCH_REQUEST = 'FETCH_REQUEST';
export const FETCH_FAILURE = 'FETCH_FAILURE';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FORCE_UPDATE = 'FORCE_UPDATE';

export function fetchStaticDataIfNeed(dataName) {
    return (dispatch, getState) => {
        if (shouldFetchStaticData(getState(), dataName)) {
            return dispatch(fetchStaticData(dataName))
        } else {
            // needn't get data, but force update
            return dispatch({type: FORCE_UPDATE, dataName});
        }
    }
}
function shouldFetchStaticData(state, dataName) {
    const data = state.common[dataName];
    return !data;
}

function fetchStaticData(dataName) {
    return dispatch => {
        dispatch(requestStaticData(dataName));
        GET(API['GET_' + dataName.toUpperCase()], {}, (err, dataList) => {
            dispatch(receiveStaticData(dataName, err, dataList));
            if (err) {
                dispatch(showNotification(err));
            }
        })
    }
}

function requestStaticData(dataName) {
    return {
        type: FETCH_REQUEST,
        dataName
    }
}

function receiveStaticData(dataName, err, dataList) {
    return {
        type: err ? FETCH_FAILURE : FETCH_SUCCESS,
        err: err,
        dataName,
        dataList
    }
}

/**
 *   Fetch article list
 *
 *   fetch -> refresh  -> page = 1 -> fetch
 *         -> loadMore -> page = page -> fetch -> if no return -> then has no more
 */

export const FETCH_ARTICLES_REQUEST_REFRESH = 'FETCH_ARTICLES_REQUEST_REFRESH';
export const FETCH_ARTICLES_REQUEST_LOADMORE = 'FETCH_ARTICLES_REQUEST_LOADMORE';
export const FETCH_ARTICLES_FAILURE = 'FETCH_ARTICLES_FAILURE';
export const FETCH_ARTICLES_SUCCESS = 'FETCH_ARTICLES_SUCCESS';


export function refreshArticleList(dataName, params) {
    return (dispatch) => {
        dispatch(requestArticleList(dataName, FETCH_ARTICLES_REQUEST_REFRESH));
        GET(API['GET_ARTICLE_LIST'], {...params, pagesize: PAGE_SIZE, page: 1}, (err, dataList) => {
            dispatch(receiveArticleList(dataName, err, dataList));
            if (err) {
                dispatch(showNotification(err));
            }
        });
    }
}

export function loadMoreArticleList(dataName, params) {
    return (dispatch, getState) => {
        const page = getState().articleList[dataName] ? getState().articleList[dataName].page : 1;
        dispatch(requestArticleList(dataName, FETCH_ARTICLES_REQUEST_LOADMORE));
        GET(API['GET_ARTICLE_LIST'], {...params, pagesize: PAGE_SIZE, page: page}, (err, dataList) => {
            dispatch(receiveArticleList(dataName, err, dataList));
            if (err) {
                dispatch(showNotification(err));
            }
        });
    }
}

function requestArticleList(dataName, type) {
    return {
        type: type,
        dataName
    }
}

function receiveArticleList(dataName, err, dataList) {
    return {
        type: err ? FETCH_ARTICLES_FAILURE : FETCH_ARTICLES_SUCCESS,
        err: err,
        dataName,
        dataList
    }
}

/**
 *   Fetch article
 */


export const FETCH_ARTICLE_REQUEST = 'FETCH_ARTICLE_REQUEST';
export const FETCH_ARTICLE_FAILURE = 'FETCH_ARTICLE_FAILURE';
export const FETCH_ARTICLE_SUCCESS = 'FETCH_ARTICLE_SUCCESS';


export function fetchArticleIfNeed(id) {
    return (dispatch, getState) => {
        if (shouldFetchArticle(getState().articles, id)) {
            fetchArticle(dispatch, id);
        }
    }
}

function fetchArticle(dispatch, id) {
    dispatch(requestArticle(id));
    GET(API.GET_ARTICLE, {id}, (err, data) => {
        dispatch(receiveArticle(err, data, id));
        if (err) {
            dispatch(showNotification(err));
        }
    });
}

function shouldFetchArticle(articles, id) {
    return !articles[id];
}

function requestArticle(id) {
    return {
        type: FETCH_ARTICLE_REQUEST,
        id
    }
}

function receiveArticle(err, data, id) {
    return {
        type: err ? FETCH_ARTICLE_FAILURE : FETCH_ARTICLE_SUCCESS,
        id,
        data
    }
}


/**
 *      like or dislike a article
 *      just post a query
 *      needn't reducers
 */

export function likeOrDislikeArticle(id, type) {
    POST(API.LIKE_ARTICLE, {id, like: type}, (err)=> {
        if (err) {
            dispatch(showNotification(err));
        }
    });
}

export const SHOW_NOTIFICATION = "SHOW_NOTIFICATION";
export const HIDE_NOTIFICATION = "HIDE_NOTIFACATION";

var timmer;
export function showNotification(content) {
    return (dispatch) => {
        if (timmer) {
            clearTimeout(timmer);
        }
        dispatch({type: SHOW_NOTIFICATION, content});
        timmer = setTimeout(()=> {
            dispatch({type: HIDE_NOTIFICATION});
        }, 5000);
    }
}

export const SHOW_CONFIRM = "SHOW_CONFIRM";
export const HIDE_CONFIRM = "HIDE_CONFIRM";
export const EXCU_CONFIRM = "EXCU_CONFIRM";

export function showConfirm(title, content, action) {
    return {
        type: SHOW_CONFIRM,
        title, content, action
    };
}

export function hideConfirm() {
    return {type: HIDE_CONFIRM};
}

export function excuConfirmAction() {
    return (dispatch, getState) => {
        dispatch(getState().confirm.ac());
        dispatch({type: EXCU_CONFIRM});
    }
}

/**
 *      Login
 */
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export function login(userName, password) {
    return (dispatch) => {
        if (userName == "") {
            dispatch(showNotification("用户名不能为空"));
            return;
        }
        if (password == "") {
            dispatch(showNotification("密码不能为空"));
            return;
        }
        dispatch({type: LOGIN_REQUEST});

        POST(API.ADMIN_LOGIN, {userName: userName, password: password}, (err) => {
            if (err) {
                dispatch(showNotification("登录失败,ERR:" + err));
                dispatch({type: LOGIN_FAILURE});
            } else {
                dispatch(showNotification("登录成功"));
                dispatch({type: LOGIN_SUCCESS});
            }
        })
    }
}


/**
 *      check Login
 */
export const CHECK_LOGIN_SUCCESS = 'CHECK_LOGIN_SUCCESS';

export function checkLogin() {
    return (dispatch) => {
        POST(API.ADMIN_CHECKLOGIN, undefined, (err) => {
            if (err == undefined) {
                dispatch({type: CHECK_LOGIN_SUCCESS});
            }
        });
    }
}


/**
 *      Login out
 */
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export function logout() {
    return (dispatch) => {
        dispatch({type: LOGOUT_REQUEST});
        POST(API.ADMIN_LOGOUT, undefined, (err) => {
            if (err == undefined) {
                dispatch(showNotification("退出登录成功"));
                dispatch({type: LOGOUT_SUCCESS});
            } else {
                dispatch(showNotification("退出登录失败,ERR:" + err));
                dispatch({type: LOGOUT_FAILURE});
            }
        })
    }
}


/**
 *      admin
 */
export const ADMIN_REQUEST = 'ADMIN_REQUEST';
export const ADMIN_DONE = 'ADMIN_DONE';

export function addOneThing(thing, params) {
    console.log("thing", thing);
    console.log("params", params);
    return dispatch => {
        dispatch({type: ADMIN_REQUEST});
        POST(API['PUT_' + thing.toUpperCase()], params, (err) => {
            if (err) {
                dispatch(showNotification(err));
            } else {
                dispatch(showNotification("添加成功"));
                if (thing == 'tags' || thing == 'category') {
                    dispatch(fetchStaticData(thing));
                }
            }
            dispatch({type: ADMIN_DONE});
        });
    }
}

export function removeOneThing(thing, id) {
    return dispatch => {
        dispatch({type: ADMIN_REQUEST});
        POST(API['REMOVE_' + thing.toUpperCase()], {id}, (err) => {
            if (err) {
                dispatch(showNotification(err));
            } else {
                dispatch(showNotification("删除成功"));
                if (thing == 'tags' || thing == 'category') {
                    dispatch(fetchStaticData(thing));
                }
            }
            dispatch({type: ADMIN_DONE});
        });
    }
}

export function editOneThing(thing, id, params) {
    return dispatch => {
        dispatch({type: ADMIN_REQUEST});
        POST(API['UPDATE_' + thing.toUpperCase()], {id: id, set: params}, (err) => {
            if (err) {
                dispatch(showNotification(err));
            } else {
                dispatch(showNotification("修改成功"));
                if (thing == 'tags' || thing == 'category') {
                    dispatch(fetchStaticData(thing));
                } else if(thing == 'article') {
                    fetchArticle(dispatch,id);
                }
            }
            dispatch({type: ADMIN_DONE});
        });
    }
}

