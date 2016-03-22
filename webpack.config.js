var webpack = require('webpack');
module.exports = {
    entry: [
        'webpack/hot/only-dev-server',
        "./js/App"
    ],
    output: {
        path: './build',
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.js?$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/
            },
            {
                test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'
            },
            {
                test: /\.css$/, loader: "style!css"
            },
            {
                test:/\.(gif|jpg|png|woff|woff2|svg|eot|ttf)/,loader:'url-loader?limit=50000&name=[path][name].[ext]'
            },
            {
                test: /\.less/, loader: 'style-loader!css-loader!less-loader'
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.json']
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};
