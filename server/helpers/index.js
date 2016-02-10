var config = require('../config/helper_config');

module.exports = function (models, language) {
  var helpers = {};
  for(index in config.helperFiles) {
    helpers[config.helperFiles[index]] = require("./"+config.helperFiles[index]+"_helper")(models, language);
    helpers[config.helperFiles[index]].bindData = function(data) {
      for(item in data)
      {
        helpers[config.helperFiles[index]][item] = data[item];
      }
    }
  };

  for(index in config.helperFiles) {
    helpers[config.helperFiles[index]].bindData({helpers:helpers});
  }

  return helpers;
};