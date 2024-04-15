const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.js', // Entry point of your application
    output: {
        path: path.resolve(__dirname, 'dist'), // Output directory
        filename: 'bundle.js' // Name of the bundled file
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 3000
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
