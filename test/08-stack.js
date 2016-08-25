const assert = require('chai').assert;
const captureStream = require('./stream.js');
const colors = require('colors');
const prettyInit = require('../src/pretty.js');

const msg = require('./mockData/messages').warnings;
const template = require('../src/templates/advanced');
const pretty = require('../src/pretty.js')({
  template
});

function buildStack(stack, msg) {
  return msg.forEach(item => stack.warning(item));
}

describe('Stack', () => {
  let hook;
  let stack;

  beforeEach(() => {
    hook = captureStream(process.stdout);
    stack = pretty.stack('build');
  });

  afterEach(() => {
    hook.unhook();
  });

  it('Should print title and message from the stack', () => {
    buildStack(stack, msg);
    stack.print();

    const expected = msg.map(title => template.warning(title)).join('\n');
    assert.deepEqual(hook.captured(), expected);
  });

  it('Should handle multiple stacks independently', () => {
    buildStack(stack, msg);
    buildStack(stack, msg);

    stack.print();

    let expected = msg.map(title => template.warning(title)).join('\n');
    expected = expected + expected;
    assert.deepEqual(hook.captured(), expected);
  });
})
