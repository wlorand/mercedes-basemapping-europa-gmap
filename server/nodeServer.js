#!/usr/bin/env node  // WTF IS THIS -- this ain't perl

/**
 * Module dependencies.
 */

const http = require('http');
const app = require('./expressApp');
const debug = require('debug')('augdemo:server');
//var debug = require('debug');

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3003'); 
// recall now process.env lets you set an environment var for dev vs staging vs prod
app.set('port', port); // express setting

/**
 * Create HTTP server.
 */
var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);

// set up some server events
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false. -- util function
 */

function normalizePort(val) {
  var port = parseInt(val, 10);
  if (isNaN(port)) { // named pipe
    return val;
  }

  if (port >= 0) { // port number
    return port;
  }
  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error; // error just thrown, not handled -- where do they go when you just throw them?
  }

  // typeof and ternary test -- i get it but this seems hard to digest and obtuse code
  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages 
  //- i like this -- but is use of js switch statement a good pattern?
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
