'use strict';

var path     = require('path');
var execFile = require('child_process').execFile;

/**
 * When a hook is received for an event, the program will check for an event
 * handler by the same name.
 *
 * eg.
 *   if a fork event is received, the program will try to call the fork function
 *
 * @type {Object}
 */
module.exports = {

  /**
   * Handler for the push event, with example of runing a shell script
   *
   * @param  {Function} done Callback to say that the event handler has finished
   */
  push: function(done) {
    var command = execFile(path.resolve(__dirname, './push.sh'),
      function (error) {
        if (error !== null) {
          console.error(error);
        }

        done();
      }
    );

    command.stdout.on('data', function(data) {
      console.error(data.toString().trim());
    });

    command.stderr.on('data', function(data) {
      console.log(data.toString().trim());
    });
  }
};
