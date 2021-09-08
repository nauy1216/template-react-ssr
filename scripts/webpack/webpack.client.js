const path = require('path');
const merge = require('webpack-merge');
const base = require('./webpack.base');
const paths = require('../paths')

module.exports = merge(base, {
    entry: paths.clientEntry,
    output: {
        path: paths.clientBuild,
        filename: 'client.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    }
                ]
            }
        ]
    }
});