const path = require("path");
let webpackConfigurationPath;
switch (process.env.NODE_ENV) {
  case "prod":
  case "production":
    webpackConfigurationPath = path.resolve(
      __dirname,
      "config",
      "webpack.prod.js"
    );
    break;
  default:
    webpackConfigurationPath = path.resolve(
      __dirname,
      "config",
      "webpack.dev.js"
    );
    break;
}
module.exports = require(webpackConfigurationPath);
