var webpack = require("webpack");

module.exports = {
    //entry: "./js/index.js",
    entry: {
        //angular: "./app/init.ts",
        //app: "./js/index.js"
        app: [ "./app/init.ts", "./js/index.js" ]
    },
    output: {
        path: __dirname,
        filename: "./js/app.js"
    },
    devtool: 'source-map',
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
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
        })
    ],
    resolve: {
        alias: {
            jquery: "jquery/src/jquery.js"
        },
        extensions: ['', '.js', '.ts']
    }
};