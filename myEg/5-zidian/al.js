/*
 * @Author: your name
 * @Date: 2021-07-19 15:45:47
 * @LastEditTime: 2021-07-20 16:37:50
 * @LastEditors: Please set LastEditors
 * @Description: 算法：字典和散列表
 * @FilePath: \learn-js-data-algorithm\myEg\5-zidian\al.js
 */

const { Dictionary , HashTable } = require("./ds");

// 使用Dictionary类
const dictionary = new Dictionary();
dictionary.set('aaaa','aaaa@email.com');
dictionary.set('bbbb','bbbb@email.com');
dictionary.set('cccc','cccc@email.com');

console.log(dictionary.hasKey('aaaa'));
console.log(dictionary.size());
console.log(dictionary.keys());
console.log(dictionary.get('aaaa'));

// 使用HashTable类
const hash = new HashTable();
hash.put('Gandalf','gandalf@email.com');
hash.put('John','john@email.com');
hash.put('Tyrion','tyrion@email.com');

console.log(hash.hashCode('Gandalf')+' - Gandalf');
console.log(hash.hashCode('John')+' - John');
console.log(hash.hashCode('Tyrion')+' - Tyrion');
console.log(hash);
hash.remove('Gandalf');
console.log(hash.get('Gandalf'));