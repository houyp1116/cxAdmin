<template>
  <a-layout id="components-layout-demo-side" style="min-height: 100vh">
    <a-layout-sider class="layout-sider" theme="light" v-model="collapsed" collapsible
                    :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, zIndex: 999 }">
      <div class="logo">
        <img src="../assets/logo.png"/>
      </div>
      <a-menu theme="light" :default-selected-keys="['1']" mode="inline">
        <a-sub-menu v-for="(item) in menuTree" :key="item.id">
          <span slot="title"><a-icon :type="item.icon"/><span>{{item.title}}</span></span>
          <a-menu-item v-for="(child) in item.children" :key="child.id" @click="goRouter(child.path)">
            {{child.title}}
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout :style="{ marginLeft: !collapsed ? '200px' : '80px' }" class="layout-content">
      <a-layout-header style="background: #fff; padding: 0 16px" class="flex align_center justify_between">
        <div>
          <a-icon type="user" style="margin-right: 10px"/>
          <span>{{login_info.username}}</span>
        </div>
        <a-dropdown>
          <a-menu slot="overlay" @click="handleMenuClick">
            <a-menu-item key="1">
              <a-icon type="edit"/>
              修改密码
            </a-menu-item>
            <a-menu-item key="2">
              <a-icon type="logout"/>
              退出登录
            </a-menu-item>
          </a-menu>
          <a-button style="margin-left: 8px"> 设置
            <a-icon type="down"/>
          </a-button>
        </a-dropdown>
      </a-layout-header>
      <a-layout-content style="margin: 16px">
        <div :style="{ padding: '20px', background: '#fff', height: '100%' }">
          <router-view></router-view>
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center; padding: 1px 0 16px;">
        Xie Ping Background Management System ©2021 Created by 30Days
      </a-layout-footer>
    </a-layout>
    <a-modal
        :width="450"
        title="修改密码"
        :visible="changePasswordVisible"
        @ok="handleOk"
        @cancel="handleCancel"
    >
      <a-input-password size="large" ref="userNameInput" type="password" v-model="oldPassword" placeholder="旧密码">
        <a-icon slot="prefix" type="form"/>
      </a-input-password>
      <a-input-password size="large" ref="userNameInput" type="password" v-model="newPassword" placeholder="新密码"
                        style="margin: 20px 0;">
        <a-icon slot="prefix" type="form"/>
      </a-input-password>
      <a-input-password size="large" ref="userNameInput" type="password" v-model="queryPassword" placeholder="确认新密码">
        <a-icon slot="prefix" type="form"/>
      </a-input-password>
    </a-modal>
  </a-layout>
</template>
<script>
  import vouterConfig from '../router/vouter.config'

  export default {
    name: "Home",
    data() {
      return {
        changePasswordVisible: false,
        collapsed: false,
        menuTree: [],
        oldPassword: "",
        newPassword: "",
        queryPassword: "",
        login_info: {}
      };
    },
    created() {
      this.getMenuTree()
      this.login_info = JSON.parse(sessionStorage.getItem("LOGIN_INFO"))
    },
    methods: {
      getMenuTree() {
        const HomeRouter = vouterConfig.filter(i => {
          return i.name === "Home"
        })[0]
        const validRouter = HomeRouter.children.filter(i => {
          return Object.keys(i).indexOf("redirect") === -1
        })
        const handleRouter = validRouter.map((item, index) => {
          return {
            id: index + 1,
            title: item.meta.title,
            icon: item.meta.icon,
            children: item.children.filter(i => {
              return Object.keys(i).indexOf("redirect") === -1
            }).map((child, childIndex) => {
              return {
                id: `${index + 1}-${childIndex + 1}`,
                title: child.meta.title,
                path: `/Home/${item.path}/${child.path}`
              }
            })
          }
        })
        this.menuTree = handleRouter
      },
      goRouter(path) {
        this.$router.push(path)
      },

      handleMenuClick(event) {
        const _this = this
        switch (event.key.toString()) {
          case '1':
            // 修改密码
            this.changePasswordVisible = true
            break;
          case '2':
            // 退出登录
            this.$confirm({
              content: '是否确认退出？',
              onOk() {
                sessionStorage.removeItem("LOGIN_INFO")
                sessionStorage.removeItem("TOKEN")
                _this.$router.replace('/')
              },
            });
            break;
        }
      },

      handleCancel() {
        this.changePasswordVisible = false
        this.oldPassword = ''
        this.newPassword = ''
        this.queryPassword = ''
      },

      handleOk() {
        if (!this.oldPassword || !this.newPassword || !this.queryPassword) {
          this.$message.error("请将内容填入完整！")
          return
        }
        if (this.newPassword !== this.queryPassword) {
          this.$message.error("两次输入的新密码不一致！")
          return
        }
        this.Http.post('', {
          oldpassword: this.oldPassword,
          password: this.newPassword,
          queryPassword: this.queryPassword,
        }).then(res => {
          if (res.code === 1) {
            this.$message.success(res.msg)
            this.handleCancel()
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    }
  };
</script>

<style>
  .ant-layout {
  }

  #components-layout-demo-side .logo img {
    width: 100%;
    padding: 20px;
  }

  .layout-sider {
    box-shadow: 2px 0 8px 0 rgba(29, 35, 41, .05);
  }

  .layout-sider::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }

  .layout-sider::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.3);
    background-image: -webkit-linear-gradient(
        45deg,
        rgba(255, 255, 255, 0.2) 25%,
        transparent 25%,
        transparent 50%,
        rgba(255, 255, 255, 0.2) 50%,
        rgba(255, 255, 255, 0.2) 75%,
        transparent 75%,
        transparent
    );
  }

  .layout-sider::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.03);
    background: #ededed;
    border-radius: 5px;
  }

  .ant-layout-sider-children {
    height: auto;
  }

  .ant-menu-inline, .ant-menu-vertical, .ant-menu-vertical-left {
    border-right: 0px;
  }

  .layout-content {
    transition: all 0.2s;
  }

</style>
