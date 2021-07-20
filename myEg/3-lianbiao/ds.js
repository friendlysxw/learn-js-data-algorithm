/*
 * @Author: your name
 * @Date: 2021-07-15 09:45:33
 * @LastEditTime: 2021-07-20 16:52:59
 * @LastEditors: Please set LastEditors
 * @Description: 数据结构：链表
 * @FilePath: \learn-js-data-algorithm\myEg\3-lianbiao\ds.js
 * 
 * 随意增删，从头查询
 * 
 */

const { defaultEquals , defaultCompare , Compare} = require('../util');
const { Node, DoublyNode } = require('../models/linked-list-models');

/**
 * 基础单向链表
 */
class LinkedList {

    constructor(equalsFn = defaultEquals) {

        this.count = 0; // 存储链表中的元素数量
        this.head = undefined;  // 第一个元素的引用
        this.equalsFn = equalsFn;   // 元素相等性判断函数

    }

    push(element) { // 向链表尾部添加一个新元素

        const node = new Node(element);
        let lastNode;
        if(this.head == null){
            // 如果列表是空的，直接将节点作为第一个节点
            this.head = node;
        }else{
            // 获取最后一个节点
            lastNode = this.head;
            while (lastNode.next != null) {
                lastNode = lastNode.next;
            }
            // 将新节点链接为最后一项的下一个节点
            lastNode.next = node;
        }
        this.count++;

    }

    insert(element , index) { // 向链表的特定位置插入一个新元素

        if(index >= 0 && index <= this.count){
            const node = new Node(element);
            if(index === 0){    // 在第一个位置添加
                const current = this.head;
                node.next = current;
                this.head = node;
            }else{
                const previous = this.getElementAt(index - 1);
                const current = previous.next;
                node.next = current;
                previous.next = node;
            }
            this.count++;   // 更新链表的长度
            return true;
        }
        return false;
        
    }

    getElementAt(index) { // 返回链表中特定位置的元素，如果不存在返回undefined
        // 检查越界值
        if(index >= 0 && index <= this.count){
            let current = this.head;
            for (let i = 0; i < (index && current !=null); i++) {
                current = current.next;                 
            }
            return current;
        }
        return undefined;
    }

    remove(element) { // 从链表中移除一个元素
        const index = this.indexOf(element);
        return this.removeAt(index);
    }

    indexOf(element) { // 返回元素在链表中的索引，如果不存在返回 -1
        let current = this.head;
        for (let i = 0; i < this.count && current != null; i++) {
            if(this.equalsFn(element,current.element)) {
                return i;
            }
            current = current.next;
        }
        return -1;
    }

    removeAt(index) { // 从链表的特定位置移除一个元素

        // 检查越界值
        if(index >= 0 && index < this.count){
            let current = this.head;
            // 移出第一项
            if (index === 0){
                this.head = current.next;
            } else {
                let previous = this.getElementAt(index - 1);
                current = previous.next;
                // 将previous与current的下一项链接起来：跳过current，从而移除它
                previous.next = current.next;
            }
            this.count--;
            return current.element;
        }
        return undefined;

    }

    isEmpty() { // 判断链表中数据是否为空
        return this.size() === 0;
    }

    size() { // 返回元素个数
        return this.count;
    }

    getHead() { // 获取第一个节点
        return this.head;
    }

    toString() { // 返回表示整个链表的字符串
        if(this.head == null) {
            return '';
        }
        let objString = `${this.head.element}`;
        let current = this.head.next;
        for (let i = 1; i < this.size() && current != null; i++) {
            objString = `${objString},${current.element}`;
            current = current.next;
        }
        return objString;
    }

}


/**
 * 双向链表
 */
class DoublyLinkedList extends LinkedList {

    constructor(equalsFn = defaultEquals) {
        super(equalsFn);
        this.tail = undefined;  // 对链表最后一个元素的引用
    }
    
    insert(element, index) {    // 重写插入元素方法

        if(index >= 0 && index <= this.count) {
            const node = new DoublyNode(element);
            let current = this.head;
            if(index === 0) {
                if(this.head == null) {
                    this.head = node;
                    this.tail = node;
                }else{
                    node.next = this.head;
                    current.prev = node;
                    this.head = node;
                }
            }else if(index === this.count){
                current = this.tail;
                current.next = node;
                node.prev = current;
                this.tail = node;
            }else{
                const previous = this.getElementAt(index - 1);
                current = previous.next;
                node.next = current;
                node .prev = previous;
                previous.next = node;
                current.prev = node;
            }
            this.count++;
            return true;
        }
        return false;

    }

    removeAt(index) {   // 重写移除元素方法

        if(index >= 0 && index < this.count){
            let current = this.head;
            if(index === 0) {
                this.head = current.next;
                if(this.count === 1) {
                    this.tail = undefined;
                }else{
                    this.head.prev = undefined;
                }
            }else if(index === this.count - 1) {
                current = this.tail;
                this.tail = current.prev;
                this.tail.next = undefined;
            }else{
                current = this.getElementAt(index);
                const previous = current.prev;
                previous.next = current.next;
                current.next.prev = previous;
            }
            this.count--;
            return current.element;
        }
        return undefined;
    }
}

/**
 * 单向循环链表
 */
class CircularLinkedList extends LinkedList {

    constructor(equalsFn = defaultEquals) {
        super(equalsFn);
    }

    insert(element, index) {
        if(index >= 0 && index <= this.count){
            const node = new Node(element);
            let current = this.head;
            if(index === 0) {
                if(this.head == null){
                    this.head = node;
                    node.next = this.head;
                }else{
                    node.next = current;
                    current = this.getElementAt(this.size());
                    this.head = node;
                    current.next = this.head;
                }
            }else{
                const previous = this.getElementAt(index - 1);
                node.next = previous.next;
                previous.next = node;
            }
            this.count++;
            return true;
        }
        return false;
    }

    removeAt(index) {
        if(index >=0 && index < this.count){
            if(index === 0){
                if(this.size() === 1) {
                    this.head = undefined;
                }else{
                    const removed = this.head;
                    current = this.getElementAt(this.size());
                    this.head = this.head.next;
                    current.next = this.head;
                    current = removed;
                }
            }else{
                const previous = this.getElementAt(index - 1);
                current = previous.next;
                previous.next = current.next;
            }
            this.count--;
            return current.element;
        }
        return undefined;
    }
}

/**
 * 有序链表
 */
class SortedLinkedList extends LinkedList {

    constructor(equalsFn = defaultEquals, compareFn = defaultCompare) {
        super(equalsFn);
        this.compareFn = compareFn;
    }
    
    insert(element, index = 0) {
        if(this.isEmpty()) {
            return super.insert(element, 0);
        }
        const pos = this.getIndexNextSortedElement(element);
        return super.insert(element, pos);
    }

    getIndexNextSortedElement(element) {    // 获取比当前项值小的元素位置
        let current = this.head;
        let i = 0;
        for (; i < this.size() && current; i++) {
            const comp = this.compareFn(element , current.element);
            if(comp === Compare.LESS_THAN){
                return i;
            }
            current = current.next;
        }
        return i;
    }
    
}

exports.LinkedList = LinkedList;
exports.DoublyLinkedList = DoublyLinkedList;
exports.CircularLinkedList = CircularLinkedList;
exports.SortedLinkedList = SortedLinkedList;