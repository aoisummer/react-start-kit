const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = function (env, argv) {
    let mode = env != null && env === 'production' ? 'production' : 'development';
    let useHash = argv.hash != null;
    return webpackMerge({
        mode: mode,
        devtool: mode === 'production' ? false : 'inline-source-map',
        entry: './src/main.js',
        output: {
            filename: useHash ? 'assets/[name].[chunkhash:8].js' : 'assets/[name].js',
            path: path.resolve(__dirname, 'dist')
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/,
                    query: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: ['@babel/plugin-transform-regenerator']
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
                                    require('postcss-preset-env')({ autoprefixer: { flexbox: 'no-2009' } })
                                ]
                            }
                        }
                    ]
                }, {
                    test: /\.(png|jpe?g|gif)$/,
                    use: [
                        { loader: 'file-loader', options: { name: useHash ? 'assets/[name].[hash:8].[ext]' : 'assets/[name].[ext]' } }
                    ]
                }
            ]
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
            },
            minimize: mode === 'production',
            minimizer: [
                new UglifyJsPlugin(),
                new OptimizeCSSAssetsPlugin()
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: 'src/index.html',
                minify: mode === 'production',
                xhtml: true
            }),
            new MiniCssExtractPlugin({
                filename: useHash ? 'assets/[name].[hash:8].css' : 'assets/[name].css'
            })
        ]
    },
    mode === 'production' ? {
        plugins: [
            new CleanWebpackPlugin(['dist'])
        ]
    } : {});
};
