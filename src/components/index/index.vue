<template>
  <div id="app">
    <topNav></topNav>

    <section class="list-box">
      <div class="container">
        <a href="/admin/index" class="btn to-admin">后台</a>
        <div class="header"></div>
        <div class="body">
          <article class="art-header">
            <li>id</li>
            <li>类别</li>
            <li>标题</li>
            <li>简介</li>
            <li>创建时间</li>
            <li>修改时间</li>
            <li>作者</li>
          </article>
          <p id="loading-icon"><icon id="sync" styler="font-size:2em;" cls="spinner" title="加载中..."></icon></p>
          <article v-for="(item,index) in list">
            <li>{{item.id}}</li>
            <li>{{item.className}}</li>
            <li><router-link :to="'/article/'+item.id">{{item.title}}</router-link></li>
            <li>{{item.description}}</li>
            <li>{{item.createDate}}</li>
            <li>{{item.updateDate}}</li>
            <li>{{item.author}}</li>
          </article>
        </div>
      </div>
    </section>
    <hr>

    <router-view></router-view>

    <foot msg="这里是前台"></foot>

  </div>
</template>

<script>
    import {ajax} from '../../pages/util/util.js';
    import topNav from '../public/topNav.vue';
    import foot from '../public/footer.vue';
    import icon from '../tools/iconfont.vue';
    export default {
        name: 'app',
        data () {
            return {
                msg: 'Welcome to Your Vue.js App',
                list:[]
            }
        },
        methods: {
            getMsg: function () {

                alert(this.msg);
            }
        },
        components:{topNav,icon,foot},
        mounted(){
            ajax.get('/api/query.php').done(res=>{
                this.list=res.data;
            })
        },
        updated(){
            const loading = document.getElementById('loading-icon');
            if(loading && loading.parentNode){
                loading.parentNode.removeChild(loading);
            }
        }
    }
</script>

<style lang="scss" scoped>
  #app {
    padding-bottom:60px;
    font-family: 'Avenir', Helvetica, "Microsoft YaHei", sans-serif;
    text-align: center;
  }
  .to-admin{
    position: absolute;
    right:0;
    top:-50px;
  }
  article{
    width:100%;
    &.art-header{
      margin-bottom:10px;
      box-shadow: 0 0 5px #00bf82;
    }
    li{
      width:14%;
      padding:10px;
      border-right:1px solid #00bf82;
      &:last-child{
        border:0;
      }
    }
  }

</style>