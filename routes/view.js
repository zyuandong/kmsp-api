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
    await ctx.render('user/form', {
      title: 'Add User'
    })
  })
  .get('/users/edit/:id', async (ctx) => {
    console.log(ctx.params.id);
    await ctx.render('user/form', {
      title: 'Edit User',
      id: ctx.params.id,
    })
  })
  .get('/chat', async (ctx) => {
    await ctx.render('chat', {
      title: 'Chat Room!'
    })
  })

module.exports = router;