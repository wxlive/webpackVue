<template>
  <div>
    <h1>
        <h2>你好</h2> 
        <div class="header"></div>    
    </h1> 
  </div>
</template>

<script>
export default {
    methods:{
        init(){
            let xx=1
            console.log(xx)
        }
    },
    created(){
        this.init()
    }
}
</script>

<style lang='scss'>
    h1{
        h2{
           font-size: 20px;
        }
    }
    .header{
        width: 200px;
        height: 200px;
        background: url('~_img/pic02.jpg');
    }
</style>