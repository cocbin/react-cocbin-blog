'use strict';

const React = require('react');
const renderToString = require('react').renderToString;
const match  = require('react-router').match;
const RoutingContext = require('react-router').RouterContext;
//const routes = require('../client/routers');

import { createStore, compose } from 'redux';
import { Provider } from 'react-redux';

module.exports = function(req, res, getInitState) {

    res.render('index', {markup:"",state:""});

    //match({ routes, location: req.path }, (err, redirectLocation, props) => {
    //    if (err) {
    //        res.status(500).send(err.message);
    //    } else if (redirectLocation) {
    //        res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    //    } else if (props) {
    //        getInitState(req,(err,state)=>{
    //            if(err) {
    //                res.sendStatus(404);
    //            } else {
    //                props.location.state = state;
    //            }
    //            const markup = renderToString(
    //                <RoutingContext {...props}/>
    //            );
    //            res.render('index', {markup:markup,state:state});
    //        });
    //    } else {
    //        console.log("404");
    //        res.sendStatus(404);
    //    }
    //});
};