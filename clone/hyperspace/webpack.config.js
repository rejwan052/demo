const path = require('path')
  , webpack = require('webpack')
  , autoprefixer = require('autoprefixer')
  , ExtractTextPlugin = require("extract-text-webpack-plugin")


module.exports = {
  // devtool: 'source-map',
  entry: {
    bundle: [
      path.join(__dirname, 'index.html'),
      path.join(__dirname, 'main.js'),
      path.join(__dirname, 'index.scss'),
    ],
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin("[name].css"),

    // new webpack.optimize.DedupePlugin(),
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     'NODE_ENV': JSON.stringify('production')
    //   }
    // }),
    // new webpack.optimize.AggressiveMergingPlugin(),
    // new webpack.optimize.UglifyJsPlugin({
    //   compressor: {
    //     warnings: false
    //   }
    // }),
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss']
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      // include: path.join(__dirname, 'src'),
      loaders: ['babel'],
      // }, {
      //   test: /\.css$/,
      //   loaders: ['style', 'css', 'postcss'],
    }, {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?(-alpha\.[0-9])?$/,
      loader: 'url?limit=10000&minetype=application/font-woff'
    }, {
      // 3.0.0-alpha.3
      test: /\.(ttf|eot|svg|png)(\?v=[0-9]\.[0-9]\.[0-9])?(-alpha\.[0-9])?$/,
      loader: 'file'
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('style', 'css!postcss!sass'),
      // loaders: ['style', 'css', 'postcss', 'sass',],
    }, {
      test: /\.html$/,
      loader: 'file?name=[path][name].[ext]'
    }],
  },
  postcss: [autoprefixer],
}
