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
const setingsType = new GraphQLObjectType({
  name: 'setingsType',
  fields: () => ({
    _id: {
      type: GraphQLString,
      resolve: ({ _id }) => _id,
    },
    uid: {
      type: GraphQLString,
      resolve: ({ uid }) => uid,
    },
    adddate: {
  	  type: GraphQLFloat,
  	  resolve: ({ adddate }) => adddate
  	},
  	donedate: {
  	  type: GraphQLFloat,
  	  resolve: ({ donedate }) => donedate
  	},
    // adddate:{type:Number},
    // donedate:{type:Number},
    theme: {
      type: GraphQLString,
      resolve: ({ theme }) => theme,
    },
  })
});

module.exports={
  setingsType
}
