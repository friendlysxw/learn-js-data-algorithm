/*
 * @Author: your name
 * @Date: 2021-07-15 11:16:34
 * @LastEditTime: 2021-07-15 16:24:48
 * @LastEditors: Please set LastEditors
 * @Description: 助手类：链表中每个节点的信息
 * @FilePath: \learn-js-data-algorithm\myEg\3-lianbiao\models\linked-list-models.js
 */

/**
 * 基础链表节点类
 */
class Node {

    constructor(element) {
        this.element = element; // 加入链表的元素值
        this.next = undefined;  // 指向下一个元素的指针
    }
    
}

/**
 * 双向链表节点类
 */
class DoublyNode extends Node {

    constructor(element, next, prev) {
        super(element, next);
        this.prev = prev; // 指向上一个元素的指针
    }
    
}


exports.Node = Node;
exports.DoublyNode = DoublyNode;