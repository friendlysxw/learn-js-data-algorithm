/*
 * @Author: your name
 * @Date: 2021-07-09 10:15:19
 * @LastEditTime: 2021-07-12 15:23:12
 * @LastEditors: Please set LastEditors
 * @Description: 数据结构：栈
 * @FilePath: \learn-js-data-algorithm\myEg\1-zhan\ds.js
 * 
 * 能在添加或删除元素时进行更多控制的数据结构
 * 
 * 遵从LIFO（后进先出）原则
 * 
 */

/**
 * 创建一个基于数组的栈
 */
class StackArray {
    constructor () {
        this.items = []; // 保存栈中的数据
    }

    // 限定一些方法

    push(element) {  // 添加一个元素到栈顶
        this.items.push(element)
    }

    pop() {  // 移出栈顶的元素，同时返回被移除的元素
        return this.items.pop();
    }

    peek() { // 返回栈顶的元素，不对栈做任何修改（改方法不会移除栈顶的元素，仅仅返回它）
        return this.items[this.items.length-1];
    }

    isEmpty() { // 如果栈里没有任何元素就返回true，否则返回false
        return this.items.length === 0;
    }

    clear() { // 移除栈里的所有元素
        this.items = [];
    }

    size() { // 返回栈里的元素个数
        return this.items.length;
    }

    toString() { // 返回栈中的内容
        return this.items.toString();
    }
}

/**
 * 
 * 创建一个基于js对象的栈
 * 性能更好
 * 
 */
class StackObject {

    constructor() {
        this.count = 0;
        this.items = {};
    }

    // 限定一些方法

    push(element) {  // 添加一个元素到栈顶
        this.items[this.count] = element;
        this.count++;
    }

    pop() {  // 移出栈顶的元素，同时返回被移除的元素
        if(this.isEmpty()) {
            return undefined;
        }
        this.count--;
        const result = this.items[this.count];
        delete this.items[this.count];
        return result;
    }

    peek() { // 返回栈顶的元素，不对栈做任何修改（改方法不会移除栈顶的元素，仅仅返回它）
        if(this.isEmpty()) {
            return undefined;
        }
        return this.items[this.count-1];
    }

    isEmpty() { // 如果栈里没有任何元素就返回true，否则返回false
        return this.count === 0;
    }

    clear() { // 移除栈里的所有元素
        this.items = {};
        this.count = 0;
    }

    size() { // 返回栈里的元素个数
        return this.count;
    }

    toString() { // 返回栈中的内容
        if(this.isEmpty()) {
            return '';
        }
        let objString = `${this.items[0]}`;
        for (let i = 1; i < this.count; i++) {
            objString+=`,${this.items[i]}`;
        }
        return objString;
    }
}
exports.StackArray=StackArray;
exports.StackObject=StackObject;