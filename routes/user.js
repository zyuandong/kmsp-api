const router = require('koa-router')()
const Sql = require('../utils/sql')

router.prefix('/api/users')

router
  .get('/', async(ctx, next) => {
    let data = await Sql.queryAll('user', ctx.request.query);
    ctx.body = data;
  })
  .get('/:id', async ctx => {
    let data = await Sql.queryById('user', ctx.params.id);
    ctx.body = data;
  })
  .post('/', async(ctx, next) => {
    console.log('=== post users ===', ctx.request.body);
    // let data = await Sql.insert('user', ctx.request.body);
    let data = await Sql.insert('user', ctx.request.body);
    ctx.body = data;
    return ctx.render('user');
  })
  .post('/:id', async ctx => {
    await Sql.update('user', ctx.params.id, ctx.request.body);
    // ctx.body = data;
    return ctx.render('user');
  })
  .put('/:id', async ctx => {
    await Sql.update('user', ctx.params.id, ctx.request.body);
    // ctx.body = data;
    return ctx.render('user');
  })
  .del('/:id', async ctx => {
    console.log('== delete ==', ctx.params.id);
    let data = await Sql.delete('user', ctx.params.id);
    ctx.body = data;
  })

module.exports = router
