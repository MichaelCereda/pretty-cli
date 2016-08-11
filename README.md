# Pretty-cli

Pretty-cli is a lightweight utility that helps you to create nice looking command line interfaces. It forces a well structured output and gives unimited flexibility with its templating system without adding any overhead.
Freely inspired by my experience with bunyan
Check the code examples.

![out](https://cloud.githubusercontent.com/assets/107390/17268513/0be770fa-55fa-11e6-87cb-b07f70864fc7.gif)

## Installation

Just use NPM and you're ready to go
```
npm install pretty-cli --save
```

## Code Example

Instead of using console.log to output your messages:
```javascript
console.log("First error message");
console.log("Other unformatted error message");
```

with __pretty-cli__ you can
- Use different type of output

```javascript
pretty = require('pretty-cli')();

pretty.log("Log Message");
pretty.error("Error Message");
pretty.warning("Warning Message");
pretty.info("Info Message");
```

Use templates that unify your design

```javascript
pretty = require('pretty-cli')({
  template: 
})
pretty.log("Log Message");
pretty.error("Error Message");
pretty.warning("Warning Message");
pretty.info("Info Message");

```

With custom templates you can unify your styles and use complex objects.

```javascript
pretty = require('pretty-cli')({
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

var MY_TEMPLATE = {
  'info': function(message){return ' I '.bgBlue.black +" " + message},
  'error': function(message){return ' E '.bgRed.white +" " + message},
  'log': function(message){return ' L '.bgWhite.black +" " + message},
  'warning': function(message){return ' W '.bgYellow.black +" " + message}
}

```


### Advanced Use

Create custom print methods to automate special tasks

```javascript
pretty = require('pretty-cli')({
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

#### Context
Pretty-cli focuses on semplicity and reusability. You don't have to repeat yourself.

When you're looping through items sometimes happens that you want to mantain a similar context while changing just specific parts.
For this purpose you can use __.context()__ to achieve that functionality.

```javascript
var cli = require('pretty-cli')();

cli.context({
  type:'looped item'
});
//Shows current context
console.log(cli.context());
// { type:'looped item' }
for(var i=0;i<10;i++){
  cli.log({message:'Item '+i})
}

```
Context is automatically merged for every following message.  
To clean the context you can simply set it to an empty object.

```javascript
cli.context({
});
//Shows current context
console.log(cli.context());
// {}
```

<!-- #### Stacks
Stack all the messages and display them at the end of the execution or maybe pass it to a logging system.

```javascript

``` -->

### Utils

<!-- __line__ is used to create another line of the same paragraph.  
In order to obtain this effect you need to have a 'line' key in the template

```javascript
var MY_TEMPLATE = {
  //...
  'error': function(message){return ' E '.bgRed.white +" " + message},
  //...
  'line': function(message){return '    ' + message}
}

pretty.error({message:'../files/test.js\n',name:'MODULE', type:'title'})
      .line('text in the same paragraph.')
``` -->






## Motivation

This library has been created to help the js community in creating nice looking command line interfaces with the objective of improving current practices and standardize the output.

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
