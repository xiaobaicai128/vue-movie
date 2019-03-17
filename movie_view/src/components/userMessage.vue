<template>
  <div class="header">
    <router-link to="/login">
      <div class="header_menu1">登录</div>
    </router-link>
  </div>
</template>
<!-- 此处对session进行检测，若存在session， 则直接显示登录，若不存在就跳转到登录界面 -->
<script>
export default{
 
}
</script>
<style>
  .header{
    width: 103%;
    height: 30px;
    left: 0;
    top: 0;
    margin-top: -50px;
    margin-bottom: -15px;
    color: #000;
    background-color: #c3bd5c;
  }
  .header_menu1{
    padding-right: 60px;
    padding-top: 10px;
    float: right;
    color: #fff;
    font-size: 8px;
  }
</style>
