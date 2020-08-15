<template>
	<view>
		1-4
	</view>
</template>

<script>
	export default {
		//接收数据
		props:{
			urlojb:Object
		},
		watch:{
			urlojb(){
				console.log("111");
				console.log(this.urlojb);
			}
		},
		mounted() {
			console.log(this.urlojb);
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
