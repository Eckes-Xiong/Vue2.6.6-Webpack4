<template>
  <div class="infomation">
    <h2>{{msg}}</h2>
    <hr>
    <div>
      <div class="form-group">
        <label for="title">标题：</label>
        <input type="text" id="title" name="title" v-model="data.title">
      </div>
      <div class="form-group">
        <label for="className">类别：</label>
        <select class="form-control" name="className" id="className" v-model="data.className">
          <option value="class1">class1</option>
          <option value="class2">class2</option>
        </select>
      </div>
    </div>
    <hr>
    <p>内容：</p>
    <div id="toolbar-container">
    <span class="ql-formats">
      <select class="ql-font"></select>
      <select class="ql-size"></select>
    </span>
      <span class="ql-formats">
      <button class="ql-bold"></button>
      <button class="ql-italic"></button>
      <button class="ql-underline"></button>
      <button class="ql-strike"></button>
    </span>
      <span class="ql-formats">
      <select class="ql-color"></select>
      <select class="ql-background"></select>
    </span>
      <span class="ql-formats">
      <button class="ql-script" value="sub"></button>
      <button class="ql-script" value="super"></button>
    </span>
      <span class="ql-formats">
      <button class="ql-header" value="1"></button>
      <button class="ql-header" value="2"></button>
      <button class="ql-blockquote"></button>
      <button class="ql-code-block"></button>
    </span>
      <span class="ql-formats">
      <button class="ql-list" value="ordered"></button>
      <button class="ql-list" value="bullet"></button>
      <button class="ql-indent" value="-1"></button>
      <button class="ql-indent" value="+1"></button>
    </span>
      <span class="ql-formats">
      <button class="ql-direction" value="rtl"></button>
      <select class="ql-align"></select>
    </span>
      <span class="ql-formats">
      <button class="ql-link"></button>
      <button class="ql-image"></button>
      <button class="ql-video"></button>
      <button class="ql-formula"></button>
    </span>
      <span class="ql-formats">
      <button class="ql-clean"></button>
    </span>
    </div>
    <div class="editor"></div>
    <div>
      <br>
      <button v-on:click="submit">提交</button>
      <button v-on:click="insert">插入图片</button>
    </div>
  </div>
</template>

<script>
  import {ajax} from '../../../pages/util/util.js';
  import Quill from 'quill';
  import '../../../asset/css/quill.snow.css';
    export default {
        name: 'infomation',
        data () {
            return {
                msg: '发布内容',
                editor:'',
                data:{
                    title:'',
                    className:'',
                    content:'',
                    type:'insert'
                }
            }
        },
        methods: {
            insert:function(){
                const range = this.editor.getSelection();
                if(range){
                    this.editor.insertEmbed(range.index, 'image', 'https://cn.vuejs.org/images/logo.png')
                }
            },
            submit: function () {
                this.data.content = this.editor.container.firstChild.innerHTML;
                ajax.post('/api/release.php',{
                    data:this.data
                }).done(res=>{

                });
                //console.log(this.editor.container.firstChild.innerHTML)
            }
        },
        mounted(){
            this.editor = new Quill('.editor',{
                theme:'snow',
                placeholder: 'Compose an epic...',
                modules: {
                    toolbar: '#toolbar-container'
                },
            });
        },
        beforeCreate(){
            console.log('beforeCreate')
        }
    }
</script>

<style lang="scss">

</style>