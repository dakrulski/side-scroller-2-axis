var path = require('path');

module.exports = {
  entry: './frontend/main.js',
  output: {
    filename: './backend/static/js/bundle.js',
    path: path.resolve(__dirname)
  },
  module: {
    loaders: [
        {
            test: /\.json$/,
            //include: path.resolve(__dirname, 'node_modules', 'pixi.js'),
            loader: 'json-loader'
        },
        {
            test: /\.js$/,
            exclude: path.join(__dirname, 'node_modules'),
            loader: 'babel-loader'
        }
    ]
  }
};