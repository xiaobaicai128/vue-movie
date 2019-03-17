<template>
  <div class="index-header">
    <router-link to="/">
      <div class="header_menu">主页</div>
    </router-link>
    <router-link to="/movieList">
      <div class="header_menu">电影</div>
    </router-link>
  </div>
</template>
<script>
export default {

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.index-header{
  width: 100%;
  height: 60px;
  position: fixed;
  left: 0;
  top: 0;
  color: #000;
  background-color: #a5a5a5;
  border-bottom: 2px solid #000;
}
.header_menu{
  padding-left: 60px;
  padding-top: 20px;
  float: left;
  color: #fff;
}
</style>
