const path = require('path')
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
var evn_dev = process.env.NODE_ENV
module.exports = {
    mode: 'development',
    entry: {
        index: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: evn_dev !== 'development' ? './js/main[hash:8].js' : './js/main[chunkhash:8].js'
    },
    externals: {},
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                  loader: "babel-loader", // 这个loader使我们自己写的，不引用官方的
                  options: {
                    presets: ["@babel/preset-env"],   // 转换规则
                    exclude:path.resolve(__dirname,'/node_modules'),
                    include:path.resolve(__dirname,'src'),
                  }
                }
              },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader,'css-loader']
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader,'css-loader','sass-loader']
            },
            {
                test:/\.(jpg|png|gif|jpeg|bmp)$/,
                use:'url-loader'
            }
        ],
    },
    resolve: {
        // require时省略的扩展名，遇到.vue结尾的也要去加载
        extensions: ['.js', '.vue'],
        // 模块别名地址，方便后续直接引用别名，无须写长长的地址，注意如果后续不能识别该别名，需要先设置root
        alias: {
            _c:path.resolve(__dirname,'./src/components/'),
            _img:path.resolve(__dirname,'./assets/images/')
    }
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Title',    // 这个值对应html里的title
            template: './public/index.html',//模板文件地址
            filename: 'index.html',//文件名，默认为index.html（路径相对于index.js的值）
            inject: true,    //script标签的位置，true/body为在</body>标签前，head为在<head>里，false表示页面不引入js文件
            hash: false,    //是否为引入的js文件添加hash值
        }),
        new webpack.HotModuleReplacementPlugin(),//热更新
        new MiniCssExtractPlugin({
            filename: './css/[name].[hash].css',
            chunkFilename: './css/[id].[hash].css',
        }),//CSS提取
        new CleanWebpackPlugin(),
        new VueLoaderPlugin()
    ],
    devServer: {
        hot: true,
        host: "192.168.0.130",
        port: 8080,
    }
}