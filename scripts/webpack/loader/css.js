const { getConfig } = require('../../config')
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');

module.exports = function (isClient) {
    const config = getConfig()

    const loaders = [
        {
            loader: 'css-loader',
            options: {
                modules: {
                    localIdentName: config.cssScopeName,
                    context: process.cwd(),
                },
                importLoaders: 3,
                sourceMap: false,
            },
        },
        {
            loader: 'postcss-loader',
            options: {
                plugins: () => {
                    // 配置有直接全覆盖
                    if (config.postScssPlugins) {
                        return config.postScssPlugins.map((plugin) => require(plugin.name)(plugin.options || {}));
                    }
                    const plugin = [autoprefixer()];
                    if (config.pxtorem) {
                        plugin.push(pxtorem(config.pxtorem));
                    }
                    return plugin;
                },
            },
        },
        {
            loader: 'sass-loader',
            options: {
                implementation: require('sass'),
            },
        },
    ];

    if (isClient === true) {
        loaders.unshift('style-loader')
    } else {
        // 服务端渲染不能用 style-loader，因为 node 没有 document 对象，无法插入 style 标签
        // 服务端本来就不能渲染 dom，只是提供 html/css/js 代码给浏览器，交给浏览器去渲染
        // 服务端返回的 html 源码里，没有 style 标签
        // 而在浏览器中的 html 源码里，有 style 标签，是通过 js 插入进去的
        loaders.unshift('isomorphic-style-loader')
    }

    return loaders
}