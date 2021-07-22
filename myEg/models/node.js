/*
 * @Author: your name
 * @Date: 2021-07-22 14:41:43
 * @LastEditTime: 2021-07-22 14:42:45
 * @LastEditors: Please set LastEditors
 * @Description: 助手类：节点
 * @FilePath: \learn-js-data-algorithm\myEg\models\node.js
 */

/**
 * 节点类
 */
 class Node {
    constructor(key) {
        this.key = key; // 节点值
        this.left = null;   // 左侧节点引用
        this.right = null;  // 右侧节点引用
    }
}

exports.Node = Node;