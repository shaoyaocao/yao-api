import path from 'path'
import express from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import graphQLHTTP from 'express-graphql'
import bodyParser from 'body-parser'
import schema from './data/schema.js'
import index from './routes/index'
import auth from './routes/auth'
import users from './routes/users'
import jwt from 'jsonwebtoken'
import {option} from './config'
var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/auth', auth);

function authtoken(req,res,next){
  if(req.headers.authorization&&req.headers.authorization.split(' ')[1]){
        let token  = req.headers.authorization.split(' ')[1];
        jwt.verify(token, option.secret, function(err, decoded) {
            if(err){
                let msg = {
                    code:"10010",
                    name: '自定义的错误消息',
                    message:err
                }
                res.send(msg)
            }else{
                next()
            }
        });
    }else{
        let msg = {
            code:"10086",
            name:"自定义的错误消息",
            msg:"no auth"
        }
        res.send(msg)
    }
}
app.use('/dev', graphQLHTTP({
  schema,
  pretty: true,
  graphiql: true,
}));

app.use(authtoken)


app.use('/graphql', graphQLHTTP({
  schema,
  pretty: true,
  graphiql: false,
}));

app.use("/test",function(req,res){
  res.send({msg:"test"})
})



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.send({
    msg:res.locals.message,
    err:res.locals.error
  });
});


module.exports = app;
