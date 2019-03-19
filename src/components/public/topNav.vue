<template>
  <div id="topNav">
    <h1>{{ msg }}</h1>
    <p>
      <i><icon id="star-fill" styler="font-size:1em;"></icon>node.js + vue.js + vue-router.js + vuex.js</i>
    </p>
    <hr>
  </div>
</template>

<script>
  import icon from '../tools/iconfont.vue';
    export default {
        name: 'topNav',
        data () {
            return {
                msg: '欢迎来到Vue.js的测试用例'
            }
        },
        components:{icon},
        methods: {
            getMsg: function () {
                alert(this.msg);
            }
        }
    }
</script>

<style lang="scss" scoped>
  #topNav{
    margin-bottom:10px;
  }
  i{
    font-size:2em;
    color: #7b8593;
  }
  h1 {
    font-size:3em;
    color: #ff8300;
  }
</style>