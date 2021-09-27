/*
 * @Author: your name
 * @Date: 2021-09-27 14:20:37
 * @LastEditTime: 2021-09-27 15:26:38
 * @LastEditors: Please set LastEditors
 * @Description: 插入排序：
 * 
 * 每次排一个数组项
 * 假定第一项已经排序了
 * 接着判断第二项是应该在原位还是插到第一项之前
 * 接着判断第三项比较是在原位还是插到一二项之间还是插到第一项之前
 * 依次类推
 * 
 * 复杂度：
 * 
 * @FilePath: \learn-js-data-algorithm\myEg\10-sort-search\sort-3.js
 */

const { createNonSortedArray, defaultCompare, swap, Compare} = require("../util") ;

function insertionSort(array, compareFn = defaultCompare) {
    const { length } = array;
    for (let i = 1; i < length; i++) {
        let currentIndex = i;
        for (let j = i-1; j >=0 ; j--) {
            if(compareFn(array[currentIndex],array[j]) === Compare.LESS_THAN){
                swap(array, currentIndex, j);
                currentIndex = j;
            }else{
                break;
            }
        }
    }
    return array;
}

const array = createNonSortedArray(5);
const arySort = insertionSort(array);

console.log('arySort',arySort);