var path = require('path');
var webpack = require('webpack');
var fs = require('fs');

module.exports = {
    entry: [
  //    'webpack-dev-server/client?http://0.0.0.0:8090', // WebpackDevServer host and port
  //    'webpack/hot/only-dev-server',
      './scripts/index'
    ],
    output: {
        path: './build',
        filename: 'bundle.js', //this is the default name, so you can skip it
        //at this directory our bundle file will be available
        //make sure port 8090 is used when launching webpack-dev-server
        publicPath: 'http://localhost:8090/assets'
    },
    module: {
        loaders: [
            {
                //tell webpack to use jsx-loader for all *.jsx files
                test: /\.jsx$/,
                loaders: ['react-hot', 'jsx?harmony', 'jsx-loader?insertPragma=React.DOM&harmony']
            }
        ]
    },
    externals: {
        //don't bundle the 'react' npm package with our bundle.js
        //but get it from a global 'React' variable
        'react': 'React'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    node: {
  fs: "empty"
}
}
