const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  devtool: null,
  entry: [
    './client/index'
  ],

  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/public/'
  },

  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin("bundle.css"),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      drop_console: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ],

  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.jsx']
  },

  resolveLoader: {
    modulesDirectories: ['node_modules'],
    moduleTemplates: ['*-loader', '*'],
    extensions: ['', '.js', '.jsx']
  },


  module: {
    loaders: [
  { test: /\.js?$/,
    loader: 'babel',
    include: path.join(__dirname, 'client')
  },
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loader: 'babel',
  },
  { test: /\.scss$/,
    loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader!postcss-loader"),
    include: [path.join(__dirname, 'client')]
  },
  { test: /\.css$/,
    loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader'),
    include: [path.join(__dirname, 'client')
    ]
  }
]
  }
}
