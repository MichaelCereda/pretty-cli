/**
 * Inspired by
 * https://twitter.com/andreypopp/status/758251557100064768
 */
var colors = require('colors');

module.exports = {
  'info': function(message){return ' I '.bgBlue.black +" " + message},
  'error': function(message){return ' E '.bgRed.white +" " + message},
  'log': function(message){return ' L '.bgWhite.black +" " + message},
  'warning': function(message){return ' W '.bgYellow.black +" " + message}
}
