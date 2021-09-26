/*
 * @Author: your name
 * @Date: 2021-08-02 13:47:29
 * @LastEditTime: 2021-08-02 17:01:24
 * @LastEditors: Please set LastEditors
 * @Description: 算法：图
 * @FilePath: \learn-js-data-algorithm\myEg\9-tu\al.js
 */

const { Graph } = require('./ds');
const { Queue } = require('../2-duiLie/ds');

/**
 * 验证图功能
 */
const graph = new Graph();
const myVertices=['A','B','C','D','E','F','G','H','I'];

for (let i = 0; i < myVertices.length; i++) {
    graph.addVertex(myVertices[i]);
}
graph.addEdge('A','B');
graph.addEdge('A','C');
graph.addEdge('A','D');
graph.addEdge('C','D');
graph.addEdge('C','G');
graph.addEdge('C','H');
graph.addEdge('B','E');
graph.addEdge('B','F');
graph.addEdge('E','I');

console.log(graph.toString());

/**
 * 图的遍历
 */

// 定义顶点颜色状态
const Colors = {
    WHITE:0,
    GREY:1,
    BLACK:2
}
// 初始化顶点颜色的函数
const initializeColor = vertices=>{
    const color = {};
    for (let i = 0; i < vertices.length; i++) {
        color[vertices[i]] = Colors.WHITE;        
    }
    return color;
}



// 广度优先搜索（基本工作原理）
function breadthFirstSearch (graph,startVertex,callback) {
    const vertices = graph.getVertices();
    const adjList = graph.getAdjList();
    const color = initializeColor(vertices);
    const queue = new Queue();
    queue.enqueue(startVertex);
    while(!queue.isEmpty()){
        const u = queue.dequeue();
        const neighbors = adjList.get(u);
        color[u] = Colors.GREY;
        for (let i = 0; i < neighbors.length; i++) {
            const w = neighbors[i];
            if(color[w] === Colors.WHITE){
                color[w] = Colors.GREY;
                queue.enqueue(w);
            }            
        }
        color[u] = Colors.BLACK;
        if(callback){
            callback(u);
        }
    }
}

// 改进过的广度优先方法
function BFS(graph,startVertex) {
    
    const vertices = graph.getVertices();
    const adjList = graph.getAdjList();
    const color = initializeColor(vertices);
    const queue = new Queue();
    const distances = {};
    const predecessors = {};
    queue.enqueue(startVertex);

    for (let i = 0; i < vertices.length; i++) {
        distances[vertices[i]]=0;
        predecessors[vertices[i]]=null;
    }
    
    while(!queue.isEmpty()) {
        const u = queue.dequeue();
        const neighbors = adjList.get(u);
        color[u] = Colors.GREY;
        for (let i = 0; i < neighbors.length; i++) {
            const w = neighbors[i];
            if(color[w] === Colors.WHITE){
                color[w] = Colors.GREY;
                distances[w] = distances[u] + 1;
                predecessors[w] = u;
                queue.enqueue(w);
            }            
        }
        color[u] = Colors.BLACK;
    }

    return {
        distances,
        predecessors
    }
}

// 深度优先搜索（基本工作原理）
