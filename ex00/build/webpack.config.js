// webpack.config.js

// ------------------------------
// Other command on package.json
// ------------------------------
// (1) "build": "webpack src/main.js", // 單個文件 + no config
// (2) "build": "webpack --config build/webpack.config.js src/main.js", // 單個文件 + use config

// ------------------------------
// Questions
// ------------------------------

// Question 1, what if no webpack.config.js
// default output is dist/ folder

// Question 2, what if use (1) "build": "webpack src/main.js"
// index.html by default will has been inserted <script> tag other than replace like template

// ------------------------------
// Folder structure
// ------------------------------
// .
// |--assets/xxx.css
// |--build/webpack.config.js
// |--dist/main.e2dfe881.js
// |--public/xxx.html
// |--src/main.js
//

const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // move all css to a file

// 如果有 index.css, index.less, 那麼main.js只加了 index.css 到 index.html, 沒有加 index.less
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin"); // move css into differenct files
let indexLess = new ExtractTextWebpackPlugin("index.less");
let indexCss = new ExtractTextWebpackPlugin("index.css");

// npm i -D babel-loader @babel/preset-env @babel/core
// npm i @babel/polyfill
// !!注意!! babel-loader 只會將 ES6/7/8 轉為 ES5，不包括新API e.g. promise、Generator、Set、Maps、Proxy...
// Therefore, we need polyfill

module.exports = {
    mode: "development",
    //entry: path.resolve(__dirname, '../src/main.js'), // 入口文件
    entry: {
        main: ["@babel/polyfill",path.resolve(__dirname,'../src/main.js')],
        header: path.resolve(__dirname, "../src/header.js")
    },
    output: {
        filename: "[name].[hash:8].js", // 打包後的文件名
        path: path.resolve(__dirname, "../dist") // 打包後的文件夾
    },
    // plugins: [
    //     new CleanWebpackPlugin(),
    //     new HtmlWebpackPlugin({
    //         template: path.resolve(__dirname, '../public/index.html')
    //     })
    // ],
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            // 用了ExtractTextWebpackPlugin 就用不用到加hash like MiniCssExtractPlugin
            filename: "[name].[hash].css",
            chunkFilename: "[id].css"
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "../public/index.html"),
            filename: "index.html",
            chunks: ["main"] // 與入口文件對應的模塊名相同
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "../public/index.html"),
            filename: "header.html",
            chunks: ["header"]
        }),
        indexLess,
        indexCss
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                // use: ["style-loader", "css-loader"]
                use: indexCss.extract({
                    use: ["css-loader"]
                })
            },
            {
                test: /\.less$/,
                use: indexLess.extract({
                    use: ["css-loader", "less-loader"]
                })
                // use: [
                //     // "style-loader", // 如果不拆分css file
                //     MiniCssExtractPlugin.loader, // 拆出css file
                //     "css-loader",
                //     {
                //         loader: "postcss-loader",
                //         options: {
                //             plugins: [require("autoprefixer")]
                //         }
                //     },
                //     "less-loader"
                // ] // all rules is 從右向左解析原則
            },
            {
                test: /\.(jpe?g|png|gif)$/i, //图片文件
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 10240,
                            fallback: {
                                loader: "file-loader",
                                options: {
                                    name: "img/[name].[hash:8].[ext]"
                                }
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, //媒体文件
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 10240,
                            fallback: {
                                loader: "file-loader",
                                options: {
                                    name: "media/[name].[hash:8].[ext]"
                                }
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i, // 字体
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 10240,
                            fallback: {
                                loader: "file-loader",
                                options: {
                                    name: "fonts/[name].[hash:8].[ext]"
                                }
                            }
                        }
                    }
                ]
            },
            {
                test:/\.js$/,
                use:{
                  loader:'babel-loader',
                  options:{
                    presets:['@babel/preset-env']
                  }
                },
                exclude:/node_modules/
            },
        ]
    }
};
