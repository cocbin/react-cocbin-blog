import {
    FETCH_REQUEST, FETCH_FAILURE, FETCH_SUCCESS, FORCE_UPDATE,
    FETCH_ARTICLES_REQUEST_REFRESH, FETCH_ARTICLES_REQUEST_LOADMORE, FETCH_ARTICLES_SUCCESS, FETCH_ARTICLES_FAILURE,
    FETCH_ARTICLE_REQUEST, FETCH_ARTICLE_SUCCESS, FETCH_ARTICLE_FAILURE,
    SHOW_NOTIFICATION, HIDE_NOTIFICATION,
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
    LOGOUT_REQUEST, LOGOUT_FAILURE, LOGOUT_SUCCESS,
    CHECK_LOGIN_SUCCESS,
    SHOW_CONFIRM, HIDE_CONFIRM, EXCU_CONFIRM,
    ADMIN_REQUEST,ADMIN_DONE
} from '../actions'

export function common(state = {}, action) {
    switch (action.type) {
        case FETCH_REQUEST:
            return {
                ...state, [action.dataName]: {
                    isFetching: true,
                    dataList: [],
                    hash: ""
                }
            };
        case FETCH_FAILURE:
            return {
                ...state, [action.dataName]: {
                    isFetching: false,
                    error: action.err
                }
            };
        case FETCH_SUCCESS:
            return {
                ...state, [action.dataName]: {
                    isFetching: false,
                    dataList: action.dataList,
                    hash: ""
                }
            };
        case FORCE_UPDATE:
            return {
                ...state, [action.dataName]: {
                    ...state[action.dataName], hash: new Date().getTime()
                }
            };
        default:
            return state;
    }
}

export function articleList(state = {}, action) {
    switch (action.type) {
        case FETCH_ARTICLES_REQUEST_REFRESH:
            return {
                ...state, [action.dataName]: {
                    page: 1,
                    noMore: false,
                    isFetching: true,
                    dataList: []
                }
            };
        case FETCH_ARTICLES_REQUEST_LOADMORE:
            return {
                ...state, [action.dataName]: {
                    page: state[action.dataName].page,
                    noMore: false,
                    isFetching: true,
                    dataList: state[action.dataName].dataList
                }
            };
            break;
        case FETCH_ARTICLES_SUCCESS:
            return {
                ...state, [action.dataName]: {
                    page: state[action.dataName].page + 1,
                    noMore: action.dataList.length == 0,
                    isFetching: false,
                    dataList: state[action.dataName].dataList.concat(action.dataList)
                }
            };
        case FETCH_ARTICLES_FAILURE:
            return {
                ...state, [action.dataName]: {
                    isFetching: false,
                    error: action.err
                }
            };
        default :
            return state;
    }
}

export function articles(state = {}, action) {
    switch (action.type) {
        case FETCH_ARTICLE_REQUEST:
            return {
                ...state,
                isFetching: true
            };
        case FETCH_ARTICLE_SUCCESS:
            return {
                ...state,
                articles: {...state.articles, [action.id]: action.data},
                isFetching: false
            };
        case  FETCH_ARTICLE_FAILURE:
            return {
                isFetching: false,
                error: action.err
            };
        default:
            return state;
    }
}

export function notification(state = {show: false, content: ""}, action) {
    switch (action.type) {
        case SHOW_NOTIFICATION:
            return {show: true, content: action.content};
        case HIDE_NOTIFICATION:
            return {show: false};
        default:
            return state;
    }
}

export function login(state = {logged: false, isFetching: false}, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {logged: false, isFetching: true};
        case LOGIN_SUCCESS:
            return {logged: true, isFetching: false};
        case LOGIN_FAILURE:
            return {logged: false, isFetching: false};
        case CHECK_LOGIN_SUCCESS:
            return {isFetching: false, logged: true};
        case LOGOUT_REQUEST:
            return {logged: true, isFetching: true};
        case LOGOUT_SUCCESS:
            return {logged: false, isFetching: false};
        case LOGOUT_FAILURE:
            return {logged: true, isFetching: false};
        default:
            return state;
    }
}

export function confirm(state = {show: false, title: "", content: "", ac: {}}, action) {
    switch (action.type) {
        case SHOW_CONFIRM:
            return {show: true, title: action.title, content: action.content, ac: action.action};
        case HIDE_CONFIRM:
            return {show: false, title: "", content: ""};
        case EXCU_CONFIRM:
            return {show: false, title: "", content: ""};
        default:
            return state;
    }
}

export function admin(state = {isFetching:false},action) {
    switch(action.type) {
        case ADMIN_REQUEST:
            return {isFetching:true};
        case ADMIN_DONE:
            return {isFetching:false};
        default:
            return state;
    }
}