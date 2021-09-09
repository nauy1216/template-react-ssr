process.env.NODE_ENV = 'development'
process.env.B = 'development'

const webpack = require('webpack')
const webpackConfig = require('./webpack/webpack.client')
const compiler = webpack(webpackConfig())
const chalk = require('chalk')

compiler.watch({
  aggregateTimeout: 300,
  poll: undefined
}, (err, stats) => {
  // 这里打印 watch/build 结果...
  if (!err) {
    console.log(chalk.blue('csr build success.'))
  }
});

