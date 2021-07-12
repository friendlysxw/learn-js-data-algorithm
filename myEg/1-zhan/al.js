/*
 * @Author: your name
 * @Date: 2021-07-12 11:41:52
 * @LastEditTime: 2021-07-12 15:53:19
 * @LastEditors: Please set LastEditors
 * @Description: 算法：栈
 * @FilePath: \learn-js-data-algorithm\myEg\1-zhan\al.js
 */

// 引入自己定义的栈
const {StackArray:Stack} = require('./ds.js');

/**
 * 实现十进制转到二进制的算法
 * 
 * 算法方案：将十进制数除以2,并对商取整，直到商取整是0为止
 * 
*/
function decimalToBinary(decNumber){
    const remStack = new Stack();
    let number = decNumber;
    let rem;
    let binaryString = '';

    while (number > 0) {
        rem = number % 2; // 与2的余数作为二进制数
        remStack.push(rem); // 将结果放入栈中
        number = Math.floor(number / 2); // 把商取整作为下一次与2取余的数
    }

    while (!remStack.isEmpty()){
        binaryString += remStack.pop().toString();
    }

    return binaryString;
}

console.log(decimalToBinary(233));

/**
 * 扩展：实现十进制转到任意进制
 */
function baseConverter(decNumber,base){
    const remStack = new Stack();
    const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let number = decNumber;
    let rem;
    let baseString = '';

    if(!(base >= 2 && base <= 36)){
        return '';
    }

    while (number > 0){
        rem =number % base;
        remStack.push(rem);
        number = Math.floor(number / base);
    }
    while (!remStack.isEmpty()){
        baseString +=digits[remStack.pop()];
    }
    return baseString;
}
console.log(baseConverter(233,2));