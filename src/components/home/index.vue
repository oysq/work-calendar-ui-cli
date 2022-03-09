<template>
  <div>
    <punch-calendar></punch-calendar>
    <div>
      <!-- 分割线 -->
      <van-divider :style="{'margin':'0px'}"/>
    </div>
    <punch-operation></punch-operation>
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
  methods: {
    // 获取打卡数据
    queryCalendarList (date) {
      this.showLoading()
      this.$axios.post('/punchRecord/selectRecord',
        {},
        {
          headers: {
            'C-TOKEN': this.user.token
          }
        }
      ).then(res => {
        this.hideLoading()
        if (res.data.status === 1) {
          // TODO 遍历转为0-31的数组
          for (const index in res.data.body) {
            const item = res.data.body[index]
            this.punchRecord[item.punchDate] = item
          }
          console.log('=== punchRecord ===')
          console.log(this.punchRecord)
          // 开始加载渲染数据
          this.calendar.show = true
          // 首次舒心时渲染一次
          this.formatterDetail(new Date())
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

</style>
