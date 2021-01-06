var webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const nodeExternals = require('webpack-node-externals');
const ReactLoadablePlugin = require('react-loadable/webpack').ReactLoadablePlugin;  //TODO in opinion
// var InlineEnviromentVariablesPlugin = require('inline-environment-variables-webpack-plugin');

var path = require('path');
const PATH = {
    build_dir: path.join(__dirname, '/build'),
    image_dir: path.join(__dirname, '/public/images')
}

var env = new webpack.DefinePlugin({
    'process.env': JSON.stringify(process.env),
})

var plugins = [
    new ReactLoadablePlugin({
      filename: './build/react-loadable.json',
    }),
    new MiniCssExtractPlugin({
        filename: './css/styles.css',
        allChunks: true
    }),
]

module.exports = [{
    mode: 'production',
    devtool: 'inline-source-map',
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
                loaders: ['babel-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.s?css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                          hmr: process.env.NODE_ENV === 'development',
                        },
                    },
                    {
                        loader: 'string-replace-loader',
                        options: {
                            search:'"http://127.0.0.1:3000',
                            replace:'"http://civiliser.com',
                            flags:'g'
                        }
                    },
                    { loader: 'css-loader' },
                    { loader: 'sass-loader' }
                ]
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
    devtool: 'inline-source-map',
    externals: [nodeExternals()],
    mode: 'production',
    entry: path.resolve(__dirname, './bin/cluster.js'),
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
                loaders: ['babel-loader'],
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