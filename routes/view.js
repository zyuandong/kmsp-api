const router = require('koa-router')();

router
  .get('/', async (ctx, next) => {
    await ctx.render('index', {
      title: 'Hello Koa 2!'
    })
  })
  .get('/users', async (ctx) => {
    await ctx.render('user')
  })
  .get('/users/add', async (ctx) => {
    await ctx.render('user/add')
  })
  .get('/chat', async (ctx) => {
    await ctx.render('chat', {
      title: 'Chat Room!'
    })
  })

module.exports = router;