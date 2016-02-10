var express = require('express');
var Promise = require('bluebird');

module.exports = function (app, helpers, models) {
  var routes = express.Router();
  routes.post('/',function(req,res) {
    helpers.auth.signupUser(req.body.username,req.body.password, req.body.email).then(function(response){
      res.status(helpers.general.getStatusCode('signup', 'post', response)).send(response);
      res.end();
    });
  });
  return routes;
};
