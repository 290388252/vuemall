let express = require('express');
let router = express.Router();
let Users = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/testApi', (req, res, next) => {
  res.send('test Api good');
});

// 用户登录
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
        res.cookie('userName', doc.userName, {
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

// 用户退出
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

// 登录校验
router.get('/checkedLogin', (req, res, next) => {
    if (req.cookies.userId) {
      res.json({
        status: 0,
        msg: '已登录',
        result: req.cookies.userName || ''
      })
    } else {
      res.json({
        status: 1,
        msg: 'null',
        result: '未登录'
      })
    }
});
module.exports = router;
