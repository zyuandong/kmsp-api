const router = require('koa-router')()
const koaGraphql = require('koa-graphql')
const userSchema = require('../schemas/user')
const spacexSchema = require('../schemas/spaceX')
// const http = require('http')
const https = require('https')

const resolvers = {
  hello: () => `hello world`
}

router.all('/graphql', koaGraphql({
  schema: userSchema,
  rootValue: resolvers,
  graphiql: true
}))

// const spacex = {
//   launches: https.get('https://api.spacexdata.com/v3/launches', (res) => {
//     // console.log('statusCode: ', res.statusCode);
//     // console.log('headers: ', res.headers);

//     let str = '';
//     res.on('data', (chunk) => {
//       str += chunk;
//     })

//     res.on('end', () => {
//       // console.log(JSON.parse(str)[0]);
//       return JSON.parse(str)[0]
//     })
//   })
// }

const spacexData = () => {
  https.get('https://api.spacexdata.com/v3/launches', (res) => {
    let str = ''
    res.on('data', (chunk) => {
      str += chunk
    })

    res.on('end', () => {
      console.log(JSON.parse(str)[0]);
      return JSON.parse(str)[0];
    })
  })
}

router.all('/graphql/space_x', koaGraphql({
  schema: spacexSchema,
  rootValue: spacexData(),
  // rootValue: {
  //   flight_number: 1,
  //   mission_name: 'FalconSat',
  //   upcoming: false
  // },
  graphiql: true
}))

module.exports = router;