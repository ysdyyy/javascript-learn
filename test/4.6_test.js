const benchmark = require("benchmark");
/**
 * benchmark来做性能测试
 */

function func1() {
    for (let i = 0; i < 1000; i++){
        Math.random();
    }

}
function testFunc1() {
    var bench = new benchmark(`func1 test`, func1, {
    })
    console.log(`bench.hz:${bench.hz}`);
    console.log(`bench.status.moe:${bench.stats.moe}`);
    console.log(`bench.stats.variance:${bench.stats.variance}`);
}

testFunc1();