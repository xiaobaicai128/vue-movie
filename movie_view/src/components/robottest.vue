<template>
  <div class="d">
    <p>
      提问：
      <input v-model='question'>
    </p>
    <p>{{answer}}</p>

  </div>
</template>
<script>
export default {
  data () {
    return {
      question: '', // 问题输入
      answer: '你还没有问人家问题呀~' // 初始化的回答
    }
  },
  watch: {
    // 若question发生变化，这个函数就会执行
    question: function () {
      this.answer = '等待提问~~'
      this.getAnswer()
    }
  },
  methods: {
    // 通过该方法可以访问到api，若又返回的内容，则显示在界面上
    getAnswer () {
      if (this.question.indexOf('？') !== -1) {
        this.answer = '思考中......'
        let that = this
        that.$http.post('http://robottest.uneedzf.com/api/talk2Robot', {token: '25b630fbdf408635756990a638250d08', message: that.question})
        // 开发者更改token的值
          .then((res) => {
            if (res.data.code === 0) {
              that.answer = res.data.data
            } else {
              that.answer = res.data.message
            }
          })
      } else {
        this.answer = '一个问题要用？结尾哦'
        return 0
      }
    }
  }
}
</script>
