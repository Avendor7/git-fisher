Hooks folder
------------
This folder contains all event handlers for repos. Each folder here is the name of one repo to listen for.

To add an event handler to a repo, create a new .js file with the name of the branch you want to listen for, and create a new function in the exports object that is the name of the event you want to handle.

Eg.
If you want to handle events on the `master` branch of the repo `Foobar`, create the following structure:

```
hooks/
+ Foobar/
  + master.js
```

```JavaScript
/** master.js **/
module.exports = {
    push: function (done) {
        // Handle push event...
        done();
    },
    fork: function (done) {
        // Handle fork event...
        done();
    }
}
```
