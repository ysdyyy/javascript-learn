import { appendFileSync } from "fs";
import { isObject } from "util";

/**
 * 第三章： 对象
 * 
 */

/**
 * 3.1语法
 * 
 */
{
    let myObj1 = {
        k1: 1,
        k2: 2
    }
    console.log(myObj1);

    let myObj2 = new Object();
    myObj.k1 = 1;
    myObj.k2 = 2;
    console.log(myObj2);
}

/**
 * 3.2类型
 * 简单基本类型；string boolean number null undefined本身并不是对象
 * 所以“javascript中万物都是对象”这句话是错误的
 * JavaScript中有很多特殊的对象字类型，我们称之为“复杂基本类型”，如函数
 * 函数是对象的一个子类型（可调用的对象）。JavaScript中函数是一等公民，本质和普通对象一样，只是可被调用。
 * 数组也是对象的一种类型。
 * JavaScript中还有一些对象字类型，通常称为内置对象。String Number Boolean Object Function Array.它们使一些内置函数，
 * 可以被当作构造函数带澳用，从而可以构造一个对应子类型的对象。
 */
{
    console.log(typeof null);//object 这是一个bug js中二进制前三位都为0的话被判断为object类型，null的二进制表示为全0，所以返回object
    
    //strPrimitive并不是一个对象，它是一个字面量，不可变，当调用length时候，语言会把字符串字面量转化成一个String对象(不会改变原字符串字面量)
    let strPrimitive = 'i am a string';
    console.log(typeof strPrimitive)//string
    console.log(strPrimitive instanceof String);//false

    var strObject = new String("I am a string");
    console.log(typeof strObject); // "object" 
    console.log(strObject instanceof String); // true
}

/**
 * 3.3内容
 * 3.3.1 可计算属性名
 * 3.3.2 属性与方法
 * 3.3.3 数组
 * 3.3.4 复制对象
 * 3.3.5 属性描述符
 * 3.3.6 不变性
 * 3.3.7 [[get]]
 * 3.3.8 [[put]]
 * 3.3.9 getter和setter
 * 3.3.10 存在性
 */
{
 /**
  * 3.3.1 暂不讨论
  * 3.3.2属性与方法 
  * 函数永远不会“属于”一个对象，所以函数不能称之为对象的方法。
  * 每次访问对象的属性就是属性访问，如果属性访问返回的是一个函数，那它也不是一个“方法”。
  */
    function func1() {
        console.log('func1')
    }
    var someFunc1 = func1;
    var myObj3 = {
        someFunc1: someFunc1
    }
    func1;//function func1
    someFunc1 // function func1
    myObj3.someFunc1 // function func1

    /**
     * 3.3.3数组
     * 数组是一个对象，不过有一套更加结构化的值存储机制
     */
    var myArr1 = [1, 2, 3];
    myArr1['3'] = 4;
    myArr1.length;//4
    myArr1[3];//4

    /**
     * 3.3.4 复制对象
     */

    /**
     * 3.3.5 属性描述符
     * 普通的对象属性对应的属性描述符有三个：
     * writable（可写）:是否可修改
     * enumerable（可枚举） ：是否会出现在对象的枚举类型中。for..in 只显示enumerable为true的。
     * configurable（可配置）：是否可配置，可不可以修改属性描述符 ，可不可以删除这个属性
     */
    let myObj4 = {};
    Object.defineProperty(myObj4, 'a', {
        value: 2,
        writable: true,
        configurable: true,
        enumerable: true,
    })

    /**
     * 3.3.6不变性。以下四种方式使对象浅不可变。
     * 对象常量
     * 禁止扩展
     * 密封
     * 冻结
     */

    // 1:对象常量
    let finalObj1 = {};
    Object.defineProperty(finalObj1, 'finalKey', {
        value: 1,
        writable: false,
        configurable: false
    })

    //2:禁止扩展
    var finalObj2 = { a: 1 };
    Object.preventExtensions(finalObj2);

    //3:密封
    let finalObj3 = Object.seal({ a: 1 });//可以修改属性的值

    //4:冻结
    let finalObj4 = Object.freeze({ a: 1 });

}