var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
// var InlineEnviromentVariablesPlugin = require('inline-environment-variables-webpack-plugin');

var path = require('path');
var production = process.env.NODE_ENV === 'production';
const PATH = {
    public: path.join(__dirname, '/public'),
    image_dir: path.join(__dirname, '/public/images')
}

var env = new webpack.DefinePlugin({
    'process.env': JSON.stringify(process.env),
})

var plugins = [
    new ExtractTextPlugin('./css/styles.css', {
        allChunks: true
    })
]

if (process.env.NODE_ENV == 'production') {
    plugins = [
        new ExtractTextPlugin('./css/styles.min.css', {
            allChunks: true
        }),
        new webpack.optimize.UglifyJsPlugin({
            compressor: { warnings: false }
        })
    ];
}

module.exports = [{
    mode: production ? 'production' : 'development',
    entry: {
        app: [
            './modules/main.js'
        ]
    },
    output: {
        path: PATH.public,
        filename: 'js/[name].js',
        chunkFilename: 'js/[name].bundle.js',
        publicPath: production ? '/public/' : '/public/'
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
}]
