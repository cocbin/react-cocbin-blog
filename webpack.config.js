'use strict';

let webpack = require('webpack');
let ExtractTextPlugin = require("extract-text-webpack-plugin");

let extractCSS = new ExtractTextPlugin('[name].css');

module.exports = [{
    name:'browser',
    entry: {
        app: "./client"
    },
    output: {
        path: __dirname + '/build',
        filename: "[name].js",
        publicPath:"/"
    },
    module: {
        loaders: [
            {
                test: /\.js?$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/
            },
            {
                test: /\.js$/, exclude: /node_modules/, loader: 'babel'
            },
            {
                test:/\.css$/, loader: extractCSS.extract('style', 'css')
            },
            {
                test: /\.less$/i, loader: extractCSS.extract('style','css!less')
            },
            {
                test:/\.(gif|jpg|png|woff|woff2|svg|eot|ttf)/,loader:'url?limit=50000&name=[path][name].[ext]'
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.json']
    },
    plugins: [
        extractCSS,
        //new webpack.optimize.CommonsChunkPlugin('vendor',  'vendor.js'),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        }),
        //new webpack.optimize.UglifyJsPlugin({
        //    compress: {
        //        warnings: false
        //    }
        //})
    ]},
    {
    name:'server-side rendering',
    entry: {
        page: "./server/page.js"
    },
    output: {
        path: __dirname + '/server',
        filename: "[name].generated.js",
        publicPath:"/",
        libraryTarget: "commonjs2" // commonjs模式
    },
    module: {
        loaders: [
            {
                test: /\.js?$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/
            },
            {
                test: /\.js$/, exclude: /node_modules/, loader: 'babel'
            },
            {
                test:/\.css$/, loader: extractCSS.extract('style', 'css')
            },
            {
                test: /\.less$/i, loader: extractCSS.extract('style','css!less')
            },
            {
                test:/\.(gif|jpg|png|woff|woff2|svg|eot|ttf)/,loader:'url?limit=50000&name=[path][name].[ext]'
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.json']
    },
    plugins: [
        extractCSS,
        //new webpack.optimize.CommonsChunkPlugin('vendor',  'vendor.js'),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        }),
        //new webpack.optimize.UglifyJsPlugin({
        //    compress: {
        //        warnings: false
        //    }
        //})
    ]
}];
