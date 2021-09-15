'use strict';

const path = require('path');
const fs = require('fs');

// 获取到当前进程的地址
const appDirectory = fs.realpathSync(process.cwd());

// 相对地址转换成绝对地址
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  root: resolveApp('.'),
  serverBuild: resolveApp('dist'),
  serverWebpackConfig: resolveApp('scripts/webpack/webpack.server'),
  serverEntry: resolveApp('server/index.tsx'),
  clientBuild: resolveApp('public'),
  clientEntry: resolveApp('src/client/index.tsx')
};
