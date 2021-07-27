/*
 * @Author: your name
 * @Date: 2021-07-22 13:59:56
 * @LastEditTime: 2021-07-27 15:49:37
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
 * 
 * 特点：
 * 只允许在左侧存储比父节点小的值
 * 只允许在右侧存储比父节点大的值
 * 
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
 * 
 * 已知条件：
 * 左右子树高度最多相差2，且只有相差2时才需要调整平衡
 *
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

    getBalanceFactor(node) {    // 获取节点的平衡因子
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

    rotationLL(node) { // 向右单旋转
        const tmp = node.left;
        node.left = tmp.right;
        tmp.right  = node;
        return tmp;
    }

    rotationRR(node) {  // 向左单旋转
        const tmp = node.right;
        node.right = tmp.left;
        tmp.left = node;
        return tmp;
    }

    rotationLR(node) {  // 向右双旋转
        node.left = this.rotationRR(node.left);
        return this.rotationLL(node);
    }

    rotationRL(node) {  // 向左双旋转
        node.right = this.rotationLL(node.right);
        return this.rotationRR(node);
    }

    insert(key) {   // 向树中插入一个新的节点
        this.root = this.insertNode(this.root,key);
    }
    insertNode(node,key) {
        // 向在BST树中一样插入节点
        if(node == null){
            return new Node(key);
        }else if(this.compareFn(key,node.key) === Compare.LESS_THAN){
            node.left = this.insertNode(node.left,key);
        }else if(this.compareFn(key,node.key) === Compare.BIGGER_THAN){
            node.right = this.insertNode(node.right,key);
        }else{
            return node;    // 重复的键
        }

        // 如果需要，将树进行平衡操作
        const balanceFactor = this.getBalanceFactor(node);
        if(balanceFactor === BalanceFactor.UNBALANCED_LEFT){
            if(this.compareFn(key,node.left.key) === Compare.LESS_THAN) {
                node = this.rotationLL(node);
            }else{
                return this.rotationLR(node);
            }
        }
        if(balanceFactor === BalanceFactor.UNBALANCED_RIGHT){
            if(this.compareFn(key,node.right.key) === Compare.BIGGER_THAN){
                node = this.rotationRR(node);
            }else{
                return this.rotationRL(node);
            }
        }
        return node;
    }

    removeNode(node,key) {
        node = super.removeNode(node,key);
        if(node == null){
            return node;    // null,不需要进行平衡
        }
        // 检测树是否平衡
        const balanceFactor = this.getBalanceFactor(node);
        if(balanceFactor === BalanceFactor.UNBALANCED_LEFT){
            const balanceFactorLeft = this.getBalanceFactor(node.left);
            if(balanceFactorLeft === BalanceFactor.BALANCED || balanceFactorLeft === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT){
                return this.rotationLL(node);
            }
            if(balanceFactorLeft === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT){
                return this.rotationLR(node.left);
            }
        }
        if(balanceFactor === BalanceFactor.UNBALANCED_RIGHT){
            const balanceFactorRight = this.getBalanceFactor(node.right);
            if(balanceFactorRight === BalanceFactor.BALANCED || balanceFactorRight === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT){
                return this.rotationRR(node);
            }
            if(balanceFactorRight === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT){
                return this.rotationRL(node.right);
            }
        }
        return node;
    }
    
}

/**
 * 红黑树
 * 特征：
 * 1.每个节点不是红的就是黑的
 * 2.树的根节点是黑的
 * 3.所有叶节点都是黑的（用NULL引用表示的节点）
 * 4.如果一个节点是红的，那么它的两个子节点都是黑的
 * 5.不能有两个相邻的红节点，一个红节点不能有红的父节点或子节点
 * 6.从给定的节点到它的后代节点（NULL叶节点）的所有路径包含相同数量的黑色节点
 */
class RedBlackNode extends Node{
    constructor(key) {
        super(key);
        this.key = key;
        this.color = Colors.RED;
        this.parent = null;
    }
    isRed(){
        return this.color === Colors.RED;
    }
}
class RedBlackTree extends BinarySearchTree {

    constructor(compareFn = defaultCompare) {
        super(compareFn);
        this.compareFn = compareFn;
        this.root = null;
    }
    
    insert(key) {
        if(this.root == null) {
            this.root = new RedBlackNode(key);
            this.root.color = Colors.BLACK;
        }else{
            const newNode = this.insertNode(this.root,key);
            this.fixTreeProperties(newNode);
        }
    }

    insertNode(node,key){
        if(this.compareFn(key,node.key) === Compare.LESS_THAN){
            if(node.left === null){
                node.left = new RedBlackNode(key);
                node.left.parent = node;
                return node.left;
            }else{
                return this.insertNode(node.left,key);
            }
        }else if(node.right == null){
            node.right = new RedBlackNode(key);
            node.right.parent = node;
            return node.right;
        }else{
            return this.insertNode(node.right,key);
        }
    }
    
    fixTreeProperties(node) {
        while(node && node.parent && node.parent.color.isRed() && node.color !== Colors.BLACK){
            let parent = node.parent;
            const grandParent = parent.parent;
            // 情形A：父节点是左侧子节点
            if(grandParent && grandParent.left === parent){
                const uncle = grandParent.right;
                // 情形1A：叔节点也是红色——只需要重新填色
                if(uncle && uncle.color === Colors.RED){
                    grandParent.color = Colors.RED;
                    parent.color = Colors.BLACK;
                    uncle.color = Colors.BLACK;
                    node = grandParent; 
                }else{
                    // 情形2A：节点是右侧子节点——左旋转
                    if(node === parent.right){
                        this.rotationRR(parent);
                        node = parent;
                        parent = node.parent;
                    }
                    // 情形3A：节点是左侧子节点——右旋转
                    this.rotationLL(grandParent);
                    parent.color = Colors.BLACK;
                    grandParent.color = Colors.RED;
                    node = parent;
                }
            }else{  // 情形B：父节点是右侧子节点
                const uncle = grandParent.left;
                // 情形1B：叔节点是红色——只需要重新填色
                if(uncle && uncle.color === Colors.RED){
                    grandParent.color = Colors.RED;
                    parent.color = Colors.BLACK;
                    uncle.color = Colors.BLACK;
                    node = grandParent;
                }else{
                    // 情形2B：节点是左侧子节点——右旋转
                    if(node === parent.left){
                        this.rotationLL(parent);
                        node = parent;
                        parent = node.parent;
                    }
                    // 情形3B：节点是右侧子节点——左旋转
                    this.rotationRR(grandParent);
                    parent.color = Colors.BLACK;
                    grandParent.color = Colors.RED;
                    node = parent;
                }
            }
        }
        
        this.root.color = Colors.BLACK;
    }

    rotationLL(node) {
        const tmp = node.left;
        node.left = tmp.right;
        if(tmp.right && tmp.right.key){
            tmp.right.parent = node;
        }
        tmp.parent = node.parent;
        if(!node.parent){
            this.root = tmp;
        }else{
            if(node === node.parent.left){
                node.parent.left = tmp;
            }else{
                node.parent.right = tmp;
            }
        }
    }

    rotationRR(node) {
        const tmp = node.right;
        node.right = tmp.left;
        if(tmp.left && tmp.left.key){
            tmp.left.parent = node;
        }
        tmp.parent = node.parent;
        if(!node.parent){
            this.root = tmp;
        }else{
            if(node === node.parent.left){
                node.parent.left = tmp;
            }else{
                node.parent.right = tmp;
            }
        }
        tmp.left = node;
        node.parent = tmp;
    }
}