var assert = require('chai').assert;
var captureStream = require('./stream.js');
var colors = require('colors')

const TEMPLATE = require('../src/templates/advanced');

var pretty = new(require('../src/Pretty.js'))({
  template: 'advanced'
});


describe("Titles", function(){
  var hook;
    beforeEach(function(){
      hook = captureStream(process.stdout);
    });
    afterEach(function(){
      hook.unhook();
    });

  var tests = {
    warning: {type:'title', name:'WARNING', message:"This is a warning title"},
    log: {type:'title', name:'MODULE', message:"Log Title"} ,
    error: {type:'title', name:'ERROR', message:"Error Title"},
    info: {type:'title', name:'MODULE', message:"Info Title"}
  }

  Object.keys(tests)
    .map(function(key, i){
      it("Should print a title of "+ key, function(){
        var msg = tests[key]
        pretty[key](msg);
        assert.equal(hook.captured(),TEMPLATE[key](msg)+'\n');
      })
  })

})
