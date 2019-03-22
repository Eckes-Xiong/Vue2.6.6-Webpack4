const Requires = {
    path:require("path"),
    webpack:require("webpack"),
    //自动生成html
    HtmlWebpackPlugin:require("html-webpack-plugin"),
    //自动清理
    CleanWebpackPlugin:require('clean-webpack-plugin'),
    MiniCssExtractPlugin:require("mini-css-extract-plugin"),
    //vue配置
    VueLoaderPlugin:require('vue-loader/lib/plugin'),
};

module.exports={
    mode:'production',
    context: Requires.path.resolve(__dirname, 'src'),
    ////入口
    entry:{
        'front/index':'./pages/index/index.js',
        'admin/index':'./pages/admin/admin.js'
    },
    devtool: "cheap-module-eval-source-map",

    ////出口
    output:{
        path:Requires.path.resolve(__dirname,'dist'),
        filename:'[name]/entry.[hash].js'
    },
    performance: {
        hints: "warning",
        maxEntrypointSize: 5000000,
        maxAssetSize: 5000000
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                exclude: /node_modules/,
                use:{
                    loader: 'babel-loader',
                    options:{
                        "plugins": [
                            ["import", { "libraryName": "ant-design-vue", "libraryDirectory": "es", "style": "css" }]
                        ]
                    }
                }
            },
            {
                test:/\.(sa|sc|le|c)ss$/,
                use:[
                    Requires.MiniCssExtractPlugin.loader,
                    'css-loader', 'less-loader', 'sass-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            outputPath:'static/images'
                        }
                    }
                ]
            },
            {
                test:/\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    plugins:[
        new Requires.CleanWebpackPlugin(['dist']),
        new Requires.HtmlWebpackPlugin({
            minify:true,
            filename:'index.html',
            template:'./template/index.ejs',
            title:'首页',
            chunks:['front/index']
        }),
        new Requires.HtmlWebpackPlugin({
            minify:true,
            filename:'admin/index/index.html',
            template:'./template/index.ejs',
            title:'后台首页',
            chunks:['admin/index']
        }),
        new Requires.MiniCssExtractPlugin({
            filename: '[name]/[hash].css',
            chunkFilename: '[id].[hash].css'
        }),
        new Requires.VueLoaderPlugin(),
        new Requires.webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        })
    ],
    devServer:{
        compress:true,
        port:8079,
        proxy: {
            '/api': 'http://localhost:8099'
        }
    }
};
