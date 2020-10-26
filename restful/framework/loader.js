const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

function load(dir, cb) {
    const url = path.resolve(__dirname, dir);
    const files = fs.readdirSync();
    files.forEach(fileName => {
        // 文件名去掉后缀
        fileName = fileName.replace('.js', '');
        const file = require(url + '/' + fileName);
        // 处理
        cb(fileName, file);
    })
}


// 高阶函数
const loadModel = config => app => {
    mongoose.connect(config.db.url, config.db.option);
    // 建立连接
    const conn = mongoose.connection();
    app.$model = {};
    load('../model', (filename, { schema }) => {
        console.log('load model: ' + filename, schema);
        app.$model[filename] = mongoose.model(filename, schema);
    })
}

// 导出
module.exports = {
    loadModel
}