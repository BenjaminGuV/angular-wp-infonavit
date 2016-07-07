var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    //entry: "./js/index.js",
    entry: {
        //angular: "./app/init.ts",
        //app: "./js/index.js"
        app: [ 
            "./app/init.ts", 
            "./node_modules/bootstrap/dist/js/bootstrap.js",
            "./js/index.js"
        ]
    },
    output: {
        path: __dirname,
        filename: "./js/app.js"
    },
    devtool: 'source-map',
    module: {
        loaders: [
            /*{ test: /\.css$/, loader: "style!css" },*/
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
            { 
                test: /\.js$/,
                exclude: /node_modules/,
                /*loader: 'imports?jQuery=jquery' */
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.ts/,
                loaders: ['ts-loader'],
                exclude: /node_modules/
            },
            {test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff'},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'}
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery'
        }),
        new ExtractTextPlugin("css/app.css"),
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false }
        })
    ],
    resolve: {
        alias: {
            jquery: "jquery/src/jquery.js"
        },
        extensions: ['', '.js', '.ts']
    }
};