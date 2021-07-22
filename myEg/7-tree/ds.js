/*
 * @Author: your name
 * @Date: 2021-07-22 13:59:56
 * @LastEditTime: 2021-07-22 17:19:42
 * @LastEditors: Please set LastEditors
 * @Description: 数据结构：树
 * @FilePath: \learn-js-data-algorithm\myEg\7-tree\ds.js
 * 
 * 相关术语：
 * 
 * 根节点：位于树顶端的节点
 * 内部节点：有子节点的节点
 * 外部节点：没有子节点的节点（也叫叶节点）
 * 祖先：父节点，祖父节点，曾祖父节点等的统称
 * 后代：子节点，孙节点，曾孙节点等的统称
 * 子树：节点和它的后代
 * 节点深度：它的祖先节点的数量
 * 树的高度：所有节点深度的最大值
 * 
 * 键：指节点
 */
const { Compare , defaultCompare } = require('../util');
const { Node } = require('../models/node');

/**
 * 二叉搜索树
 */
class BinarySearchTree {

    constructor(compareFn = defaultCompare) {
        this.compareFn = compareFn; // 用来比较节点值
        this.root = null;   // Node类型的根节点
    }

    insert(key) {   // 向树中插入一个新的键
        if(this.root == null) {
            this.root = new Node(key);
        }else{
            this.insertNode(this.root,key);
        }
    }

    insertNode(node,key) {  // 助手方法：向树中插入一个新的键
        if(this.compareFn(key,node.key) === Compare.LESS_THAN){
            if(node.left == null){
                node.left = new Node(key);
            }else {
                this.insertNode(node.left,key);
            }
        }else{
            if(node.right == null){
                node.right = new Node(key);
            }else{
                this.insertNode(node.right,key);
            }
        }
    }

    search(key) {   // 在树中查找一个键，返回布尔值
        return this.searchNode(this.root,key);
    }
    searchNode(node,key) {
        if(node == null){
            return false;
        }
        if(this.compareFn(key,node.key) === Compare.LESS_THAN){
            return this.searchNode(node.left,key);
        }else if(this.compareFn(key,node.key) === Compare.BIGGER_THAN){
            return this.searchNode(node.right,key);
        }else{
            return true;
        }
    }

    inOrderTraverse(callback) { // 通过中序遍历方式遍历所有节点
        this.inOrderTraverseNode(this.root,callback);
    }
    inOrderTraverseNode(node,callback) {
        if(node != null) {
            this.inOrderTraverseNode(node.left,callback);
            callback(node.key);
            this.inOrderTraverseNode(node.right,callback);
        }
    }

    preOrderTraverse(callback)  {   // 通过先序遍历方式遍历所有节点
        this.preOrderTraverseNode(this.root,callback);
    }
    preOrderTraverseNode(node,callback) {
        if(node != null) {
            callback(node.key);
            this.preOrderTraverseNode(node.left,callback);
            this.preOrderTraverseNode(node.right,callback);
        }
    }

    postOrderTraverse(callback) {   // 通过后序遍历方式遍历所有节点
        this.postOrderTraverseNode(this.root,callback);
    }
    postOrderTraverseNode(node,callback) {  
        if(node != null){
            this.postOrderTraverseNode(node.left,callback);
            this.postOrderTraverseNode(node.right,callback);
            callback(node.key);
        }
    }
    
    min() { // 返回树中最小的值/键
        return this.minNode(this.root);
    }
    minNode(node) {
        let current = node;
        while (current != null && current.left != null){
            current = current.left;
        }
        return current;
    }

    max() { // 返回树中最大的值/键
        return this.maxNode(this.root);
    }
    maxNode(node) {
        let current = node;
        while(current != null && current.right != null){
            current = node.right;
        }
        return current;
    }

    remove(key) {   // 从树中移除某个键
        this.root = this.removeNode(this.root,key);
    }
    removeNode(node,key) {
        if(node == null){
            return null;
        }
        if(this.compareFn(key,node.key) === Compare.LESS_THAN){
            node.left = this.removeNode(node.left,key);
            return node;
        }else if(this.compareFn(key,node.key) === Compare.BIGGER_THAN){
            node .right = this.removeNode(node.right,key);
            return node;
        }else{
            // 键等于node.key
            // 情况一
            if(node.left == null && node.right == null){
                node = null;
                return node;
            }

            // 情况二
            if(node.left == null){
                node = node.right;
                return node;
            }else if(node.right == null){
                node = node.left;
                return node;
            }
            
            // 情况三
            const aux = this.minNode(node.right);
            node.key = aux.key;
            node.right = this.removeNode(node.right,aux.key);
            return node;
        }
    }
    
}

/**
 * 自平衡树（自平衡二叉搜索树）
 */
const BalanceFactor = {   
    UNBALANCED_RIGHT: 1,
    SLIGHTLY_UNBALANCED_RIGHT: 2,
    BALANCED: 3,
    SLIGHTLY_UNBALANCED_LEFT: 4,
    UNBALANCED_LEFT: 5 
};

class AVLTree extends BinarySearchTree {

    constructor(compareFn = defaultCompare) {
        super(compareFn);
        this.compareFn = compareFn;
        this.root = null;
    }
    
    getNodeHeight(node) { // 获取节点的高度
        if(node == null) {
            return -1;
        }
        return Math.max(this.getNodeHeight(node.left),this.getNodeHeight(node.right))+1;
    }

    getBalanceFactor(node) {    // 获取平衡因子
        const heightDifference = this.getNodeHeight(node.left) - this.getNodeHeight(node.right);
        switch(heightDifference){
            case -2:
                return BalanceFactor.UNBALANCED_RIGHT;
            case -1:
                return BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT;
            case 1:
                return BalanceFactor.SLIGHTLY_UNBALANCED_LEFT;
            case 2:
                return BalanceFactor.UNBALANCED_LEFT;
            default:
                return BalanceFactor.BALANCED;
        }
    }
}