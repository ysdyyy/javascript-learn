/**
 * 6.1面向委托的设计
 * 面向委托的设计，是一种不同于类的设计模式。
 */


/**
 * 6.1.1类理论
 */
{

}


/**
 * 6.1.2委托理论
 * 委托行为意味着某些对象在找不到属性或者方法引用时，会把这个请求委托给另一个对象。
 */
{

    Task = {
        setId: function (id) {
            this.id = id;
        },
        outPutId: function () {
            console.log(this.id);
        }
    }

    XYZ = Object.create(Task);
    console.log(XYZ.prototype == Task.prototype);//true
    XYZ.prepareTask = function (id, label) {
        this.setId(id);
        this.label = label;
    }
    XYZ.outPutPrepareTask = function () {
        this.outPutId();
        console.log(this.label);
    }

    XYZ.prepareTask('1', '2');
    XYZ.outPutPrepareTask();// 1 2 
}



/**
 * 6.1.3  比较思维模型
 * 面向对象和面向关联具体实现方法
 */
{
    /**
     * 面向对象
     * 
     */
    console.log(`面向对象的实现方法`)
    function func1() {
        console.log(1);
    }
    func1.prototype.func2 = function () {
        console.log(2);
    }
    function func3() {
        console.log(3);
    }
    func3.prototype = Object.create(func1.prototype);
    func3.prototype.func4 = function () {
        this.func2();
        console.log(4);
    }
    var obj1 = new func3();
    obj1.func4()
    
    /**
     * 面向关联
     */
    console.log(`面向关联的实现方法`)
    let obj2 = {
        a: function () { console.log('a') },
        b: function () { console.log(`b`) }
    }
    let obj3 = Object.create(obj2);
    obj3.c = function () { console.log('c') };
    let obj4 = Object.create(obj3);
    obj4.a();
}

/**
 * 6.2类与对象
 */

/**
 * 6.2.1控件“类”，面向对象的设计模式。
 * 在面向对象设计模式中我们需要先在父类中定义基础的render,然后在子类中重写它。
 * 我们需要使用丑陋的显式伪多态。widget.prototype.render.call(this, $where)
 */
{
    function widget(width, height) {
        this.width = width;
        this.height = height;
        this.$elme = null;
    }   
    widget.prototype.render = function ($where) {
        console.log(`widget.prototype.render: width:${this.width},height:${this.height}`);
    }
    function button(width, height, label) {
        widget.call(this, width, height);
        this.label = label || 'default';
        this.$elme = { text: this.label }
    }
    button.prototype = Object.create(widget.prototype);

    button.prototype.render = function ($where) {
        widget.prototype.render.call(this, $where);
        console.log(`button.prototype.render,label:${this.label}`);
    }

    let btn1 = new button(1, 2, 'a');
    btn1.render(1);

    /**
     * es6提供的语法糖，
     * 语法上得以改进，但实际上这里并没有真正的类，class依然是通过prototype机制实现的。
     * 依然是面向对象的设计模式，因为你依然需要使用类的概念对问题进行建模。
     */
    class Widget{
        constructor(width, height) {
            this.width = width;
            this.height = height;
        }
        render($where) {
            console.log(`widget.prototype.render: width:${this.width},height:${this.height}`);
        }
    }
    class Button extends Widget{
        constructor(width, height, label) {
            super(width, height);
            this.label = label;
        }
        render($where) {
            super.render($where);
            console.log(`button.prototype.render,label:${this.label}`);
        }
    }

    new Button(1, 2, 'a').render(1);    
}
 
/**
 * 6.2.2 委托控制对象
 * 使用行为委托的设计模式
 * 
 */
{
    console.log(`使用对象关联的设计模式`)
    let widget = {
        init: function(width, height){
            this.width = width;
            this.height = height;
        },
        show: function () {
            console.log(`this.width:${this.width},this.height:${this.height}`);
        }
    }
    let button = Object.create(widget);
    button.build = function (width,height,label) {
        this.init(width, height);
        this.label = label;
    }
    button.showSelf = function () {
        this.show();
        console.log(this.label);
    }
    let btn1 = Object.create(button);
    btn1.build(1, 1, 'a');
    btn1.showSelf();

}

/**
 * 6.3更简洁的设计
 * 对象关联除了能让代码看起来更简洁之外还可以通过行为委托模式简化代码结构
 * 对象关联风格的代码和行为委托模式
 */
{
    console.log(`更简洁的设计`)
    let obj5 = {
        a: function () {
            console.log(1);
        }
    }
    let obj6 = Object.create(obj5);
    obj6.b = function () {
        console.log(`obj6.b`);
    }
    let obj7 = Object.create(obj5);
    obj7.b = function () {
        console.log(`obj7.b`);
    }
    
    Object.create(obj6).b();
    Object.create(obj7).b();
}

/**
 * 6.4更好的语法
 */
/**
 * 6.5 内省
 * 使用对象关联时，所有的对象都是通过prototype委托相互关联，下面是内省的方法。
 */
{
    console.log(`内省`)
    let obj8 = {};
    let obj9 = Object.create(obj8);
    let obj10 = Object.create(obj9);
    console.log(obj8.isPrototypeOf(obj10));
    console.log(obj9.isPrototypeOf(obj10));
}

/**
 * 6.6 小结
 * 除了“类“这一代码组织方式之外，我看到了一种更加强大的设计模式：行为委托。
 * 行为委托认为对象之间是兄弟关系，互相委托，而不是父亲和子类的关系。JavaScript的prototype机制本质上就是行为委托机制。也就是说
 * 我们可以选择在JavaScript上努力实现类机制，也可以使用更自然的prototype委托机制。
 * 当你只用对象来设计代码时，不仅可以让语法更加简介，而且可以让代码结构更加清晰
 * 对象关联是一种编码风格，它倡导的是直接创建和关联对象，而不是把它们抽象成类。
 * 对象关联可以用基于prototype的行为委托非常自然的实现。
 * 
 * 对象关联和行为委托的区别：
 *  对象关联是一种编码风格，倡导直接创建和关联对象
 *  行为委托是一种设计模式，JavaScript的prototype机制本质上就是行为委托机制
 */
