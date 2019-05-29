/**
 * 原生函数
 * String()
 * Number()
 * Boolean()
 * Array()
 * Object()
 * Function()
 * RegExp()
 * Date()
 * Error()
 * Symbol()
 * 
 * 实际上，它们都是内建函数
 */

{
    let a = new String('a');
    console.log(typeof a);//object
    console.log(a instanceof String);//true
    console.log(Object.prototype.toString.call(a));//[object String]
    /**
     * 通过构造函数创建出来的是封装了基本类型值的封装对象
     */

    /**
     * 3.1内部属性
     */
    /**
     * 3.2封装对象包装
     */
    /**
     * 3.3拆封
     */
    /**
     * 3.4原生函数作为构造函数
     */

}

/**
 * 3.5小结
 * JavaScript为基本数据类型值提供了封装对象，称为原生函数。它们为基本数据类型值提供了该子类型所持有的
 * 方法和属性。
 * 对于简单标量基本类型值，如'abc'，如果要访问它的length属性或者String.prototype方法，JavaScript
 * 引擎会自动对该值进行封装（即用相应类型的包装对象来包装它）来是想对这些属性和方法的访问。
 * 
 */
