<template>
  <div class="movie-list">
    <div>
      <h3>movielist</h3>
      <router-link to="{path: '/movieDetail', query: {id: id}}" class="goods-list-link">
        {{movieName}}{{movieTimeShow}}
      </router-link>
      889
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      movieTimeShow: ''
    }
  },
  props: ['id', 'movieName', 'movieTime'],
  created () {
    this.movieTimeShow = new Date(parseInt(this.movieTime)).toLocaleString().replace(/: \d{1, 2}$/, '')
  }
}
</script>
<style>
.movie-list{
  padding: 5px;
  border-bottom: 1px dashed #ababab;
}
</style>
