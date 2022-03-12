<template>
  <div>
    <van-steps direction="vertical" :active="2" v-show="detail.show">
      <van-step>
        <h3>【开始时间】{{detail.startTime}}</h3>
      </van-step>
      <van-step>
        <h3>【结束时间】{{detail.endTime}}</h3>
      </van-step>
      <van-step>
        <h3>【加班结算】</h3>
        <p>时长:{{detail.overtimeDuration}}小时&nbsp;&nbsp;&nbsp;倍率:{{detail.multiplyRate}}倍&nbsp;&nbsp;&nbsp;加班费:￥{{detail.overtimePay}}</p>
      </van-step>
    </van-steps>
  </div>
</template>

<script>

import {formatDate} from '@/utils/DateUtil'
import {mapGetters} from 'vuex'

export default {
  name: 'PunchDetail',
  props: [
    'recordList'
  ],
  data () {
    return {
      punchRecord: this.recordList,
      // 打卡详情
      detail: {
        show: false,
        startTime: '',
        endTime: '',
        overtimeDuration: '',
        overtimePay: ''
      }
    }
  },
  computed: {
    selectDate () {
      return this.getOperationSelectDate()
    }
  },
  watch: {
    recordList () {
      this.punchRecord = this.recordList
      // 数据有变时要重新渲染，第一次加载数据也是属于有变
      this.formatterDetail(this.getOperationSelectDate())
    },
    selectDate () {
      this.formatterDetail(this.getOperationSelectDate())
    }
  },
  methods: {
    ...mapGetters(['getOperationSelectDate']),
    // 查找结果集的数据
    findRecord (day) {
      const formatDay = formatDate(day, '/')
      if (formatDay in this.punchRecord) {
        return this.punchRecord[formatDay]
      }
      return null
    },
    // 渲染详情信息
    formatterDetail (date) {
      const record = this.findRecord(date)
      if (record) {
        this.detail.show = true
        this.detail.startTime = record.startTime.substring(5, 16).replace('/', '-')
        this.detail.endTime = record.endTime.substring(5, 16).replace('/', '-')
        this.detail.overtimeDuration = record.overtimeDuration
        this.detail.multiplyRate = record.multiplyRate
        this.detail.overtimePay = record.overtimePay
      } else {
        this.detail.show = false
      }
    }
  }
}
</script>

<style scoped>

</style>
