const path = require("path");
const packageName = require(path.resolve(__dirname, "..", "package.json"))[
  "name"
];
const webpackCommonConfiguratrion = require("./webpack.common");
const webpackDevelopmentConfiguratrion = {
  ...webpackCommonConfiguratrion,
  ...{
    output: {
      path: path.resolve(__dirname, "..", "build"),
      filename: packageName + ".js"
    }
  }
};
module.exports = webpackDevelopmentConfiguratrion;
