const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/main.jsx',
    output: {
        filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                minified: true,
                presets: ['env', 'react']
            }
        }, {
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader'
            ]
        }]
    },
    mode: 'none',
    optimization: {
        // runtimeChunk: {
            // name: 'manifest'
        // },
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all'
                }
            }
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            xhtml: true
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css'
        })
    ]
};
