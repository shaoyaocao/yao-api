import todo from './todo'
import user from './user'
import setting from './setting'
import greeting from './greeting'

module.exports={
  ...todo,
  ...user,
  ...setting,
  ...greeting,
}
