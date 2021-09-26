/*
 * @Author: your name
 * @Date: 2021-08-02 13:47:19
 * @LastEditTime: 2021-08-02 15:37:10
 * @LastEditors: Please set LastEditors
 * @Description: 数据结构：图
 * @FilePath: \learn-js-data-algorithm\myEg\9-tu\ds.js
 */

const { Dictionary } = require('../5-zidian/ds')
class Graph {
    constructor(isDirected = false){
        this.isDirected = isDirected;
        this.vertices = [];
        this.adjList = new Dictionary();
    }

    addVertex(v) {  // 向图中添加一个新的顶点

        if(!this.vertices.includes(v)) {
            this.vertices.push(v);
            this.adjList.set(v,[]);
        }
        
    }
    addEdge(v,w) {
        if(!this.adjList.get(v)){
            this.addVertex(v);
        }

        if(!this.adjList.get(w)){
            this.addVertex(w);
        }

        this.adjList.get(v).push(w);
        if(!this.isDirected){
            this.adjList.get(w).push(v);
        }
    }
    
    getVertices() {
        return this.vertices;
    }

    getAdjList() {
        return this.adjList;
    }

    toString() {
        let s = '';
        for (let i = 0; i < this.vertices.length; i++) {
            s += `${this.vertices[i]} -> `;
            const neighbors = this.adjList.get(this.vertices[i]);
            for (let j = 0; j < neighbors.length; j++) {
                s +=`${neighbors[j]} `;                
            }
            s += '\n';            
        }
        return s;
    }
}

exports.Graph = Graph;