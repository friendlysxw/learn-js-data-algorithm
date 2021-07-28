/*
 * @Author: your name
 * @Date: 2021-07-28 14:58:55
 * @LastEditTime: 2021-07-28 17:03:27
 * @LastEditors: Please set LastEditors
 * @Description: 算法应用：二叉堆
 * @FilePath: \learn-js-data-algorithm\myEg\8-dui\al.js
 */

const { defaultCompare, swap } = require("../util");


/**
 * 堆排序
 */
function heapSort(array, compareFn = defaultCompare) {
    let heapSize = array.length;
    buildMaxHeap(array,compareFn);
    while(heapSize > 1) {
        swap(array,0,--heapSize);
        heapify(array,0,heapSize,compareFn);
    }
    return array;
}

/**
 * 构建最大堆
 */
function buildMaxHeap(array,compareFn) {
    for (let i = Math.floor(array.length / 2); i >= 0; i--) {
        heapify(array,i,array.length,compareFn);
    }
    return array;
}

// TODO 下一函数待完善
function heapify(array,index,heapSize,compareFn) {
    
}