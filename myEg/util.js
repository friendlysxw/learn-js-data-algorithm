/*
 * @Author: your name
 * @Date: 2021-07-15 11:00:48
 * @LastEditTime: 2021-07-16 17:23:06
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

