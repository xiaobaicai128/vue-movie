<template>
  <div class="container">
    <div>
      <MovieIndexHeader></MovieIndexHeader>
    </div>
    <div class="usermessage">
      <UserMessage></UserMessage>
    </div>
    <div>
      <div class="box">用户名： 张三</div>
    </div>
    <div>
      <div class="box">用户邮箱： 930@..</div>
    </div>
    <div>
      <div class="box">用户电话： 13777</div>
    </div>
    <div>
      <div class="box">用户状态： 停封/正常</div>
    </div>
    <div>
      <button>修改密码</button>
    </div>
    <div>
      <div class="box">
        <label for="oldPassword">输入旧密码：</label>
        <input type="password" name="oldPassword">
      </div>
      <div class="box">
        <label for="newPassword">输入新密码：</label>
        <input type="password" name="newPassword">
      </div>
      <div class="box">
        <button>修改密码</button>
      </div>
    </div>
    <div style="padding-top: 10px">
      <router-link to="/sendEmail">
        <button>发送站内消息</button>
      </router-link>
    </div>
    <CommonFooter></CommonFooter>
  </div>
</template>
<script>
import CommonFooter from '../components/commonFooter'
import UserMessage from '../components/userMessage'
import MovieIndexHeader from '../components/movieIndexHeader'
export default {
  name: 'hello',
  data () {
    return {

    }
  },
  components: {
    CommonFooter,
    UserMessage,
    MovieIndexHeader
  }
}
</script>
<style>
  .box{
    display: inline-flex;
  }
  .container {
    width: 100%;
    margin: 0 auto;
  }
  .usermessage {
    padding-top: 60px;
    margin-top: -10px;
    margin-left: -10px;
  }
</style>