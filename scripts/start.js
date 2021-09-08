const webpack = require('webpack')
const webpackConfig = require('../webpack.server')
const compiler = webpack(webpackConfig)

compiler.watch({
  aggregateTimeout: 300,
  poll: undefined
}, (err, stats) => { 
  // 这里打印 watch/build 结果...
  if (!err) {
    console.log('build success.');
  }
});

