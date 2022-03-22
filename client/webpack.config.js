const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { HashedModuleIdsPlugin } = require('webpack')

const aliasData = require('./helpers/alias')
const htmlData = require('./helpers/html')
const environmentData = require('./helpers/environment')

module.exports = (env, options) => {
  const dev = options.mode === 'development'
  return {
    entry: ['babel-polyfill', './src/index.jsx'],
    resolve: {
      extensions: ['.jsx', '.js', '.css', '.scss'],
      alias: aliasData,
      modules: [path.join(__dirname, './src'), 'node_modules'],
    },
    resolveLoader: {
      moduleExtensions: ['-loader'],
    },
    output: {
      path: path.resolve(__dirname, './build'),
      filename: dev ? 'bundle.js' : '[name].bundle.js',
      chunkFilename: '[name].chunks.js',
      publicPath: dev ? '/' : '',
    },
    devServer: dev
      ? {
          overlay: true,
          historyApiFallback: true,
        }
      : {},
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.js$/,
          loader: 'source-map-loader',
        },
        {
          test: /\.(js|jsx)$/,
          loader: 'babel-loader',
          options: options.babelQuery,
        },
        {
          test: /\.css$/,
          use: [
            dev ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
          ],
        },
        {
          test: /\.scss$/,
          use: [
            dev ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.(woff|woff2|eot|ttf)$/,
          loader: 'file?name=fonts/[name].[ext]',
        },
        {
          test: /\.(jpe?g|png|gif)$/i,
          use: dev
            ? 'url-loader'
            : [
                'file-loader?name=./static/media/[name].[hash:8].[ext]',
                {
                  loader: 'img-loader',
                  options: {
                    plugins: [
                      require('imagemin-gifsicle')({
                        interlaced: false,
                      }),
                      require('imagemin-mozjpeg')({
                        progressive: true,
                        arithmetic: false,
                      }),
                      require('imagemin-pngquant')({
                        floyd: 0.5,
                        speed: 2,
                      }),
                      require('imagemin-svgo')({
                        plugins: [
                          { removeTitle: true },
                          { convertPathData: false },
                        ],
                      }),
                    ],
                  },
                },
              ],
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: 'svg-url-loader',
              options: {
                limit: 10 * 1024,
                noquotes: true,
              },
            },
          ],
        },
        {
          test: /\.(mp4|webm|mp3)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 100 * 1024,
            },
          },
        },
      ],
    },
    plugins: dev
      ? htmlData(dev)
          .concat([
            new MiniCssExtractPlugin({
              filename: '[name].css',
              chunkFilename: '[id].css',
            }),
          ])
          .concat(environmentData(dev))
      : htmlData(dev)
          .concat([
            new MiniCssExtractPlugin({
              filename: '[name].[contenthash].css',
              chunkFilename: '[id].[contenthash].css',
            }),
            new CleanWebpackPlugin('build', {}),
            new MiniCssExtractPlugin({
              filename: '[name].css',
            }),
            new HashedModuleIdsPlugin({
              hashFunction: 'sha256',
              hashDigest: 'hex',
              hashDigestLength: 20,
            }),
          ])
          .concat(environmentData(dev)),
    devtool: dev ? 'eval-source-map' : '',
    optimization: dev
      ? {
          splitChunks: {
            chunks: 'all',
          },
        }
      : {
          sideEffects: true,
          concatenateModules: true,
          runtimeChunk: 'single',
          splitChunks: {
            chunks: 'all',
            maxInitialRequests: 10,
            minChunks: 1,
            cacheGroups: {
              default: false,
            },
            minSize: 0,
          },
        },
  }
}
