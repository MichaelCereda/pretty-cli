var assert = require('chai').assert;
var captureStream = require('./stream.js');
var colors = require('colors')

const TEMPLATE = require('../src/templates/advanced');

var pretty = new(require('../src/Pretty.js'))({
  template: 'advanced'
});


describe("Stack", function(){
  var hook;
    beforeEach(function(){
      hook = captureStream(process.stdout);
    });
    afterEach(function(){
      hook.unhook();
    });

    it("Should print title and message from the stack", function(){
      var title = {type:'title', name:'WARNING', message:"This is a warning title\n"};
      var message = "This is a warning message\n"
      var message_obj = {message:"This is a warning message with description",
            description:'You can add very long descriptions, also pieces of code'}

      pretty.warning(title, 'warning_section');
      pretty.warning(message, 'warning_section');
      pretty.warning(message_obj, 'warning_section');

      pretty.printStack('warning_section')
      var checkMessage = TEMPLATE.warning(title)+'\n'
                       + TEMPLATE.warning(message)+'\n'
                       + TEMPLATE.warning(message_obj)+'\n'
                       ;
      assert.equal(hook.captured(),checkMessage);
    });
})
