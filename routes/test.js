const router = require('koa-router')();
const Sql = require('../utils/sql');
const fs = require('fs');
const path = require('path');

router
  .post('/api/upload', async ctx => {
    console.log('=== ctx ===',ctx.request.files);
    console.log('=== ctx body ===',ctx.request.body);
    // 上传单个文件
    const file = ctx.request.files.file; // 获取上传文件
    // 创建可读流
    const reader = fs.createReadStream(file.path);
    let filePath = path.join(__dirname, 'upload') + `/${file.name}`;
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);
    return ctx.body = "上传成功！";
  })

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

router.post('/test-post', async (ctx, next) => {
  ctx.body = {
    status: 200,
    message: 'success'
  }
})

router.put('/test-put', async (ctx, next) => {
  ctx.body = {
    status: 200,
    message: 'success'
  }
})

router.delete('/test-delete', async (ctx, next) => {
  ctx.body = {
    status: 200,
    message: 'success'
  }
})

module.exports = router;