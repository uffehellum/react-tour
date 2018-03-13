module.exports = {
    entry: './js/app.js',
    output: {
        path: __dirname + '/public',
        filename: 'bundle.js',
        publicPath: '/',
    },
    mode: 'development',
    module:  {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                enforce: 'pre',
                loader: "babel-loader",
                options: {
                    presets: ["es2015", "react", "stage-0"]
                },
            }
        ]
    }
}
