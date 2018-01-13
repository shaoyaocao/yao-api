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
const articleType = new GraphQLObjectType({
  name: 'Article',
  fields: () => ({
  	_id: {
  	  type: GraphQLString,
  	  resolve: ({ _id }) => _id,
  	},
  	article: {
  	  type: GraphQLString,
  	  resolve: ({ article }) => article,
  	},
  	adddate: {
  	  type: GraphQLFloat,
  	  resolve: ({ adddate }) => adddate,
  	},
  	title: {
  	  type: GraphQLString,
  	  resolve: ({ title }) => title,
  	},
  	content: {
  	  type: GraphQLString,
  	  resolve: ({ content }) => content,
  	},
  	keyword: {
  	  type: GraphQLString,
  	  resolve: ({ keyword }) => keyword
  	},
  	remark: {
  	  type: GraphQLString,
  	  resolve: ({ remark }) => remark
  	},
  	author: {
  	  type: GraphQLString,
  	  resolve: ({ author }) => author
  	},
  })
});

const articlesType = new GraphQLObjectType({
  name: 'Articles',
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
    total: {
  	  type: GraphQLInt,
			resolve: ({ total }) => total
  	},
    list: {
  	  type: new GraphQLList(articleType),
  	  resolve: ({ articles }) =>articles
  	},
  })
});
module.exports={
	articleType,
	articlesType
}
