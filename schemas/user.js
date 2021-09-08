// import { buildSchema } from 'graphql';
const {
  buildSchema,
  GraphQLSchema,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLList,
} = require('graphql');
const axios = require('axios');

const baseSchema = buildSchema(`
  type Query {
    hello: String,
  }
`);

const userType = new GraphQLObjectType({
  name: 'user',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    sex: { type: GraphQLString },
    birthday: { type: GraphQLString },
    description: { type: GraphQLString },
  },
});

const resType = new GraphQLObjectType({
  name: 'res',
  fields: {
    code: { type: GraphQLInt },
    message: { type: GraphQLString },
    data: { type: userType },
  },
});

const queryType = new GraphQLObjectType({
  name: 'rootQuery',
  fields: {
    users: {
      type: new GraphQLList(userType),
      args: {
        id: { type: GraphQLInt },
      },
      resolve(parent, { id }) {
        return axios
          .get(`http://localhost:3000/api/users`)
          .then((res) => {
            return res.data;
          })
          .catch((err) => {
            console.log(err);
          });
      },
    },
  },
});

const mutationType = new GraphQLObjectType({
  name: 'mutation',
  fields: {
    addUser: {
      type: userType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        sex: { type: GraphQLString },
        birthday: { type: GraphQLString },
        description: { type: GraphQLString },
      },
      resolve(parent, { name, age, sex, birthday, description }) {
        return axios
          .post(`http://localhost:3000/api/users`, { name, age, sex, birthday, description })
          .then((res) => {
            // console.log('==schema', res.data);
            return res.data;
          })
          .catch((err) => console.log(err));
      },
    },
    delUser: {
      type: resType,
      args: {
        id: { type: GraphQLInt },
      },
      resolve(parent, { id }) {
        return axios
          .delete(`http://localhost:3000/api/users/${id}`)
          .then(() => {
            return {
              code: 200,
              message: 'success',
            };
          })
          .catch();
      },
    },
    putUser: {
      type: resType,
      args: {
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        sex: { type: GraphQLString },
        birthday: { type: GraphQLString },
        description: { type: GraphQLString },
      },
      resolve(parent, { id, name, age, sex, birthday, description }) {
        return axios
          .put(`http://localhost:3000/api/users/${id}`, { name, age, sex, birthday, description })
          .then(() => {
            return {
              code: 200,
              message: 'success',
              data: {
                id,
                name,
                age,
                sex,
                birthday,
                description,
              },
            };
          })
          .catch();
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType,
});

module.exports = { baseSchema, schema };
