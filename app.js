import path from 'path'
import express from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
// import favicon from  'serve-favicon'
import jwt from 'express-jwt'
import graphQLHTTP from 'express-graphql'
import bodyParser from 'body-parser'
import schema from './data/schema.js'
import index from './routes/index'
import auth from './routes/auth'
import users from './routes/users'

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// jwt({ secret: 'shhhhhhared-secret',
//   audience: 'http://localhost:3000/protected',
//   issuer: 'http://localhost:3000/auth/test' })

// app.use('/', index);

app.use('/auth', auth);

app.use('/graphql', graphQLHTTP({
  schema,
  pretty: true,
  graphiql: false,
}));

app.use('/dev', graphQLHTTP({
  schema,
  pretty: true,
  graphiql: true,
}));

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
