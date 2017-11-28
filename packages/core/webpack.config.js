var webpack = require('webpack');
var poststylus = require('poststylus');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

module.exports = {

    entry: {
        index: './site/main.js'
    },

    output: {
        path: __dirname + "build",
        filename: 'bundle.js'
    },

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel'
            },
            {
                test: /\.css?$/,
                loader: ExtractTextPlugin.extract('css')
            },
            {
                test: /\.styl$/,
                loader: ExtractTextPlugin.extract("stylus", "css-loader!stylus-loader")
            },
        ]
    },

    stylus: {
        use: [
            poststylus(['autoprefixer', 'rucksack-css'])
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: './index.html', //相对publicPath
            template: './site/index.html',  //相对config
            inject: 'body',
            hash: true
        }),
        new ExtractTextPlugin('style/[name].bundle.css')
    ],

    resolve: {
        extenions: ['', '.js', '.min.js', '.jsx']
    },

    devtool: "source-map"
}