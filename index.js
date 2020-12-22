/**
 * Sample Express app.
 */

"use strict";

/**
 * @global
 * @name process.env.NODE_ENV
 * @description Environment that the application is running in,
 * defaults to "development" if not set within the environment
 */
process.env.NODE_ENV = process.env.NODE_ENV || "development";

var express = require("express");
var https = require("https");

var config = require("./config/environment");

var app = express();
var server;

server = https.createServer(config.server, app);

//configure the routes to be used by the application
require("./routes")(app);

/**
 * @type function
 * @description function to start the server
 */
var startServer = function () {
    var port = config.port + parseInt(process.env.PORT_OFFSET || "0", 10);

    app.app = server.listen(port, config.ip, function () {
    logger.info("Express server listening on %d, in %s mode", port, app.get("env"));
  });
};

setImmediate(startServer);

//Expose app
module.exports = app;
