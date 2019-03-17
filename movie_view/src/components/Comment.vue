<template>
  <div>
    <label for="">评论</label>
    <hr>
    <div>
      <!-- <li v-for="item in items"> -->
        XXX评论：***
      <!-- </li> -->
    </div>
    <div style="padding: 5px">
      <textarea name="" v-model="context" placeholder="内容" style="width: 80%; height: 50px"></textarea>
    </div>
    <div style="padding-top: 10px">
      <button v-on:click="send_comment">评论</button>
    </div>
  </div>
</template>
<script>
export default {
  // 获得所有评论，并能够发送评论
}
</script>
<style>
</style>
