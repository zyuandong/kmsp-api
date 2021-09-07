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
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    age: {type: GraphQLInt},
    sex: {type: GraphQLString},
    birthday: {type: GraphQLString},
    description: {type: GraphQLString},
  },
});

const rootQueryType = new GraphQLObjectType({
  name: 'rootQuery',
  fields: {
    users: {
      type: new GraphQLList(userType),
      args: {
        id: {type: GraphQLInt}
      },
      resolve(parent, {id}) {
        return axios.get(`http://localhost:3000/api/users`).then(res => {
          return res.data
        }).catch(err => {
          console.log(err);
        })
      }
    }
  }
});

const mutationType = new GraphQLObjectType({
  name: 'mutation',
  fields: {
    addUser: {
      type: userType,
      args: {
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        sex: {type: GraphQLString},
        birthday: {type: GraphQLString},
        description: {type: GraphQLString},
      }
    }
  }
})

const query = new GraphQLSchema({
  query: rootQueryType,
});

module.exports = { baseSchema, query };
