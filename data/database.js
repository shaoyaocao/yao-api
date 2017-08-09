import mongoose from 'mongoose';
import uuid from 'node-uuid';
import {DATABASE_URL} from './dataurl';
import {
  todoSchema,
  usersSchema,
  settingSchema,
  articleSchema
} from './dbSchema';

mongoose.Promise = global.Promise;

let db = mongoose.connect(DATABASE_URL,{useMongoClient: true,});//你的数据库地址

let TODO = mongoose.model('todos', todoSchema,'todos');
let USERS = mongoose.model('users', usersSchema,'users');
let SETTING = mongoose.model('setting', settingSchema,'setting');
let ARTICLE = mongoose.model('article', articleSchema,'article');
//加密参数
export function login(email,pwd){
  if (!email) {
    return new Promise((resolve, reject) => {
      reject(`邮箱不能为空`);
    });
  }
  if (!pwd) {
    return new Promise((resolve, reject) => {
      reject(`密码不能为空`);
    });
  }
  let userLogin = {
    "lastlogin":new Date().getTime()
  };
  return new Promise((resolve,reject)=>{
    USERS.findOneAndUpdate({ email,pwd}, { $set: userLogin},{new: true},function(err,doc){
      if(err){
        reject(err)
      }else{
        resolve(doc)
      }
    }) 
  })
}

export function getTodo(_id) {
  return TODO.findOne({ _id:mongoose.Types.ObjectId(_id)});
}
export function countTodos(){
  return TODO.count();
}
export function filterTodos(filter,pageSize,pageIndex){
  let option = { $regex: new RegExp(filter, 'i') } 
  if(typeof pageIndex!=="undefined"&&typeof pageSize!=="undefined"){
    return new Promise((resolve,reject) => {
      TODO.find({todo:option}).count(function(err,count){
        TODO.find({todo:option}, null, {sort: {'_id': -1}, skip : ( pageIndex - 1 ) * pageSize, limit : pageSize }).find(function(err,result){
          let send = {
            pages:Math.ceil(count/pageSize),
            index:pageIndex,
            size:pageSize,
            todos:result
          }
          if(err)reject(err)
          resolve(send)
        })
      })
    })
  }else{
    return new Promise((resolve,reject) => {
      TODO.find({todo:option}).count(function(err,count){
        TODO.find({todo:option}).find(function(err,result){
          let send = {
            pages:1,
            index:1,
            size:count,
            todos:result
          }
          if(err)reject(err)
            resolve(send)
        })
      })
    })
  }
}

export function getTodos(pageSize,pageIndex) {
  if(pageIndex!==null&&pageSize!==null){
    return new Promise((resolve,reject) => {
      TODO.find({}).count(function(err,count){
        TODO.find({}, null, {sort: {'_id': -1}, skip : ( pageIndex - 1 ) * pageSize, limit : pageSize }).find(function(err,result){
          let send = {
            pages:Math.ceil(count/pageSize),
            index:pageIndex,
            size:pageSize,
            todos:result
          }
          if(err)reject(err)
          resolve(send)
        })
      })
    })
  }else{
    return TODO.find({});
  }
}
//获取一周内的任务完成情况
export function getLastWeekTodos(uid){
  var reducetime = (new Date().getTime()) - 604800000;//一周时间差
  return TODO.find({uid,"adddate":{"$gt":reducetime}});
}

export function createTodo(todo,uid) {
  if (!todo) {
  	return new Promise((resolve, reject) => {
  	  reject(`任务名不能为空`);
  	});
  }
  return TODO.create({ _id:new mongoose.Types.ObjectId(),todo, completed: false ,adddate:new Date().getTime(),uid});
}

export function removeTodo(_id) {
  return TODO.findOneAndRemove({ _id:mongoose.Types.ObjectId(_id)});
}
export function updateTodo(_id, todo, completed) {
  let donedate = new Date().getTime();
  let todoItem = {
	   todo, completed,donedate
  };
  if (!_id) return new Promise((resolve, reject) => {
	   reject(`需要任务id值作为查询要更新的todo的条件\n`);
  });
  if (!todo) delete todoItem.todo;
  if(!completed)delete todoItem.donedate;
  if (typeof completed !== 'boolean') delete todoItem.completed;
  return TODO.findOneAndUpdate({ _id:mongoose.Types.ObjectId(_id)}, todoItem,{new: true})
}
//获取用户信息
export function getUser(_id,name,email){
  let userItem = {
    _id,name,email
  }
  if (!email) delete userItem.email;
  if (!_id) delete userItem._id;
  if (!name) delete userItem.name;
  return USERS.findOne(userItem);
}

export function findUser(keyword){
  var reg = new RegExp(keyword, 'i');
  return USERS.find({
    $or : [
           {name : {$regex : reg }},
           {email : {$regex : reg }}
          ]
  });
}

export function loginUser(email,pwd){
  if (!email) {
    return new Promise((resolve, reject) => {
      reject(`邮箱不能为空`);
    });
  }
  if (!pwd) {
    return new Promise((resolve, reject) => {
      reject(`密码不能为空`);
    });
  }
  let userLogin = {
    "lastlogin":new Date().getTime()
  };
  return  USERS.findOneAndUpdate({ email,pwd}, { $set: userLogin},{new: true})
}
export function getUsers(){
  return USERS.find({});
}
export function createUser(email,pwd){
  if (!email) {
  	return new Promise((resolve, reject) => {
  	  reject(`邮箱不能为空`);
  	});
  }
  if (!pwd) {
  	return new Promise((resolve, reject) => {
  	  reject(`密码不能为空`);
  	});
  }
  USERS.create({ _id:new mongoose.Types.ObjectId(),email,pwd,regdate:new Date().getTime()}).then((result)=>{
    return result;
  });
}
export function removeUser(_id) {
  return USERS.findOneAndRemove({ _id:mongoose.Types.ObjectId(_id)});
}
export function updateUser(_id, email, pwd, uid,name, phone, avatar,remark,regdate,lastlogin){
  let userItem = {
     email, pwd, uid,name, phone, avatar,remark,regdate,lastlogin
  };
  if (!_id) return new Promise((resolve, reject) => {
     reject(`需要用户id值作为查询要更新的用户的条件\n`);
  });
  if (!email) delete userItem.email;
  if (!pwd) delete userItem.pwd;
  if (!uid) delete userItem.uid;
  if (!name) delete userItem.name;
  if (!phone) delete userItem.phone;
  if (!avatar) delete userItem.avatar;
  if (!remark) delete userItem.remark;
  if (!regdate) delete userItem.regdate;
  if (!lastlogin) delete userItem.lastlogin;
  return USERS.findOneAndUpdate({ _id:mongoose.Types.ObjectId(_id)}, userItem,{new: true});
}
//获取配置文件
export function getSetting(uid){
  let settingItem = {
     uid
  };
  return SETTING.findOne(settingItem);
}
//修改配置文件
export function userSetting(uid,theme){
  let setItem = {
    uid,theme
  }
  return SETTING.findOneAndUpdate({ uid:uid}, setItem,{new: true});
}
//添加配置文件
export function createSetting(uid,theme){
  if (!uid) {
  	return new Promise((resolve, reject) => {
  	  reject(`用户id不能为空`);
  	});
  }
  if (!theme) {
  	return new Promise((resolve, reject) => {
  	  reject(`默认主题设置不能为空`);
  	});
  }
  return SETTING.create({ _id:new mongoose.Types.ObjectId(),uid,theme});
}
//获取文章列表
export function getArticle(_id) {
  return ARTICLE.findOne({ _id: mongoose.Types.ObjectId(_id) });
}
export function getArticles(pageSize,pageIndex) {
  if(pageIndex!==null&&pageSize!==null){
    return new Promise((resolve,reject) => {
      ARTICLE.find({}).count(function(err,count){
        ARTICLE.find({}, null, {sort: {'_id': -1}, skip : ( pageIndex - 1 ) * pageSize, limit : pageSize }).find(function(err,result){
          let send = {
            pages:Math.ceil(count/pageSize),
            total:count,
            index:pageIndex,
            size:pageSize,
            articles:result
          }
          if(err)reject(err)
          resolve(send)
        })
      })
    })
  }else{
    return ARTICLE.find({});
  }
}
export function createArticle(title,article,content,keyword,author,remark){
  	// article   概述
  	// content   内容
  	// adddate   添加日期
  	// title     标题
  	// keyword   关键字
  	// remark    标签
    // author    作者
    return new Promise((resolve,reject) => {
        ARTICLE.create({
            _id:new mongoose.Types.ObjectId(),
            title,
            article,
            content,
            keyword,
            adddate:new Date().getTime(),
            author,
            remark
          }).then((result)=>{
            resolve(result) ;
        });
    })
}
export function deleteArticle(_id){
  return ARTICLE.findOneAndRemove({ _id: mongoose.Types.ObjectId(_id) });
}

export function updateArticle(_id, title, article, content, keyword, remark){
  let articleItem = {
    title, article, content, keyword, remark
  };
  if (!_id) return new Promise((resolve, reject) => {
    reject(`需要用户id值作为查询要更新的用户的条件\n`);
  });
  if (!title) delete userItem.email;
  if (!article) delete userItem.pwd;
  if (!content) delete userItem.uid;
  if (!keyword) delete userItem.name;
  if (!remark) delete userItem.phone;
  return ARTICLE.findOneAndUpdate({ _id: mongoose.Types.ObjectId(_id) }, articleItem, { new: true });
}