let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Goods = require('../models/goods');

mongoose.connect('mongodb://127.0.0.1:27017/mall');

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected success.');
});

mongoose.connection.on('error', () => {
  console.log('MongoDB connected fail.');
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB connected disconnected.');
});

router.get('/', (req, res, next) => {
  let page = parseInt(req.param('page'));
  let pageSize = parseInt(req.param('pageSize'));
  // let priceLevel = req.param('priceLevel');
  let sort = req.param('sort');
  let priceLevel = req.param('priceLevel');
  let priceGt = '';
  let priceLte = '';
  let skip = (page - 1) * pageSize;
  let params = {};
    switch (priceLevel) {
      case '0': priceGt = 0; priceLte = 100; break;
      case '1': priceGt = 100; priceLte = 500; break;
      case '2': priceGt = 500; priceLte = 1000; break;
      case '3': priceGt = 1000; priceLte = 5000; break;
      case 'all': priceGt = 0; priceLte = 5000; break;
    }
  params = {
    salePrice: {
      $gt: priceGt,
      $lte: priceLte
    }
  };
  let goodsModel = Goods.find(params).skip(skip).limit(pageSize);
  goodsModel.sort({'salePrice': sort});
  goodsModel.exec((err, doc) => {
    if (err) {
      res.json({
        status: 1,
        msg: err.message
      });
    } else {
      res.json({
        status: 0,
        msg: '',
        result: {
          count: doc.length,
          list: doc
        }
      });
    }
  });
});
module.exports = router;
