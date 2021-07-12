/*
 * @Author: your name
 * @Date: 2021-07-12 16:09:56
 * @LastEditTime: 2021-07-12 17:16:02
 * @LastEditors: Please set LastEditors
 * @Description: 数据结构：队列
 * @FilePath: \learn-js-data-algorithm\myEg\2-duiLie\ds.js
 * 
 * 遵从FIFO（先进先出）原则
 * 
 */

/**
 * 创建自己的队列
 */

 module.exports = class Queue {

    constructor() {
        this.count = 0;
        this.lowestCount = 0;
        this.items = {};
    }
    
    enqueue(element) {  // 向队列尾部添加一个新的项
        this.items[this.count] = element;
        this.count++;
    }

    dequeue() {  // 移出队列的第一项并返回被移出的元素
        if (this.isEmpty()){
            return undefined;
        }
        const result = this.items[this.lowestCount];
        delete this.items[this.lowestCount];
        this.lowestCount++;
        return result;
    }

    peek(){ // 返回队列中第一个元素
        if(this.isEmpty()){
            return undefined;
        }
        return this.items[this.lowestCount];
    }

    isEmpty(){ // 判断队列中是否已无任何元素
        return this.size() === 0;
    }

    size(){ // 返回队列包含的元素个数
        return this.count - this.lowestCount;
    }
    
    clear() {   // 清空队列
        this.items = {};
        this.count = 0;
        this.lowestCount = 0;
    }

    toString() {
        if(this.isEmpty()){
            return '';
        }
        let objString = `${this.items[this.lowestCount]}`;
        for (let i = this.lowestCount; i < this.count; i++) {
            objString = `${objString},${this.items[i]}`;
        }
        return objString;
    }
}
