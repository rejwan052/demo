const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer')

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-hot-middleware/client?http://localhost:3000/',
    'webpack/hot/only-dev-server',
    './src/index.js',
  ],
  output: {
    path: path.join(__dirname),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      // include: path.join(__dirname, 'src'),
      loaders: ['babel'],
    }, {
      test: /\.css$/,
      loaders: ['style', 'css', 'postcss'],
    }, {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?(-alpha\.[0-9])?$/,
      loader: 'url?limit=10000&minetype=application/font-woff'
    }, {
      // 3.0.0-alpha.3
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?(-alpha\.[0-9])?$/,
      loader: 'file'
    }, {
      test: /\.scss$/,
      loaders: ['style', 'css', 'postcss', 'sass',],
    }],
  },
  // sassLoader: {
  //   includePaths: [
  //     'node_modules/bootstrap-sass/assets/stylesheets',
  //     'node_modules',
  //   ],
  // },
  postcss: [autoprefixer],
}
