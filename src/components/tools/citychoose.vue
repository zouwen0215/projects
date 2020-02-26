<template>
	<div class="citychoose">
		<span class="demonstration">地市：</span>
		<el-cascader size="large" :options="cityoptions" v-model="parama.cityCode" @change="handleChangeCity" :disabled="citydisabled"></el-cascader>
		<span class="demonstration">区县：</span>
		<el-cascader size="large" :options="areaoptions" v-model="parama.areaCode" @change="handleChangeArea" :disabled="areadisabled"></el-cascader>
		<span class="demonstration">网格：</span>
		<el-cascader size="large" :options="gridoptions" v-model="parama.gridCode" @change="handleChangeGrid" :disabled="griddisabled"></el-cascader>
	</div>
</template>

<script>
	import http from '@/utils/http.js'
	import common from '@/utils/common.js'
	import URL from '@/utils/url.js'
	import validation from '@/utils/validation.js'
	export default {
		data() {
			return {
				cityoptions: [{
					value: "",
					label: "全省",
				}],
				areaoptions: [{}],
				gridoptions: [{}],
				citydisabled:false,
				areadisabled:false,
				griddisabled:false,
			}
		},
		props: {
			parama: {
				default: function() {
					return {}
				}
			}
		

		},

		watch: {
			parama: {
				handler(newValue, oldValue) {　　　　　　　　　　},
				　　　　deep: true

			}
		},

		methods: {
			handleChangeCity(value) {
				let _self = this;
				if(_self.parama.cityCode) this.$emit('cityChange', value)
				_self.loadArea()
				_self.gridoptions = [];
				_self.parama.areaCode[0] = '';
				_self.parama.gridCode[0] = '';

			},
			handleChangeArea(value) {
				let _self = this;
				if(_self.parama.areaCode) this.$emit('areaChange', value)
				_self.loadGrid()
				_self.parama.gridCode[0] = '';
			},
			handleChangeGrid(value) {
				let _self = this;
				if(_self.parama.gridCode) this.$emit('gridChange', value)
			},
			loadCity() {
				let _self = this;
				let url = URL.ENGIN.SCORCE+ URL.PORT.GET_AREA;
			
				http.publicRequest('get', url, '', function(res) {
					let result = JSON.parse(JSON.stringify(res.body.data));
					for(let i in result) {
						_self.cityoptions.push(result[i]);
					}
				}, function(res) {})

			},
			loadArea() {
				let _self = this;
				let url = URL.ENGIN.SCORCE+ URL.PORT.GET_AREA;
				
				let data = {
					code: _self.parama.cityCode[0]
				}
				url = http.filterUrl(data, url);
				http.publicRequest('get', url, '', function(res) {
					let result = JSON.parse(JSON.stringify(res.body.data));
			        if(_self.parama.cityCode[0]==""){
			        	_self.areaoptions=[]
			        }
			        else{
			        _self.areaoptions = result;	
			        }
					

				}, function(res) {})

			},
			loadGrid() {
				let _self = this;
				let url = URL.ENGIN.SCORCE+ URL.PORT.GET_AREA;
				let data = {
					code: _self.parama.areaCode[0]
				}
				url = http.filterUrl(data, url);
				 
				http.publicRequest('get', url, '', function(res) {
					let result = JSON.parse(JSON.stringify(res.body.data));
					_self.gridoptions = result;
				}, function(res) {})

			},
		},
		created() {
			let _self = this;
			if(_self.$store.state.user.userInfor.level==1){
				_self.citydisabled=true
			}else if (_self.$store.state.user.userInfor.level==2){
				_self.citydisabled=true
				_self.areadisabled=true
			}else if (_self.$store.state.user.userInfor.level==3){
				_self.citydisabled=true
				_self.areadisabled=true
				_self.griddisabled=true
			}
			
			_self.items = this.dataSource
			setTimeout(function() {

				_self.loadCity();
				if(_self.parama.cityCode != ''){
					_self.loadArea();
					if(_self.parama.areaCode != ''){
						_self.loadGrid();
					}					
				}

			}, 0)

			//_self.$refs.mySelect.handleClose()
			// console.log("user", _self.$store.state.user);
			//			if(_self.$store.state.user.userInfor.datatype != '360000') {
			//				for(let key of jiangxisheng[0].children) {
			//					if(key.value != _self.$store.state.user.userInfor.datatype) {
			//						key.disabled = true;
			//					}
			//				}
			//			}

		}
	}
</script>

<style lang="less" scoped>
	.citychoose {
		.demonstration {
			font-size: 14px;
			margin-top: 4px;
			margin-left: 5px;
		}
	}
</style>