var assert = require('chai').assert;
var captureStream = require('./stream.js');
var colors = require('colors')

const TEMPLATE = require('../src/templates/basic');

var pretty = require('../src/pretty.js')({
  template: TEMPLATE
});



describe("Built-in Template", function(){
  var hook;
    beforeEach(function(){
      hook = captureStream(process.stdout);
    });
    afterEach(function(){
      hook.unhook();
    });
  var tests = {
    warning: 'Warning Message',
    log: 'Log Message',
    error: 'Error Message',
    info: 'Info Message'
  };

  Object.keys(tests)
    .map(function(key, i){
      it("Should print some "+ key, function(){
        var msg = tests[key]
        pretty[key](msg);
        assert.equal(hook.captured(),TEMPLATE[key](msg)+'\n');
      })
  })
})
