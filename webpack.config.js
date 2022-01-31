const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require('webpack');

module.exports = {
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].bundle.js",
        clean: true,
    },
    entry: {
        index: './src/index.js',
        another: './src/logic/calculate.js',
    },
    experiments: {
        asyncWebAssembly: true,
    },
    resolve: {
        alias: {
            "react-is": path.resolve(__dirname, 'node_modules/react-is'),
        },
    },
    stats: {
        errorDetails: true,
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, "dist"),
        },
        client: {
            overlay: true,
        },
        compress: true,
        port: 3000,
        hot: true, 
    },
    module: { 
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /nodeModules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ]
    },
    optimization: {
        chunkIds: 'total-size',
        mangleWasmImports: true,
        moduleIds: 'size',
        nodeEnv: 'production',
        minimize: true,
        minimizer: [new TerserPlugin()],
        splitChunks: {
            chunks: 'all',
        },
    },
    plugins: [
        new webpack.ContextReplacementPlugin(/rust-password-wasm/),
        new HtmlWebpackPlugin({ template: './src/index.html' }),
        new DuplicatePackageCheckerPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new CompressionPlugin({
            algorithm: "gzip",
            test: /\.js$|\.css$|\.html$/,
            threshold: 10240,
            minRatio: 0.8
        })
    ],
}