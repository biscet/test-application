const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const htmlData = (dev) => {
  if (dev === true) {
    return [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../template/index.html'),
        inject: 'body',
      }),
    ]
  } else {
    return [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../template/index.html'),
        inject: 'body',
        filename: './index.html',
        //favicon: "./favicon.ico"
      }),
    ]
  }
}

module.exports = htmlData
