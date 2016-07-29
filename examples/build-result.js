var Pretty = require('../lib');

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
// pretty.error({type:'title', name:'STATS', message:'time: 45ms, errors: 1, warnings:3\n'})
pretty.stats({time:'30ms', errors:12, warnings:3})
console.log('')
pretty.error({message:'../files/test.js\n',name:'MODULE', type:'title'})
pretty.error({message:'Test', description:"Bla bla\nBla bla"})
console.log('')
pretty.warning({message:'../files/test.js\n',name:'MODULE', type:'title'})
pretty.warning({message:'Test', description:"Bla bla\nBla bla"})
