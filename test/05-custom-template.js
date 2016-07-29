var assert = require('chai').assert;
var captureStream = require('./stream.js');
var colors = require('colors')

const TEMPLATE = {
  'info': function(message){return ' I '.bgBlue.black +" " + message},
  'error': function(message){return ' E '.bgRed.white +" " + message},
  'log': function(message){return ' L '.bgWhite.black +" " + message},
  'warning': function(message){return ' W '.bgYellow.black +" " + message}
}
var pretty = new(require('../src/Pretty.js'))({
  template: TEMPLATE
});


describe("Custom Template", function(){
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
    info: 'Info Message'};

  Object.keys(tests)
    .map(function(key, i){
      it("Should print some "+ key, function(){
        var msg = tests[key]
        pretty[key](msg);
        assert.equal(hook.captured(),TEMPLATE[key](msg)+'\n');
      })
  })

})
