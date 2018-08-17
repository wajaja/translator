const CleanWebpackPlugin = require('clean-webpack-plugin');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var nodeExternals = require('webpack-node-externals');
var path = require('path');
// var InlineEnviromentVariablesPlugin = require('inline-environment-variables-webpack-plugin');

var production = process.env.NODE_ENV === 'production';
const PATH = {
    build_dir: path.join(__dirname, '/build'),
    image_dir: path.join(__dirname, '/public/images')
}

var env = new webpack.DefinePlugin({
    'process.env': JSON.stringify(process.env),
})


module.exports = [{
    entry: {
        app: [
            './modules/main.js'
        ]
    },
    output: {
        path: PATH.build_dir,
        filename: 'js/[name].js',
        chunkFilename: 'js/[name].bundle.js',
        publicPath: production ? '/build/' : '/build/'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loaders: ['jsx-loader', 'babel-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.s?css$/,
                loader: ExtractTextPlugin.extract('css-loader!sass-loader'),
            }
        ]
    },
    resolve: {
        modules: [__dirname, 'node_modules'],
        alias: {
            components: 'modules/components',
            actions: 'modules/actions',
            reducers: 'modules/reducers',
            utils: 'modules/utils',
            images: PATH.image_dir
        },
        extensions: ['*', '.js', '.jsx']
    },
    plugins: plugins,
},
//server side rendering config
{
    target: 'node',
    externals: [nodeExternals()],
    entry: path.resolve(__dirname, './bin/www'),
    output: {
        path: PATH.build_dir,
        filename: 'server.js',
        publicPath: production ? '/build/' : '/build/'
    },
    resolve: {
        modules: [__dirname, 'node_modules'],
        alias: {
            components: 'modules/components',
            actions: 'modules/actions',
            reducers: 'modules/reducers',
            utils: 'modules/utils',
            images: PATH.image_dir
        },
        extensions: ['*', '.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loaders: ['jsx-loader', 'babel-loader'],
                exclude: /node_modules/,
            }
            // ,{
            //     test: /\.s?css$/,
            //     loader: ExtractTextPlugin.extract('css-loader!sass-loader'),
            // }
            // ,{
            //     test: /\.(ttf|eot|otf|svg|png)$/,
            //     loader: 'file-loader?emitFile=false'
            // },
            // {
            //     test: /\.(woff|woff2)$/,
            //     loader: 'url-loader?emitFile=false'
            // }
        ]
    }
}]
