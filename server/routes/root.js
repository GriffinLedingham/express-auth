var express = require('express');
var Promise = require('bluebird');
var fs = require('fs');

module.exports = function (app, helpers, models, language) {
  var routes = express.Router();
  routes.get('/', function(req,res) {
    fs.readFile('./client/templates/index.html', function(err, page) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(page);
        res.end();
    });
  });
  return routes;
}