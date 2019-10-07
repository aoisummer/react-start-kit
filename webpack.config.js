const path = require('path');

const webpack = require('webpack');
const WebpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const packageData = require('./package.json');

module.exports = (env, argv) => {
    return WebpackMerge({
        mode: 'none',
        devtool: env === 'production' ? false : 'eval-source-map',
        entry: {
            main: (env === 'production' ? ['core-js/es/map', 'core-js/es/set', 'regenerator-runtime/runtime'] : []).concat(['./src/main.js'])
        },
        output: {
            filename: 'assets/[name].js',
            path: path.resolve(__dirname, 'dist')
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/,
                    query: {
                        presets: [
                            ['@babel/preset-env', env === 'production' ? { useBuiltIns: 'usage', corejs: 3, targets: packageData._browserslist } : { targets: packageData._browserslistDev }], /*exclude: ['@babel/plugin-transform-async-to-generator', '@babel/plugin-transform-regenerator']*/
                            '@babel/preset-react'
                        ],
                        plugins: env === 'production' ? ['@babel/plugin-transform-regenerator'] : []
                    }
                }, {
                    test: /\.css$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                publicPath: '../'
                            }
                        },
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    require('postcss-import'),
                                    require('postcss-preset-env')({ features: { 'nesting-rules': true }, autoprefixer: { flexbox: 'no-2009', overrideBrowserslist: packageData._browserslist } })
                                ]
                            }
                        }
                    ]
                }, {
                    test: /\.(png|jpe?g|gif)$/,
                    use: [
                        { loader: 'file-loader', options: { name: 'assets/[name].[ext]' } }
                    ]
                }
            ]
        },
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
            },
            minimize: env === 'production',
            minimizer: [
                new UglifyJsPlugin(),
                new OptimizeCSSAssetsPlugin()
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: 'src/index.html',
                minify: env === 'production',
                xhtml: true
            }),
            new MiniCssExtractPlugin({
                filename: 'assets/[name].css'
            })
        ]
    },
    env === 'production' ?
    {
        mode: 'production',
        plugins: [
            new CleanWebpackPlugin(['dist'])
        ]
    } :
    {
        mode: 'development'
    });
};
