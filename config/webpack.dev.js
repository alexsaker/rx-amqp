const path = require("path");
const webpackCommonConfiguratrion = require("./webpack.common");
const webpackDevelopmentConfiguratrion = {
  ...webpackCommonConfiguratrion,
  ...{
    output: {
    path: path.resolve(__dirname, "..", "build"),
    filename: "index.js"
  }
}
};
module.exports = webpackDevelopmentConfiguratrion;