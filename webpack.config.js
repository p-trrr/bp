const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        bundle: path.resolve(__dirname, 'src/index.js'),
    },
    output: {
        path: path.resolve(__dirname, 'dist'), // Output directory
        filename: '[name].js', // Name of the bundled file
        clean: true,
        assetModuleFilename: '[name][ext]',
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 3000,
        proxy: [
            {
                context: ['/api'],
                target: 'http://localhost:3001',
                secure: false,
                changeOrigin: true
            }
        ]
    },
    plugins: [
    new HtmlWebpackPlugin({
        template: './src/index.html' // Path to your HTML file
    })
    ],
    module: {
    rules: [
        {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env']
            }
        }
        }
    ]
    }
};
