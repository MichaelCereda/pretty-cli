
const UTILS = (template, pretty)=>{
  return {
    /**
     * Indent add a number of spaces before the text in order to  put in in the same line
     *
     * @param  {string|array} content if content is a string the function tries to split it 
     * @return {[type]}         [description]
     */
    indent:(content)=>{
        return pretty._output(content, 'line');
    }
  }
}
export default UTILS;
