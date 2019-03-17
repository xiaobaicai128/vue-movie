<template>
  <div class="container">
    <div>
      <MovieIndexHeader></MovieIndexHeader>
    </div>
    <div class="contentMain1">
      <h1>文章题目</h1>
      <div>文章发布时间</div>
      <div class="contentText">
        文章内容
      </div>
      <Comment></Comment>
      <div>
        <CommonFooter></CommonFooter>
      </div>
    </div>
  </div>
</template>
<script>
import CommonFooter from '../components/commonFooter'
import Comment from '../components/Comment'
import MovieIndexHeader from '../components/movieIndexHeader'
export default {
  // name: 'NewsDetail',
  components: {
    CommonFooter,
    Comment,
    MovieIndexHeader
  }
}
</script>
<style>
  .container{
    width: 100%;
    margin: 0 auto;
  }
  .contentMain1{
    padding-top: 150px;
  }
  .contentText{
    font-size: 15px;
    padding-top: 20px;
  }
</style>
