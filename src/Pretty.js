/*
The MIT License (MIT)
Copyright (c) 2016 Michael Cereda
http://michaelcereda.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import {union} from 'lodash';

class ExternalInterface {
  constructor(opts) {
    this.settings = {};

    Object.assign(this.settings, this.settings, opts || {});

    this._output = opts.output || console.log;
    this._context = opts.context || {};
    this._stack = opts.stack || {};
    this._parent_key = opts.parent_key || "";
    this._printFn = opts.print;
    this._cached_messages = [];

    let methods = ['log', 'info', 'warning', 'success', 'error'];

    if (opts.template) {
      methods = union(methods, Object.keys(opts.template));
    }

    methods.map((method, i) => {
      this[method] = ((contentType) => {
        var _ct = contentType;
        return (content) => {
          if (typeof content !== 'string') {
            Object.assign(content, this._context, content);
          }
          this._output(content, _ct);
        }
      })(method)
    })

    if (this._parent_key !== '') {
      this['clear'] = () => {
        this._stack = {};
      }
      this['get'] = () => {
        return this._stack;
      }
      this['print'] = () => {
        this._printFn()
      }
    }
  }

  stack(key) {
    const newSettings = Object.assign({}, this.settings, {
      stack: {},
      parent_key: key
    });

    this.stack[key] = new ExternalInterface(newSettings);
    return this.stack[key];
  }

  context(ctx) {
    this._context = ctx;
    return this;
  }
  addCustomMethod(name, fn) {
    this[name] = fn;
  }
}

module.exports = function (opts) {
  opts = opts || {}

  let output = opts => {
    var _opts = opts;

    return (content, contentType) => {
      var tmpl;
      if (!_opts || !_opts.template || !_opts.template[contentType]) {
        tmpl = x => x;
      } else {
        tmpl = _opts.template[contentType]
      }
      if (!content) content = '';

      let str = tmpl(content);

      if (_opts.printOutput === false) {
        return str;
      }
      console.log(str)
    }
  }
  Object.assign(opts, {
    output: output
  }, opts)
  // Inizializing output function
  opts.output = opts.output(opts)
  opts.print = opts.output
  return new ExternalInterface(opts)
}
