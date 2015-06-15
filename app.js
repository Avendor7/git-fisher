'use strict';

var config = require('./config.js');

var githubhook = require('githubhook');
var github = githubhook(config.githubhook);

github.listen(function () {
  console.log("    .______.    ");
  console.log("   /        \\  ");
  console.log("  +----------+  ");
  console.log("  |   Gone   |  ");
  console.log("  |  Fishin  |  ");
  console.log("  +==========+  ");
});

github.on('*', function(event, repo, ref) {
  console.log('Received ' + event + ' on ' + repo + ':' + ref);

  if(ref) {
    var branch = ref.split('/').pop();
    var script;

    console.log(branch);

    try {
      script = require('./hooks/' + repo + '/' + branch + '.js');
    }
    catch (e) {

    }

    if(script && script[event]) {
      console.log('==== Begin ' + repo + '/' + branch + ':' + event);

      try {
        script[event](function () {
          console.log('==== End ' + repo + '/' + branch + ':' + event);
        });
      }
      catch (e) {
        console.error('ERROR OCCURED IN TRIGGER: ' + e);
        console.log('==== End ' + repo + '/' + branch + ':' + event);
      }
    }
    else {
      console.log('No configured hooks');
    }
  }
});
