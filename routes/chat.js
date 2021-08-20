const router = require('koa-router')();

router.prefix('/chat');

router.get('/', async (ctx) => {
  await ctx.render('chat', {
    title: 'Chat Room!'
  })
})

module.exports = router;