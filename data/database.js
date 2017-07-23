import mongoose from 'mongoose';
import uuid from 'node-uuid';
import {DATABASE_URL} from './dataurl';
import {
  todoSchema,
  usersSchema,
  settingSchema
} from './dbSchema';

mongoose.Promise = global.Promise;

let db = mongoose.connect(DATABASE_URL,{useMongoClient: true,});//你的数据库地址

let TODO = mongoose.model('todos', todoSchema,'todos');
let USERS = mongoose.model('users', usersSchema,'users');
let SETTING = mongoose.model('setting', settingSchema,'setting');
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
