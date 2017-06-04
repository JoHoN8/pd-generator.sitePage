const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const packageData = require("./package.json");


module.exports = function(env) {
    let plugins = [];
    let output = null;
    let external = {
        "jquery": {
            commonjs: 'jquery',
            commonjs2: 'jquery',
            amd: 'jquery',
            root: '$'
        }
    };

    if(env === 'build') {
        output = {
            filename: 'app.min.js'
        };
        plugins.push(new UglifyJsPlugin({ minimize: true }));
    }
    if(env === 'dev') {
        output = {
            filename: 'app.js'
        };
    }

    return {
        output: output,
        module:{
            rules:[
                {  
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015']
                        }
                    }
                }
            ]
        },
        plugins: plugins,
        externals: external,
        devtool: 'source-map'
    };
};