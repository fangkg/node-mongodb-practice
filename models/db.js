const conf = require('./conf');
const { EventEmitter } = require('events');

const { MonogoClient, MongoClient } = require('mongodb');

class Mongodb {

    constructor() {
        // 数据库连接
        this.conf = conf;
        this.emmiter = new EventEmitter();
        this.client = new MongoClient(conf.url, {useNewUrlParser: true});
        this.client.connect(err => {
            // 连接完成回调
            // 异常优先
            if (err) throw err;
            console.log('连接成功！');
            // 发布连接成功
            this.emmiter.emit('connect');
        })
    }

    col(colName, dbName = conf.dbName){
        return this.client.db(dbName).collection(colName);
    }

    // 订阅数据库连接完成
    once(event, cb) {
        // 订阅
        this.emmiter.once(event, cb);
    }
}

module.exports = new Mongodb(conf);