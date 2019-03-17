<template>
  <div class="container">
    <div>
      <MovieIndexHeader></MovieIndexHeader>
    </div>
    <div class="userMessage">
      <UserMessage></UserMessage>
    </div>
    <label for="">收件箱</label>
    <div>
      <EmailList></EmailList> 
    </div>
    <label for="">收件箱</label>
    <div>
      <EmailList></EmailList>
    </div>
    <SendTalkBox></SendTalkBox> 
    <CommonFooter></CommonFooter> 
  </div>
</template>
<script>
import MovieIndexHeader from '../components/movieIndexHeader'
import CommonFooter from '../components/CommonFooter'
import UserMessage from '../components/userMessage'
import SendTalkBox from '../components/sendTalkBox'
import EmailList from '../components/EmailList'
export default {
  data () {
    return {
    }
  },
  components: {
    MovieIndexHeader,
    CommonFooter,
    UserMessage,
    SendTalkBox,
    EmailList
  }
}
</script>
<style>
  .box{
    display: inline-flex;
  }
  .container{
    width: 100%;
    margin: 0 auto;
  }
  .userMessage {
    padding-top: 60px;
    margin-top: -10px;
    margin-left: -10px;
  }
</style>
