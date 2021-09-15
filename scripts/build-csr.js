process.env.NODE_ENV = 'development'//  'production' //

const webpack = require('webpack')
const webpackConfig = require('./webpack/webpack.client')
const compiler = webpack(webpackConfig())
const chalk = require('chalk')

compiler.watch({
  aggregateTimeout: 300,
  poll: 1000
}, (err, stats) => {
  if (err) {
    console.log(err);
    process.exit(2);
  }
  console.log(stats && stats.toString({
    chunks: false,
    colors: true,
    children: false,
  }));
});

