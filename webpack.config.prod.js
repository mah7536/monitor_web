/** @format */

const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  context: __dirname,
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.[chunkhash].js",
    publicPath: "/wedding",
  },
  devServer: {
    host: "0.0.0.0",
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
        exclude: /node_modules/,
        use: ["file-loader?name=[name].[ext]"],
      },
    ],
  },
  resolve: {
    alias: {
      Path: path.resolve(__dirname, "src/"),
    },
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
      filename: "index.html",
    }),
    new webpack.DefinePlugin({
      "process.env.API_Host": JSON.stringify("http://59.126.122.239:2134"),
      "process.env.Websocket_Host": JSON.stringify("ws://59.126.122.239:2134"),
    }),
    new CopyWebpackPlugin({ patterns: [{ from: "img", to: "img" }] }),
  ],
};
