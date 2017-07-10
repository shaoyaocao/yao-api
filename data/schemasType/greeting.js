import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLSchema,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
  GraphQLInt,
  GraphQLID
} from 'graphql';
const greetingsType = new GraphQLObjectType({
  name: 'Greetings',
  fields: () => ({
    hello: {
      type: GraphQLString,
      args: {
        message: {
          type: GraphQLString
        }
      },
      resolve(parentValue, { message }) {
        return `received: ${message}`;
      }
    }
  })
});

module.exports={
  greetingsType
}
