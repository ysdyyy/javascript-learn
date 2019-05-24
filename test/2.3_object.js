/**
 * 第三章： 对象
 * 3.1语法
 * 3.2类型
 * 3.3内容
 * 3.4遍历
 * 3.5小结
 */

/**
 * 3.1语法
 * 
 */
{
    console.log(`3.1-----------`);
    let myObj1 = {
        k1: 1,
        k2: 2
    }
    console.log(myObj1);

    let myObj2 = new Object();
    myObj2.k1 = 1;
    myObj2.k2 = 2;
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
    console.log(`3.2-----------`);
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
    console.log(`3.3-----------`);
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

    /**
     * 3.3.7 ~ 3.3.9 
     * get put 暂不讨论
     * getter setter：
     * 不管是对象文字语法中的get a(){}还是defineperty中的显式定义，二者都会在对象中创建一个不包含值的属性，对于这个属性的
     * 访问会自动调用一个隐藏函数，它的返回值会被当作属性访问的返回值
     */
    var myObj5 = {
        get a() {
            return 2
        }
    }
    console.log(myObj5.a);

    Object.defineProperty(myObj5, "b", {
        get: function () { return this.a * 2 },
        enumerable: true,
    })
    console.log(myObj5.b);

    /**
     * 3.3.10 存在性
     * 不能用obj.a==undefined来判断是否有该属性，有可能obj.a的值为undefined
     * 我们可以在不访问属性值的七个恐惧昂下判断对象中是否存在这个属性。
     * in : 检查属性是否在对象及其[ [prototype] ]原型链中
     * hasownproperty：只会检查是否在对象中
     */
    var myObj6 = {
        a: 2
    }
    console.log('a' in myObj6);
    console.log(myObj6.hasOwnProperty("a"))
}

/**
 * 3.4 遍历
 * for..in 用来遍历对象的可枚举属性列表 
 * for of  用来遍历数组的值
 * foreach 遍历
 * every 遍历，直到返回false
 * some  遍历，直到返回true
 * 数组有内置的iterator
 * 普通对象没有内置的iterator,是为了避免影响未来的对象类型，当然，可以给任何想便利的对象定义iterator
 */
{
    console.log(`3.4-----------`)
    let myArr2 = [1, 2, 3];
    myArr2.temp = 1;
    for (let k in myArr2) {
        console.log(`k:${k}, value:${myArr2[k]}`); // k:0, value:1 k: 1, value: 2 k: 2, value: 3 k: temp, value: 1
    }
    for (let item of myArr2) {
        console.log(`item:${item}`);// item:1 item:2 item:3
    }
    myArr2.forEach(value => {
        console.log(`item:${value}`);// item:1 item:2 item:3
    });

    myArr2.every(item => {
        console.log(`item:${item}`);// item:1 item:2 item:3
        return true;
    });
    myArr2.some(item => { 
        console.log(`item:${item}`);// item:1 item:2 item:3
        return false;
    })
    //数组有内置的iterator
    var it = myArr2[Symbol.iterator]();
    it.next();//{value: 1, done: false}
    it.next();//{value: 2, done: false}
    it.next();//{value: 3, done: false}
    it.next();//{value: undefined, done: true}

    //给对象定义iterator
    var myObj7 = { a: 1, b: 2 };
    Object.defineProperty(myObj7, Symbol.iterator, {
        enumerable: false,
        writable: false,
        configurable: false,
        value: function () {
            var o = this;
            var idx = 0;
            var ks = Object.keys(o);
            return {
                next: function () {
                    return {
                        value: o[ks[idx++]],
                        done: idx > ks.length
                    }
                }
            }
        }
    });
    var it2 = myObj7[Symbol.iterator]();
    it2.next();
    it2.next();
    it2.next();

    for (let v of myObj7) {
        console.log(v);
    }
}

/**
 * 3.5小结
 * JavaScript对象有字面形式和构造形式。字面形式更常用，不过有时候构造形式可以提供更多选项。
 * 很多人认为JavaScript万物都是对象，这是错误的。对象是6个（或者说七个，取决于你的观点）基础类型之一。
 * 对象有包括function在内的子类型，不同子类型具有不同的行为，比如内部标签【object Array]表示这是对象的子类型数组
 * 对象是键值对的集合。可以通过.a或者【‘a’】来获取属性值。
 * 访问属性值时，引擎实际会调用内部的默认【【get】】操作，【【get】】操作会检查对象本身是否包含这个属性，如果没找到的话还会查找【【prototype】】链
 * 属性的特性可以通过属性描述符来控制，此外，还可以使用object.preventextensions object.seal object.freeze来设置对象的不可变性级别
 * 属性不一定包含值，它们可能是具备getter setter的访问描述符。此外，属性可以是可枚举或不可枚举的，这决定了它们是否会出现在for..in中
 */