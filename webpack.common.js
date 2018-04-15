const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = {
    context: path.resolve('./src'),
    entry: './index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    mode: 'development',
    module: {
      rules: [
        {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    { loader: 'postcss-loader' },
                    'sass-loader'
                ]
            })
        },
        {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader'
            })
        },
        {
            test: /\.(png|svg|jpg|gif)$/,
            use: {
                loader: 'file-loader',
                options: {
                    name: 'img/[name].[ext]',
                }
            }
        },
        {
			test: /\.html$/,
			use: [{
                loader: 'html-loader',
                options: {
                    minimize: true,
                    removeComments: true,
                    collapseWhitespace: false
                }
            }]
		}
      ]
    },
    plugins: [
        new ExtractTextPlugin("styles.css"),
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: './index.html',
            favicon: './favicon.ico'
        }),
    ]
};