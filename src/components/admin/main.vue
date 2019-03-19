<template>
  <div class="main">
    <h2>欢迎您回来，{{user.title}}！</h2>
    <hr>
    <router-link class="btn" to="/main/user">user</router-link>
    <router-link class="btn" to="/main/infomation">infomation</router-link>
    <hr/>
    <router-view></router-view>
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

<style lang="scss" scoped>
  .main{
    padding:.5em;
  }
</style>