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
const usersType = new GraphQLObjectType({
  name: 'Users',
  fields: () => ({
  	_id: {
  	  type: GraphQLString,
  	  resolve: ({ _id }) => _id,
  	},
  	name: {
  	  type: GraphQLString,
  	  resolve: ({ name }) => name,
  	},
  	uid: {
  	  type: GraphQLString,
  	  resolve: ({ uid }) => uid
  	},
  	pwd: {
  	  type: GraphQLString,
  	  resolve: ({ pwd }) => pwd
  	},
  	email: {
  	  type: GraphQLString,
  	  resolve: ({ email }) => email
  	},
  	phone: {
  	  type: GraphQLString,
  	  resolve: ({ phone }) => phone
  	},
  	regdate: {
  	  type: GraphQLFloat,
  	  resolve: ({ regdate }) => regdate
  	},
  	lastlogin: {
  	  type: GraphQLFloat,
  	  resolve: ({ lastlogin }) => lastlogin
  	},
  	avatar: {
  	  type: GraphQLString,
  	  resolve: ({ avatar }) => avatar
  	},
    remark:{
      type: GraphQLString,
  	  resolve: ({ remark }) => remark
  	},
    token:{
      type: GraphQLString,
  	  resolve: ({ token }) => token
    },
  })
});
module.exports={
  usersType
}
