/**
 * ==宽松相等
 * === 严格相等
 * ==允许在想等你的比较中进行强制类型转换，===不允许
 * 
 */
console.log('1' == 1);//true
console.log('1' === 1);//false
console.log('42' == false);//false '42'被强制转换为42 false被强制转换为0
console.log(`42` == true);//false
console.log(null == undefined);//true

console.log(`对象和非对象之间的相等比较`)
var a = 42;
var b = [42];
console.log(a == b);//true
var c = 'abc';
var d = Object(c);//装箱
console.log(c === d);//false
console.log(c == d);//true
