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
  getTodo,
  getTodos,
  createTodo,
  updateTodo,
  removeTodo,
  getUser,
  getUsers,
  createUser,
  updateUser,
  removeUser,
  loginUser,
  userSetting,
  createSetting,
  getSetting,
  findUser,
  getLastWeekTodos,
  countTodos
} from './database';

import {
  todoType,
  usersType,
  setingsType,
  greetingsType
} from './schemasType/index';
//查询语句结构
const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
  	todo: {
  	  type: todoType,
  	  args: {
  		    _id: { type: new GraphQLNonNull(GraphQLString) },
  	  },
  	  resolve: (_, { _id }) => getTodo(_id),
  	},
  	todos: {
      type: new GraphQLList(todoType),
      args: {
  		    pageSize: { type: GraphQLInt },
  		    pageIndex: { type: GraphQLInt },
  	  },
  	  resolve: (_, { pageSize,pageIndex }) => getTodos(pageSize,pageIndex),
  	},
    getLastWeekTodos:{
      type: new GraphQLList(todoType),
      args: {
  		    uid: { type: new GraphQLNonNull(GraphQLString) },
  	  },
      resolve: (_, { uid }) => getLastWeekTodos(uid),
    },
    greetings: {
      type: greetingsType,
      resolve: () => "",
    },
    user:{
      type:usersType,
      args: {
          _id: { type: GraphQLString },
          name: { type: GraphQLString },
          email: { type: GraphQLString },
      },
      resolve:(_, { _id,name,email })=>getUser(_id,name,email),
    },
    findusers:{
      type:new GraphQLList(usersType),
      args: {
          keyword: { type: GraphQLString },
      },
      resolve:(_, { keyword })=>findUser(keyword),
    },
    users:{
      type:new GraphQLList(usersType),
      resolve:() => getUsers(),
    },
    setting:{
      type: setingsType,
  	  args: {
  		    uid: { type: new GraphQLNonNull(GraphQLString) },
  	  },
  	  resolve: (_, { uid }) => getSetting(uid),
    },
  })
});

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    createUser:{
      type:usersType,
      args:{
        email:{type:new GraphQLNonNull(GraphQLString)},
        pwd:{type:new GraphQLNonNull(GraphQLString)},
      },
      resolve: (_, { email,pwd }) => createUser(email,pwd),
      // async resolve(_, { email,pwd }) {
      //   let data = await createUser(email,pwd);
      //   return data;
      // }
    },
  	createTodo: {
  	  type: todoType,
  	  args: {
  		    todo: { type: new GraphQLNonNull(GraphQLString) },
  		    uid: {type: GraphQLString },
  	  },
  	  resolve: (_, { todo,uid }) => createTodo(todo,uid),
  	},
    updateUser:{
      type:usersType,
      args:{
        _id: {type: new GraphQLNonNull(GraphQLString) },
        email:{type:GraphQLString},
        pwd:{type:GraphQLString},
        uid:{type:GraphQLString},
        name:{type:GraphQLString},
        phone:{type:GraphQLString},
        avatar:{type:GraphQLString},
        remark:{type:GraphQLString},
        regdate:{type:GraphQLFloat},
        lastlogin:{type:GraphQLFloat},
      },
      resolve:(_, { _id,email, pwd, uid,name, phone, avatar,remark }) =>
  				  updateUser(_id, email, pwd, uid,name, phone, avatar,remark),
    },
    updateTodo: {
  	  type: todoType,
  	  args: {
    		_id: { type: new GraphQLNonNull(GraphQLString) },
    		todo: { type: GraphQLString },
    		completed: { type: GraphQLBoolean },
  	  },
  	  resolve: (_, { _id, todo, completed }) =>
  				  updateTodo(_id, todo, completed),
  	},
    removeUser:{
      type:usersType,
      args:{
        _id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (_, { _id }) => removeUser(_id),
    },
  	removeTodo: {
  	  type: todoType,
  	  args: {
  		    _id: { type: new GraphQLNonNull(GraphQLString) },
  	  },
  	  resolve: (_, { _id }) => removeTodo(_id),
  	},
    loginUser:{
      type:usersType,
      args: {
          email: { type: new GraphQLNonNull(GraphQLString) },
          pwd: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve:(_, { email,pwd })=>loginUser(email,pwd),
    },
    userSetting:{
      type:setingsType,
      args: {
          uid: { type: new GraphQLNonNull(GraphQLString) },
          theme: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve:(_, { uid,theme })=>userSetting(uid,theme),
    },
    createSetting:{
      type:setingsType,
      args: {
          uid: { type: new GraphQLNonNull(GraphQLString) },
          theme: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve:(_, { uid,theme })=>createSetting(uid,theme),
    },
  })
});

export default new GraphQLSchema({
  query: queryType,
  mutation: mutationType,
});
