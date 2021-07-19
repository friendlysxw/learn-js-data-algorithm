/*
 * @Author: your name
 * @Date: 2021-07-19 15:45:47
 * @LastEditTime: 2021-07-19 17:24:54
 * @LastEditors: Please set LastEditors
 * @Description: 算法：字典和散列表
 * @FilePath: \learn-js-data-algorithm\myEg\5-zidian\al.js
 */

const { Dictionary } = require("./ds");

const dictionary = new Dictionary();
dictionary.set('aaaa','aaaa@email.com');
dictionary.set('bbbb','bbbb@email.com');
dictionary.set('cccc','cccc@email.com');

console.log(dictionary.hasKey('aaaa'));
console.log(dictionary.size());
console.log(dictionary.keys());
console.log(dictionary.get('aaaa'));
