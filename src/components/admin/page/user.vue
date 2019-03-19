<template>
  <div class="user">
    <div class="container">
      <div class="form-group">
        <label>昵称：</label>
        <span>{{user.title}}</span>
      </div>
      <div class="form-group">
        <label>简介：</label>
        <span>{{user.intro}}</span>
      </div>
      <div class="form-group">
        <label>手机：</label>
        <span>{{user.mobile}}</span>
      </div>
      <div class="form-group">
        <label>创建日期：</label>
        <span>{{user.createDate}}</span>
      </div>
      <div class="form-group">
        <label>头像：</label>
        <span>{{user.portrait}}</span>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        computed: {
            user () {
                return this.$store.state.user
            }
        }
    }
</script>

<style lang="scss">
  .user{
    padding-top:20px;
  }
  .form-group{
    span{
      line-height:2em;
    }
  }
</style>