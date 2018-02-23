let express = require('express');
let router = express.Router();
let Users = require('../models/user');

/* GET users listing.. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/testApi', (req, res, next) => {
  res.send('test Api good');
});

router.post('/login', (req, res, next) => {
  Users.findOne({userName: req.body.userName, userPwd: req.body.userPwd}, (err, doc) => {
    if (err) {
      res.json({
        status: 1,
        msg: err.message
      });
    } else {
      console.log(doc);
      if (doc) {
        res.cookie('userId', doc.userId, {
          path: '/',
          maxAge: 1000 * 60 * 60 // 保存cookie一个小时
        });
        // req.session.user = doc;
        res.json({
          status: 0,
          msg: '',
          result: {
            userName: doc.userName
          }
        });
      } else {
        console.log('用户登录请求失败');
        res.json({
          status: 1,
          msg: '',
          result: '用户名密码错误'
        });
      }
    }
  });
});

router.post('/logout', (req, res, next) => {
  res.cookie('userId', '', {
    path: '/',
    maxAge: -1
  });
  res.json({
    status: 0,
    msg: '',
    result: '退出成功'
  });
});
module.exports = router;
