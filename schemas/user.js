// import { buildSchema } from 'graphql';
const buildSchema = require('graphql').buildSchema;

const schema = buildSchema(`
  type Query {
    hello: String,
  }
`)

module.exports = schema;