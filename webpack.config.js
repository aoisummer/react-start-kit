const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, argv) => {
    const isProd = env === 'production';
    const plugins = [
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            minify: isProd,
            xhtml: true
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/css/[name].css'
        })
    ];
    if (isProd) {
        plugins.push(
            new CleanWebpackPlugin()
        );
    }

    return {
        mode: isProd ? 'production' : 'development',
        devtool: isProd ? false : 'eval-source-map',
        entry: {
            main: path.resolve(__dirname, 'src/main.js')
        },
        output: {
            filename: 'assets/js/[name].js',
            path: path.resolve(__dirname, 'dist')
        },
        module: {
            rules: [
                {
                    test: /\.(mjs|js|jsx)$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/,
                    query: {
                        presets: [
                            ['@babel/preset-env', { useBuiltIns: 'usage', corejs: 3 }],
                            '@babel/preset-react'
                        ]
                    }
                },
                {
                    test: /\.css$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                publicPath: '../../'
                            }
                        },
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    require('postcss-import'),
                                    require('postcss-preset-env')({ features: { 'nesting-rules': true }, autoprefixer: { flexbox: 'no-2009' } })
                                ]
                            }
                        }
                    ]
                },
                {
                    test: /\.(png|jpe?g|gif)$/,
                    use: [
                        { loader: 'file-loader', options: { name: 'assets/image/[name].[ext]' } }
                    ]
                }
            ]
        },
        optimization: {
            splitChunks: {
                cacheGroups: {
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendor',
                        chunks: 'all'
                    }
                }
            },
            minimize: isProd,
            minimizer: [
                new TerserPlugin({ extractComments: false }),
                new OptimizeCSSAssetsPlugin()
            ]
        },
        plugins
    };
};
