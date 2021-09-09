const path = require('path');
const webpack = require('webpack')
const merge = require('webpack-merge');
const paths = require('../paths')
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
const { getConfig } = require('../config')
const pathsTsconfig = require('tsconfig-paths');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');

function scssRules(config) {
    const scssRules = [
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

    // 正式环境并且extraCssPlugin时导出css文件，否则用style-loader处理
    if (!config.isDev && config.extraCssPlugin) {
        scssRules.unshift({ loader: MiniCssExtractPlugin.loader });
    } else {
        scssRules.unshift('style-loader');
    }

    return scssRules
}

function cssRules(config) {
    return [
        'style-loader',
        'css-loader',
        // TODO 解决报错
        // {
        //     loader: 'postcss-loader',
        //     options: {
        //         plugins: () => {
        //             // 配置有plugin、全亮覆盖
        //             if (config.postCssPlugins) {
        //                 return config.postCssPlugins.map((plugin) => require(plugin.name)(plugin.options || {}));
        //             }
        //             return [autoprefixer()];
        //         },
        //     },
        // },
    ]
}

function babelConfig(config) {
    // 读取tsconfig中的path和config中的alias来生成alias数组，以供module-resolver和postcss-import做地址转换
    const tsconfigPath = config.tsconfig || path.resolve(process.cwd(), 'tsconfig.json');
    const alias = config.alias;

    try {
        const result = pathsTsconfig.loadConfig(tsconfigPath);
        if (result.resultType === 'success' && result.paths) {
            const paths = result.paths;
            Object.keys(paths).forEach((item) => {
                const key = item.replace('/*', '');
                const value = path.resolve(result.absoluteBaseUrl, paths[item][0].replace('/*', '').replace('*', ''));
                alias[key] = value;
            });
        }
    } catch (e) {
        console.log(e);
    }

    let babelCfg = {
        cacheDirectory: false,
        cacheCompression: false,
        'presets': [
            [
                '@babel/preset-env',
                {
                    'modules': false,
                    'loose': true,
                    // useBuiltIns: "usage",
                    // corejs: 3,
                },
            ],
            '@babel/preset-react',
            '@babel/preset-typescript', // ts
        ],
        'plugins': [
            // ['import', {
            //   'libraryName': 'antd',
            //   'style': 'css',
            // }, 'antd'],
            // ['import', {
            //     'libraryName': '@mlz/doraemon',
            //     'camel2DashComponentName': false,
            // }, 'doraemon'],
            ['module-resolver', {
                'extensions': ['.js', '.jsx', '.mjs', '.ts', '.tsx', '.css', '.scss'],
                'alias': alias,
            }],
            ['react-css-modules', {
                'generateScopedName': config.cssScopeName,
                webpackHotModuleReloading: true,
                handleMissingStyleName: 'warn',
                'filetypes': {
                    '.scss': {
                        'syntax': 'postcss-scss',
                        'plugins': [
                            [
                                'postcss-import-sync2',
                                {
                                    resolve: function (id, basedir) {
                                        const nextId = id;
                                        const keys = Object.keys(alias);
                                        const key = id.split('/')[0];
                                        if (keys.find((item) => item === key)) {
                                            return path.resolve(alias[key], id.replace(key, '.'));
                                        }
                                        return path.resolve(basedir, nextId);
                                    },
                                },
                            ],
                        ],
                    },
                },
            }],
            [
                '@babel/plugin-transform-runtime',
                {
                    'corejs': false,
                    'helpers': true,
                    'regenerator': true,
                    'useESModules': false,
                },
            ],
            ['@babel/plugin-proposal-decorators', { 'legacy': true }],
            ['@babel/plugin-proposal-class-properties', { 'loose': true }],
            '@babel/plugin-syntax-dynamic-import',
            '@babel/plugin-proposal-optional-chaining',
            '@babel/plugin-proposal-nullish-coalescing-operator',
            'const-enum',
        ],
    };
    // if (config.babel) {
    //     babelCfg = merge(babelCfg, config.babel);
    // }
    return babelCfg;
}


module.exports = function () {
    const config = getConfig()

    const webpackConfig = merge({}, {
        mode: 'development',
        target: 'web',
        devtool: 'cheap-module-eval-source-map',
        entry: paths.clientEntry,
        output: {
            path: paths.clientBuild,
            filename: 'client.js',
            publicPath: './'
        },
        resolve: {
            modules: [
                config.rootPath,
                'node_modules',
            ],
            alias: {
                ...config.alias,
            },
            extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.scss'],
            symlinks: false,
            cacheWithContext: false,
            plugins: [new TsconfigPathsPlugin(config.tsconfig ? { configFile: config.tsconfig } : {})],
        },
        module: {
            rules: [
                // 处理.css文件
                {
                    test: /\.css$/,
                    use: cssRules(config),
                },
                // 处理scss文件
                {
                    test: /\.scss$/,
                    exclude: /node_modules/,
                    use: scssRules(config)
                },
                // 处理图片资源
                {
                    test: /\.(jpe?g|png|gif|svg)$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                emitFile: true,
                                limit: 3 * 1024,
                                name: 'images/[name]__[hash:5].[ext]',
                                publicPath: config.assetsPublicPath,
                            },
                        },
                    ],
                },
                {
                    test: /\.(woff|woff2|eot|ttf|mp3|mp4)$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: 'assets/[name]__[hash:5].[ext]',
                                publicPath: config.assetsPublicPath,
                            },
                        },
                    ],
                },
                {
                    test: /\.(ts|tsx)?$/,
                    exclude: /(node_modules)/,
                    use: [{
                        loader: 'babel-loader',
                        options: babelConfig(config),
                    }],
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: [
                                    "@babel/preset-env",
                                    "@babel/preset-react"
                                ],
                                plugins: [
                                    "@babel/plugin-proposal-class-properties"
                                ]
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            // 进度条
            new ProgressBarPlugin(),
            new FriendlyErrorsWebpackPlugin(),
            new CleanWebpackPlugin({
                verbose: true, // Write logs to console.
                dry: false,
            }),
            new webpack.DefinePlugin({
                'DEBUG': config.isDev,
                ...config.definePlugin,
            }),
            new HtmlWebpackPlugin({
                // inject: true,
                cache: false,
                loading: config.loading,
                filename: 'index.html',
                // favicon: 'favicon.ico',
                template: './src/index.ejs',
                front_config: `<script>window.context = {}</script>`
            }),
        ],
        externals: {},
    });

    // svg模块
    if (config.svgr) {
        webpackConfig.module.rules.unshift({
            test: /\.svg$/,
            issuer: {
                test: /\.(jsx|tsx)?$/,
            },
            use: [
                '@svgr/webpack',
                {
                    loader: 'url-loader',
                    options: {
                        emitFile: true,
                        limit: 3 * 1024,
                        name: 'images/[name]__[hash:5].[ext]',
                        publicPath: config.assetsPublicPath,
                    },
                },
            ],
        });
    }

    // 构建分析
    if (config.analyzePlugin) {
        webpackConfig.plugins.push(new BundleAnalyzerPlugin());
    }

    return webpackConfig
}

