const path = require("path");

module.exports = (app) => {
  const directory = path.join(app.config.baseDir, "app/validate");
  app.loader.loadToApp(directory, "validate");
};
