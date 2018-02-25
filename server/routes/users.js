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
      });
    } else {
      res.json({
        status: 1,
        msg: 'null',
        result: '未登录'
      });
    }
});

// 获取用户购物车列表
router.get('/cartList', (req, res, next) => {
  let userId = req.cookies.userId;
  Users.findOne({userId: userId}, (err, doc) => {
    if (err) {
      res.json({
        status: 1,
        msg: 'null',
        result: 'null'
      });
    } else {
      if (doc) {
        res.json({
          status: 0,
          msg: 'success',
          result: doc.cartList
        });
      }
    }
  });
});

// 删除用户选择的购物车商品
router.post('/cartDelete', (req, res, next) => {
  let userId = req.cookies.userId;
  let productId = req.body.productId;
  Users.update({
    'userId': userId
  },
  {
    $pull: {'cartList': {'productId': productId}}
  }, (err, doc) => {
    if (err) {
      res.json({
        status: 1,
        msg: 'null',
        result: 'null'
      });
    } else {
        res.json({
          status: 0,
          msg: 'success',
          result: 'success'
        });
    }
    });
});

// 更新购物车数据
router.post('/cartUpdate', (req, res, next) => {
  let userId = req.cookies.userId;
  let productId = req.body.productId;
  let productNum = req.body.productNum;
  let checked = req.body.checked;
  Users.update({userId: userId, 'cartList.productId': productId}
  , {'cartList.$.productNum': productNum, 'cartList.$.checked': checked}
  , (err) => { // 更新子文档
    if (err) {
      res.json({
        status: 1,
        msg: err.message,
        result: ''
      });
    } else {
      res.json({
        status: 0,
        msg: '更新成功',
        result: ''
      });
    }
  });
  // 先查找再更新
// User.findOne({userId:userId},(err,doc)=>{
//     if(err){
//         res.json({
//             status:'1',
//             msg:err.message,
//             result:''
//         })
//     }else{
//         doc.cartList.forEach((item)=>{
//             if(item.productId==pdId){
//                 item.productNum=num;
//             }
//         });

//         User.update({userId:userId},{
//             $set: {cartList:doc.cartList}
//         },(err)=>{
//             if(err){
//                 res.json({
//                     status:'1',
//                     msg:err.message,
//                     result:''
//                 })
//             }else{
//                 res.json({
//                     status:'0',
//                     msg:'',
//                     result:doc.cartList
//                 })
//             }
//         })
//     }

// })

  // Users.update({
  //     "userId":userId,
  //     "cartList.productId":productId
  // },{
  //   $set: {"cartList.$.producNum":productNum}
  // }
  // , (err, doc) => {
  //     if (err) {
  //       res.json({
  //         status: 1,
  //         msg: 'null',
  //         result: 'null'
  //       });
  //     } else {
  //       res.json({
  //         status: 0,
  //         msg: 'success',
  //         result: 'success'
  //       });
  //     }
  //   });
// });
});

// 购物车数据全选
router.post('/checkedAll', (req, res, next) => {
  let userId = req.cookies.userId;
  let checkedAll = req.body.checked ? '1' : '0';
  Users.findOne({userId: userId}, (err, doc) => {
    if (err) {
      res.json({
        status: 1,
        msg: err.message,
        result: ''
      });
    } else {
      if (doc) {
        doc.cartList.forEach((item) => {
          item.checked = checkedAll;
        });
        doc.save((err, sucDoc) => {
          if (err) {
            res.json({
              status: 1,
              msg: err.message,
              result: ''
            });
          } else {
            res.json({
              status: 0,
              msg: 'success',
              result: 'success'
            });
          }
        });
      }
    }
  });
});

// 获取用户地址
router.get('/getUserAddress', (req, res, next) => {
  let userId = req.cookies.userId;
  Users.findOne({userId: userId}, (err, doc) => {
    if (err) {
      res.json({
        status: 1,
        msg: err.message,
        result: ''
      });
    } else {
      res.json({
        status: 0,
        msg: 'success',
        result: {
          count: doc.addressList.length,
          list: doc.addressList
        }
      });
    }
  });
});

// 更改用户默认地址
router.post('/editUserAddress', (req, res, next) => {
  let userId = req.cookies.userId;
  let addressId = req.body.addressId;
  if (!addressId) {
    res.json({
      status: 1,
      msg: '请传addressId',
      result: '未获取到地址id'
    });
  } else {
    Users.findOne({userId: userId}, (err, doc) => {
      if (err) {
        res.json({
          status: 1,
          msg: err.message,
          result: 'null'
        });
      } else {
        doc.addressList.forEach((item) => {
          if (item.addressId === addressId) {
            item.isDefault = true;
          } else {
            item.isDefault = false;
          }
        });

        doc.save((err, doc) => {
          if (err) {
            res.json({
              status: 1,
              msg: err.message,
              result: 'null'
            });
          } else {
              res.json({
                status: 0,
                msg: 'success',
                result: 'success'
              });
          }
        });
      }
    });
  }
});

// 删除用户所选地址
router.post('/deleteUserAddress', (req, res, next) => {
  let userId = req.cookies.userId;
  let addressId = req.body.addressId;
  if (!addressId) {
    res.json({
      status: 1,
      msg: '请传addressId',
      result: '未获取到地址id'
    });
  } else {
    Users.update({'userId': userId}, {$pull: {'addressList': {'addressId': addressId}}}
    , (err, doc) => {
        if (err) {
          res.json({
            status: 1,
            msg: err.message,
            result: 'null'
          });
        } else {
          res.json({
            status: 0,
            msg: 'success',
            result: 'success'
          });
        }
      });
  }
});

module.exports = router;
