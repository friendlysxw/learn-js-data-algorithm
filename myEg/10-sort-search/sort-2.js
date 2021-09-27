/*
 * @Author: your name
 * @Date: 2021-09-27 13:58:41
 * @LastEditTime: 2021-09-27 14:19:26
 * @LastEditors: Please set LastEditors
 * @Description: 选择排序：
 * 
 *  找到数据结构中的最小值并将其放置在第一位，
 *  接着找到第二小的值并将其放到第二位，
 *  以此类推
 * 
 *  复杂度：O(n^2)
 * 
 * @FilePath: \learn-js-data-algorithm\myEg\10-sort-search\sort-2.js
 */
const { createNonSortedArray, defaultCompare, swap, Compare} = require("../util") ;

function selectionSort(array, compareFn = defaultCompare) {
    const { length } = array;
    let indexMin;
    for (let i = 0; i < length; i++) {
        indexMin = i;
        for (let j = i; j < length; j++) {
            if(compareFn(array[j], array[indexMin]) === Compare.LESS_THAN){
                indexMin = j;
            }            
        }
        if(indexMin != i){
            swap(array, indexMin, i);
        }
    }
    return array;
}

const array = createNonSortedArray(5);
const arySort = selectionSort(array);

console.log('arySort',arySort);