/*
 * @Author: your name
 * @Date: 2021-07-12 16:09:56
 * @LastEditTime: 2021-07-14 15:05:01
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

 class Queue {

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
        for (let i = this.lowestCount + 1; i < this.count; i++) {
            objString = `${objString},${this.items[i]}`;
        }
        return objString;
    }
}

/**
 * 创建双端队列
 */
class Deque {

    constructor() {
        this.count = 0;
        this.lowestCount = 0;
        this.items = {};
    }

    addFront(element) { // 在双端队列前端添加新的元素
        if(this.isEmpty()){
            this.addBack(element);
        }else if(this.lowestCount > 0) {
            this.lowestCount--;
            this.items[this.lowestCount] = element;
        }else{
            for (let i = this.count; i > 0; i--) {
                this.items[i] = this.items[i - 1];
            }
            this.count++;
            this.lowestCount = 0;
            this.items[0] = element;
        }
    }

    addBack(element) {  // 在双端队列后端添加新的元素
        this.items[this.count] = element;
        this.count++;
    }

    removeFornt() { // 从双端队列前端移出第一个元素,并返回
        if(this.isEmpty()){
            return undefined;
        }
        const item = this.items[this.lowestCount];
        delete this.items[this.lowestCount];
        this.lowestCount++;
        return item;
    }

    removeBack() {  // 从双端队列后端移出第一个元素，并返回
        if(this.isEmpty()){
            return undefined;
        }
        this.count--;
        const item = this.items[this.count];
        delete this.items[this.count];
        return item;
    }

    peekFront() {   // 返回双端队列前端的第一个元素
        if(this.isEmpty()){
            return undefined;
        }
        return this.items[this.lowestCount];
    }

    peekBack() {    // 返回双端队列后端的第一个元素
        if(this.isEmpty()){
            return undefined;
        }
        return this.items[this.count];
    }

    isEmpty() { // 判断队列是否为空
        return this.size()===0;
    }

    clear() {   // 清空双端队列
        this.item = {};
        this.count = 0;
        this.lowestCount = 0;
    }

    size() {   // 获取队列的元素个数
        return this.count - this.lowestCount;
    }

    toString() { // 队列转为字符串
        if(this.isEmpty()){
            return '';
        }
        let objString=`${this.items[this.lowestCount]}`;
        for (let i = this.lowestCount + 1; i < this.count; i++) {
            objString = `${objString},${this.items[i]}`;
        }
        return objString;
    }

}


exports.Queue=Queue;
exports.Deque=Deque;
