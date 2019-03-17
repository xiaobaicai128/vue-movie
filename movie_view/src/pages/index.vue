<template>
  <div class="container">
    <div>
      <MovieIndexHeader></MovieIndexHeader>
    </div>
    <div class="userMessage">
      <!-- 引入用户信息组件 -->
      <user-message></user-message>
    </div>
    <div class="contentPic">
      <!-- 引入大图组件 -->
      <index-header-pic v-for="item in headerItems" :key="item._id" :recommendImg="item.recommendImg" :recommendSrc="item.recommendSrc" :recommendTitle="item.recommendTitle"></index-header-pic>
    </div>
    <div class="contentMain">
      <div>
        <div class="contentLeft">
          <ul class="cont-ul">
            <movie-list :v-for="item in movieItems" :key="item._id" :id="iitem._id" movieName="item.movieName" :movieTime="item.movieTime"></movie-list>
          </ul>
        </div>
      </div>
      <div>
        <!-- 引入list组件 -->
        <div class="contentRight">
          <ul class="cont-ul">
            <news-list></news-list>
          </ul>
        </div>
      </div>
    </div>
    <!-- 展示引入的footer组件 -->
    <common-footer></common-footer>
  </div>
</template>
<script>
import MovieIndexHeader from '../components/movieIndexHeader'
import MovieList from '../components/MovieList'
import NewsList from '../components/NewList'
import CommonFooter from '../components/commonFooter'
import UserMessage from '../components/userMessage'
import IndexHeaderPic from '../components/indexHeaderPic'

export default {
  data () {
    return {
      headerItems: [],
      newItems: [],
      movieItems: []
    }
  },
  created () {
    // 主页推荐
    this.$http.get('http://localhost:3000/showIndex').then((data) => {
      this.headerItems = data.body.data
      console.log(data.body.data)
    })
    // 获取新闻
    this.$http.get('http://localhost:3000/showArticle').then((data) => {
      this.newItems = data.body.data
      console.log(data.body.data)
    })
    // 获取所有电影
    this.$http.get('http://localhost:3000/showRanking').then((data) => {
      this.movieItems = data.body.data
      console.log(data.body.data)
    })
  },
  components: {
    MovieIndexHeader,
    MovieList,
    NewsList,
    CommonFooter,
    UserMessage,
    IndexHeaderPic
  }
}
</script>
<style>
.container{
  width: 100%;
  margin: 0 auto;
}
.contentMain{
  height: 50px;
}
.userMessage{
  padding-top: 60px;
  margin-top: -10px;
  margin-left: -10px;
}
.contentPic{
  padding-top: 5px;
}
.contentLeft{
  width: 60%;
  float: left;
  margin-top: 5px;
  border-top: 1px solid #000;
}
.contentRight{
  width: 38%;
  float: left;
  margin-left: 1%;
  margin-top: 5px;
  border-top: 1px solid #000;
}
.cont-ul{
  padding-top: 0.5rem;
  background-color: #fff;
}
.cont-ul::after{
  content: '';
  display: block;
  clear: both;
  width: 0;
  height: 0;
}
</style>
