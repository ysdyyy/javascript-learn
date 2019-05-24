/**
 * 2.4混合对象“类”
 * 4.1类理论
 * 4.2类的机制
 * 4.3类的继承
 * 4.4混入
 */

/**
 * 4.1类理论
 * 
 */
{
    /**
     * 4.4.1类设计模式
     * 类是一种设计模式，一种可选的代码抽象
     */

    /**
     * 4.4.2JavaScript中的类
     * 由于类是一种设计模式，所以你可以用一些方法近似实现类的功能。JavaScript提供了一些近似类的语法。如class new  extends
     * JavaScript虽然有近似类的语法，但是机制和类完全不同。
     */
}

/**
 * 4.2类的机制
 * 在很多面向对象类的语言中，标准库会提供stack类，它是一种栈数据结构，但你不是直接操作stack，stack类仅仅是一个抽象的表示。
 * 它描述了栈所需要做的事，但它本身并不是一个栈。
 * 4.2.1 建造
 * 类是蓝图，对象是真正的建筑。
 * 4.2.2 构造函数
 * 类构造函数属于类，通常和类同名。
 */

 /**
  * 4.3类的继承
  * 子类和父类并不是实例
  * 4.3.1多态
  * 重写
  * 4.3.2多重继承
  * JavaScript并不提供多重继承功能。
  */

/**
 * 4.4混入
 * 由于JavaScript中不存在类，所以我们操作的都是对象
 */
{
    /**
     * 4.4.1显式混入
     * 通过混入，obj2中有了obj1中的属性和函数的副本。从技术角度说，是复制了函数的引用。
     * obj1.c.call(this)是显式多态
     * 混合复制 暂不讨论
     * 寄生继承 暂不讨论
     */
    console.log(`显式混入`);
    function mixin(sourceObj, targetObj) {
        for (let key in sourceObj) {
            if (!(key in targetObj)) {
                targetObj[key] = sourceObj[key];
            }
        }
        return targetObj;
    }
    var obj1 = {
        a: 1,
        b: 2,
        c: function () {
            console.log(1);
        }
    }
    var obj2 = mixin(obj1, {
        d: 3,
        c: function () {
            obj1.c.call(this);
            console.log(2);
        }
    })
    console.log(obj2.a);
    console.log(` obj2.c() .result :`)
    obj2.c();

    /**
     * 4.4.2 隐式混入
     */
    console.log(`隐式混入`);
    var obj3 = {
        a: 1
    }
    var obj4 = {
        a: 2,
        b: function () {
            console.log(this.a)
        }
    }
    obj4.b.call(obj3);//log: 1
}

/**
 * 4.5 小结
 * 类是一种设计模式，许多语言提供了对于面向类软件设计的远胜语法，JavaScript也有类似的语法，但是和其他语言中的类完全不同。
 * 类意味着复制
 * 传统的类被实例化时，它的行为会被复制到实例中。类被继承时，行为也会被复制到子类中。
 * 多态看起来似乎是从子类引用父类，本质上引用的其实是复制但结果。
 * JavaScript并不会像类那样自动创建对象的副本
 * 混入模式可以用来模拟类的复制行为，但是通常会产生丑陋而且脆弱的语法，比如显式伪多态（xxx.funcName.call(this,...)
 * 此外，显式混入实际上无法完全模拟类的复制行为，因为对象只能复制引用，无法复制被引用的对象或者函数本身。
 * JavaScript中模拟类是得不偿失的。
 */

  