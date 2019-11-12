<template>
  <div>
    <el-container>
      <el-aside :width="isCollapse?'65px':'200px'">
        <el-menu
          background-color="#353B4E"
          text-color="#fff"
          active-text-color="#ffd04b"
          :collapse="isCollapse"
          :collapse-transition="false"
        >
          <el-menu-item index="1" :style="{ width:isCollapse?'65px':'200px' }">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu index="2" :style="{ width:isCollapse?'65px':'200px' }">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>内容管理</span>
            </template>
            <el-menu-item index="2-1">发布文章</el-menu-item>
            <el-menu-item index="2-2">内容列表</el-menu-item>
            <el-menu-item index="2-3">评论列表</el-menu-item>
            <el-menu-item index="2-4">素材管理</el-menu-item>
          </el-submenu>
          <el-submenu index="3" :style="{ width:isCollapse?'65px':'200px' }">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>粉丝管理</span>
            </template>
            <el-menu-item index="3-1">图文数据</el-menu-item>
            <el-menu-item index="3-2">粉丝概况</el-menu-item>
            <el-menu-item index="3-3">粉丝画像</el-menu-item>
            <el-menu-item index="3-4">粉丝列表</el-menu-item>
          </el-submenu>
          <el-menu-item index="4" :style="{ width:isCollapse?'65px':'200px' }">
            <i class="el-icon-setting"></i>
            <span slot="title">账户信息</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div class="fl">
            <i class="el-icon-s-fold" @click="isCollapse=!isCollapse"></i>
            <span>江苏传智播客教育科技股份有限公司</span>
          </div>
          <div class="fr">
            <el-input placeholder="请输入搜索内容" style="width:180px">
              <i slot="prefix" class="el-icon-search"></i>
            </el-input>
            <span style="width:60px;height:60px">消息</span>
            <el-dropdown style="width:200px">
              <span class="el-dropdown-link">
                <img :src="photo" alt height="40" width="40" />
                {{name}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>个人信息</el-dropdown-item>
                <el-dropdown-item>地址</el-dropdown-item>
                <!-- 添加native修饰符，使得该事件作用到内部 -->
                <el-dropdown-item @click.native="logout()">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isCollapse: false
    }
  },
  // 计算属性获取name和photo
  computed: {
    name () {
      // JSON.parse转格式
      return JSON.parse(window.sessionStorage.getItem('usermessage')).name
    },
    photo () {
      return JSON.parse(window.sessionStorage.getItem('usermessage')).photo
    }
  },
  methods: {
    logout () {
      this.$confirm('是否确认退出登录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        window.sessionStorage.clear()
        this.$router.push('/login')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消退出'
        })
      })
    }
  }

}
</script>

<style lang="less" scoped>
div {
  height: 100%;
  width: 100%;
}
.el-container {
  height: 100%;
  min-width: 900px;
  .el-aside {
    background-color: #323745;
  }
  .el-header {
    // background-color: antiquewhite;
    height: 60px;
    line-height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .fl {
      height: 100%;
      width: 40%;
      background-color: white;
      font-size: 18px;
      display: flex;
      align-items: center;
    }
    .fr {
      height: 100%;
      width: 50%;
      background-color: white;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .el-input {
        margin-right: 20px;
      }
      .el-dropdown-link {
        display: flex;
        align-items: center;
        // margin-left: 10px;
        img {
          margin-right: 10px;
          border-radius: 50%;
        }
      }
    }
  }
  .el-main {
    background-color: pink;
  }
}
</style>
