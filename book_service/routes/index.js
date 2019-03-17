var express = require('express');
// 路由引入
var router = express.Router();
// 数据库引入
var mongoose = require('mongoose');
var recommend = require('../models/recommend');
var movie = require('../models/movie');
var mail = require('../models/mail');
var user = require('../models/user');
var article = require('../models/article');


// 定义路由
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
// mongoose测试
router.get('/mongooseTest', (req, res, next) => {
  mongoose.connect('mongodb://localhost/pets', {useMongoClient: true});
  mongoose.Promise = global.Promise;

  var Cat = mongoose.model('Cat', {name: String});
  var tom = new Cat({name: 'Tom'});
  tom.save((err) => {
    if(err) {
      console.log(err);
    } else {
      console.log('success insert');
    }
  })
  res.send('数据库连接测试.')
})

// 显示主页的推荐大图
router.get('/showIndex', (req, res, next) => {
  recommend.findAll((err, getRecommend) => {
    res.json({status: 0, message: '获得推荐', data: getRecommend});
  })
})

// 显示所有的排行榜，即 对于电影字段index的样式
router.get('/showRanking', (req, res, next) => {
  movie.find({movieMainPage: true}, (err, getMovie) => {
    res.json({status: 0, message: '获得主页排行', data: getMovie})
  })
})
// 显示文章列表
router.get('/showArticle', (req, res, next) => {
  article.findAll((err, getArticle) => {
    res.json({status: 0, message: '获取文章', data: getArticle})
  })
})
// 显示文章内容
router.post('/articleDetail', (req, res, next) => {
  if(!req.body.article_id) {
    res.json({status: 1, message: '文章id有误'})
  }
  article.findById(req.body.article_id, (err, getArticle) => {
    res.json({status: 0, message: '获取文章', data: getArticle})
  })
})
// 显示用户个人信息
router.post('/showUser', (req, res, next) => {
  if(!req.body.user_id) {
    res.json({status: 1, message: '用户登录状态有误'})
  }
  user.findById(req.body.user_id, (err, getUser) => {
    res.json({status: 0, message: '获取用户成功', data: {
      user_id: getUser.username,
      userMail: getUser.userMail,
      userPhone: getUser.userPhone,
      userStop: getUser.userStop
    }})
  })
})

module.exports = router;
