# kmsp-api

## 运行

确保数据库连接配置正确，配置文件为 `config.js`，且存在数据库 dev_db。

推荐使用 nodemoon 或者 pm2

```shell
# 常规启动
npm run start
# or
node bin/www

# nodemon 工具启动
npm run dev
# or
npx nodemon bin/www

# pm2 工具启动
npm run prd
```

浏览器访问 `localhost:3000`

## 生成项目基本结构

1. `npm i -g koa-generator`
2. `koa2 kmsp-api`

## Tips

1. 启动配置
2. 创建 app 对象
3. 注册路由
4. 引入数据模型文件，并执行

## GraphQL 相关

- 请求方式 get/post/put/delete ?
- graphql-client ? apollo-server ?
- 与数据库交互 ? 联表 ？
- 分页？ 上传？ 鉴权？

## TODO

- [ ] 联表操作
- [ ] 登录、鉴权
- [ ] 发布生产
- [ ] nodemon / pm2
- [ ] 下载文件
- [x] 上传文件
- [x] socket
- [x] CRUD
