/*
* @Author: qiaoyong
* @Date:   2019-03-02 16:48:35
* @E-mail: 21718534@zju.edu.cn
* @Last Modified by:   乔勇
* @Last Modified time: 2019-03-17 14:43:34
*/
const express = require('express');
const router = express.Router();
const user = require('../models/user');
const movie = require('../models/movie');
const comment = require('../models/comment')
const recommend = require('../models/recommend')
  // 后台需要验证用户的后台管理权限
  // 后台管理admin， 添加新电影
router.post('/movieAdd', (req, res, next) => {
  if(!req.body.username) {
    res.json({status: 1, message: '用户名为空'})
  }
  if(!req.body.token) {
    res.json({status: 1, message: '登录出错'})
  }
  if(!req.body.id) {
    res.json({status: 1, message: '用户传递错误'})
  }
  if(!req.body.movieName) {
    res.json({status: 1, message: '电影名称为空'})
  }
  if(!req.body.movieImg) {
    res.json({status: 1, message: '电影图片为空'})
  }
  if(!req.body.movieDownload) {
    res.json({status: 1, message: '电影下载地址为空'})
  }
  if(!req.body.movieMainPage) {
    var movieMainPage = false; // 电影主页推荐字段
  }
  // 验证

  var check = checkAdminPower(req.body.username, req.body.token, req.body.id);
  if(check.error === 0) {
    // 验证用户
    user.findByUsername(req.body.username, (err, findUser) => {
      // res.json({message: findUser})
      if(findUser[0].userAdmin && !findUser[0].userStop) {
        // 存入movie数据库
        var saveMovie = new movie({
          movieName: req.body.movieName,
          movieImg: req.body.movieImg,
          movieVideo: req.body.movieVideo,
          movieTime: Date.now(),
          movieNumSuppose: 0,
          movieNumDoenload: 0,
          movieMainPage: movieMainPage
        })
        // 保存数据
        saveMovie.save((err) => {
          if(err) {
            res.json({status: 1, message: err})
          }
          res.json({status: 0, message: '添加成功'})
        })
      } else {
        res.json({status:1, message: '用户没有获得权限或者已经停用'})
      }
    })
  } else {
    res.json({status: 1, message: check.message})
  }
})
router.post('/movieDel', (req, res, next) => {
  if(!req.body.movieId) {
    res.json({status: 1, message: '电影id传入失败'})
  }
  if(!req.body.username) {
    res.json({status: 1, message: '用户名为空'})
  }
  if(!req.body.token) {
    res.json({status: 1, message: '用户登录有误'})
  }
  if(!req.body.id) {
    res.json({status: 1, message: '用户传递有误'})
  }
  var check = checkAdminPower(req.body.username, req.body.token, req.body.id);
  if(check.error === 0) {
    user.findByUsername(req.body.username, (err, findUser) => {
      if(!findUser[0].userAdmin && !findUser[0].userStop) {
        movie.remove({_id: req.body.movieId}, (err, delMovie) => {
          res.json({status: 0, message: '删除电影成功', data: delMovie})
        })
      } else {
        res.json({status: 1, message: '用户没有获得权限或者已经停用'})
      }
    })
  } else {
    res.json({status: 1, message: check.message})
  }
})
router.post('/updata', (req, res, next) => {
  if(!req.body.movieId) {
    res.json({status: 1, message: '电影id传入失败'})
  }
  if(!req.body.username) {
    res.json({status: 1, message: '用户名为空'})
  }
  if(!req.body.token) {
    res.json({status: 1, message: '登录出错'})
  }
  if(!req.body.id) {
    res.json({status: 1, message: '用户传递错误'})
  }
  var check = checkAdminPower(req.body.username, req.body.token, req.body.id);
  if(check.error === 0) {
    user.findByUsername(req.body.username, (err, findUser) => {
      if(findUser[0].userAdmin && !findUser[0].userStop) {
        mocie.update({_id: req.body.movieId}, saveData, (err, updateMovie) => {
          res.json({status: 0, message: '更新成功', data: updateMovie})
        })
      } else {
        res.json({status: 1, message: '用户没有获得权限或者已经停用'})
      }
    })
  } else {
    res.json({status: 1, message: check.message})
  }
})
// 获得所有电影
router.get('/movie', (req, res, next) => {
  movie.findAll((err, allMovie) => {
    res.json({status: 0, message: '获取所有电影成功', data: allMovie})
  })
})
// 获得用户评论
router.get('/commentsList', (req, res, next) => {
  comment.findAll((err, allComment) => {
    res.json({status: 0, message: '获取所有的用户评论', data: allComment})
  })
})
// 审核用户评论
router.post('/checkComment', (req, res, next) => {
  if(!req.body.commentId) {
    res.json({status: 1, message: '评论id传递失败'})
  }
  if(!req.body.username) {
    res.json({status: 1, message: '用户名为空'})
  }
  if(!req.body.token) {
    res.json({status: 1, message: '用户登录出错'})
  }
  if(!req.body.id) {
    res.json({status: 1, message: '用户传递出错'})
  }
  var check = checkAdminPower(req.body.username, req.body.tiken, req.body.id);
  if(check.error === 0) {
    user.findByUsername(req.body.username, (err, findUser) => {
      if(findUser[0].userAdmin && !findUser[0].userStop) {
        comment.update({_id: req.body.commentId}, {check: true}, (err, updateComment) => {
          res.json({status: 0, message: '审核成功', data: updateComment})
        })
      } else {
        res.json({error: 1, message: '用户没有获得权限或者已经停用'})
      }
    })
  } else {
    res.json({status: 1, message: check.message})
  }
})
// 删除用户评论
router.post('/delComment', (req, res, next) => {
  if(!req.body.commentId) {
    res.json({status: 1, message: '评论id传递失败'})
  }
  if(!req.body.username) {
    res.json({status: 1, message: '用户名为空'})
  }
  if(!req.body.token) {
    res.json({status: 1, message: '用户登录出错'})
  }
  if(!req.body.id) {
    res.json({status: 1, message: '用户传递出错'})
  }
  var check = checkAdminPower(req.body.username, req.body.tiken, req.body.id);
  if(check.error === 0) {
    user.findByUsername(req.body.username, (err, findUser) => {
      if(findUser[0].userAdmin && !findUser[0].userStop) {
        comment.remove({_id: req.body.commentId}, (err, delComment) => {
          res.json({status: 0, message: '评论删除成功', data: delComment})
        })
      } else {
        res.json({status: 1, message: '用户没有获得权限或者已经停用'})
      }
    })
  } else {
    res.json({status: 1, message: check.message})
  }
})
// 停封用户
router.post('/stopUser', (req, res, next) => {
  if(!req.body.userId) {
    res.json({status: 1, message: '用户id传递失败'})
  }
  if(!req.body.username) {
    res.json({status: 1, message: '用户名为空'})
  }
  if(!req.body.token) {
    res.json({status: 1, message: '登录出错'})
  }
  if(!req.body.id) {
    res.json({status: 1,message: '用户传递错误'})
  }
  var check = checkAdminPower(req.body.username, req.body.token, req.body.id)
  if(check.error === 0) {
    user.findByUsername(req.body.username, (err, findUser) => {
      if(findUser[0].userAdmin && !findUser[0].userStop) {
        user.update({_id: req.body.userId}, {userStop: true}, (err, updateUser) => {
          res.json({status: 0, message: '停封成功', date: updateUser})
        })
      } else {
        res.json({status: 1, message: '用户没有获得权限或者已经停用'})
      }
    })
  } else {
    res.json({status: 1, message: check.message})
  }
})
// 更新用户密码
router.post('/changeUser', (req, res, next) => {
  if(!req.body.userId) {
    res.json({status: 1, message: '用户id传递失败'})
  }
  if(!req.body.username) {
    res.json({status: 1, message: '用户名为空'})
  }
  if(!req.body.token) {
    res.json({status: 1, message: '登录出错'})
  }
  if(!req.body.id) {
    res.json({status:1 ,message: '用户传递错误'})
  }
  if(!req.body.newPassword) {
    res.json({status: 1, message: '用户新密码错误'})
  }
  var check = checkAdminPower(req.body.username, req.body.token, req.body.id)
  if(check.error === 0) {
    user.findByUsername(req.body.username, (err, findUser) => {
      if(findUser[0].userAdmin && !findUser[0].userStop) {
        user.update({_id: req.body.userId}, {password: req.body.newPassword}, (err, updateUser) => {
          res.json({status: 0, message: '修改成功', data: updateUser})
        })
      } else {
        res.json({status: 1, message: '用户没有获得权限或者已经停用'})
      }
    })
  } else {
    res.json({status: 1, message: check.message})
  }
})
// 显示所有用户
router.post('/showUser', (req, res, next) => {
  if(!req.body.username) {
    res.json({status: 1, message: '用户名为空'})
  }
  if(!req.body.token) {
    res.json({status: 1, message: '登录出错'})
  }
  if(!req.body.id) {
    res.json({status:1 ,message: '用户传递错误'})
  }
  var check = checkAdminPower(req.body.username, req.body.token, req.body.id)
  if(check.error === 0) {
    user.findByUsername(req.body.username, (err, findUser) => {
      if(findUser[0].userAdmin && !findUser[0].userStop) {
        user.findAll((err, alluser) => {
          res.json({status: 0, message: '获取全部用户', data: findUser})
        })
      } else {
        res.json({status: 1, message: '用户没有获得权限或者已经停用'})
      }
    })
  } else {
    res.json({status: 1, message: check.message})
  }
})
// 管理用户权限
router.post('/powerUpdate', (req, res, next) => {
  if(!req.body.userId) {
    res.json({status: 1, message: '用户id传递失败'})
  }
  if(!req.body.username) {
    res.json({status: 1, message: '用户名为空'})
  }
  if(!req.body.token) {
    res.json({status: 1, message: '登录出错'})
  }
  if(!req.body.id) {
    res.json({status:1 ,message: '用户传递错误'})
  }
  var check = checkAdminPower(req.body.username, req.body.token, req.body.id)
  if(check.error === 0) {
    user.findByUsername(req.body.username, (err, findUser) => {
      if(findUser[0].userAdmin && !findUser[0].userStop) {
        user.update({_id: req.body.userId}, {userAdmin: true}, (err, updateUser) => {
          res.json({status: 0, message: '用户权限修改成功', data: updateUser})
        })
      } else {
        res.json({status: 1, message: '用户没有获得权限或者已经停用'})
      }
    })
  } else {
    res.json({status: 1, message: check.message})
  }
})
// 新增文章
router.post('addArticle', (req, res, next) => {
  if(!req.body.articleTitle) {
    res.json({status: 1, message: '文章名字为空'})
  }
  if(!req.body.articleContext) {
    res.json({status: 1, message: '文章内容为空'})
  }
  if(!req.body.username) {
    res.json({status: 1, message: '用户名为空'})
  }
  if(!req.body.token) {
    res.json({status: 1, message: '登录出错'})
  }
  if(!req.body.id) {
    res.json({status:1 ,message: '用户传递错误'})
  }
  var check = checkAdminPower(req.body.username, req.body.token, req.body.id)
  if(rhcek.error === 0) {
    user.findByUsername(req.body.username, (err, findUser) => {
      if(findUser[0].userAdmin && !findUser[0].userStop) {
        var saveArticle = new article({
          articleTitle: req.body.articleTitle,
          articleContext: req.body.articleContext,
          articleTime: req.body.articleTime
        })
        saveArticle.save((err) => {
          if(err) {
            res.json({status: 1, message: '存入文章失败'})
          } else {
            res.json({status: 0, message: '文章存入成功'})
          }
        })
      } else {
        res.json({error: 1, message: '用户没有获得权限或者已经停用'})
      }
    })
  } else {
    res.json({status: 1, message: check.message})
  }
})
// 删除文章
router.post('/delArticle', (req, res, next) => {
  if(!req.body.articleId) {
    res.json({status: 1, message: '文章id传递失败'})
  }
  if(!req.body.username) {
    res.json({status: 1, message: '用户名为空'})
  }
  if(!req.body.token) {
    res.json({status: 1, message: '登录出错'})
  }
  if(!req.body.id) {
    res.json({status:1 ,message: '用户传递错误'})
  }
  var check = checkAdminPower(req.body.username, req.body.token, req.body.id)
  if(check.error === 0) {
    user.findByUsername(req.body.username, (err, findUser) => {
      if(findUser[0].userAdmin && !findUser[0].userStop) {
        article.remove({_id: articleId}, (err, delArticle) => {
          res.json({status: 0, message: '删除文章成功', data: delArticle})
        })
      } else {
        res.json({status: 1, message: '用户没有获得权限或者已经停用'})
      }
    })
  } else {
    res.json({status: 1, message: check.message})
  }
})
// 新增主页推荐
router.post('/addRecommend', (req, res, next) => {
  if(!req.body.token) {
    res.json({status: 1, message: '登录出错'})
  }
  if(!req.body.id) {
    res.json({status:1 ,message: '用户传递错误'})
  }
  if(!req.body.username) {
    res.json({status: 1, message: '用户名为空'})
  }
  if(!req.body.recommendImg) {
    res.json({status: 1, message: '推荐图片为空'})
  }
  if(!req.body.recommendSrc) {
    res.json({status: 1, message: '推荐跳转地址为空'})
  }
  if(!req.body.recommendTitle) {
    res.json({status: 1, message: '推荐标题为空'})
  }
  // var check = checkAdminPower(req.body.username, req.body.token, req.body.id)
  function Check (err, msg) {
    this.error = err,
    this.message = msg
  }
  var check = new Check(0, '错误') 
  if(check.error === 0) {
    user.findByUsername(req.body.username, (err, findUser) => {
              console.log(findUser)
      if(findUser[0].userAdmin && !findUser[0].userStop) {
        var saveRecommend = new recommend({
          recommendImg: req.body.recommendImg,
          recommendSrc: req.body.recommendSrc,
          recommendTitle: req.body.recommendTitle
        })
        saveRecommend.save((err) => {
          if(err) {
            res.josn({status: 1, message: '主页推荐存入失败'})
          } else {
            res.json({status: 0, message: '主页推荐存入成功'})
          }
        })
      } else {
        res.json({status: 1, message: '用户没有获得权限或者已经停用'})
      }
    })
  } else {
    res.json({status: 1, message: check.message})
  }
})
// 删除热点信息
router.post('/delRecommend', (req, res, next) => {
  if(!req.body.token) {
    res.json({status: 1, message: '登录出错'})
  }
  if(!req.body.id) {
    res.json({status:1 ,message: '用户传递错误'})
  }
  if(!req.body.recommendId) {
    res.json({status: 1, message: '评论id传递失败'})
  }
  if(!req.body.username) {
    res.json({status: 1, message: '用户名为空'})
  }
  var check = checkAdminPower(req.body.username, req.body.token, req.body.id)
  if(check.error === 0) {
    user.findByUsername(req.body.username, (err, findUser) => {
      if(findUser[0].userAdmin && !findUser[0].userStop) {
        recommend.remove({_id: req.body.recommendId}, (err, delRecommend) => {
          if(err) {
            res.json({status: 1, message: '热点信息删除失败'})
          } else {
            res.json({status: 0, message: '热点信息删除成功', data: delRecommend})
          }
        })
      } else {
        res.json({status: 1, message: '用户没有获得权限或者已经停用'})
      }
    })
  } else {
    res.json({status: 0, message: check.message})
  }
})
function Check (err, msg) {
    this.error = err,
    this.message = msg
  }
var check = new Check(0, '错误')
module.exports = router;