const router = require('koa-router')();
const koaGraphql = require('koa-graphql');
const { baseSchema, schema: userSchema } = require('../schemas/user');
const schema = require('../schemas/spaceX');
// const http = require('http')
const https = require('https');

const resolvers = {
  hello: () => `hello world`,
};

router.all(
  '/graphql',
  koaGraphql({
    schema: baseSchema,
    rootValue: resolvers,
    graphiql: true,
  })
);

router.all(
  '/graphql/space_x',
  koaGraphql({
    schema,
    graphiql: true,
  })
);

router.all(
  '/graphql/users',
  koaGraphql({
    schema: userSchema,
    graphiql: true,
  })
);

module.exports = router;

// const spacexData = async () => {
//   await https.get('https://api.spacexdata.com/v3/launches', (res) => {
//     let str = '';
//     res.on('data', (chunk) => {
//       str += chunk;
//     });

//     res.on('end', () => {
//       console.log(JSON.parse(str)[0]);
//       return JSON.parse(str)[0];
//       // return
//     });
//   });
// };
