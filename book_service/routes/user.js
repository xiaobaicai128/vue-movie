/*
* @Author: qiaoyong
* @Date:   2019-02-25 20:41:42
* @E-mail: 21718534@zju.edu.cn
* @Last Modified by:   乔勇
* @Last Modified time: 2019-03-17 14:41:50
*/
var express = require('express');
var router = express.Router();

var user = require('../models/user');
var crypto = require('crypto');
var movie = require('../models/movie');
var mail = require('../models/mail');
var comment = require('../models/comment');
const init_token = 'TKL02O';


// 定义路由
router.post('/register', (req, res, next) => {
  if(!req.body.username) {
    res.json({status: 1, message: '用户名为空'});
  }
  if(!req.body.password) {
    res.json({status: 1, message: '密码为空'});
  }
  if(!req.body.userMail) {
    res.json({status: 1, message: '用户邮箱为空'});
  }
  if(!req.body.userPhone) {
    res.json({status: 1, message: '用户手机为空'});
  }
  user.findByUsername(req.body.username, (err, userSave) =>{
    if(userSave.length != 0) {
      res.json({status: 1, message: '该用户名已注册'});
    } else {
      var registerUser = new user({
        username: req.body.username,
        password: req.body.password,
        userMail: req.body.userMail,
        userPhone: req.body.userPhone,
        userAdmin: 1,
        userPower: 1,
        userStop: 0
      })
      registerUser.save(() => {
        res.json({status: 0, message: '注册成功'});
      })
    }
  })
});
router.post('/login', (req, res, next) => {
  if(!req.body.username) {
    res.json({status: 1, message: "用户名为空"})
  }
  if(!req.body.password) {
    res.json({status: 1, message: '密码为空'})
  }
  user.findUserLogin(req.body.username, req.body.password, (err, userSave) => {
    if(userSave.length !== 0) {
      // 通过MD5查看密码
      var token_after = getMD5Password(userSave[0]._id);
      res.json({status: 0, data: {token_after, user: userSave}, message: "登陆成功"});
    } else {
      res.json({status: 1, message: "用户名或者密码错误"})
    }
  })
})
router.post('/postComment', (req, res, next) => {
  if(!req.body.username) {
    var username = '匿名用户';
  }
  if(!req.body.movie_id) {
    res.json({status: 1, message: '电影id为空'})
  }
  if(!req.body.context) {
    res.json({status: 1, message: '评论内容为空'})
  }
  // 建立一个新的数据内容
  var saveComment = new comment({
    movie_id: req.body.movie_id,
    username: req.body.username ? req.body.username : username,
    context: req.body.context,
    check: 0 // 需要管理员后台 审查
  })
  // 保存合适的数据集
  saveComment.save((err) => {
    if(err) {
      res.json({status: 1, message: err})
    } else {
      res.json({status: 0, message: '评论成功'})
    }
  })
})
// 用户点赞
var supportNum = 0;
router.post('/support', (req, res, next) => {
  if(!req.body.movie_id) {
    res.json({status: 1, message: '电影id传递失效'})
  }
  supportNum++;
  var Movie = new movie({
      
      movie_id: req.body.movie_id,
      movieNumSuppose: supportNum
  })
  Movie.save((err) => {
    if(err){
      res.json({status: 1, message: '失败'})
    } else {
      movie.findById(req.body.movie_id, (err, supportMovie) => {

        movie.update({movie_id: req.body.movie_id}, {movieNumSuppose: supportMovie[0].movieNumSuppose + 1}, (err) => {
          if(err) {
            res.json({status: 1, message: '点赞失败', data: err})
          }
          res.json({status: 0, message: '点赞成功'})
        })
      })
    }
  })
  
})
// 电影下载
var num = 0;
router.post('/download', (req, res, next) => {
  if(!req.body.movie_id) {
    res.json({status: 1, message: '电影id传递失败'})
  }

  num = num + 1;
  var Movie = new movie({
      
      movie_id: req.body.movie_id,
      movieNumDownload: num,
      movieDownload: 'supportMovie.movieDownload'
  })
  // movie.findById(req.body.movie_id, (err, supportMovie) => {
    
    Movie.save((err) => {
      if(err) {
        res.json({status: 1, message: '失败'})
      } else {
        movie.findById(req.body.movie_id, (err, supportMovie) => {
          if(err) {
            res.json({status: 1, message: '未找到该电影', data: err})
          } else {
            // movie.findById({movie_id: req.body.movie_id}, (err, supportMovie) => {
              movie.update({movie_id: req.body.movie_id}, {movieNumDownload: supportMovie[0].movieNumDownload + 1}, (err) => {
                if(err) {
                  res.json({status: 1, message: '下载失败', data: err})
                } else {
                  res.json({status: 0, message: '下载成功', data: supportMovie[0].movieDownload + supportMovie[0].movieNumDownload})
                }
              })
            // })
          }
        })
      }
      
    })
})
router.post('/findPassword', (req, res, next) => {
  // 需要输入用户的邮箱信息和手机信息，同时可以更新密码
  // 当req.body.repassword存在和不存在两种情况
  // 这个接口同时用于密码的重置，需要用户先登录
  if(req.body.repassword) {
    // 存在repassword,需要验证其登陆情况或者验证其code
    if(req.body.token) { // token 登录状态的验证
      // 当存在code登录状态时，验证其状态
      if(!req.body.user_id) {
        res.json({status: 1, message: '用户登录错误'})
      }
      if(!req.body.password) {
        res.json({status: 1, message: '用户输入旧密码错误'})
      }
      if(req.body.token === getMD5Password(req.body.user_id)) {
        user.findOne({_id: req.body.user_id}, {password: req.body.password}, (err, checkUser) => {
          if(checkUser) {
            user.update({_id: req.body.user_id}, {password: req.body.repassword}, (err, userUpdate) => {
                if(err) {
                  res.json({status: 1, message: '更改失败', data: err})
                }
                res.json({status: 0, message: '更改成功', data: userUpdate})
              })
          } else {
            res.json({status: 1, message: '用户输入的旧密码错误'})
          }
        })
      } else {
        res.json({status: 1, message: '用户登录错误'})
      }
    } else {
      // 不存在code时， 直接验证mail和 phone
      user.findUserPassword(req.body.username, req.body.userMail, req.body.userPhone, (err, userFound) => {
        if(userFound.length != 0) {
          user.update({_id: userFound[0]._id}, {password: req.body.repassword}, (err, userUpdate) =>{
            if(err){
              res.json({status: 1, message: '更改错误', data: err})
            }
            res.json({status: 0, message: '更改成功', data: userUpdate})
          })
        } else {
          res.json({status:1, message: '信息错误'})
        }
      })
    }
  } else {
    // 验证邮箱和手机，返回验证成功提示，和提交的字段，用于之后的密码改动操作
    if(!req.body.username) {
      res.json({status: 1, message: '用户名称为空'});
    }
    if(!req.body.userMail) {
      res.json({status: 1, message: '用户邮箱为空'});
    }
    if(!req.body.userPhone) {
      res.json({status: 1, message: '用户手机为空'});
    }
    user.findUserPassword(req.body.username, req.body.userMail, req.body.userPhone, (err, userFound) => {
      if(userFound !== 0) {
        res.json({status: 0, message: '验证成功，请修改密码', data: {username: req.body.username, userMail: req.body.userMail, userPhone: req.body.userPhone}})
      } else {
        res.json({status: 1, message: '验证信息错误'})
      }
    })
  }
})
// 发送站内信
router.post('/sendEmail', (req, res, next) => {
  // 未登录状态
  if(!req.body.token) {
    res.json({status: 1, message: '用户登录状态有误'})
  }
  if(!req.body.user_id) {
    res.json({status: 1, message: '用户登录状态有误'})
  }
  if(!req.body.toUserName) {
    res.json({status: 1, message: '未选择目标用户'})
  }
  if(!req.body.title) {
    res.json({status: 1, message: '标题不能为空'})
  }
  if(!req.body.context) {
    res.json({status: 1, message: '内容不能为空'})
  }
  if(req.body.token == getMD5Password(req.body.user_id)) {
    // 先找到要发送的用户的user_id
    user.findByUsername(req.body.toUserName, (err, toUser) => {
      if(toUser.length !== 0) {
        var NewEmail = new mail({
          fromUser: req.body.user_id,
          toUser: req.body.toUserName,
          title: req.body.title,
          context: req.body.context
        })
        NewEmail.save((err) => {
          if(err) {
            res.json({status: 1, message: 'email数据库存入失败'})
          }
          res.json({status: 0, message: '发送成功'})
        })
      } else {
        res.json({status: 1, message: '您发送的对象不存在'})
      }
    })
  } else {
    res.json({status: 1, message: '用户登录错误'})
  }
})
// 接受站内信
router.post('/showEmail', (req, res, next) => {
  // 验证登录状态
  if(!req.body.token) {
    res.json({status: 1, message: '用户登录状态有误'})
  }
  if(!req.body.user_id) {
    res.json({status: 1, message: '用户登录状态有误'})
  }
  if(!req.body.receive) {
    res.json({status: 1, message: '参数有误'})
  }
  if(req.body.token === getMD5Password(req.body.user_id)) {
    if(req.body.receive == 1) {
      // 发送的站内信
      mail.findByFromUserId(req.body.user_id, (err, sendMail) => {
        res.json({status: 0, message: '获取成功', data: sendMail})
      })
    } else {
      // 接受的站内信
      mail.findByToUserId(req.body.user_id, (err, receiveMail) => {
        res.json({status: 0, message: '获取成功', data: receiveMail})
      })
    }
  } else {
    res.json({status: 0, message: '用户登录错误'})
  }
})
// 获取MD5值
function getMD5Password(id) {
  var md5 = crypto.createHash('md5');
  var token_before = id + init_token;
  return md5.update(token_before).digest('hex');
}
module.exports = router;