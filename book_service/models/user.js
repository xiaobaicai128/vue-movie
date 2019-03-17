/*
* @Author: qiaoyong
* @Date:   2019-02-25 22:14:46
* @E-mail: 21718534@zju.edu.cn
* @Last Modified by:   乔勇
* @Last Modified time: 2019-03-02 17:16:04
*/
var mongoose = require('../common/db');
// 用户数据集
var user = new mongoose.Schema({
  username: String,
  password: String,
  userMail: String,
  userPhone: String,
  userAdmin: Boolean,
  userPower: Number,
  userStop: Boolean
})
// 查询
user.statics.findAll = function(callBack) {
  this.find({}, callBack);
}
// 使用用户名查询
user.statics.findByUsername = function(name, callBack) {
  this.find({username: name}, callBack);
}
// 登陆匹配是不是拥有相通的用户名和密码，并且没有处于被封的状态
user.statics.findUserLogin = function(name, password, callBack) {
  this.find({username: name, password: password, userStop: false}, callBack);
}
// 验证邮箱、电话和用户名找到用户
user.statics.findUserPassword = function(name, mail, phone, callBack) {
  this.find({username: name, userMail: mail, userPhone: phone}, callBack);
}
var userModel = mongoose.model('user', user);
module.exports = userModel;