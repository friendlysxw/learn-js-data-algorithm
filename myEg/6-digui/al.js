/*
 * @Author: your name
 * @Date: 2021-07-21 16:11:42
 * @LastEditTime: 2021-07-21 17:18:47
 * @LastEditors: Please set LastEditors
 * @Description: 算法：递归
 * @FilePath: \learn-js-data-algorithm\myEg\6-digui\al.js
 */

/**
 * 计算一个数的阶乘
 */

function factorialIterative(number){
    if(number<0) return undefined;
    let total=1;
    for (let n = number; n >1; n--) {
        total = total * n;
    }
    return total;
}
console.log('factorialIterative',factorialIterative(5));

/**
 * 递归计算阶乘
 */
function factorial(n){
    if(n===1 || n===0){ // 基线条件
        return 1;
    }
    return n*factorial(n-1);
}
console.log('factorial',factorial(5));

/**
 * 斐波那契数列
 * 定义：
 * 1.位置0的斐波那契数是0
 * 2.1和2的斐波那契数是1
 * 3.n(n>2)的斐波那契数是(n-1)的斐波那契数加上(n-2)的斐波那契数
 */
function fibonacciIterative(n) {
    if(n < 1) return 0;
    if(n <= 2) return 1;
    let fibNMinus2=0;
    let fibNminus1=1;
    let fibN=n;
    for (let i = 2; i <= n; i++) {
        fibN = fibNminus1 + fibNMinus2; // f(n-1)+f(n-2)
        fibNMinus2 = fibNminus1;
        fibNminus1 = fibN;
    }
    return fibN;
}
console.log('fibonacciIterative',fibonacciIterative(5));

/**
 * 递归求索引位的斐波那契数
 */
function fibonacci(n){
    if(n < 1) return 0;
    if(n <= 2) return 1;
    return fibonacci(n-1) + fibonacci(n-2);
}
console.log('fibonacci',fibonacci(5));
