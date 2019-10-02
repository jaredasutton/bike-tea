const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "./client/src/App.jsx"),
  output: {
    path: path.resolve(__dirname, "./client/public/dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: [path.resolve(__dirname, "./node_modules")],
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"]
        }
      }
    ]
  }
};
