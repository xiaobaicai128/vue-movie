/*
* @Author: qiaoyong
* @Date:   2019-02-25 21:16:04
* @E-mail: 21718534@zju.edu.cn
* @Last Modified by:   乔勇
* @Last Modified time: 2019-02-25 21:17:46
*/
//链接数据库的公共文件
var mongoose = require('mongoose');
var url = 'mongodb://localhost/movieServer';
mongoose.connect(url);
//链接数据库
module.exports = mongoose;