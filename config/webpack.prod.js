const path = require("path");
const packageName = require(path.resolve(__dirname, "..", "package.json"))[
  "name"
];
const MinifyPlugin = require("babel-minify-webpack-plugin");
const webpackCommonConfiguratrion = require("./webpack.common");
const webpackProductionConfiguratrion = {
  ...webpackCommonConfiguratrion,
  ...{
    output: {
      path: path.resolve(__dirname, "..", "dist"),
      filename: packageName + ".min.js"
    },
    plugins: [
      new MinifyPlugin(
        {},
        {
          evaluate: false,
          mangle: true
        }
      )
    ]
  }
};
module.exports = webpackProductionConfiguratrion;
