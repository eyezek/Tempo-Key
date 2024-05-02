const path = require("path");

module.exports = {
  mode: "development", // Set mode to 'development' for better debug info
  entry: "./background.js", // Adjust this path to where your background.js is located
  output: {
    filename: "background.bundle.js",
    path: path.resolve(__dirname, "dist"), // The output directory
  },
  devtool: 'source-map',
  module: {
    rules: [
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
};
