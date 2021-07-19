/*
 * @Author: your name
 * @Date: 2021-07-19 09:39:26
 * @LastEditTime: 2021-07-19 11:55:56
 * @LastEditors: Please set LastEditors
 * @Description: 数据结构：集合
 * @FilePath: \learn-js-data-algorithm\myEg\4-jihe\ds.js
 */

class Set {
    constructor() {
        this.items = {};
    }

    add(element) { // 向集合中添加一个新元素
        if(!this.has(element)) {
            this.items[element] = element;
            return true;
        }
        return false;
    }

    delete(element) { // 从集合中移除一个元素
        if(this.has(element)) {
            delete this.items[element];
        }
        return false;
    }

    has(element) { // 如果元素在集合中，返回true,否则返回false
        // return element in this.items;
        return Object.prototype.hasOwnProperty.call(this.items,element);
    }

    clear() { // 移除集合中的所有元素
        this.items = {};
    }

    size() { // 返回集合所包含元素的数量
        let count = 0;
        for (const key in this.items) {
            if (this.items.hasOwnProperty(key)) {
                count++;    
            }
        }
        return count;
    }

    values() { // 返回一个包含集合中所有元素的数组
        let values = [];
        for (const key in this.items) {
            if (this.items.hasOwnProperty(key)) {
                values.push(key);   
            }
        }
        return values;
    }
    
    union(otherSet) { // 获取与另一个集合的并集
        const unionSet = new Set();
        this.values().forEach(value => unionSet.add(value));
        otherSet.values().forEach(value => unionSet.add(value));
        return unionSet;
    }
    
    intersection(otherSet) { // 获取与另一个集合的交集
        const intersectionSet = new Set();
        const values = this.values();
        for (let i = 0; i < values.length; i++) {
            if(otherSet.has(values[i])) {
                intersectionSet.add(values[i]);
            }
        }
        return intersectionSet;
    }

    difference(otherSet) {  // 获取与另一个集合的差集
        const differenceSet = new Set();
        this.values().forEach(value => {
            if(!otherSet.has(value)){
                differenceSet.add(value)
            }
        });
        return differenceSet;
    }

    isSubsetOf(otherSet) { // 判断是否是另一个集合的子集
        if(this.size()>otherSet.size()){
            return false;
        }
        let isSubset = true;
        this.values().every(value=>{
            if(!otherSet.has(value)){
                isSubset = false;
                return false;
            }
            return true;
        });
        return isSubset;
    }
}

exports.Set = Set;