import mongoose from 'mongoose';
//查询结构
let todoSchema=new mongoose.Schema({
    _id:{type:mongoose.Schema.ObjectId},
    completed:{type:Boolean},
    adddate:{type:Number},
    donedate:{type:Number},
    todo:{type:String},
    uid:{type:String},
  },{
    versionKey: false
});
let usersSchema=new mongoose.Schema({
    _id:{type:mongoose.Schema.ObjectId},
    name:{type:String},
    uid:{type:String},
    pwd:{type:String},
    email:{type:String},
    phone:{type:String},
    regdate:{type:Number},
    lastlogin:{type:Number},
    avatar:{type:String},
    remark:{type:String},
    token:{type:String},
  },{
    versionKey: false
});
let settingSchema=new mongoose.Schema({
    _id:{type:mongoose.Schema.ObjectId},
    uid:{type:String},
    theme:{type:String},
  },{
    versionKey: false
});

let articleSchema=new mongoose.Schema({
    _id:{type:mongoose.Schema.ObjectId},
    uid:{type:String},
  	article: {type:String},
  	adddate: {type: Number},
  	title: {type: String},
  	content: {type: String},
  	keyword: {type: String},
  	remark: {type: String},
  	author: {type: String},
  },{
    versionKey: false
});


module.exports={
  todoSchema,
  usersSchema,
  settingSchema,
  articleSchema
}
