import todo from './todo'
import user from './user'
import setting from './setting'
import greeting from './greeting'
//表单结构
module.exports={
  ...todo,
  ...user,
  ...setting,
  ...greeting,
}
