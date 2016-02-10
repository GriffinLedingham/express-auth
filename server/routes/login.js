var express = require('express');
var Promise = require('bluebird');

module.exports = function (app, helpers, models, language) {
  var routes = express.Router();
  routes.get('/', function(req,res) {
    if(typeof req.session.token != 'undefined') {
      helpers.auth.checkToken(req.sessionID, req.session.token)
      .then(function(response){return helpers.auth.loginUserByToken(response)})
      .then(function(response) {
        res.status(helpers.general.getStatusCode('login','get',response)).send(response);
        res.end();
      });
    }
    else {
      res.status(helpers.general.getStatusCode('login','get',response)).send({txn: false});
      res.end();
    }
  });

  routes.post('/',function(req,res) {
    helpers.auth.loginUser(req.body.username,req.body.password)
    .then(function(response){
      if(response.txn) {
        req.session.token = helpers.auth.buildToken(response.user);
        req.session.saveAsync()
        .then(function(err){
          helpers.auth.getSession(req.sessionID).then(function(session) {
            response.user.setSession(session);
            response.user = response.user.filter();
            res.status(helpers.general.getStatusCode('login','post',response)).send(response);
            res.end();
          });
        });
      }
      else {
        res.status(helpers.general.getStatusCode('login','post',response)).send(response);
        res.end();
      }
    });
  });

  return routes;
};
