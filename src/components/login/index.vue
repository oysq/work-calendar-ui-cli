<template>
  <div>
    <!-- 加载动画 -->
    <van-overlay :show="loadingStatus">
      <div class="loading-wrapper">
        <van-loading size="48" color="#1989fa"/>
      </div>
    </van-overlay>
    <!-- 登录弹出层 -->
    <van-popup v-model="showAuthPopup" round position="bottom" :style="{'height':'30%'}" :close-on-click-overlay="false">
      <van-cell-group inset :border="false">
        <van-cell>
          <van-field v-model="user.name" label="用户名" placeholder="请输入用户名"/>
        </van-cell>
        <van-cell>
          <van-field v-model="user.password" label="密码" placeholder="请输入密码" type="password"/>
        </van-cell>
        <van-cell>
          <van-row :style="{'text-align': 'center'}">
            <van-col span="4"></van-col>
            <van-col span="16">
              <van-button
                @click="getToken"
                color="linear-gradient(135deg, rgba(5, 201, 221, 1) 0%, rgba(23, 196, 160, 1) 100%)"
                size="small"
                block
                round
              >
                登&nbsp;&nbsp;&nbsp;&nbsp;陆
              </van-button>
            </van-col>
            <van-col span="4"></van-col>
          </van-row>
        </van-cell>
      </van-cell-group>
    </van-popup>
  </div>
</template>

<script>

import {getCookie, setCookie} from '../../utils/CookieUtil'

export default {
  name: 'Login',
  data () {
    return {
      // 遮罩
      loadingStatus: false,
      // 登录弹窗
      showAuthPopup: false,
      // 用户信息
      user: {
        name: '',
        password: '',
        id: '',
        token: '',
        postSalary: 0
      }
    }
  },
  created () {
    this.checkToken()
  },
  methods: {
    /**
     * 用户认证相关
     */
    checkToken () {
      this.showLoading()
      this.user.token = window.localStorage.getItem('authToken')
      if (!this.user.token) {
        this.user.token = getCookie('authToken')
        if (!this.user.token) {
          this.hideLoading()
          this.$toast.fail('需要登录一下哦')
          this.showAuthPopup = true
          return
        }
      }
      this.$axios.post('/calendar-ms/user/checkToken',
        {
          token: this.user.token
        }
      ).then(res => {
        this.hideLoading()
        if (res.data.status === 1) {
          this.user.id = res.data.body.userId
          this.user.postSalary = res.data.body.postSalary
          this.$notify({type: 'success', message: '身份验证通过，欢迎 ' + res.data.body.userName})
          // TODO 进入home
          console.log('进入home')
        } else {
          this.$toast.fail('有点久了哦，重新登录一下昂')
          this.showAuthPopup = true
        }
      }).catch(function (error) {
        console.log(error)
        alert(error)
      })
    },
    // 获取token
    getToken () {
      this.showLoading()
      this.$axios.post('/calendar-ms/user/checkUserExists',
        {
          userName: this.user.name
        }
      ).then(res => {
        if (res.data.status === 1) {
          // 用户已存在
          if (res.data.body.type === 'exists') {
            // 刷新token
            this.refreshToken()
          } else if (res.data.body.type === 'no_exists') {
            // 用户不存在
            this.$dialog.confirm({
              title: '不存在提醒',
              message: '该账号为首次出现，是否作为新账号创建？',
              cancelButtonText: '重新输入'
            }).then(() => {
              // on confirm
              // 创建用户
              this.$axios.post('/calendar-ms/user/insertUser',
                {
                  userName: this.user.name,
                  password: this.user.password
                }
              ).then(res => {
                if (res.data.status === 1) {
                  // 刷新token
                  this.refreshToken()
                } else {
                  this.$toast.fail(res.data.msg)
                }
              }).catch(function (error) {
                console.log(error)
                alert(error)
              })
            }).catch(() => {
              // on cancel：do nothing
            })
          } else {
            this.$toast.fail('用户查询异常')
          }
        } else {
          this.$toast.fail(res.data.msg)
        }
      }).catch(function (error) {
        console.log(error)
        alert(error)
      })
    },
    // 刷新token
    refreshToken () {
      this.$axios.post('/calendar-ms/user/refreshToken',
        {
          userName: this.user.name,
          password: this.user.password
        }
      ).then(res => {
        if (res.data.status === 1) {
          this.user.id = res.data.body.userId
          this.user.token = res.data.body.token
          this.user.postSalary = res.data.body.postSalary

          // 存储
          window.localStorage.setItem('authToken', res.data.body.token)
          setCookie('authToken', res.data.body.token, 7)

          this.showAuthPopup = false
          this.$notify({type: 'success', message: '身份验证通过，欢迎 ' + res.data.body.userName})
          // 加载数据
          console.log('进入home页面')
        } else {
          this.$toast.fail(res.data.msg)
        }
      }).catch(function (error) {
        console.log(error)
        alert(error)
      })
    },
    /**
     * 弹窗
     */
    showLoading () {
      this.loadingStatus = true
    },
    hideLoading () {
      this.loadingStatus = false
    }
  }
}
</script>

<style scoped>
.loading-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
