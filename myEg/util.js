/*
 * @Author: your name
 * @Date: 2021-07-15 11:00:48
 * @LastEditTime: 2021-09-26 17:11:19
 * @LastEditors: Please set LastEditors
 * @Description: 工具函数
 * @FilePath: \learn-js-data-algorithm\myEg\util.js
 */

/**
 * 默认相等性比较函数
 * @param {*} a 
 * @param {*} b 
 * @returns 
 */
exports.defaultEquals = function(a , b){
    return a === b;
}

/**
 * 默认大小比较函数
 */
const Compare = {
    LESS_THAN: -1,
    BIGGER_THAN: 1
}
exports.Compare = Compare;

exports.defaultCompare = function(a , b) {
    if(a === b){
        return 0;
    }
    return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN
}

/**
 * 默认转化为字符串的函数
 */
exports.defaultToString = function(item) {
    if(item === null){
        return 'NULL';
    }else if(item === undefined) {
        return 'UNDEFINED';
    }else if(typeof item === 'string' || item instanceof String){
        return `${item}`;
    }
    return item.toString();
}

/**
 * 数组项交换函数
 */
exports.swap = function(array,a,b){
    const temp = array[a];
    array[a] = array[b];
    array[b] = temp;
}

/**
 * 创建一个未排序的数组
 */
exports.createNonSortedArray = function(size){
    const array = [];
    for (let i = size; i > 0; i--) {
        array.push(i);
    }
    return array;
}