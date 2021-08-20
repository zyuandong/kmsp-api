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
    console.log('=== post users ===', ctx.request);
    let data = await Sql.insert('user', ctx.request.body);
    ctx.body = data;
  })
  .put('/:id', async ctx => {
    let data = await Sql.update('user', ctx.params.id, ctx.request.body);
    ctx.body = data;
  })
  .del('/:id', async ctx => {
    let data = await Sql.delete('user', ctx.params.id);
    ctx.body = data;
  })

module.exports = router
