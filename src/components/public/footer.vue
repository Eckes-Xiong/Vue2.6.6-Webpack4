<template>
  <div class="footer">
    <h3 class="copyright"><icon id="heart"></icon> by Eckes, {{msg}}</h3>
  </div>
</template>

<script>
    import icon from '../tools/iconfont.vue';
    export default {
        props:['msg'],
        components:{icon},
        methods: {
            getMsg: function () {
                alert(this.msg);
            }
        }
    }
</script>

<style lang="scss" scoped>
  .footer{
    position: absolute;
    bottom:0;
    left:0;
    width:100%;
    height:60px;
    background: #393939;
    color: #fff;
  }
  .copyright{
    text-align: center;
    line-height: 60px;
  }

</style>