<template>
  <div id="login_container">
    <div id="login_box">
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules">
        <img src="./logo_index.png" height="40" />
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号码">
            <i slot="prefix" class="iconfont icon-shouji"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="loginForm.code" placeholder="请输入验证码">
            <i slot="prefix" class="iconfont icon-yanzhengma"></i>
          </el-input>
        </el-form-item>
        <el-form-item style="text-align:left" prop="xieyi">
          <el-checkbox v-model="loginForm.xieyi"></el-checkbox>
          <span>我已阅读并同意用户协议和隐私条款</span>
        </el-form-item>
        <el-form-item>
          <el-button
          type="primary"
          style="width:100%"
          @click="login"
          :loading="isActive"
          :disabled="isActive"
          >登录</el-button>
          <!-- 给按钮设置禁用和等待效果 -->
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// 引入gt文件，增加全局变量initGeeTest
import '@/assets/js/gt.js'
// 引入字体图标文件
import '@/assets/iconfont/iconfont.css'
export default {
  data () {
    var xieyiTest = function (rule, value, callback) {
      if (value) {
        callback()
      } else {
        return callback(new Error('请查阅并勾选'))
      }
    }
    return {
      isActive: false,
      ctaObj: null, // 极验窗口对象
      loginForm: {
        mobile: '15732805175',
        code: '246810',
        xieyi: ''
      },
      loginFormRules: {
        mobile: [
          { required: true, message: '请输入手机号码' },
          { pattern: /^1[35678]\d{9}$/, message: '手机号码格式不对' }
        ],
        code: [{ required: true, message: '请填写验证码' }],
        xieyi: [
          // 自定义验证
          { validator: xieyiTest }
        ]
      }
      // 协议验证在data中定义function
    }
  },
  methods: {
    login () {
      console.log(this)
      this.$refs.loginFormRef.validate(valid => {
        if (valid) {
          // 账号登录验证
          // 判断存在就直接使用
          if (this.ctaObj !== null) {
            return this.ctaObj.verify()// 显示窗口
          }
          // 点击按钮后禁用
          this.isActive = true
          let pro = this.$http.get(`/captchas/${this.loginForm.mobile}`)
          pro
            .then(result => {
            // 服务器返回秘钥信息
            // 处理成功的秘钥信息
              let { data } = result.data
              console.log(result)
              window.initGeetest({
                // 省略必须的配置参数
                // 以下配置参数来自服务端 SDK
                gt: data.gt,
                challenge: data.challenge,
                offline: !data.success,
                new_captcha: true,
                product: 'bind'
              }, captchaObj => {
                captchaObj.onReady(() => {
                  // 验证码ready之后才能调用verify方法显示验证码
                  captchaObj.verify() // 显示验证码窗口
                  //  把窗口对象赋予ctaObj对象
                  this.ctaObj = captchaObj
                  this.isActive = false
                }).onSuccess(() => {
                  // your code
                  // 校验真实性

                  this.loginyanzh()
                }).onError(() => {
                  // your code
                })
              })
            })
            .catch(err => {
              return this.$message.error('信息错误' + err)
            })
        }
      })
    },

    loginyanzh () {
      var pro = this.$http.post('/authorizations', this.loginForm)
      pro
        .then(result => {
          if (result.data.message === 'OK') {
            // 保存登录信息
            window.sessionStorage.setItem('usermessage', JSON.stringify(result.data.data))
            this.$router.push({ name: 'home' })
          }
        })
        .catch(err => {
          return this.$message.error('用户名或密码错误')
        })
    }
  }
}
</script>

<style lang="less" scoped>
#login_container {
  height: 100%;
  // background-color: aquamarine;
  background: url(./recommend3.png);
  background-size: content;
  display: flex;
  justify-content: center;
  align-items: center;
  #login_box {
    text-align: center;
    width: 400px;
    height: 350px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    .el-form {
      width: 75%;
    }
    .el-checkbox {
      margin-right: 10px;
    }
    img {
      margin-bottom: 10px;
    }
  }
}
</style>
