var config = require('../config/language_config');

module.exports = function () {
  var lang = {};
  for(index in config.langFiles) {
    lang[config.langFiles[index]] = require("./"+config.langFiles[index]);
  };
  return lang;
};