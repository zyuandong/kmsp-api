const router = require('koa-router')()

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

module.exports = router
