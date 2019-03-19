<template>
  <span class="icon" :style="styler">
      <svg :class="'icon-svg '+c" class="icon-svg">
          <use :xlink:href="getId()"></use>
      </svg>
      <span class="icon-title" v-on:click="getId">{{title}}</span>
  </span>
</template>

<script>
  import '../../asset/iconfont/iconfont.js';
  import '../../asset/iconfont/iconfont.css';
    export default {
        name: 'ic',
        props:{
            id:0,
            title:'',
            styler:'',
            cls:''
        },
        data(){
            return {
                c:this.cls||''
            };
        },
        methods: {
            getId: function () {
                return '#icon-'+this.id;
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>