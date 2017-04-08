var path = require("path");

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    entry: {
        app: [ './src/main.js' ]
    },

    output: {
        path: path.resolve(__dirname, './../dev'),
        publicPath: '',
        filename: '[name].bundle.js',
        sourceMapFilename: '[name].map',
        chunkFilename: '[id].chunk.js'
    },

    resolve: {
        extensions: [ '.js', '.elm' ],
        modules: [ path.resolve(__dirname, './../node_modules') ]
    },

    module: {
        rules: [
            { 
                test: /\.css$/, use: [
                    'exports-loader?module.exports.toString()',
                    'css-loader?sourceMap=false&importLoaders=1&minimize=true',
                ] 
            },
            { test: /\.html$/, loader: 'raw-loader' },
            {
                test: /\.elm$/,
                loader:  'elm-webpack-loader?verbose=true&warn=true',
            }
        ],
        noParse: /\.elm$/
    },

    plugins: [

        new HtmlWebpackPlugin({
            title: 'My App',
            template: './config/index.template.ejs'
        })

    ],

    devtool: 'inline-source-map',

    devServer: {
        inline: true,
        stats: { colors: true },
        port: 3000,
        contentBase: './dev'
    }

};