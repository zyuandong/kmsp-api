const {
  buildSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
} = require('graphql');
// const https = require('https')
const axios = require('axios');

// const schema = buildSchema(`
//   type Query {
//     mission_name: String
//     flight_number: Int,
//     upcoming: Boolean
//   }
// `);

const missionIdType = new GraphQLList(GraphQLString);

const rocketType = new GraphQLObjectType({
  name: 'rocket',
  fields: () => ({
    rocket_id: { type: GraphQLString },
    rocket_name: { type: GraphQLString },
    rocket_type: { type: GraphQLString },
    first_stage: {
      type: new GraphQLObjectType({
        name: 'firstStage',
        fields: () => ({
          cores: {
            type: new GraphQLList(
              new GraphQLObjectType({
                name: 'core',
                fields: () => ({
                  core_serial: { type: GraphQLString },
                }),
              })
            ),
          },
        }),
      }),
    },
    second_stage: {
      type: new GraphQLObjectType({
        name: 'scondStage',
        fields: () => ({
          block: { type: GraphQLInt },
        }),
      }),
    },
  }),
});

const launchType = new GraphQLObjectType({
  name: 'launch',
  fields: {
    flight_number: { type: GraphQLInt },
    mission_name: { type: GraphQLString },
    mission_id: { type: missionIdType },
    upcoming: { type: GraphQLBoolean },
    launch_year: { type: GraphQLString },
    launch_date_unix: { type: GraphQLInt },
    launch_date_utc: { type: GraphQLString },
    launch_date_local: { type: GraphQLString },
    is_tentative: { type: GraphQLBoolean },
    tentative_max_precision: { type: GraphQLString },
    tbd: { type: GraphQLBoolean },
    launch_window: { type: GraphQLInt },
    launch_success: { type: GraphQLBoolean },
    rocket: { type: rocketType },
  },
});

const rootQueryType = new GraphQLObjectType({
  name: 'rootQuery',
  fields: {
    launches: {
      type: new GraphQLList(launchType),
      args: {
        page: { type: GraphQLInt },
        pageSize: { type: GraphQLInt },
      },
      async resolve(parent, { page, pageSize }) {
        return await axios.get(`https://api.spacexdata.com/v3/launches`).then((res) => {
          if (page && pageSize) {
            const start = (page - 1) * pageSize;
            const end = start + pageSize;
            return res.data.slice(start, end);
          } else {
            return res.data;
          }
        });
      },
    },
    launch: {
      type: launchType,
      args: {
        flight_number: { type: GraphQLInt },
      },
      resolve(parent, args) {
        return axios
          .get(`https://api.spacexdata.com/v3/launches/${args.flight_number}`)
          .then((res) => res.data);
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: rootQueryType,
});

module.exports = schema;
