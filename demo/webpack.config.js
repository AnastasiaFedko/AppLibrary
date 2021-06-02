const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    context: __dirname,
    entry: ['./index.js'],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'out'),
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: 'assets',
                    to: 'assets'
                },
           ]
        }),
        new HTMLWebpackPlugin({
            template: './index.html',
        })
   ],
    devServer: {
        overlay: true,
        compress: true,
        port: 3030,
      },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
            },
            {
                test: /\.(obj|jpg|ifc)$/,
                use: ['file-loader']
            }
            ]
    },
    devtool: 'eval-source-map',   
}