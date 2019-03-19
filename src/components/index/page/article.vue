<template>
  <div class="container">
    <h2>{{article.title}}</h2>
    <p><icon id="unorderedlist"></icon> {{article.className}} <icon id="time-circle"></icon> {{article.updateDate}}  <icon id="user"></icon>{{article.author}}</p>
    <hr>
    <div class="content">
      <div v-html="article.content"></div>
    </div>
  </div>
</template>

<script>
    import {ajax} from '../../../pages/util/util.js';
    import icon from '../../tools/iconfont.vue';
    export default {
        data(){
            return {
                id:this.$route.params.id,
                article:{
                    title:'',
                    className:'',
                    author:'',
                    updateDate:'',
                    content:''
                }
            };
        },
        components:{icon},
        mounted(){
            if(this.id){
                this.getData();
            }
        },
        methods: {
            getData:function(){
                ajax.get('/api/query.php?id='+this.id).done(res=>{
                    this.article = res.data;
                });
            }
        },
        beforeRouteUpdate (to, from, next) {
            this.id=to.params.id;
            this.getData();
            next();
        }
    }
</script>

<style lang="scss" scoped>
  .container{
    padding:20px;
  }
  .content{
    text-align: left;
  }
</style>