const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/app.js',
    output: {

    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    },
    devServer: {
        contentBase: src,
        compress: true,
        port: 9000
    }
};