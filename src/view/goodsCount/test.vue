<template>
</template>

<script>
	export default {
		data() {
			return {
				params: {
					
				}
			}
		},
	
		methods: {
          function test(a){
			let arr=[];
			for (let i=0;i<=a;i++){
				arr.push(i)
			}
			for(let key in arr){
				for(let j=2;j<arr[key];j++){
					if(arr[key]%j==0){
						arr.splice(key,1)
					}
				}
			}
			console.log(arr)
			//document.write(arr)
		}
		},
		created() {
			

		}
	}
</script>

<style>
</style>