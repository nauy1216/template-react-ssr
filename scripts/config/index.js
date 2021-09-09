module.exports.getConfig = function getConfig() {
    const isDev = process.env.NODE_ENV === 'development'
    return {
        isDev,
        isProd: process.env.NODE_ENV === 'production',
        nodeEnv: process.env.NODE_ENV,
        isClient: true,
        // px转rem
        pxtorem: false,
        // postcss插件
        postScssPlugins: null,
        cssScopeName: isDev ? '[path][name]__[local]' : '[local]__[hash:base64:5]',
        // isProd && extraCssPlugin为true时将css抽离
        extraCssPlugin: false,
        // 图片、字体等资源
        assetsPublicPath: '/',
        alias: {},
        rootPath: process.cwd(),
        // 定义的环境变量
        definePlugin: {

        },
        svgr: true,
        analyzePlugin: false
    }
}