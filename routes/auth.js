import express from 'express'
import jwt from 'jsonwebtoken'
import {login} from '../data/database'
import {option} from '../config'
// import ejwt from 'express-jwt'
import crypto from 'crypto'

let router = express.Router()

function cryptPwd(password) {
    let md5 = crypto.createHash('md5');
    return md5.update(password+option.salt).digest('hex');
}

router.get('/gettokenid',function(req,res){
    let token  = req.headers.authorization.split(' ')[1];
    let decoded = jwt.verify(token, option.secret);
    res.send(decoded.id)
})

router.post("/encryption",function(req,res){
    res.send({msg:cryptPwd(req.body.pwd)})
})

router.use('/',function(req, res) {
    login(req.body.email,req.body.pwd).then((value)=>{
        let authtoken = jwt.sign({ id: 'userid' }, option.secret,{ expiresIn: 60 * 60*2 });//生成jwt并设置2小时过期
        if(value !== null){
            res.send({msg:value,authtoken})
        }else{
            res.send({msg:"用户名或密码错误",code:"10086"})
        }
    }).catch(function(error) {
        res.send({msg:error})
    });
});


router.get('/createToken',function(req,res){
    let token = jwt.sign({ id: 'userid' }, option.secret,{ expiresIn: 60 * 60*2 });//生成jwt并设置2小时过期
    res.send({token})
})

router.get('/test',function(req,res){
    res.send({msg:"test"})
})
router.use('/protected',function(req, res) {
    if (!req.user.admin) return res.sendStatus(401);
    res.sendStatus(200);
});


module.exports = router;
