import React from 'react';
import ReactDOM from 'react-dom';
import Routers from './routers';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
//import createLogger from 'redux-logger';
import {browserHistory} from 'react-router';
import {Provider} from 'react-redux';
import {syncHistoryWithStore, routerReducer,routerMiddleware} from 'react-router-redux'
import * as reducers from './reducers';

const reactRouterMiddleware = routerMiddleware(browserHistory);
const store = createStore(
    combineReducers({
        ...reducers,
        routing: routerReducer
    }),
    applyMiddleware(thunkMiddleware,reactRouterMiddleware)
);

const history = syncHistoryWithStore(browserHistory, store);
ReactDOM.render(
    <Provider store={store}>
        {Routers(history)}
    </Provider>,
    document.getElementById('react-main')
);
