const path = require('path');

module.exports = {
    mode: 'development',
    context: path.resolve(__dirname, 'src'),
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        library: "$",
        libraryTarget: "umd",
      },
    resolve: {
        fallback: {
            "fs": false,
            "crypto": require.resolve("crypto-browserify"),
            "buffer": require.resolve("buffer/"),
            "stream": require.resolve("stream-browserify")
        },
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
            },
            ]
    },
    devtool: 'eval-source-map',
}