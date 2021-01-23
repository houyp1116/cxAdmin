<template>
  <div id="userLayout" class="user-layout-wrapper desktop">
    <div class="container">
      <div class="top">
        <div class="header">
          <a href="/">
            <img src="../assets/logo.png"
                 alt="logo" class="logo">
            <span class="title">CxAdmin管理端</span>
          </a>
        </div>
        <div class="desc">
          致力于提高使用效率 <br>
          解放生产力
        </div>
      </div>
      <div class="main">
        <a-spin :spinning="loading">
          <a-form id="formLogin" class="user-layout-login" ref="formLogin" :form="form" @submit="handleSubmit">
            <a-form-item>
              <a-input
                  size="large"
                  type="text"
                  placeholder="请输入用户名"
                  v-decorator="['username', { rules: [{ required: true, message: '请输入用户名' }] }]"
              >
                <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
              </a-input>
            </a-form-item>

            <a-form-item>
              <a-input
                  size="large"
                  type="password"
                  autocomplete="false"
                  placeholder="请输入密码"
                  v-decorator="['password', { rules: [{ required: true, message: '请输入密码' }] }]"
              >
                <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-checkbox v-decorator="['savePwd', { valuePropName: 'checked' }]">记住密码</a-checkbox>
            </a-form-item>
            <a-form-item style="margin-top:24px">
              <a-button size="large" type="primary" htmlType="submit" class="login-button">确定</a-button>
            </a-form-item>
          </a-form>
        </a-spin>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      loading: false,
      form: this.$form.createForm(this)
    }
  },
  mounted() {
    var username = localStorage.getItem('username')
    var password = localStorage.getItem('password')
    if (username && password) {
      this.form.setFieldsValue({username, password, savePwd: true})
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((errors) => {
        //校验成功
        if (!errors) {
          const values = this.form.getFieldsValue()
          this.loading = true
          this.Http.post('/admin/home/login', values).then(res => {
            this.loading = false
            if (res.code === 1) {
              //保存密码
              if (values['savePwd']) {
                localStorage.setItem('username', values['username'])
                localStorage.setItem('password', values['password'])
              } else {
                localStorage.removeItem('username')
                localStorage.removeItem('password')
              }
              // 保存Token
              this.Util.setToken(res.data.token)
              // 保存登陆信息
              sessionStorage.setItem('LOGIN_INFO', JSON.stringify(res.data))
              // 跳转路由
              this.$router.push({path: '/Home'})
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
#userLayout.user-layout-wrapper {
  height: 100%;

  .container {
    width: 100%;
    min-height: 100%;
    background: #f0f2f5 url(../assets/background.svg) no-repeat 50%;
    background-size: 100%;
    padding: 110px 0 144px;
    position: relative;

    .top {
      text-align: center;

      .header {
        height: 44px;
        line-height: 44px;

        .logo {
          height: 44px;
          vertical-align: top;
          margin-right: 16px;
          border-style: none;
        }

        .title {
          font-size: 30px;
          color: rgba(0, 0, 0, .55);
          font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
          font-weight: 600;
          position: relative;
          top: 2px;
        }
      }

      .desc {
        font-size: 14px;
        color: rgba(0, 0, 0, .45);
        margin-top: 12px;
        margin-bottom: 40px;
      }
    }

    .main {
      min-width: 260px;
      width: 368px;
      margin: 0 auto;
    }
  }
}

.user-layout-login {
  label {
    font-size: 14px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .forge-password {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }

  .user-login-other {
    text-align: left;
    margin-top: 24px;
    line-height: 22px;

    .item-icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }

    .register {
      float: right;
    }
  }
}
</style>
