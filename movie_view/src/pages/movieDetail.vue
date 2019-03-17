<template>
  <div class="container">
    <div>
      <MovieIndexHeader></MovieIndexHeader>
    </div>
    <div class="contentMain1">
      <div>
        <h1>电影名称</h1>
        <div class="viewnum">下载次数： </div>
      </div>
      <div>
        <button>点击下载</button>
      </div>
      <div>
        <img src="" alt="" class="headerImg">
      </div>
      <div class="btnPosition">
        <div class="supportBtn">点赞</div>
      </div>
      <div>
        <comment v-bind:movie_id='movie_id'></comment>
      </div>
      <div>
        <CommentFooter></CommentFooter>
      </div>
    </div>
  </div>
</template>
<script>
import MovieIndexHeader from '../components/movieIndexHeader'
import CommentFooter from '../components/commonFooter'
import Comment from '../components/Comment'
export default {
  name: 'MovieDetail',
  data () {
    return {
      detail: []
    }
  },
  components: {
    MovieIndexHeader,
    CommentFooter,
    Comment
  }
}
</script>
<style>
  .headerImg{
    height: 200px;
  }
  .container{
    width: 100%;
    margin: 0 auto;
  }
  .contentMain1{
    padding-top: 150px;
  }
  .btnPosition{
    padding-left: 48%;
  }
  .supportBtn{
    border: solid 1px #000;
    width: 60px;
  }
  .viewNum{
    font-size: 10px;
  }
</style>
