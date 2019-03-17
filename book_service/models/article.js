/*
* @Author: qiaoyong
* @Date:   2019-03-02 15:14:09
* @E-mail: 21718534@zju.edu.cn
* @Last Modified by:   乔勇
* @Last Modified time: 2019-03-02 15:20:55
*/
const mongoose = require('mongoose');
const article = new mongoose.Schema({
	articleTitle: String,
	articleContext: String,
	articleTime: String
})

article.statics.findByArticle = function(id, callback) {
	this.find({_id: id}, callback);
}
article.statics.findAll = function(callback) {
	this.find({}, callback);
}
const articleModel = mongoose.model('article', article);
module.exports = articleModel