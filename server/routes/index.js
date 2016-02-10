var config = require('../config/route_config');

module.exports = function (app, helpers, models, language) {
  var routes = {};
  for(index in config.routeFiles) {
    app.use('/'+config.routeFiles[index], require("./"+config.routeFiles[index])(app, helpers, models, language));
  };

  app.use('/', require("./"+'root')(app, helpers, models, language));

  var catchErrors = function(err, req, res, next) {
    console.error("Error in " + req.method + " " + req.url + ":", err);
    res.status(400).send(err.message);
    return next(err);
  };

  app.use(catchErrors);

  return routes;
};
