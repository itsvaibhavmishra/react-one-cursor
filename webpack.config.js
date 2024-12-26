var path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    path: path.resolve("build"),
    filename: "index.js",
    libraryTarget: "commonjs2",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader", // Single loader can still be defined as a string
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"], // Use array for multiple loaders
      },
    ],
  },
  externals: {
    react: "react", // Mark React as an external dependency
  },
};
