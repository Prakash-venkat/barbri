const path = require("path");
const webpack = require("webpack");
const webpackMerge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const modeConfiguration = env => require(`./build-utils/webpack.${env}`)(env);
const Dotenv = require('dotenv-webpack');

module.exports = ({ mode } = { mode: "production" }) => {
  console.log(`mode is: ${mode}`);

  return webpackMerge(
    {
      mode,
      entry: "./src/index.js",
      devServer: {
        hot: true,
        open: true
      },
      output: {
        publicPath: "/",
        path: path.resolve(__dirname, "build"),
        filename: "bundled.js"
      },
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: "babel-loader"
          },
          {
            test: /\.(png|jpe?g|gif)$/,
            use: [
              {
                loader: "file-loader",
                options: {}
              }
            ]
          },
          {
            test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
            loader: "file-loader?name=fonts/[name].[ext]"
          }
        ]
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: "./public/index.html"
        }),
        new webpack.HotModuleReplacementPlugin(),
        new Dotenv()
      ],
      resolve: {
        extensions: ["*", ".js", ".jsx", ".scss", ".css"]
      }
    },

    modeConfiguration(mode)
  );
};
