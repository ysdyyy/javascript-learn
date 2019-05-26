/**
 * 第五章：原型
 * 5.1 prototype
 * 5.2 类
 * 5.3 （原型）继承
 * 5.4 对象关联
 * 5.5 小结
 */

 /**
  * 5.1 prototype
  */
{
    /**
     * 5.1.1 object.prototype
     * 访问属性时，如果对象本身没有所需要的属性，就会继续访问对象的prototype链
     * Object.create会创建一个对象并把这个对象的prototype关联到指定的对象
     * 任何可以通过原型链访问到，而且是enumerable的属性都会被枚举。
     */
    var obj1 = { a: 1 };
    var b = Object.create(obj1);
    console.log(b.a);

    for (let k in b) {
        console.log(`k:${k},value:${b[k]}`);//k:a,value:1
    }
    
    console.log("a" in b);//true

    /**
     * 5.1.1 object.prototype
     * 所有普通的prototype链最终指向内置的Object.prototype.由于所有的普通（内置，不是特定主机的扩展）对象都“源于”
     * （或者说prototype链的顶端都设置为）这个Object.prototype对象，所以它包含JavaScript中许多通用的功能。如Object.prototype.toString
     */
    console.log(`5.1.1 object.prototype`)
    console.log(Object.prototype.hasOwnProperty.call({ a: 1 }, 'a'));

    /**
     * 5.1.2属性设置和屏蔽
     * 给一个对象设置属性值并不仅仅是添加一个新属性或者修改已有的属性值，下面是完整过程：
     * obj.foo = 'bar'
     * 如果obj对象中有包含名为foo的普通数据访问属性，他会修改已有属性值，过程结束。
     * 遍历prototype，如果原型链上有foo，
     *      若该属性为普通访问属性，则在obj中创建一个名为foo的新属性，它是屏蔽属性。
     *      若该属性只读，则什么也不做，过程结束。
     *      若该属性为是一个setter，他会调用这个setter，foo不会被添加到myobject,也不会重新定义foo这个setter，过程结束
     * foo添加到obj上。过程结束
     * 
     * 大多数开发者认为如果像prototype链上层已经存在的属性赋值，就一定会发生屏蔽，但事实上，只有一种是这样的。
     */
}

/**
 * 5.2类
 * JavaScript中没有类，只有对象
 * JavaScript应该被称为”面向对象“的语言，它是少有的可以不通过类，直接创建对象的语言。
 * 5.2.1”类“函数
 * 5.2.2”构造函数“
 * 5.2.3技术
 */
{
    /**
     * 5.2.1”类“函数
     * JavaScript中有一种奇怪的行为一直在被无耻的滥用，那就是模仿类。
     * 这种模仿类行为利用了函数的一种特殊特性：所有的函数默认都会拥有一个名为prototype的共有且不可枚举的属性，它会指向另一个对象。
     * JavaScript中没有像类那样的复制机制，不能创建一个类的多个实例子，只能创建多个对象，它们【prototype】关联的是同一个对象
     */
    console.log('class like function');
    function func1() {
        
    }
    console.log(func1.prototype);// func1 {}

    var func2 = new func1();//创建func2,给func2一个内部的prototype链接，关联到func1.prototype指向的那个对象。
    console.log(Object.getPrototypeOf(func2) === func1.prototype)//true
    //new func1（）会生成一个新对象，这个新对象的内部链接【【prototype】】关联的是func1.prototype对象。
    //我们得到了两个对象，它们之间互相关联。

    /**
     * JavaScript中不会将一个对象复制到另一个对象，只是将它们关联起来。
     * 这个机制通常被称为原型继承，常常被视为动态语言版本的类继承。
     * 继承意味着复制操作，JavaScript并不会复制对象属性，相反，JavaScript会在两个对象之间创建一个关联。
     * 这样，一个对象就可以通过“委托”访问另一个对象的属性和函数。“委托”这个术语更加准确的描述了JavaScript中对象的关联机制。
     */

    /**
     * 5.2.2 构造函数
     * func3.prototype.constructor公有且不可枚举，引用的是对象关联的函数（func3)
     * new func3()时也有一个.constructor指向“创建这个对象的函数”
     */
    console.log(`构造函数----`)
    function func3() {
        
    }
    
    console.log(func3.prototype.constructor === func3)
    var func4 = new func3();
    console.log(func4.constructor === func3);
    /**
     * 当你在普通的函数调用前面加上new关键字后，就会把这个函数调用变成一个“构造函数调用”，实际上，new会劫持所有的普通函数
     * 并用构造对象的形式来调用它。
     * JavaScript中对于“构造函数”最准确的解释是，所有带new的函数调用
     */
    function func5() {
        
    }
    let a = new func5();
    console.log(a);//{}

    /**
     * 5.2.3技术
     */
    console.log('5.2.3技术');
    function func6(name) {
        this.name = name;
    }
    func6.prototype.myName = function () {
        return this.name;   
    }
    var b = new func6('a');//b.prototype 会关联到func6.prototype上
    var c = new func6('b');
    console.log(b.myName());//通过原型链访问
    console.log(c.myName());

    function func7() { }
    func7.prototype = {};
    var func8 = new func7();
    console.log(func8.constructor === func7);
    console.log(func8.constructor === Object);
    // construtor只是通过默认的prototype委托指向func7，这和构造毫无关系
}


/**
 * 5.3 原型继承
 */
function func9(name) {
    this.name = name;
}
func9.prototype.myName = function () {
    return this.name;
}
function func10(name,label) {
    func9.call(this, name);
    this.label = label;
}
//我们创建了一个新的func10.prototype对象并关联到func9.prototype
func10.prototype = Object.create(func9.prototype);
