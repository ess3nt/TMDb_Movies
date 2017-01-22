import path from 'path'
import webpack from 'webpack'
import ExtractTextPlugin from "extract-text-webpack-plugin";

const NODE_ENV = process.env.NODE_ENV || 'development'

export default {
  devtool: 'cheap-inline-eval-source-map',

  entry: [ 'webpack-hot-middleware/client',
    path.join(__dirname, '/client/index')
  ],

  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/public/'
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin("bundle.css"),
    new webpack.DefinePlugin({
        NODE_ENV: JSON.stringify(NODE_ENV)
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

  eslint: {
    configFile: './.eslintrc'
  },

  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['eslint'],
      },
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel'],
      },
      { test: /\.js?$/,
        loaders: ['react-hot', 'babel', 'eslint-loader'],
        include: path.join(__dirname, 'client')
      },
      { test: /\.scss$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader!postcss-loader"),
        include: [path.join(__dirname, 'client')]
      },
      { test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader'),
        include: [path.join(__dirname, 'client')]
      },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&minetype=application/font-woff"
      },
      { test: /\.(jpg|png|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader"
      }
    ]
  }
}
