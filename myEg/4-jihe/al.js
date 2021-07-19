/*
 * @Author: your name
 * @Date: 2021-07-19 09:39:32
 * @LastEditTime: 2021-07-19 11:39:22
 * @LastEditors: Please set LastEditors
 * @Description: 算法：集合
 * @FilePath: \learn-js-data-algorithm\myEg\4-jihe\al.js
 */

const { Set } = require("./ds");

const set = new Set();
set.add(1);
console.log(set.values());
console.log(set.has(1));
console.log(set.size());

set.add(2);
console.log(set.values());
console.log(set.has(2));
console.log(set.size());

set.delete(1);
console.log(set.values());

set.delete(2);
console.log(set.values());

const setA = new Set();
setA.add(1);
setA.add(2);
setA.add(3);

const setB = new Set();
setB.add(4);
setB.add(5);
setB.add(6);

const unionAB = setA.union(setB);
console.log(unionAB.values());