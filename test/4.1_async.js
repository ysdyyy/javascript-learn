/**
 * 第一章：异步：现在与将来
 * 程序现在运行的部分和将来运行的部分之间的关系就是异步编程的核心。
 */


/**
 * 1.1 分块的程序。
 * 程序是由多个块组成的，这个块中只有一个是现在执行，其余的则是在将来执行。最常见的块单位是函数。
 */
{
    /**
     * 现在执行的部分
        function now() {
            return 21
        }
        function later() {
        
        }
        var answer = now();
        setTimeout(later, 1000);
        
        将来执行的部分:
        answer++;
        console.log(`one second later ,answer is ${answer}`);
        只要把一段代码包包装成一个函数，并指定它在响应某个时间时执行，就是在代码中创建了一个将来执行的块，也由此在这个程序中引入来异步机制。
     */
    function now() {
        return 21
    }
    function later() {
        answer++;
        console.log(`one second later ,answer is ${answer}`);
    }
    var answer = now();
    setTimeout(later, 1000);

    /**
     * 下面的代码，通常会打印出1
     * 代码运行的时候，io是非常低速的阻塞部分，所以，浏览器（引擎）在后台异步处理控制台io会提高性能。所以有可能会打印出2
     * 如果遇到这种少见的情况，最好的选择是在JavaScript调试器中使用断电，次优的方案是把对象序列化到一个字符串中，以强制执行一次“快照”
     */
    var a = 1;
    console.log(a);
    a++;

}

/**
 * 1.2事件循环
 * 尽管能够编写异步代码，但直到最近（es6将时间循环纳入了JavaScript引擎但实力范围，而不只是由宿主环境来进行管理），JavaScript才真正内建有直接的异步概念
 * 
 * JavaScript运行环境的共同点：它们都提供了一种机制来处理程序中多个块的执行，且执行每块时调用JavaScript引擎，这种机制称为事件循环
 * 换句话说，JavaScript引擎本身并没有时间的概念，只是一个按需执行JavaScript任意代码片段的环境。“事件”（即JavaScript代码执行）调度
 * 是由包含它的环境进行。
 * ajax请求为例：javascript引擎通知宿主环境我要暂停了，网络请求返回时调用这个函数。然后浏览器会侦听来自网络的响应，拿到数据之后，会把
 * 回调函数插入到事件循环，以此实现对这个回调的调度执行。
 * 
 * 程序被分成了很多小块，在事件循环队列中一个接一个地执行。严格的说，和你的程序不相关的其他事件也可能会插入到队列中。
 */

/**
 * 1.3并行线程
 * 异步和并行：
 *  异步是关于现在和将来的事件间隙。并行是关于能够同时发生的事情
 * 由于JavaScript的单线程特性，func1一旦开始运行，它的所有代码都会在func2任意代码运行之前完成。或者相反。着称为完整运行特性。
 */
{
    var a = 1;
    function func1() {
        a++;
    }
    function func2() {
        a--;
    }
    //ajax(xxxx,func1);
    //ajax(xxxx,func2);
}

/**
 * 1.4并发
 */