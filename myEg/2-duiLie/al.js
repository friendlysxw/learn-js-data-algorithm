/*
 * @Author: your name
 * @Date: 2021-07-14 09:52:50
 * @LastEditTime: 2021-07-14 15:06:13
 * @LastEditors: Please set LastEditors
 * @Description: 算法：队列
 * @FilePath: \learn-js-data-algorithm\myEg\2-duiLie\al.js
 */

const { Queue , Deque } = require('./ds');


/**
 * 击鼓传花游戏
 */

function hotPotato(elementsList,num) {
    const queue = new Queue;
    const elimitatedList = [];

    // 把所有人员添加到队列
    for (let i = 0; i < elementsList.length; i++) {
          queue.enqueue(elementsList[i]);      
    }

    // 
    while (queue.size() > 1){
        // 根据花传递的次数，从队列开头移出项，再将其加入到队列结尾（重置队列的开头和结尾）
        for (let i = 0; i < num; i++) {
            queue.enqueue(queue.dequeue());            
        }
        // 把当前队列的开头移出（当前拿花的人移出）
        elimitatedList.push(queue.dequeue());
    }

    return {
        eliminated: elimitatedList,
        winner: queue.dequeue()
    }

}


/**
 * 回文检查器
 */
function palindromeChecker(aString) {

    if(aString === undefined || aString === null || (aString !== null && aString.length ===0)){
        return false;
    }
    const deque = new Deque();
    const lowerString = aString.toLocaleLowerCase().split(' ').join('');
    for (let i = 0; i < lowerString.length; i++) {
        deque.addBack(lowerString.charAt(i));    
    }
    
    while (deque.size() > 1){
        const firstChar = deque.removeFornt();
        const lastChar = deque.removeBack();
        if (firstChar !== lastChar) {
            return false;
        }
    }

    return true;

}

console.log('a',palindromeChecker('a'));
console.log('aa',palindromeChecker('aa'));
console.log('kayak',palindromeChecker('kayak'));
console.log('level',palindromeChecker('level'));
console.log('leval',palindromeChecker('leval'));