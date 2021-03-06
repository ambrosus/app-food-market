const webpack = require('webpack');
const path = require('path');

module.exports = {

    entry: {
        app: './src/app.js',
        index: './src/index.html',
        404: './src/404.html',
      },

    output: {
        filename: '[name].js',
        path: __dirname + '/dist/',
      },

    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        historyApiFallback: {
            index: '/',
          },
        compress: true,
        port: 9000,
      },

    resolve: {
        extensions: ['.js', '.jsx', '.scss'],
      },

    module: {
        rules: [
            {
                test: /\.((woff2?|svg)(\?v=[0-9]\.[0-9]\.[0-9]))|(woff2?|svg|jpe?g|png|gif|ico)$/,
                loader: 'url-loader?limit=10000',
              },
            {
                test: /\.((ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9]))|(ttf|eot)$/,
                loader: 'file-loader?=name=/public/fonts/[name].[ext]',
              },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: 'file-loader?name=/static/images/[name].[ext]',
              },
            {
                test: /\.html$/,
                loader: 'file-loader?name=[name].[ext]',
              },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'stage-1'],
                  },
              },
            {
                test: /\.css$/,
                loader: ['style?sourceMap', 'css-loader?modules&importLoaders=1'],
              },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: false,
                            localIdentName: '[name]__[local]--[hash:base64:5]',
                          },
                      },
                    'sass-loader',
                ],
              },
        ],
      },
  };
