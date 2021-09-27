/*
 * @Author: your name
 * @Date: 2021-09-26 17:02:16
 * @LastEditTime: 2021-09-27 12:04:35
 * @LastEditors: Please set LastEditors
 * @Description: 冒泡排序
 * @FilePath: \learn-js-data-algorithm\myEg\10-sort-search\sort-1.js
 */
const { createNonSortedArray, defaultCompare, swap, Compare} = require("../util") ;

// 基本冒泡排序
function bubbleSort(array, compareFn = defaultCompare) {
    const { length } = array;
    // 有多少项就比较多少轮
    for (let i = 0; i < length; i++) {
        // 每轮进行前后项比较
        for (let j = 0; j < length - 1; j++) {
            if(compareFn(array[j], array[j + 1]) === Compare.BIGGER_THAN){
                swap(array, j, j + 1);
            }
        }
    }
    return array;
}

// 改进后的冒泡排序(避免内循环中所有不必要的比较)
function modifiedBubbleSort(array, compareFn = defaultCompare) {
    const { length } = array;
    for (let i = 0; i < length; i++) {
        // 每轮比较时，本轮之前已排序的项不参与比较
        for (let j = 0; j < length-1-i; j++) {
            if(compareFn(array[j], array[j + 1]) === Compare.BIGGER_THAN) {
                swap(array, j, j + 1);
            }
        }
    }
}
const array = createNonSortedArray(20);
const sortAry1 = bubbleSort(array);
const sortAry2 = modifiedBubbleSort(array);
console.log('sortAry1',sortAry1);
console.log('sortAry2',sortAry2);