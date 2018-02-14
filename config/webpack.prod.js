const path = require("path");
const webpackCommonConfiguratrion = require("./webpack.common");
const webpackProductionConfiguratrion = {
  ...webpackCommonConfiguratrion,
  ...{
    output: {
    path: path.resolve(__dirname, "..", "dist"),
    filename: "index.js"
  }
}
};
module.exports = webpackProductionConfiguratrion;