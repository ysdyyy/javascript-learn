/**
 * 1.1类型
 */
{

}

/**
 * 1.2内置类型
 * 7中内置类型
 * 空值 null
 * 未定义 undefined
 * 布尔值 boolean
 * 数字 number
 * 字符串 string
 * 对象 object
 * 符号 （symbol es6中新增）
 * 内置类型都有同名的字符串值与之对应（除了null，这是JavaScript中的bug）
 */
{   
    console.log(`1.2内置类型`)
    console.log(typeof undefined);
    console.log(typeof true)
    console.log(typeof 42)
    console.log(typeof 'a')
    console.log(typeof { a: 1 })
    console.log(typeof Symbol())
    console.log(typeof null)//object 这是JavaScript中的bug

    // 函数是JavaScript中object的子类型 
    console.log(typeof function () { });//function 函数是可调用对象，它有一个内部属性call使其可以被调用。
}

/**
 * 1.3 值和类型
 * JavaScript中的变量是没有类型的，值才有。变量可以随时持有任何类型的值
 * 变量在未持有值的时候未undefined
 * 还没有声明过的棉量，是undeclared的。
 */
{
    console.log(`1.3 值和类型`)
    var a 
    console.log(typeof a);
    a = 1;
    console.log(typeof a);
    a = 'a';
    console.log(typeof a);
    
    console.log(typeof b)//b 是一个undeclared变量，但是typeof依然返回了 undefined 
    /**
     * 1.3.2 typeof undeclared
     */
    console.log(`1.3.2 typeof undeclared`)
    if (typeof DEBUG !== 'undefined') {
        console.log(`debug is starting`)
    }
}



/**
 * 1.4小结
 * JavaScript中有其中内置类型：null,undefined,boolean ,number,string,object,symbol,可以使用运算符来查看。
 * 变量没有类型，但它们持有的值有类型，类型定义了值的行为特征。
 * undefined和undeclared是两码事，undefined是值的一种，undeclared表示变量还未被声明过。遗憾的是，JavaScript将它们混为一谈，
 * 在试图访问undeclared变量时，报错“ReferenceError: a is not defined”
 * 而且typeof对undefined和undeclared变量都返回 undefined
 * 然而，通过typeof的安全防范机制（阻止报错）来检查undeclared变量，有时是个不错的办法
 */
