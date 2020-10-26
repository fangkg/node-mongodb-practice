const mongoose = require('mongoose');
// 连接
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true });

const conn = mongoose.connection;
conn.on('error', () => console.log('err:连接数据库失败！'));
conn.once('open', async () => {
    // 定于一个Schema - Table
    const Schema = mongoose.Schema({
        category: String,
        name: String
    })

    // 编辑一个Model,它对应数据库中复数，小写Collection
    const Model = mongoose.model("fruit", Schema);
    try{
        // 创建 返回Promise
        let r = await Model.create({
            category: '温带水果',
            name: '苹果',
            price: 5
        })
        console.log('insert:', r);
        
        // 查询
        r = await Model.find({ name: '苹果' });
        console.log('find:', r)

        // 更新
        r = await Model.updateOne({ name: '苹果' }, { $set: { name: '芒果' } });
        console.log('update:', r);

        // 删除
        r = await Model.deleteOne({ name: '苹果' });
        console.log('delete:', r);
    } catch (error) {
        console.log('err:', error);
    }
})