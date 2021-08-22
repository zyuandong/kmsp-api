const buildSchema = require('graphql').buildSchema;

const schema = buildSchema(`
  type Query {
    # launches: [Rocket]
    mission_name: String
  }
  # type Rocket {
    # flight_number: Int,
    # mission_name: String
  # }
`)

module.exports = schema;