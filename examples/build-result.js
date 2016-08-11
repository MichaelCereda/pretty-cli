var pretty = require('../lib')({
  template: require('../lib/templates/advanced')
})
pretty.addCustomMethod('stats', function(content){
  return pretty.error({
    type:'title',
    name:'STATS',
    message: "time: "+ content.time+', errors:'+ content.errors+', warnings:'+content.warnings})
})

pretty.error({type:'title', name:'BUILD', message:'complete with errors'})
// pretty.error({type:'title', name:'STATS', message:'time: 45ms, errors: 1, warnings:3\n'})
pretty.stats({time:'30ms', errors:12, warnings:3})
console.log('')
pretty.error({message:'../files/test.js\n',name:'MODULE', type:'title'})
var description =
  "[00:00:19] Failed to load external module babel-core/register\n"
 +"[00:00:19] Failed to load external module babel/register\n"
 +"\n"
 +"module, __filename, __dirname) { import ...\n"
 +"                                     ^^^^^^\n"
 +"\n"
 +"SyntaxError: Unexpected reserved word\n"
 +"    at exports.runInThisContext (vm.js:53:16)\n"



pretty.error({message:'Test', description:description})
console.log('')
pretty.warning({message:'../files/test.js\n',name:'MODULE', type:'title'})
pretty.warning({message:'Test', description:description})
