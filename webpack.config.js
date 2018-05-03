const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    watch: true,
    entry: './src/i_message.es6',
    output: {
        filename: 'build/i_message.js'
    },

    plugins: [
        new ExtractTextPlugin("/build/i_message.css")
    ],

    
    module: {
        rules: [
            {
                test: /\.es6$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.s?css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader'
                        },
                        {
                            loader: 'resolve-url-loader'
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    autoprefixer({
                                        browsers: ['last 4 version']
                                    })
                                ]
                            }
                        },
                        {
                            loader: 'sass-loader'
                        }
                    ]
                })

            }
        ]
    }
};