<template>
  <div class="headerPic">
    <div>
      <p class="imgTitle">{{recommendTitle}}</p>
      <a v-bind:href=recommendSrc>
        <img src='../picture/99.jpg' class="headerImg" alt="">
      </a>
    </div>
  </div>
</template>
<script>
export default {
  props: ['recommendSrc', 'recommendImg', 'recommendTitle']
}
</script>
<style>
.headerPic{
  height: 300px;
  width: 100%;
  background-color: antiquewhite;
}
  .headerImg{
    height: 300px;
    width: 100%;
  }
  .imgTitle{
    z-index: 2;
    padding-left: 45%;
    padding=top: 230px;
    position: absolute;
    color: #fff;
    font-size: 20px;
  }
</style>
