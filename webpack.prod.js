var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const ReactLoadablePlugin = require('react-loadable/webpack').ReactLoadablePlugin;  //TODO in opinion
// var InlineEnviromentVariablesPlugin = require('inline-environment-variables-webpack-plugin');

const PATH = {
    build_dir: path.join(__dirname, '/build'),
    image_dir: path.join(__dirname, '/public/images')
}

var env = new webpack.DefinePlugin({
    'process.env': JSON.stringify(process.env),
})

const plugins = [
    new ReactLoadablePlugin({
      filename: './build/react-loadable.json',
    }),
    new ExtractTextPlugin('./css/styles.min.css', {
        allChunks: true
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
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: 'string-replace-loader',
                            options: {
                                search:'"http://127.0.0.1:3000',
                                replace:'"https://traduction.xyz',
                                flags:'g'
                            }
                        },
                        { loader: 'css-loader' },
                        { loader: 'sass-loader' }
                    ]
                }),
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
    optimization: {
        splitChunks: {
            cacheGroups: {
                //Write splitChunks configuration in optimization object in root of the webpack config object.
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    chunks: "all"
                }
            }
        }
    }
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
