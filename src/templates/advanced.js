/**
 * Inspired by
 * https://twitter.com/andreypopp/status/758251557100064768
 */
 var colors = require('colors/safe');

/**
 * Creating advanced themes is very easy.
 * _content_ can be a string or a JSON object, you have total control over the
 * formatting.
 *
 * Here I'm building the template using a loop, you can do as you
 * prefer. Loops help you to keep your style intact even if you add a lot of
 * elements.
 */


function block(msg){
  return ' '+msg+' ';
}

var types =  {
  'info': {initial: 'I', blockBg:['bgBlue','black'], titleColor:'blue'},
  'error': {initial: 'E', blockBg:['bgRed','white'], titleColor:'red'},
  'log': {initial: 'L', blockBg:['bgWhite','black'], titleColor:'white'},
  'warning': {initial: 'W', blockBg:['bgYellow','black'], titleColor:'yellow'},
}

var template = {};
Object.keys(types).map(function(type){
  var _specs = types[type];

  template[type] = function(content){
    var line = colors[_specs.blockBg[0]][_specs.blockBg[1]](block(_specs.initial))
            +" " + content;
    if(typeof content !== 'string'){
      line = colors[_specs.blockBg[0]][_specs.blockBg[1]](block(_specs.initial))
              +" " + content.message;
      if(content.type=='title'){
        line = colors[_specs.blockBg[0]][_specs.blockBg[1]](block(content.name))
                + " " + colors[_specs.titleColor](content.message);
      }
      if(content.description){
        line +='\n'+ content.description;
      }
    }
    return line;
  }
})
module.exports = template;
//
// module.exports = {
//   'info': function(content){
//     if(typeof content == 'string'){
//       return ' I '.bgBlue.black +" " + content
//     }
//     if(content.type=='title'){
//       return block(content.name).bgBlue.black +" " + content.message
//     }
//
//   },
//   'error': function(content){
//     if(typeof content == 'string'){
//       return ' E '.bgRed.white +" " + content
//     }
//     if(content.type=='title'){
//       return block(content.name).bgRed.white +" " + content.message.red
//     }
//
//   },
//   'log': function(content){
//     if(typeof content == 'string'){
//       return ' L '.bgWhite.black +" " + content
//     }
//     if(content.type=='title'){
//       return block(content.name).bgWhite.black +" " + content.message
//     }
//
//   },
//   'warning': function(content){
//     if(typeof content == 'string'){
//       return ' W '.bgYellow.black +" " + content
//     }
//     if(content.type=='title'){
//       return block(content.name).bgYellow.black +" " + content.message.yellow
//     } else {
//
//     }
//
//   }
// }
