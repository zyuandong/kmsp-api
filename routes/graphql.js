const router = require('koa-router')()
const koaGraphql = require('koa-graphql')
const userSchema = require('../schemas/user')

const resolvers = {
  hello: () => `hello world`
}

router.all('/graphql', koaGraphql({
  schema: userSchema,
  rootValue: resolvers,
  graphiql: true
}))

module.exports = router;