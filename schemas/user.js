// import { buildSchema } from 'graphql';
const {
  buildSchema,
  GraphQLSchema,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLList,
  graphql,
} = require('graphql');
const axios = require('axios');

const mockPetData = [
  {
    id: 1,
    name: 'tuo',
    age: 12,
  },
  {
    id: 2,
    name: 'mao',
    age: 11,
  },
  {
    id: 3,
    name: 'miu',
    age: 2,
  },
];

const baseSchema = buildSchema(`
  type Query {
    hello: String,
  }
`);

const petType = new GraphQLObjectType({
  name: 'pet',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
  },
});

const userType = new GraphQLObjectType({
  name: 'user',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    sex: { type: GraphQLString },
    birthday: { type: GraphQLString },
    description: { type: GraphQLString },
    pet_id: { type: GraphQLInt },
    pet: {
      type: petType,
      async resolve(parent, args) {
        return await axios
          .get(`http://localhost:3000/api/pets/${parent.pet_id}`)
          .then((res) => {
            return res.data;
          })
          .catch();
        // return mockPetData.filter((item) => item.id === parent.id)[0];
      },
    },
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
      async resolve(parent, { id }) {
        return await axios
          .get(`http://localhost:3000/api/users`)
          .then((res) => res.data)
          .catch((err) => {
            console.log(err);
          });
      },
    },
    pet: {
      type: petType,
      args: {
        id: { type: GraphQLInt },
      },
      resolve(parent, { id }) {
        return axios
          .get(`http://localhost:3000/api/pets/${id}`)
          .then((res) => res.data)
          .catch();
      },
    },
    // user_pet: {
    //   type: new GraphQLList(userType),
    //   args: {},
    //   resolve(parent, args) {
    //     return axios
    //       .get(`http://localhost:3000/api/users`)
    //       .then((res) => {
    //         return res.data;
    //       })
    //       .catch();
    //   },
    // },
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
