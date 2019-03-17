/*
* @Author: qiaoyong
* @Date:   2019-02-27 21:16:43
* @E-mail: 21718534@zju.edu.cn
* @Last Modified by:   乔勇
* @Last Modified time: 2019-02-28 21:39:21
*/
var mongoose = require('../common/db')
var movie = new mongoose.Schema({
  movie_id: String,
  movieImg: String,
  movieName: String,
  movieVideo: String,
  movieDownload: String,
  movieTime: String,
  movieNumSuppose: 0,
  movieNumDownload: 0,
  movieMainPage: Boolean
})
movie.statics.findById = function(m_id, callBack) {
  this.find({movie_id: m_id}, callBack);
}
movie.statics.findAll = function(callBack) {
	this.find({}, callBack)
}
var movieModel = mongoose.model('movie', movie);
module.exports = movieModel;
