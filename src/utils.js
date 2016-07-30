
const UTILS = (template, pretty)=>{
  return {
    line:(content)=>{
        return pretty._print(content, 'line');
    }
  }
}
export default UTILS;
