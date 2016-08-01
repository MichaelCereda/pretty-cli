/*
The MIT License (MIT)
Copyright (c) 2016 Michael Cereda
http://michaelcereda.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import fs from 'fs';
import path from 'path';
// import Map from './map';
import utils from './utils';

const DEFAULTS = {
  template: {},
  printOutput: true,
}

var externalInterface = (opts)=>{
  var _output = opts.output || console.log;
  var _context = opts.context || {};
  var _stack = opts.stack || {};
  var _printFn = opts.print;

  var mergeContext = (obj)=>{
    if(typeof obj == 'string') return obj;
    Object.assign(obj, _context, obj)
    return obj;
  }

  var addToStack = (content, type) => {
    if(!_stack[type]) _stack[type] = []
    _stack[type].push(content)
  }

  /**
   * Stacks saves one or multiple objects in memory and associates them with a
   * key.
   * It can be used with the templates in order to have extreme flexibility
   *
   * @param  {string} key     [description]
   * @param  {object|string} content Contains the message or the object
   * @param  {string} type Type of the message
   * @return {object} Returns content itself
   */
  // stack(key, content, type){ // TODO content can be an array
  //   if(!this._stack[key]){
  //     this._stack[key] = [];
  //   }
  //   this._stack[key].push({content:content, type:type})
  //   return content;
  // }
  var self = this;
  return {
    stack: (key)=>{

      var _key = key;
      if(_stack[key]) _stack[key] = {};
      console.log(key,_stack)

      let ei = externalInterface({
        output: addToStack,
        context: context,
        print: _printFn,
        stack: _stack[key]
      });

      ei.addCustomMethod({
        clear: function(){
          _stack = {};
        },
        get:()=>{
          return _stack;
        },
        print: function(){
          // console.log(_stack)
          Object.keys(_stack).map((k)=>{
               //console.log(this, _stack, k)
               _stack[k].map((o)=>{
                //  console.log(o)
                 _printFn(o, k)
                 //this[k](_stack[k])
               })
              //  console.log(this[k], _stack[k])

              //  console.log(line)
               //self[line.type](line.content);
             })

        }
      })
      return ei
    },
    context:(obj, return_new=false)=>{
      //getter
      if(!obj){
        return _context;
      }
      if(return_new){
        return externalInterface({
            context: obj
        });
      }
      return _context = obj;
    },
    log: (content) =>{
      content = mergeContext(content);
      // addToStack(content, 'log')
      return _output(content, 'log')
    },

    info: (content) => {
      content = mergeContext(content);
      // addToStack(content, 'info')
      return _output(content, 'info')
    },

    error: (content)=>{
      content = mergeContext(content);
      // addToStack(content, 'error')
      return _output(content, 'error')
    },

    warning:(content)=>{
      content = mergeContext(content);
      // addToStack(content, 'warning')
      return _output(content, 'warning')
    },
    success:(content)=>{
      content = mergeContext(content);
      // addToStack(content, type)
      // i) return stac, content, 'success');
      return _output(content, 'success')
    },
    addCustomMethod: function(obj, fn){
      if(typeof obj == 'string'){
        this[obj] = fn.bind(this);
      } else {
        Object.keys(obj).map((name,i)=>{
          this[name] = obj[name].bind(this)
        })
      }
      return self;
    }
  }
}




/**
 * @param  {[type]} settings  [description]
 * @param  {string|object} settings.template  Name of the template or object
 * @param  {string|object} settings.printOutput If false returns a string instead of using console.log
 */
module.exports = (settings)=>{

    var _stack = {};
    var _settings = {};
    var templates = [];
    Object.assign(_settings, DEFAULTS, settings)


  var _output = function(content, contentType, template='default'){
    const lambda = m => m;
    if(!content) content = '';
    var tmpl = templates[template][contentType]
                  ||
                    templates['plain'][contentType];
    let str = tmpl(content);
    // console.log(templates, template, contentType, tmpl, str, _settings)
    if(_settings.printOutput===false){
      return str;
    }

    console.log(str);

    return utils(template, this);
  }



  var addTemplate = (name, obj_or_path) => {
    if(typeof obj_or_path == 'string'){
      var finalPath;
      try{
        fs.statSync(obj_or_path);
        finalPath = obj_or_path;
      } catch(e){
        finalPath = path.join(__dirname, './templates/'+obj_or_path+'.js');
        try{
          fs.statSync(finalPath);
        } catch(e){

        }
      }
      templates[name] = require(finalPath);
    } else {

      templates[name] = obj_or_path;
    }

  }



  // getStack(key){
  //   if(!key) return _stack;
  //   if(this._stack[key]){
  //     return this._stack[key]
  //   }
  //   return []
  // }
  //
  // printStack(key){
  //   if(this._stack[key]){
  //     this._stack[key].map((line)=>{
  //       this[line.type](line.content);
  //     })
  //   }
  // }
  // clearStack(){
  //   this._stack = {}
  // }

  addTemplate('default', _settings.template)
  addTemplate('plain', 'plain')

  return externalInterface({output:_output, stack: _stack, print:_output})
}
