const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const clientConfig = {
  name: 'client',
  target: 'web',
  entry: ['babel-polyfill', './src/browser.jsx'],
  output: {
    path: path.join(__dirname, 'dist', 'public'),
    publicPath: '/static/',
    filename: 'bundle.[hash:6].js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [{ loader: 'babel-loader' }, { loader: 'eslint-loader' }]
      },
      {
        test: /\.(css|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 4096,
              name: '[name].[hash:6].[ext]',
              outputPath: 'images/'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                enabled: false
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('bundle.[hash:6].css'),
    new ManifestPlugin({ fileName: 'manifest-asset.json' }),
    new CleanWebpackPlugin(['dist'])
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  }
};

const serverConfig = {
  name: 'server',
  target: 'node',
  externals: nodeExternals(),
  entry: ['babel-polyfill', './src/lambda.js'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'lambda.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader'
        },
        exclude: /node_modules/
      },
      {
        test: /\.(css|scss)$/,
        loader: 'ignore-loader'
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              emitFile: false,
              limit: 4096,
              name: '[name].[hash:6].[ext]',
              publicPath: '/static/images/'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                enabled: false
              }
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};

module.exports = [clientConfig, serverConfig];
