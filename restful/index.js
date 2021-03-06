const Koa = require('koa');
const app = new Koa();

// 初始化数据
const config = require('./conf');
const { loadModel } = require('./framework/loader');
// 产生loadModel函数工厂
loadModel(config)(app);


// user cart 
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());
app.use(require('koa-static')(__dirname + '/'));
const restful = require('./framework/router');
app.use(restful);


const port = 3000;
app.listen(port, () => {
    console.log(`app started at port ${port}`);
})