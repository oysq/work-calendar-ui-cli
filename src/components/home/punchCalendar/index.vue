<template>
  <div v-if="calendar.show">
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

export default {
  name: 'PunchCalendar',
  data () {
    return {
      calendar: {
        show: false,
        selectDate: new Date(),
        minDate: new Date('2021/06/01')
      }
    }
  },
  methods: {

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
    }
  }
}
</script>

<style scoped>

</style>
