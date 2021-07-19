/*
 * @Author: your name
 * @Date: 2021-07-19 15:45:42
 * @LastEditTime: 2021-07-19 17:11:48
 * @LastEditors: Please set LastEditors
 * @Description: 数据结构：字典和散列表
 * @FilePath: \learn-js-data-algorithm\myEg\5-zidian\ds.js
 */

const { defaultToString } = require("../util");

class ValuePair{
    constructor(key,value) {
        this.key = key;
        this.value = value;
    }
    toString() {
        return `[#${this.key}:${this.value}]`;
    }
}
/**
 * 字典
 */

class Dictionary {

    constructor(toStrFn = defaultToString) {
        this.toStrFn = toStrFn;
        this.table = {};
    }

    set(key,value) { // 向字典中添加新元素
        if(key != null && value != null) {
            const tableKey = this.toStrFn(key);
            this.table[tableKey] = new ValuePair(key,value);
            return true;
        }
        return false;
    }
    remove(key) {   // 从字典中移除键值对应的数据值
        if(this.hasKey(key)) {
            delete this.table[this.toStrFn(key)];
            return true;
        }
        return false;
    }
    hasKey(key) {   // 判断是否某个键值存在于该字典中
        return this.table[this.toStrFn(key)] != null;
    }
    get(key) {  // 查找特定的数值并返回
        const valuePair = this.table[this.toStrFn(key)];
        return valuePair == null ? undefined : valuePair.value;
    }
    clear() {   // 删除该字典中的所有值
        this.table = {};
    }
    size() {    // 返回字典所包含值的数量
        return Object.keys(this.table).length;
    }
    isEmpty() { // 判断字典是否为空
        return this.size() === 0;
    }
    keys() {    // 将字典所包含的所有键名以数组形式返回
        return this.keyValues().map(valuePair=>valuePair.key);
    }
    values() {  // 将字典所包含的所有数值以数组形式返回
        return this.keyValues().map(valuePair=>valuePair.value);
    }
    keyValues() {   // 将字典中所有[键，值]对返回
        // return Object.values(this.table);
        const valuePairs = [];
        for (const key in this.table) {
            if (this.hasKey(key)) {
                valuePairs.push(this.table[key]);
            }
        }
        return valuePairs;
    }
    forEach(callbackFn) {   // 迭代字典中所有键值对，接收参数：key,value, 函数返回false时被中止
        const valuePairs = this.keyValues();
        for (let i = 0; i < valuePairs.length; i++) {
            const result = callbackFn(valuePairs[i].key,valuePairs[i].value);
            if(result === false){
                break;
            }            
        }
    }
    toString() {
        if(this.isEmpty()) {
            return '';
        }
        const valuePairs = this.keyValues();
        let objString = `${valuePairs[0].toString()}`;
        for (let i = 0; i < valuePairs.length; i++) {
            objString = `${objString},${valuePairs[i].toString()}`;            
        }
        return objString;
    }
    
}

exports.Dictionary = Dictionary;