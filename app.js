const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
// const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const koaBody = require('koa-body')
require('./model/index')

const index = require('./routes/index')
const users = require('./routes/users')

// const Router = require('koa-router')
// const router = new Router()

// error handler
onerror(app)

// middlewares
// app.use(bodyparser({
//   enableTypes:['json', 'form', 'text']
// }))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// koa-body 需要再注册路由之前引用
app.use(koaBody({
  multipart: true,
  // formidable: {
  //   multipart: true,
  //   maxFileSize: 200 * 1024 * 1024 // 默认 2M
  // }
}))

// routes
app.use(index.routes())
app.use(index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// router.post('/test-post', async () => {})
// app.use(router.routes())
// app.use(router.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
