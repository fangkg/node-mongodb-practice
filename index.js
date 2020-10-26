const app = express();
const path = require('path');
const mongo = require('./models/db');

app.get('/', (req, res) => {
    res.sendFile(path.resolve('./index.html'));
})


// 列表查询
app.get('/api/list', async (req, res) => {
    // 分页查询
    const { page, category, keyword } = req.query;
    // 构造条件
    const condition = {}
    if (category) {
        condition.category = category;
    }
    if (keyword) {
        condition.name = { $regex: new RegExp(keyword) };
    }
    const col = mongo.col('fruits');
    const total = await col.find(condition).count();
    const fruits = await col.find(condition).skip((page -1) * 5).limit(5).toArray();
    res.json({
        ok: 1,
        data: {
            fruits,
            pagination: {
                total,
                page
            }
        }
    })
})

// 水果组别
app.get('/api/category', async (req, res) => {
    const col = mongo.col('fruits');
    const data = await col.distinct('category');
    res.json({ok: 1, data});

})

app.listen(3000, () => {
    console.log('Server listen 3000!');
})