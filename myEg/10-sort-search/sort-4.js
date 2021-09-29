/*
 * @Author: your name
 * @Date: 2021-09-27 16:35:29
 * @LastEditTime: 2021-09-29 15:45:49
 * @LastEditors: Please set LastEditors
 * @Description: 归并排序：
 * 
 *  分而治之
 *  将原始数组切分成较小的数组
 *  直到每个小数组只有一个位置
 *  接着将小数组归并成较大的数组
 *  直到最后只有一个排序完毕的大数组
 * 
 *  复杂度：O(nlog(n))
 * @FilePath: \learn-js-data-algorithm\myEg\10-sort-search\sort-4.js
 */

const { createNonSortedArray, defaultCompare, Compare} = require("../util") ;


function merge(left, right, compareFn) {
    let i = 0;
    let j = 0;
    const result = [];
    while (i < left.length && j < right.length){                                                                                                                                                                                                                                                                                
        result.push(compareFn(left[i],right[j]) === Compare.LESS_THAN ? left[i++] : right[j++]);
    }
    return result.concat(i< left.length? left.slice(i) : right.slice(j));
}

function mergeSort(array, compareFn = defaultCompare) {
    if(array.length > 1) {
        const { length } = array;
        const middle = Math.floor(length / 2);
        const left = mergeSort(array.slice(0, middle), compareFn);
        const right = mergeSort(array.slice(middle, length), compareFn);
        array = merge(left, right, compareFn);
    }
    return array;
}

const array = createNonSortedArray(10);
const sortAry = mergeSort(array);

console.log('sortAry',sortAry);