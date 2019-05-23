/**
 * 第二章 this全面解析
 * 2.1 调用位置
 * 2.2 绑定规则 
 * 2.3 优先级
 * 2.4 绑定例外
 * 2.5 this词法
 * 2.6 小结
 * ps： 由于node 的调用栈与 windows中的不同，所以本节中的例子需运行在
 */

/**
   * ps： 找到this，需要先分析调用栈，找到调用位置，然后应用绑定规则
   *
   * 2.1 调用位置
   * 调用位置是函数在代码中被调用的位置，与声明位置无关。
   */
{
    function test1() {
        //调用栈：test1，调用位置：test2    
    }
    function test2() {
        //调用栈：test2，调用位置：全局对象
        test1();
    }
    test2();
}

/**
 * 2.2 绑定规则：
 * 2.2.1 默认绑定
 * 2.2.2 隐式绑定
 * 2.2.3 显示绑定
 * 2.2.4 new绑定
 */
{
    /**
     * 2.2.1 默认绑定：使用不带任何修饰的函数引用进行调用
     */
    function testDefaultBind() {
        console.log(this.a);
    }
    var a = 1;
    testDefaultBind();//log:1

    /**
     * 2.2.2 隐式绑定：函数引用有上下文对象
     * 无论是在 implicitBindObj 中定义韩式先定义再添加为引用属性，函数testImplicitBind 严格来说都不属于 implicitBindObj对象
     * 然而， 调用位置会使用 implicitBindObj 上下文来引用函数，
     * 当函数引用有上下文对象时，饮食绑定规则会把函数调用中都this绑定到这个上下文对象。
     * */
    function testImplicitBind() {
        console.log(this.b);
    }
    var implicitBindObj = {
        b: 2,
        testImplicitBind: testImplicitBind
    }
    implicitBindObj.testImplicitBind();//log : 2

    /**
     * 对象属性引用链中只有最后一层会影响调用位置
     */
    function testAttrQuoteLink() {
        console.log(this.c);
    }
    var obj2 = {
        c: 4,
        testAttrQuoteLink: testAttrQuoteLink
    }
    var obj1 = {
        c: 3,
        obj2: obj2
    }
    obj1.obj2.testAttrQuoteLink();//4

    /**
     * 2.2.3 显式绑定
     * 在某个对象上强制调用函数
     */
    function testClearBind() {
        console.log(this.d)
    }
    let obj3 = {
        d: 5
    }
    testClearBind.call(obj3);//log: 5
    testClearBind.apply(obj3);//log: 5

    /**
     * 2.2.3.2 显式绑定的变种(硬绑定)
     */
    function testClearBind2() {
        console.log(this.e)
    }
    var obj4 = {
        e: 6
    }
    var bar = function () {
        testClearBind2.call(obj4);
    }
    bar();//log: 6
    setTimeout(bar, 100);// 6
    bar.call(window);//log: 6 硬绑定后的testClearBind2不可能再修改它的this
    
    /**
     * es5中提供了内置的方法function.prototype.bind，来支持硬绑定
     */
    var obj5 = {
        f: 7
    }
    function testClearBind3() {
        console.log(this.f);
    }
    testClearBind3.bind(obj5)();//bind会返回一个硬编码的新函数，它会把参数设置成this的上下文并调用原始函数
   
    /**
     * 2.2.4 new 绑定
     * 构造函数是一些使用new操作符被调用的函数，它们并不会属于某各类，也不会实例化一个类，它们只是被new操作符调用的普通函数而已。
     * 所有的函数都可以用new来调用，这种函数调用被称为构造函数调用。
     * 并不存在所谓的“构造函数”，只有对于函数的“构造调用“
     * 当用new来调用函数时，会执行下面的操作：
     * 1: 创建一个全新的对象
     * 2: 这个新对象会被执行【【原型】】连接
     * 3: 这个新对象会绑定到函数调用的this
     * 4: 如果函数没有返回其他对象，那么new表达式中的函数会自动返回这个新对象。
     */
    function testNewBind(g) {
        this.g = g;
    }
    var bar = new testNewBind(8);
    console.log(bar.g);
    //使用new来调用testNewBind时，会构造一个新对象，并把它绑定到testNewBind调用中的this上。
} 

/**
 * 2.3 优先级
 * new绑定 显式绑定 隐式绑定 默认绑定（严格模式下绑定到undefined）
 */

/**
 * 2.4 绑定例外（暂不讨论）
 * 被忽略的this
 * 间接引用
 * 软绑定
 */

/**
 * 2.5this词法
 * 箭头函数无法使用四种绑定规则，而是根据外层作用域来决定this
 */
{
    function testArrowFunc() {
        console.log(this.h);
        return () => { 
            console.log(this.h);
        }
    }
    testArrowFunc.call({ h: 10 })();//log 10 10 

    /**
     * 箭头函数可以像bing一样确保函数的this被绑定到指定对象，此外，其重要性还体现在它更常见的词法作用域取代了传统的this机制。
     * 等价于：
     */
    function testArrowFunc2() {
        console.log(this.h);
        let that = this;
        return function () {
            console.log(that.h);
        }
    }
    testArrowFunc2.call({ h: 10 })();//log 10 10
}

/**
 * 2.6 小结
 * 如果要判断一个运行中函数的this绑定，需要找到这个函数的直接调用位置。然后按以下顺序来判断this的绑定对象
 * 1: 由 new 调用 ？ 绑定到新创建的对象
 * 2: 由 call或者 apply调用？ 绑定到指定对象。
 * 3: 由上下文对象调用？绑定到哪个上下文对象。
 * 4: 默认绑定，严格模式下绑定到undefined,否则绑定到全局对象。
 * 
 * 有些调用可能在无意中修改绑定规则，可以使用 ø = Object.create(null) 以保护全局对象。
 * 
 * es6的箭头函数会继承外层函数调用的this绑定。与that = this 机制一样
 */