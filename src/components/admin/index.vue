<template>
  <div id="app">
    <router-view></router-view>

    <foot msg="这里是后台"></foot>
  </div>
</template>

<script>
    import {ajax} from '../../pages/util/util.js';
    import foot from '../public/footer.vue';
    export default {
        mounted(){
            this.$route.path!=='/login' && ajax.get('/api/session.php').done(res=>{
                this.$store.commit('setUser',res.data);
                this.$route.path==='/' && this.$router.push('main');
            });
        },
        components:{foot}
    }
</script>

<style lang="scss" scoped>
  #app{
    margin-bottom:60px;
    position: relative;
  }
</style>