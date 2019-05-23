/**
 * 第一章 关于this
 * 1.1 为什么使用this
 * 1.2 误解
 * 1.3 this到底是什么
 * 1.4 小结
 */

{
    /**
      * 1.1 为什么使用this
      * speak1和speak2方法都完成了“speak”动作，
      * speak1方法需要显示传递一个对象，
      * speak2方法不需要显示传递对象，
      * speak2方法更加优雅。
      */
    const me = {
        name: "ysd"
    };
    function speak1(people) {
        console.log(people.name);
    }
    speak1(me);//ysd

    function speak2() {
        console.log(this.name);
    }
    speak2.call(me);//ysd
}

{
    /**
     * 1.2.1 this指向自身
     * foo里的this如果指向函数自身，foo.count应等于1,然而foo.count = 0 ,所以this并不指向自身
     */
    function foo() {
        this.count++;
    }
    foo.count = 0;
    foo();
    console.log(`foo 被调用了多少次？ ${foo.count}`);// foo.count = 0;
    console.log(`全局变量 count 的值：${count}`); // count = NAN
    foo.call(foo);
    console.log(`强制this指向foo函数对象后 foo 被调用了多少次？ ${foo.count}`);// foo.count = 1;
}

{
    /**
     * 1.2.2 this指向函数的作用域
     * 试图通过this.bar引用bar函数，报错：TypeError: this.bar is not a function
     * 试图通过this 联通foo2和bar的此法作用域，从而让bar可以访问foo作用域里的变量a，这是不可能实现的。
     */
    try {
        function foo2() {
            var a = 2;
            this.bar();
        }
        function bar() {
            console.log(this.a);
        }
        foo2();
    }
    catch (e) {
        console.log(e);//TypeError: this.bar is not a function
    }

}

{
    /**
     * 1.3 this是什么
     * this在运行时进行绑定的，并不是在编写时绑定，this的绑定和函数声明的位置没有任何关系，只取决于函数的调用方式
     * 当一个函数被效用时，会创建一个活动记录（上下文）。这个记录包含了函数在哪里被调用，函数的调用方法，传入的参数等
     * this就是记录的其中一个属性，会在函数执行的过程中用到。
     */
}

{
    /**
     * 1.4 小结
     * this既不指向函数自身也不指向函数的此法作用域
     * this实际上是在函数被调用时发生的绑定，它指向什么完全取决于函数在哪里被调用。
     */
}


