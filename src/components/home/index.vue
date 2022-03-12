<template>
  <div>
    <punch-calendar :record-list="punchRecord"></punch-calendar>
    <div>
      <!-- 分割线 -->
      <van-divider :style="{'margin':'0px'}"/>
    </div>
    <punch-operation :record-list="punchRecord"></punch-operation>
    <div>
      <!-- 分割线 -->
      <van-divider :style="{'margin':'0px'}"/>
    </div>
    <punch-detail></punch-detail>
    <!-- 加载动画 -->
    <van-overlay :show="loadingStatus">
      <div class="loading-wrapper">
        <van-loading size="48"/>
      </div>
    </van-overlay>
  </div>
</template>

<script>

import {mapGetters} from 'vuex'
import PunchCalendar from './punchCalendar'
import PunchOperation from './punchOperation'
import PunchDetail from './punchDetail'

export default {
  name: 'Home',
  components: {PunchDetail, PunchOperation, PunchCalendar},
  data () {
    return {
      // 遮罩
      loadingStatus: false,
      // 打卡数据
      punchRecord: {}
    }
  },
  computed: {
    isAvailable () {
      if (!this.getUserAvailable()) {
        this.gotoLogin()
      }
      return this.getUserAvailable()
    }
  },
  created () {
    // this.isAvailable 一定要用到，才会触发监听，并跳转
    if (this.isAvailable) {
      this.queryCalendarList(new Date())
    }
  },
  methods: {
    ...mapGetters(['getUserAvailable', 'getUserName', 'getUserToken']),
    // 前往登录页
    gotoLogin () {
      console.log('前往登录页')
      this.$router.push('/')
    },
    // 获取打卡数据
    queryCalendarList (date) {
      this.showLoading()
      this.$axios.post('/calendar-ms/punchRecord/selectRecord',
        {},
        {
          headers: {
            'C-TOKEN': this.getUserToken()
          }
        }
      ).then(res => {
        this.hideLoading()
        if (res.data.status === 1) {
          // 遍历转为0-31的数组
          let _list = {}
          for (const index in res.data.body) {
            const item = res.data.body[index]
            _list[item.punchDate] = item
          }
          this.punchRecord = _list
          console.log('this.punchRecord', this.punchRecord)
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
