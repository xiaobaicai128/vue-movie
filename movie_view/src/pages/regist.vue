<template>
  <div>
    <div class="box">
      <label for="username">用户名：</label>
      <input type="text" name="username" placeholder="用户名">
    </div>
    <div class="box">
      <label for="password">输入密码：</label>
      <input type="password" name="password" placeholder="密码">
    </div>
    <div class="box">
      <label for="password">重复密码：</label>
      <input type="password" name="password" placeholder="密码">
    </div>
    <div class="box">
      <label for="email">输入邮箱：</label>
      <input type="text" name="email" placeholder="邮箱">
    </div>
    <div class="box">
      <label for="phonenumber">输入手机号：</label>
      <input type="text" name="phonenumber" placeholder="手机号">
    </div>
    <div class="box">
      <button>注册</button>
    </div>
  </div>
</template>
<script>
export default {
  data () {

  }
}
</script>
<style>
  .box{
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 10px;
  }
</style>
