import express from 'express'
import jwt from 'jsonwebtoken'

let router = express.Router()


router.post('/', function(req, res) {
    let token = jwt.sign({ id: 'userid' }, 'shhhhh',{ expiresIn: 60 * 60*2 });//生成jwt并设置2小时过期
    res.send({token})
});

router.get('/gettokenid',function(req,res){
    let token  = req.headers.authorization.split(' ')[1];
    console.log(token)
    let decoded = jwt.verify(token, 'shhhhh');
    res.send(decoded.id)
})

router.post('/test',function(req,res){
    res.send({msg:"success"})
})
router.use('/protected',
  function(req, res) {
    consoel.log(req)
    if (!req.user.admin) return res.sendStatus(401);
    res.sendStatus(200);
  });

module.exports = router;
