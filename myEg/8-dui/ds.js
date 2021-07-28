/*
 * @Author: your name
 * @Date: 2021-07-28 14:58:48
 * @LastEditTime: 2021-07-28 16:37:25
 * @LastEditors: Please set LastEditors
 * @Description: 数据结构：堆（二叉堆）
 * @FilePath: \learn-js-data-algorithm\myEg\8-dui\ds.js
 */

const { defaultCompare,Compare ,swap} = require('../util');

/**
 * 最小二叉堆
 */
class MinHeap {

    constructor(compareFn = defaultCompare) {
        this.compareFn = compareFn;
        this.heap = [];
    }

    getLeftIndex(index) {   // 获取左子节点的索引值
        return 2*index+1;
    }

    getRightIndex(index) {  // 获取右子节点的索引值
        return 2*index+2;
    }

    getParentIndex(index) { // 获取父节点的索引值
        if(index === 0) {
            return undefined;
        }
        return Math.floor((index-1) / 2);
    }

    insert(value) { // 插入一个新的值
        if(value != null) {
            this.heap.push(value);
            this.siftUp(this.heap.length - 1);
            return true;
        }
        return false;
    }

    siftUp(index) {
        let parent = this.getParentIndex(index);
        while(index > 0 && this.compareFn(this.heap[parent],this.heap[index]) === Compare.BIGGER_THAN){
            swap(this.heap,parent,index);
            index = parent;
            parent = this.getParentIndex(index);
        }
    }

    siftDown(index) {
        let element = index;
        const left = this.getLeftIndex(index);
        const right = this.getRightIndex(index);
        const size = this.size();
        if(left < size && this.compareFn(this.heap[element],this.heap[left]) === Compare.BIGGER_THAN){
            element = left;
        }
        if(right < size && this.compareFn(this.heap[element],this.heap[right]) === Compare.BIGGER_THAN){
            element = right;
        }
        if(index !== element) {
            swap(this.heap,index,element);
            this.siftDown(element);
        }
    }

    extract() { // 移除最小值或最大值，并返回这个值
        if(this.isEmpty()) {
            return undefined;
        }
        if(this.size() === 1) {
            return this.heap.shift();
        }
        const removedValue = this.heap.shift();
        this.siftDown(0);
        return removedValue;
    }

    findMinimum() { // 返回最小值或最大值
        return this.isEmpty()? undefined : this.heap[0];
    }
    
    size() {
        return this.heap.length;
    }
    
    isEmpty() {
        return this.size() === 0;
    }
}


/**
 * 最大二叉堆
 */
class MaxHeap extends MinHeap{
    constructor(compareFn = defaultCompare) {
        this.compareFn = (a,b) => compareFn(b,a);
        this.heap = [];
    }
}