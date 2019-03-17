<template>
  <div class="border">
    <div class="box">
      <label for="username">输入用户名：</label>
      <input type="text" placeholder="用户名" name="username">
    </div>
    <div class="box">
      <label for="password">密码： </label>
      <input type="password" name="password" placeholder="密码">
    </div>
    <div class="box">
      <button>登录</button>
      <button style="margin-left: 10px"><a href="/#/regist" style="color: #000; text-decoration: none">注册</a></button>
      <button style="margin-left: 10px">忘记密码</button>
    </div>
  </div>
</template>
<script>
</script>
<style>
.border{
  border: solid 1px #000;
  width: 500px;
  margin: 100px auto;
}
  .box{
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 10px;
  }
</style>
