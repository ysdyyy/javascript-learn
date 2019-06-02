/***
 * 我们用回调函数来封装程序中的continuation，然后把回调交给第三方（甚至外部代码），接着期待其能够调用回调，实现正确的功能。
 * 但是，如果我们能够把控制反转再反转回来，会怎样呢？
 * 不把自己的continuation传给第三方，而是希望第三方给我们提供了解其任务何时结束的能力，然后由自己的代码来决定下一步做什么。
 * 这种范式被称为promise.
 */
{
    /**
     * .then(values => {操作的是返回的第二个promise，而非promise.all创建的第一个promise。
     * 一旦promise决议，它就永远保持在这个状态，此时它就成为了不变值，可以根据需求多次查看。
     */
    async function fetchX() {
        return 1;  
    }
    async function fetchY() {
        return 2;
    }
    function add(xPromise, yPromise){
        return Promise.all([xPromise, yPromise]).then(values => { //.then创建另外一个promise
            return values[0] + values[1];
        })
    }
    add(fetchX(), fetchY()).then(sum => { 
        console.log(sum);
    })
}

/**
 * 1.2完成事件
 * 单独的promise展示了未来值的特性。但也可以从另外一个角度来来看待promise但决议：一种在异步任务中作为两个个或更多步骤但流程控制机制，时序上的
 * this-then-that
 */

/**
 * 1.2具有then方法的鸭子类型。
 */
{
    console.log(`具有then方法的鸭子类型`);
    let obj1 = { then: function () { console.log(1) } };
    console.log(obj1.then);
}


/**
 * 1.6promise 模式
 * promise.all 主promise仅在所有成员promise都完成后才会完成
 * promise.race 第一个到达重点的胜利，竞态,只有一个能取胜
 */
{
    console.log(`promise.all`);
    Promise.all([
        new Promise(res => { 
            console.log(`func1 done`);
            res(1);
        }),
        new Promise(res => {
            console.log(`func2 done`);
            res(2);
        }),
    ]).then(function (values) {
        console.log(`done,values:${JSON.stringify(values)}`);
    })
   
    console.log(`promise.race`);
    Promise.race([
        new Promise(res => {
            console.log(`func1 done`);
            res(1);
        }),
        new Promise(res => {
            console.log(`func2 done`);
            res(2);
        }),
    ]).then(function (value) {
        console.log(`done,value:${JSON.stringify(value)}`);
    })
}


/**
 * 小结：
 * promise解决了我们因只用回调的代码而备受困扰的控制反转问题。
 * 它们没有摒弃回调，只是把回调的安排转交给了一个位于我们和其他工具之间的可信任的中介机制
 * promise链也开始提供以顺序的方式表达异步流的一个更好的办法，这有利于我们的大脑更好的计划和维护异步的JavaScript代码。
 */