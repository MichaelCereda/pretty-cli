var assert = require('chai').assert;
var captureStream = require('./stream.js');
var colors = require('colors')

const TEMPLATE = require('../src/templates/advanced');

var pretty = require('../src/pretty.js')({
  template: TEMPLATE
});


describe("Context", function(){
  var hook;
    beforeEach(function(){
      hook = captureStream(process.stdout);
    });
    afterEach(function(){
      hook.unhook();
    });

    it("Should add field from context", function(){
      var title = {type:'title', name:'WARNING', message:"This is a warning title\n"};
      var message = "This is a warning message\n"
      var message_obj = {message:"This is a warning message with description"}
      pretty.context({description:'You can add very long descriptions, also pieces of code'});
      pretty.warning(title);
      pretty.warning(message);
      pretty.warning(message_obj);

      var checkMessage = TEMPLATE.warning(title)+'\n' +
                         TEMPLATE.warning(message)+'\n' +
                          TEMPLATE.warning(message_obj)+'\n'
                       ;
      assert.equal(hook.captured(), checkMessage);
      assert.property(message_obj,'description');
    });
})
