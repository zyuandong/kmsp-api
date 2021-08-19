# kmsp-api

## 生成项目目录

`npm i -g koa-generator`
`koa2 kmsp-api`

## 运行

确保数据库连接配置正确，配置文件为 `config.js`，且存在数据库 dev_db。

基本启动方式： `node bin/www`。

推荐使用 nodemoon 或者 pm2

```shell
# 常规启动
npm run start

# nodemon 工具启动
npm run dev

# pm2 工具启动
npm run prd
```

## Tips

启动配置
创建 app 对象
注册路由
引入数据模型文件，并执行

## TODO

- [ ] nodemon / pm2
- [x] CRUD
- [ ] 联表操作
- [ ] 登录、鉴权
- [ ] 上传文件
- [ ] 下载文件
- [ ] socket
- [ ] 发布生产
