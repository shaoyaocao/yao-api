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

//********初始化表结构开始***********//
const todoType = new GraphQLObjectType({
  name: 'Todo',
  fields: () => ({
  	_id: {
  	  type: GraphQLString,
  	  resolve: ({ _id }) => _id,
  	},
  	todo: {
  	  type: GraphQLString,
  	  resolve: ({ todo }) => todo,
  	},
  	adddate: {
  	  type: GraphQLFloat,
  	  resolve: ({ adddate }) => adddate,
  	},
  	donedate: {
  	  type: GraphQLFloat,
  	  resolve: ({ donedate }) => donedate,
  	},
  	completed: {
  	  type: GraphQLBoolean,
  	  resolve: ({ completed }) => completed
  	},
  	uid: {
  	  type: GraphQLString,
  	  resolve: ({ uid }) => uid
  	},
  })
});

const todosType = new GraphQLObjectType({
  name: 'Todos',
  fields: () => ({
		index: {
  	  type: GraphQLInt,
  	  resolve: ({ index }) =>index
  	},
		size: {
  	  type: GraphQLInt,
  	  resolve: ({ size }) =>size
  	},
		pages: {
  	  type: GraphQLInt,
  	  resolve: ({ pages }) =>pages
  	},
		list: {
  	  type: new GraphQLList(todoType),
  	  resolve: ({ todos }) =>todos
  	},
  })
});
module.exports={
	todoType,
	todosType
}
