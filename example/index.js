const { md5 } = require("../index.js");

const startTime = process.hrtime.bigint();
const value =  md5("/Users/zhoujianpiao/Downloads/测试.zip");

const durationMilliseconds = Number(process.hrtime.bigint() - startTime) / 1e6;
console.log(`计算值为：${value} 耗时: ${durationMilliseconds.toFixed(3)} 毫秒`);
