<template>
  <div id="login">
    <form onsubmit="return false">
      <div class="form-group">
        <label for="user">user</label>
        <input type="text" name="user" v-model="user">
      </div>
      <div class="form-group">
        <label>password</label>
        <input type="text" name="password" v-model="password">
      </div>
      <div class="form-group">
        <button v-on:click="submit">登录</button>
        <button v-on:click="loginOut">注销</button>
      </div>
    </form>
  </div>
</template>

<script>
  import {ajax} from '../../pages/util/util.js';
    export default {
        name: 'Login',
        data () {
            return {
                msg: 'Login',
                user:'',
                password:''
            }
        },
        methods: {
            submit: function () {
                ajax.post('/api/login.php',{
                    data:{user:this.user,password:this.password}
                }).done(res=>{
                    this.$router.push('main');
                });
            },
            loginOut:function(){
                ajax.get('/api/loginout.php').done(res=>{
                    this.$router.push('login')
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
  #login{
    position: relative;
    width:100%;
    height:100%;
    background: #c1f9e7;
    background-image: repeating-linear-gradient(
            45deg,
            hsla(0,0%,100%,0.5),
            hsla(0,0%,100%, 0.5) 15px,
            transparent 0,
            transparent 45px
    );
    form{
      position: relative;
      padding:1em;
      top:50%;
      margin:0 auto;
      width:50%;
      transform: translate(0,-50%);
      background: #56d6a5;
      border-radius:3px;
      border:1px solid #80dfc0;
      box-shadow: 0 0 15px #000;
    }
  }
</style>