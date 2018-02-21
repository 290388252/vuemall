let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
  'userId': {type: String},
  'userName': String,
  'userPwd': String,
  'orderList': Array,
  'cartList': [
    {
      'productId': {type: String},
      'productName': String,
      'salePrice': Number,
      'checked': String,
      'productNum': Number,
      'productImage': String
    }
  ],
  'addressList': [
    {
      'addressId': String,
      'userName': String,
      'streetName': String,
      'postCode': Number,
      'tel': Number,
      'isDefault': Boolean
    }
  ]
});

module.exports = mongoose.model('user', userSchema);
