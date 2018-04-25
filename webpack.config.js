module.exports = {
    watch: true,
    entry: './src/i_message.es6',
    output: {
        filename: 'build/i_message.js'
    },
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
            }
        ]
    }
};