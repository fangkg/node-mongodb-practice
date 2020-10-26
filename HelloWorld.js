(async () => {
    const { MongoClient } = require('mongodb');

    // 创建MongoDB客户端
    const client = new MongoClient(
        'mongodb://localhost:27017',
        {
            useNewUrlParser: true
        }
    )

    // 连接
    let ret;
    ret = await client.connect();

    // 创建数据库
    const db = client.db('test');
    // 创建表
    const fruits = db.collection('fruits');

    // 添加文档
    ret = await fruits.insertOne({
        name: '芒果',
        price: 20.1
    })

    console.log('insert:', JSON.stringify(ret));

    // 查询文档
    ret = await fruits.findOne();
    console.log('find:', ret);

    // 更新文档
    ret = await fruits.updateOne({ name: '芒果'},
    { $set: { name: '苹果' } })

    console.log('update:', ret);

    // 删除文档
    ret = await fruits.deleteOne({ name: '苹果' });

    await fruits.deleteMany();

})()