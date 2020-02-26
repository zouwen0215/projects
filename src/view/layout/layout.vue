<template>
  <div class="layout">
    <el-container>
      <el-header>
        <div class="header_contain">
          <div class="logo">
            <img src="../../../static/icon/title.png">
            <p>江西烟草数据统计平台</p>
          </div>
          <el-menu
            :default-active="String(userInfor.choose.first)"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#191f28 "
            text-color="#f6f7f8"
            active-text-color="#34c388"
          >
            <el-menu-item
              :index="String(index)"
              v-for="(item,index) in userInfor.menu"
              :key="index"
              class="menudemo"
            >{{item.title}}</el-menu-item>
          </el-menu>
          <div class="userinfo" >
            <el-dropdown trigger="hover">
              <span class="el-dropdown-link userinfo-inner">
                <img src="../../../static/icon/terminal.png">
              </span>
              <el-dropdown-menu slot="dropdown">
                <!--<el-dropdown-item>我的消息</el-dropdown-item>
                <el-dropdown-item>设置</el-dropdown-item>-->
                <el-dropdown-item @click.native="params.centerDialogVisible = true" >退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-dialog
              :visible.sync="params.centerDialogVisible"
              :append-to-body="true"
              width="300px"
              center>
              <span style="font-size: 16px;">是否确认退出？</span>
              <span slot="footer" class="dialog-footer">
                <el-button @click="params.centerDialogVisible = false">取 消</el-button>
                <el-button type="success" @click="loggedOut">确 定</el-button>
              </span>
            </el-dialog>
          </div>
        </div>
      </el-header>
      <div class="breadcrumb">
        <div style="width: 1200px;margin: 0 auto;">
          <div class="breadcrumb_left">
            <i
              v-if="userInfor.menu[userInfor.choose.first].children.length"
              class="el-icon-menu icon-menu"
              @click="CollapseType"
            ></i>
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item>{{userInfor.menu[userInfor.choose.first].title}}</el-breadcrumb-item>
              <el-breadcrumb-item
                v-if="userInfor.menu[userInfor.choose.first].children.length !== 0 && String(userInfor.choose.second).indexOf('-')<0 "
              >{{userInfor.menu[userInfor.choose.first].children[userInfor.choose.second].title}}</el-breadcrumb-item>
              <el-breadcrumb-item
                v-if="userInfor.menu[userInfor.choose.first].children.length !== 0 && String(userInfor.choose.second).indexOf('-')>=0 "
              >{{userInfor.menu[userInfor.choose.first].children[userInfor.choose.second.split('-')[0]].title}}</el-breadcrumb-item>
              <el-breadcrumb-item
                v-if="userInfor.menu[userInfor.choose.first].children.length && String(userInfor.choose.second).indexOf('-')>0   &&  userInfor.menu[userInfor.choose.first].children[userInfor.choose.second.split('-')[0]].children.length"
              >{{userInfor.menu[userInfor.choose.first].children[userInfor.choose.second.split('-')[0]].children[userInfor.choose.second.split('-')[1]].title}}</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
        </div>
      </div>
      <div class="main">
        <el-main :style="{'min-height':screenHeight-140+'px'}">
          <div
            class="menu"
            :style="{left:(screenWidth-1200)/2,height:screenHeight-100+'px',background:'#fff'}"
          >
            <el-menu
              :default-active="String(userInfor.choose.second)"
              class="el-menu-vertical-demo"
              v-if="userInfor.menu[userInfor.choose.first].children.length"
              :collapse="params.isCollapse"
              text-color="#191f28"
              active-text-color="#34c388"
            >
              <div
                style="overflow: hidden;"
                v-for="(item,index) in userInfor.menu[userInfor.choose.first].children"
                :key="index"
              >
                <el-submenu
                  class="submenu"
                  :index="String(index)"
                  v-if="userInfor.menu[userInfor.choose.first].children[index].children.length>0"
                >
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span
                      slot="title"
                      v-if="!params.isCollapse"
                      style="font-weight: 900;"
                    >{{item.title}}</span>
                  </template>
                  <el-menu-item
                    class="menu-item"
                    @click="handleList([index+'-'+Number(key),i])"
                    :index="index+'-'+Number(key)"
                    v-for="(i,key) in userInfor.menu[userInfor.choose.first].children[index].children"
                    :key="key"
                  >{{i.title}}</el-menu-item>
                </el-submenu>
                <el-menu-item
                  @click="handleList([String(index),item])"
                  :index="String(index)"
                  v-if="userInfor.menu[userInfor.choose.first].children[index].children.length==0"
                >
                  <i class="el-icon-menu"></i>
                  <span slot="title" style="font-weight: 900;">{{item.title}}</span>
                </el-menu-item>
              </div>
            </el-menu>
          </div>
          <div
            class="contian"
            :class="userInfor.menu[userInfor.choose.first].children.length?'minContain':''"
          >
            <div class="main-contain">
              <router-view></router-view>
            </div>
          </div>
        </el-main>
        <!--<el-footer>
					<span>2018-2026 &copy; 江西君风科技有限公司</span>
        </el-footer>-->
      </div>
    </el-container>
  </div>
</template>

<script>
let app = {
  data() {
    return {
      screenWidth: document.documentElement.clientWidth, //屏幕宽度
      screenHeight: document.documentElement.clientHeight, //屏幕高度
      params: {
        isCollapse: false,
        centerDialogVisible: false,
        width: "",
        height: ""
      }
    };
  },
  watch: {
    screenWidth: function(val) {
      //监听屏幕宽度变化
      var oIframe = document.getElementById("app");
      oIframe.style.width = Number(val) + "px"; //'120'是页面布局调整，可去除
      console.log(this.screenWidth);
    },
    screenHeight: function(val) {
      //监听屏幕高度变化
      var oIframe = document.getElementById("app");
      oIframe.style.height = Number(val) + "px"; //'120'是页面布局调整，可去除
      console.log(this.screenHeight);
    }
  },
  mounted() {
    var _this = this;
    window.onresize = function() {
      // 定义窗口大小变更通知事件
      _this.screenWidth = document.documentElement.clientWidth; //窗口宽度
      _this.screenHeight = document.documentElement.clientHeight; //窗口高度
    };
  },
  computed: {
    userInfor() {
      return this.$store.state.user;
    }
  },
  methods: {
    routerCheck(item) {
      let _self = this;
      _self.$router.push(item.path);
    },
    loggedOut() {
      let _self = this;
      _self.$store.commit("loggedOut");
    },
    CollapseType() {
      let _self = this;
      console.log(_self.params.isCollapse);
      _self.params.isCollapse = !_self.params.isCollapse;
    },
    handleSelect(key, keyPath) {
      let _self = this;
      _self.params.isCollapse = false;
      _self.$store.commit("chooseType", key);
    },
    handleList(key) {
      let _self = this;
      _self.$store.commit("handleList", key);
    },
    load() {
      let _self = this;
      console.log(this);
      _self.params.height = document.documentElement.clientHeight - 140;
      if (document.documentElement.clientWidth > 1200) {
        _self.params.width = (document.documentElement.clientWidth - 1200) / 2;
      }
    }
  },
  created() {
    this.load();
  }
};
export default app;
window.onresize = function() {
  window.location.reload();
};
</script>
<style lang="less" scoped>
.header_contain {
  min-width: 1160px;
  max-width: 1200px;
  margin: 0px auto;
  height: 60px;
}

.layout {
  background-color: #f6f7f8;
  width: 99vw;
  .el-header,
  .el-main,
  .el-footer {
    width: 100%;
    background-color: #545c64;
  }
  .main-contain {
    margin: 0px auto;
  }
  .el-header {
    width: 99vw;
    position: fixed;
    background-color: #191f28;
    top: 0;
    text-align: left;
    line-height: 60px;
    padding: 0;
    z-index: 9999;
    .logo {
      display: flex;
      color: #5bcfa0;
      float: left;
      text-align: center;
      width: 250px;
      margin-right: 100px;
      font-size: 20px;
      img {
        width: 34px;
        height: 36px;
        margin-top: 11px;
        margin-right: 6px;
      }
    }
    .el-menu {
      display: inline-block;
      // z-index: 5 !important;
    }
    .userinfo {
      padding-right: 20px;
      float: right;
      height: 60px;
      
      .lineBar {
        display: inline-block;
      }
      .userinfo-inner {
        cursor: pointer;
        color: #fff;
        img {
          width: 26px;
          height: 26px;
          margin: 19px 0px 10px 10px;
          float: right;
        }
      }
    }
  }
  .breadcrumb {
    position: fixed;
    width: 99vw;
    top: 60px;
    left: 0;
    z-index: 9998;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    margin: 0px auto;
    height: 40px;
    border-bottom: 1px solid #e6e6e6;
    .breadcrumb_left {
      padding: 9px 10px;
      display: inline-block;
      float: left;
    }
    .breadcrumb_right {
      padding: 10px;
      .el-button {
        height: 20px;
        line-height: 20px;
        padding: 0 10px;
      }
    }
    .el-breadcrumb {
      display: inline-block;
    }
    .icon-menu:before {
      padding: 0 15px;
    }
  }
  .main {
    background-color: #f6f7f8;

    position: relative;
    top: 100px;
    width: 100%;
    .el-main {
      width: 99vw;
      padding: 0;
      margin: 0 auto;
      max-width: 1200px;
      background-color: #f6f7f8;
      display: flex;
      .el-menu {
        display: inline-block;
        left: 0;
        border-right: none;
      }
      .menu {
        position: fixed;
        top: 100px;
      }
      .layout-left-menu {
        height: 100%;
      }
      .contian {
        overflow-y: auto;
        width: 1200px;
        &.minContain {
          padding-left: 200px;
        }
        .main-contain {
          padding: 0px 0px 0;
        }
      }
    }
    .el-footer {
      position: relative;
      bottom: 0;
      color: #fff;
      line-height: 40px;
      background-color: #191f28;
    }
  }
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  /*min-height: 800px;*/
  text-align: left;
}
.el-popper{
        // z-index: 6 !important;
        z-index: 9999 !important;
      }
</style>