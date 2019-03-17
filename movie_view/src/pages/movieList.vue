<template>
  <div class="container">
    <div>
      <MovieIndexHeader></MovieIndexHeader>
    </div>
    <div class="contentmain">
      <div>
        <div class="contentLeft">
          <ul class="cont-ul">
            <MovieList></MovieList>
          </ul>
        </div>
      </div>
    </div>
    <div>
      <CommonFooter></CommonFooter>
    </div>
  </div>
</template>
<script>
import CommonFooter from '../components/commonFooter'
import MovieList from '../components/MovieList'
import MovieIndexHeader from '../components/movieIndexHeader'
export default {
  components: {
    CommonFooter,
    MovieList,
    MovieIndexHeader
  }
}
</script>
<style>
.container{
  width: 100%;
  margin: 0 auto;
}
.contentMain{
  padding-top: 150px;
}
.contentLeft{
  font-size: 15px;
  padding-top: 20px;
}
</style>
