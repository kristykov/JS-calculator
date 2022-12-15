const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = ({ mode }) => ({
  entry: "./src/index.js",
  mode: mode === "dev" ? "development" : "production",
  resolve: {
    modules: [path.resolve(__dirname, "src"), "node_modules"],
    extensions: [".js"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve("./src/index.html"),
    }),
  ],
});
