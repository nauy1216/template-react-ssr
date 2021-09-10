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
const TerserPlugin = require('terser-webpack-plugin');
// 提取css
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 对提取出来的css进行压缩
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const nodeExternal = require('webpack-node-externals');

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
        // 服务端渲染不能用 style-loader，因为 node 没有 document 对象，无法插入 style 标签
        // 服务端本来就不能渲染 dom，只是提供 html/css/js 代码给浏览器，交给浏览器去渲染
        // 服务端返回的 html 源码里，没有 style 标签
        // 而在浏览器中的 html 源码里，有 style 标签，是通过 js 插入进去的
        scssRules.unshift('isomorphic-style-loader');
    }

    return scssRules
}

function cssRules(config) {
    const rules = [
        // 'style-loader',
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
    // 正式环境并且extraCssPlugin时导出css文件，否则用style-loader处理
    if (!config.isDev && config.extraCssPlugin) {
        rules.unshift({ loader: MiniCssExtractPlugin.loader });
    } else {
        // 服务端渲染不能用 style-loader，因为 node 没有 document 对象，无法插入 style 标签
        // 服务端本来就不能渲染 dom，只是提供 html/css/js 代码给浏览器，交给浏览器去渲染
        // 服务端返回的 html 源码里，没有 style 标签
        // 而在浏览器中的 html 源码里，有 style 标签，是通过 js 插入进去的
        rules.unshift('isomorphic-style-loader');
    }
    return rules
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
    debugger
    const config = getConfig()

    let webpackConfig = {
        target: 'node',
        entry: {
            server: paths.serverEntry
        },
        output: {
            path: paths.serverBuild,
            filename: '[name].js',
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
                '__BROWSER__': false,
                '__SERVER__': true,
                ...config.definePlugin,
            })
        ],
        // externals: [nodeExternal()],
    };

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

    // development
    if (config.isDev) {
        webpackConfig = merge(webpackConfig, {
            mode: 'development',
            devtool: 'cheap-module-eval-source-map',
            output: {
                filename: '[name].js',
                chunkFilename: '[name].js',
            },
            plugins: [
                // new HtmlWebpackPlugin({
                //     // inject: true,
                //     chunks: 'all',
                //     hash: true,
                //     cache: false,
                //     loading: false,
                //     filename: 'index.html',
                //     // favicon: 'favicon.ico',
                //     template: './src/index.ejs',
                //     // 自定义的需要注入到template的内容
                //     front_config: `<script>window.context = {}</script>`
                // }),
            ]
        })
    } else {
        // test、staging、production
        webpackConfig = merge(webpackConfig, {
            mode: 'production',
            devtool: 'source-map',
            output: {
                filename: '[name].js',
                chunkFilename: '[name].js',
            },
            optimization: {
                removeAvailableModules: true,
                removeEmptyChunks: true,
                sideEffects: false,
                moduleIds: 'hashed',
                runtimeChunk: {
                    name: 'manifest',
                },
                splitChunks: {
                    chunks: 'all',
                    maxInitialRequests: Infinity,
                    minSize: 3000,
                    cacheGroups: {
                        vendors: {
                            test: /node_modules/,
                            chunks: 'all',
                            // 分包规则，相同name的模块将会被打包成[name].js
                            name(module) {
                                let name = 'venderLibs';
                                const libraries = config.libraries
                                if (libraries) {
                                    const context = module.context.split('/');
                                    const nIndex = context.indexOf('node_modules');
                                    let packageName = context[nIndex + 1];
                                    if (packageName.indexOf('@') > -1) {
                                        packageName = `${context[nIndex + 1]}/${context[nIndex + 2]}`;
                                    }
                                    const names = Object.keys(libraries);
                                    names.map((val) => {
                                        if (libraries[val].indexOf(packageName) >= 0) {
                                            name = val;
                                        }
                                    });
                                }
                                return name;
                            },
                        },
                    },
                },
                minimizer: [
                    new TerserPlugin({
                        // sourceMap: true,
                        terserOptions: {
                            compress: {
                                'drop_console': false,
                                'drop_debugger': true,
                            },
                            output: {
                                comments: false,
                            },
                        },
                    }),
                    new OptimizeCSSAssetsPlugin({
                        cssProcessorOptions: {
                            discardComments: { removeAll: true },
                        },
                        canPrint: true,
                    }),
                ],
            },
            plugins: [
                // new HtmlWebpackPlugin({
                //     loading: config.loading,
                //     cache: false,
                //     minify: {
                //         collapseWhitespace: true,
                //         removeComments: false,
                //         removeRedundantAttributes: true,
                //         removeScriptTypeAttributes: true,
                //         removeStyleLinkTypeAttributes: true,
                //         useShortDoctype: true,
                //     },
                //     filename: 'index.html',
                //     // favicon: 'favicon.ico',
                //     template: './src/index.ejs',
                //     // 自定义的需要注入到template的内容
                //     front_config: `<script>window.context = {}</script>`
                // }),
                new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
            ],
        })

        if (config.extraCssPlugin) {
            webpackConfig.plugins.push(new MiniCssExtractPlugin({
                filename: 'css/[name].[contenthash].css',
                chunkFilename: 'css/[name].[contenthash].css',
                ignoreOrder: false, // Enable to remove warnings about conflicting order
            }));
        }
    }

    // 硬盘缓存, 速度能提升2倍
    webpackConfig.plugins.push(
        new HardSourceWebpackPlugin(),
        // HardSourceWebpackPlugin会和SpeedMeasurePlugin、mini-css-extract-plugin冲突
        new HardSourceWebpackPlugin.ExcludeModulePlugin([
            {
                test: /mini-css-extract-plugin[\\/]dist[\\/]loader/,
            },
        ]),
    );

    // 打包速度分析
    // new SpeedMeasurePlugin().wrap(webpackConfig)
    return webpackConfig
}

