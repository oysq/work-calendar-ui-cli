<template>
  <div>
    <van-calendar
      :show-title="false"
      :poppable="false"
      :show-confirm="false"
      :min-date="calendar.minDate"
      :row-height="52"
      :style="{ height: '450px' }"
      color="linear-gradient(135deg, rgba(5, 201, 221, 1) 0%, rgba(23, 196, 160, 1) 100%)"
      :default-date="calendar.selectDate"
      type="single"
      :formatter="formatter"
      @select="selectCalendar"
      @month-show="monthShow"
    >
      <template v-slot:bottom-info="day">
        <div :style="{'color':'#04abc5'}">{{ day.bottomInfo }}</div>
      </template>
    </van-calendar>
  </div>
</template>

<script>

import {formatDate} from '@/utils/DateUtil'
import {mapActions} from 'vuex'

export default {
  name: 'PunchCalendar',
  props: [
    'recordList'
  ],
  data () {
    return {
      punchRecord: this.recordList,
      calendar: {
        show: false,
        selectDate: new Date(),
        minDate: new Date('2021/06/01')
      }
    }
  },
  watch: {
    recordList () {
      this.punchRecord = this.recordList
    }
  },
  methods: {
    ...mapActions(['setOperationSelectDate']),
    // 查找结果集的数据
    findRecord (day) {
      const formatDay = formatDate(day, '/')
      if (formatDay in this.punchRecord) {
        return this.punchRecord[formatDay]
      }
      return null
    },
    // 数据渲染规则
    formatter (day) {
      const record = this.findRecord(day.date)
      if (record) {
        if (record['endTime']) {
          day.bottomInfo = record['endTime'].split(' ')[1].substring(0, 5)
        }
      }
      return day
    },
    // 点击某个日期
    selectCalendar (clickDate) {
      this.calendar.selectDate = clickDate
      console.log('点击日期: ' + formatDate(clickDate, '-'))
      // 更新选中的时间
      this.setOperationSelectDate(clickDate)
    },
    // 某个月进入可视区域
    monthShow (obj) {
      // console.log('进入可视区域: ' + formatDate(obj.date, '-'))
    }
  }
}
</script>

<style scoped>

</style>
