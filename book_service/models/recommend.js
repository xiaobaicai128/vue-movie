/*
* @Author: qiaoyong
* @Date:   2019-03-02 13:54:06
* @E-mail: 21718534@zju.edu.cn
* @Last Modified by:   乔勇
* @Last Modified time: 2019-03-02 14:05:10
*/
const mongoose = require('mongoose');
const recommend = new mongoose.Schema({
	recommendImg: String,
	recommendSrc: String,
	recommendTitle: String
})
// 通过ID获得主页推荐
recommend.statics.findByIndexId = function(m_id, callBack) {
	this.find({findByIndexId: m_id}, callBack);
}
// 找到所有的推荐
recommend.statics.findAll = function(callBack) {
	this.find({}, callBack);
}
const recommendModel = mongoose.model('recommend', recommend);
module.exports = recommendModel