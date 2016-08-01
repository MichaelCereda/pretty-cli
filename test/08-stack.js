var assert = require('chai').assert;
var captureStream = require('./stream.js');
var colors = require('colors')

const TEMPLATE = require('../src/templates/advanced');

var pretty = require('../src/pretty.js')({
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
      var buildStack = pretty.stack('build');
      buildStack.warning(title);
      buildStack.warning(message);
      buildStack.warning(message_obj);

      buildStack.print()
      var checkMessage = TEMPLATE.warning(title)+'\n'
                       + TEMPLATE.warning(message)+'\n'
                       + TEMPLATE.warning(message_obj)+'\n'
                       ;
      assert.equal(hook.captured(),checkMessage);
    });
    it.only("Should handle multiple stacks independently", function(){
      var title = {type:'title', name:'WARNING', message:"This is a warning title\n"};
      var message = "This is a warning message\n"
      var message_obj = {message:"This is a warning message with description",
            description:'You can add very long descriptions, also pieces of code'}
      var buildStack = pretty.stack('build');
      buildStack.warning(title);
      buildStack.warning(message);
      buildStack.warning(message_obj);


      var checkMessage = TEMPLATE.warning(title)+'\n'
                       + TEMPLATE.warning(message)+'\n'
                       + TEMPLATE.warning(message_obj)+'\n'
                       ;

       var testStack = pretty.stack('test');
       testStack.warning({type:'title', name:'WARNING', message:"Test title\n"});
       testStack.warning(message);
       testStack.warning(message_obj);

      //  console.log(buildStack.get())
       buildStack.print();

       //testStack.print()
      //  var checkMessage = TEMPLATE.warning(title)+'\n'
      //                   + TEMPLATE.warning(message)+'\n'
      //                   + TEMPLATE.warning(message_obj)+'\n'
      //                   ;

      assert.equal(hook.captured(),checkMessage);
    });
})
