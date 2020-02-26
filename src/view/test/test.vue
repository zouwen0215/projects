<template>
	<div>
		<div id="i_select_files"></div>
		<div id="i_stream_files_queue"></div>
	</div>

</template>

<script>
	import '../../assets/js/stream-v1.js'

	export default {
		data() {
			return {

			};
		},
		props: {
			param: {}
		},
		mounted() {
			let _self = this;
			let config = {
				browseFileId: "i_select_files",
				/** 选择文件的ID, 默认: i_select_files */
				browseFileBtn: "<div>请选择文件</div>",
				/** 显示选择文件的样式, 默认: `<div>请选择文件</div>` */
				dragAndDropArea: "i_select_files",
				/** 拖拽上传区域，Id（字符类型"i_select_files"）或者DOM对象, 默认: `i_select_files` */
				dragAndDropTips: "<span>把文件(文件夹)拖拽到这里</span>",
				/** 拖拽提示, 默认: `<span>把文件(文件夹)拖拽到这里</span>` */
				filesQueueId: "i_stream_files_queue",
				/** 文件上传容器的ID, 默认: i_stream_files_queue */
				filesQueueHeight: 200,
				/** 文件上传容器的高度（px）, 默认: 450 */
				messagerId: "i_stream_message_container",
				/** 消息显示容器的ID, 默认: i_stream_message_container */
				multipleFiles: true,
				/** 多个文件一起上传, 默认: false */
				onRepeatedFile: function(f) {
					alert("文件：" + f.name + " 大小：" + f.size + " 已存在于上传队列中。");
					return false;
				},
				onSelect: function(list) {
					for(var i = 0; i < list.length; i++) {
						let _f = list[i].name.split('.')[0];
						let _s = '.' + list[i].name.split('.')[1];
						list[i].name = _self.uuid(32, 16) + _s;
					}
				},
				onQueueComplete: function(msg) {
					console.log(msg)
				},
				tokenURL: "http://wx.junfengtech.com.cn/upimg/tk",
				uploadURL: "http://wx.junfengtech.com.cn/upimg/upload"
			}
			var _t = new Stream(config);
		},
		methods: {
			changeName() {

			},
			uuid: function(len, radix) {
				var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
				var uuid = [],
					i;
				radix = radix || chars.length;

				if(len) {
					// Compact form
					for(i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
				} else {
					// rfc4122, version 4 form
					var r;
					// rfc4122 requires these characters
					uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
					uuid[14] = '4';
					// Fill in random data. At i==19 set the high bits of clock sequence as
					// per rfc4122, sec. 4.1.5
					for(i = 0; i < 36; i++) {
						if(!uuid[i]) {
							r = 0 | Math.random() * 16;
							uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
						}
					}
				}

				return uuid.join('').toLowerCase();
			}
		},
		created() {

		}
	}
</script>

<style scoped>
	@import "../../assets/style/stream.css"
</style>