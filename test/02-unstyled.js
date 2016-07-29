var assert = require('chai').assert;
var captureStream = require('./stream.js');
var pretty = new(require('../src/Pretty.js'))();


describe("Unstyled output", function(){
  var hook;
    beforeEach(function(){
      hook = captureStream(process.stdout);
    });
    afterEach(function(){
      hook.unhook();
    });

  it("Should print some unstyled log output", function(){
    pretty.log('hi');
    assert.equal(hook.captured(),'hi\n');
  })

  it("Should print some unstyled info", function(){
    pretty.info('info message');
    assert.equal(hook.captured(),'info message\n');
  })
  it("Should print some unstyled error", function(){
    pretty.error('error message');
    assert.equal(hook.captured(),'error message\n');
  })
})
