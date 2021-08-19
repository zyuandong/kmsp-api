const router = require('koa-router')();
const Sql = require('../utils/sql');
const fs = require('fs');
const path = require('path')

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
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

router
  .get('/api/apples', async(ctx, next) => {
    let data = await Sql.queryAll('apples', ctx.request.query);
    ctx.body = data;
  })
  .get('/api/apples/:id', async ctx => {
    let data = await Sql.queryById('apples', ctx.params.id);
    ctx.body = data;
  })
  .post('/api/apples', async(ctx, next) => {
    console.log('=== post apples ===', ctx.request);
    let data = await Sql.insert('apples', ctx.request.body);
    ctx.body = data;
  })
  .put('/api/apples/:id', async ctx => {
    let data = await Sql.update('apples', ctx.params.id, ctx.request.body);
    ctx.body = data;
  })
  .del('/api/apples/:id', async ctx => {
    let data = await Sql.delete('apples', ctx.params.id);
    ctx.body = data;
  })

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
module.exports = router
