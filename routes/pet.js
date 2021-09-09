const router = require('koa-router')();
const Sql = require('../utils/sql');

router.prefix('/api/pets');

router.get('/:id', async (ctx) => {
  let data = await Sql.queryById('pet', ctx.params.id);
  ctx.body = data[0]
})

module.exports = router;