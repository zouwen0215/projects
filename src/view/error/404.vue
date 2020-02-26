<template>
	<div class="error404">
		 <div class="Absolute-Center" >
            <p class="title">404</p>
            <p>抱歉，您访问的页面出错了！</p>
        </div>
	</div>
</template>

<script>
</script>

<style lang="less" scoped>
	.error404 {
		position: relative;
		color: #fff;
		width: 100%;
		height: 100%;
		background-color: #495060;
		margin: 0 auto;
		 .Absolute-Center {
            width: 800px;
            height: 480px;
            position: absolute; top: 0; bottom: 0; left: 0; right: 0;   /*css溢出法*/
            margin: auto;
            p{
            	font-size: 20px
            }
            .title{
            	font-size: 15vh;
            	
            }
        }
	}
</style>