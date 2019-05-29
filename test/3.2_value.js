/**
 * 第二章：值
 * 2.1数组
 * 2.2字符串
 * 2.3数字 
 * 能够被“安全”呈现的最大整数是2^53-1 9007199254740991
 * 2.4特殊数值
 * 2.5值和引用
 */
{
    console.log(Number.MAX_VALUE);
    console.log(Number.MAX_SAFE_INTEGER);
    console.log(Number.MIN_VALUE);
    console.log(Number.MIN_SAFE_INTEGER);
}
{
    console.log(`2.4特殊数值`)
    var a = 1 / 'foo';//NAN (not a number)
    console.log(typeof a == 'number');// true 
    console.log(NaN == NaN);//false
    console.log(NaN === NaN);//false
    console.log(NaN != NaN);//true
    console.log(isNaN(NaN));//true
    /**
     * NAN是一个”警戒值“（有特殊用途的常规值），用于指出数字类型中的错误情况，即”执行数学运算没有成功，这是失败后返回的结果“
     * NAN是一个特殊值，它和自身不想等，是唯一一个非自反的值
     * 用isNaN来判断是否是NaN,isNaN的原理：检查参数是否不是NaN,也不是数字
     */
    var b = 'a';
    console.log(isNaN(b))//true 
    function checkIsNaN(v) {//利用非自反特性，检查是否是NaN
        return v !== v
    }
    console.log(checkIsNaN(NaN));//true
    /**
     * JavaScript使用有限数字表示法，运算结果可能溢出，此时为Infinity 或 -Infinity
     */
    console.log(1 / 0);//Infinity
    console.log(-1 / 0);//-Infinity

    /**
     * 0值
     */
    console.log(JSON.stringify(-0));//0
    console.log(JSON.parse('-0'));// -0

    function isNegZero(n) {
        n = Number(n);
        return (n === 0) && (1 / n) === -Infinity
    }
    console.log(isNegZero(-0));//true

    /**
     * 特殊等式
     */
    console.log(`特殊等式`)
    var c = 2 / 'a';
    var d = 1 / -0;
    console.log(Object.is(1, 1));
    console.log(Object.is(c, d));
}

{
    console.log('')
    function func1(x) {
        x++;
    }
    var y = 0;
    var yCp = new Number(y);
    func1(yCp);
    console.log(yCp);
}

/**
 * 小结：
 * JavaScript的数组是通过数字索引的一组任意类型的值。字符串和数组类似，但是它们的行为特征不同，在将字符作为数组时要特别小心。
 * JavaScript中的数字包括整数和浮点型。
 * 基本类型中定义了几个特殊的值：
 * null类型只有一个值null，undefined类型只有一个值undefined，所有变量在赋值之前是undefined，void运算符返回undefined
 * 数字有几个特殊值：NaN（not a number，更准确说是invalid number)，Infinity，-Infinity ，-0
 * 简单标量通过复制来赋值/传递，复合值（对象等）通过引用复制来赋值/传递。
 * JavaScript中的引用和其他语言中的引用/指针不同，它们不能指向别的变量/引用，只能指向值。
 */