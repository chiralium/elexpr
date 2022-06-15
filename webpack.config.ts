import { Configuration } from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import DotenvWebpackPlugin from 'dotenv-webpack';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import UglifyJsWebpackPlugin from 'uglifyjs-webpack-plugin';

const PATH_LIST = {
    SRC: path.resolve(__dirname, 'src'),
    APP: path.resolve(__dirname, 'src', 'app'),
    INDEX: path.resolve(__dirname, 'src', 'app', 'index.tsx'),
    BUILD: path.resolve(__dirname, 'build'),
    TEMPLATE: path.resolve(__dirname, 'src', 'index.html')
};

const isProd = process.env.NODE_ENV === 'production';

const styleLoader = isProd ? MiniCssExtractPlugin.loader : 'style-loader';
const stylePlugins = isProd ? [new MiniCssExtractPlugin({ filename: 'style.css' })] : [];
const optimization = isProd
    ? {
        minimize: true,
        minimizer: [
            new UglifyJsWebpackPlugin({
                uglifyOptions: {
                    output: {
                        comments: false
                    }
                }
            })
        ],
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    }
    : undefined;

// @ts-ignore
const webpackConfig: Configuration = {
    devtool: isProd ? false : 'source-map',
    context: PATH_LIST.SRC,
    entry: PATH_LIST.INDEX,
    output: {
        path: PATH_LIST.BUILD,
        filename: '[name][contenthash].min.js',
        publicPath: '/',
        clean: true
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx'],
        alias: {
            app: PATH_LIST.APP,
            src: PATH_LIST.SRC
        }
    },
    module: {
        rules: [
            {
                test: /\.svg$/i,
                issuer: /\.[jt]sx?$/,
                use: ['@svgr/webpack']
            },
            {
                test: /\.(ts|tsx)$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /.less$/,
                use: [
                    styleLoader,
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ]
            }
        ]
    },
    // @ts-ignore
    optimization,
    plugins: [
        ...stylePlugins,
        new HtmlWebpackPlugin({
            template: PATH_LIST.TEMPLATE
        }),
        new DotenvWebpackPlugin(),
        new CircularDependencyPlugin({
            exclude: /a\.js|node_modules/,
            failOnError: true,
            allowAsyncCycles: false,
            cwd: process.cwd()
        })
    ]
}

export default webpackConfig;
