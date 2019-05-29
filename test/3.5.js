/**
 * try catch finally
 */

{
    function func1() {
        try {
            return 42
        }
        finally {
            console.log(`function done`);
        }
    }
    let a = func1();
    console.log(a);
    
    console.log(`finally 中的return会覆盖try里面的return`)
    function func2() {
        try {
            return 42
        } finally{
            return 41            
        }
    }
    console.log(func2());

    console.log(`try 中throw`);
    function func3() {
        try {
            if (Math.random() > 0.5) {
                throw new Error('a');
            }
        } finally {
            // 无return： throw error success
            // return：undefined
            // return 1: return 1 success
            console.log(`func3.finally`)
        }
        console.log(`func3.nextCode`);
    }
    console.log(func3());
}