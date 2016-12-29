const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-webpack');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.initConfig({
        watch: {
            scripts: {
                files: [
                    './src/scss/**/*.scss',
                    './src/js/**/*.js'
                ],
                tasks: ['webpack'],
                options: {
                    spawn: false
                }
            }
        },
        webpack: {
            dev: {
                entry: [
                    './src/js/main.js',
                    './src/scss/main.scss'
                ],
                output: {
                    path: './public/',
                    filename: 'js/module.js'
                },
                plugins: [
                    // new webpack.optimize.DedupePlugin(),
                    // new webpack.optimize.UglifyJsPlugin()
                    new ExtractTextPlugin('style.css', {
                        allChunks: true
                    })
                ],
                module: {
                    loaders: [
                        {
                            test: /\.js$/,
                            loader: 'babel-loader',
                            exclude: /node_modules/,
                            query: {
                                presets: ['es2017', 'es2015']
                            }
                        },
                        {
                            test: /\.scss$/,
                            loader: ExtractTextPlugin.extract('css!sass')
                        },
                        {
                            test: /\.(png|gif)$/,
                            loader: 'url-loader'
                        },
                        {
                            test: /\.(eot|svg|ttf|woff|woff2)$/,
                            loader: 'file?name=fonts/[name].[ext]'
                        }
                    ]
                },
                stats: {
                    colors: false,
                    modules: false,
                    reasons: true
                },
                progress: false,
                failOnError: false,
                watch: true,
                keepalive: true
            }
        }
    });


    grunt.registerTask('default', ['webpack', 'watch']);
};