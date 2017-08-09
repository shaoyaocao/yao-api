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

import {
    getArticles
} from './database';

import {
    todoType,
    todosType,
    usersType,
    setingsType,
    greetingsType,
    articleType,
    articlesType
} from './schemasType/index';
//查询语句结构
const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        articles: {
            type: articlesType,
            args: {
                pageSize: { type: GraphQLInt },
                pageIndex: { type: GraphQLInt },
            },
            resolve: (_, { pageSize, pageIndex }) => getArticles(pageSize, pageIndex),
        }
    })
});

export default new GraphQLSchema({
    query: queryType,
});
