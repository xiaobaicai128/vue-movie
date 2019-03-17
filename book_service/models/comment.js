/*
* @Author: qiaoyong
* @Date:   2019-02-27 20:40:39
* @E-mail: 21718534@zju.edu.cn
* @Last Modified by:   乔勇
* @Last Modified time: 2019-02-27 20:47:07
*/
// 关于电影的评论
var mongoose = require('../common/db');
var comment = new mongoose.Schema({
  movie_id: String,
  username: String,
  context: String,
  check: Boolean
})
comment.statics.findByMovieId = function(m_id, callBack) {
  this.find({movie_id: m_id, check: true}, callBack)
}
comment.statics.findAll = function(callBack) {
  this.find({}, callBack)
}
var commentModel = mongoose.model('comment', comment);
module.exports = commentModel;