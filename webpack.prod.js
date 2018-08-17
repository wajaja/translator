var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
// var InlineEnviromentVariablesPlugin = require('inline-environment-variables-webpack-plugin');

const PATH = {
    build_dir: path.join(__dirname, '/build'),
    image_dir: path.join(__dirname, '/public/images')
}

var env = new webpack.DefinePlugin({
    'process.env': JSON.stringify(process.env),
})

const plugins = [
    new ExtractTextPlugin('./css/styles.min.css', {
        allChunks: true
    }),
    new webpack.optimization.minimize({
        compressor: { warnings: false }
    })
];

module.exports = [{
    mode: 'production',
    entry: {
        app: [
            './modules/main.js'
        ]
    },
    output: {
        path: PATH.build_dir,
        filename: 'js/[name].js',
        chunkFilename: 'js/[name].bundle.js',
        publicPath: '/build/'
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
    mode: 'production',
    entry: path.resolve(__dirname, './bin/www'),
    output: {
        path: PATH.build_dir,
        filename: 'server.js',
        publicPath: '/build/'
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
