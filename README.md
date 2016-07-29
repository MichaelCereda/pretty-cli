## Synopsis

Pretty-cli is a lightweight utility that helps you to create nice looking command line interfaces. It forces a well structured output and gives unimited flexibility with its templating system without adding any overhead.
Check the code examples.

## Code Example

Instead of using console.log to output your messages:
```javascript
console.log("First error message");
console.log("Other unformatted error message");
```

with __pretty-cli__ you can
- Use different type of output

```javascript
var Pretty = require('pretty-cli');

pretty = new Pretty();

pretty.log("Log Message");
pretty.error("Error Message");
pretty.warning("Warning Message");
pretty.info("Info Message");
```

Use templates that unify your design

```javascript
var Pretty = require('pretty-cli');

pretty = new Pretty({
  template: 'advanced'
})
pretty.log("Log Message");
pretty.error("Error Message");
pretty.warning("Warning Message");
pretty.info("Info Message");

```

Create custom templates easily and use complex objects instead of strings.

```javascript
var Pretty = require('pretty-cli');

pretty = new Pretty({
  template: 'advanced'
})
pretty.error({message:'../files/test.js\n',name:'MODULE', type:'title'})
pretty.error({message:'Test', description:"Long description message or code sample"})

```

Create custom templates in a breeze, they are pure javascript!
In this example I'm using colors, but you can use everything you prefer.  
There are no limitations.

```javascript
var colors = require('colors');

module.exports = {
  'info': function(message){return ' I '.bgBlue.black +" " + message},
  'error': function(message){return ' E '.bgRed.white +" " + message},
  'log': function(message){return ' L '.bgWhite.black +" " + message},
  'warning': function(message){return ' W '.bgYellow.black +" " + message}
}

```


### Advanced Use

Create custom print methods to automate special tasks

```javascript
var Pretty = require('pretty-cli');

pretty = new Pretty({
  template: 'advanced'
})
pretty.addCustomMethod('stats', function(content){
  return pretty.error({
    type:'title',
    name:'STATS',
    message: "time: "+ content.time+', errors:'+ content.errors+', warnings:'+content.warnings})
})

pretty.error({type:'title', name:'BUILD', message:'complete with errors'})
pretty.stats({time:'30ms', errors:12, warnings:3})
```
![pretty-cli](https://cloud.githubusercontent.com/assets/107390/17260213/15b804da-559d-11e6-8f3c-22149b5b1fcd.jpg)


Use stacks to save messages with a key instead of printing them

```javascript
```

## Motivation

This library has been created to help the js community in creating nice looking command line interfaces with the objective of improving current practices and standardize the output.

## Installation

Just use NPM and you're ready to go
```
npm install pretty-cli --save
```

## API Reference



## Tests

Tests can be run with mocha

```
mocha test
```

## Contributors

Contributors are very very welcome.  
The project needs:
- People who can create nice looking templates
- New ideas to help the workflow of developers
- Pull requests

## License


The MIT License (MIT)
Copyright (c) 2016 Michael Cereda
http://michaelcereda.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
