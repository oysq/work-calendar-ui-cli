<template>
  <div :style="{'background-color': '#FFF'}">
    <van-grid :border="false" :column-num="3" :gutter="10" :clickable="true" :square="true" :center="true">
      <!-- 工具 -->
      <van-grid-item @click="toolBoxClick">
        <van-image :src="require('img/morning.png')"/>
      </van-grid-item>
      <!-- 打卡 -->
      <van-grid-item @click="punchClick">
        <van-image :src="require('img/check.png')"/>
      </van-grid-item>
      <!-- 报表 -->
      <van-grid-item @click="clickReport">
        <van-image :src="require('img/history.png')"/>
      </van-grid-item>
    </van-grid>

    <!-- 打卡弹出层 -->
    <van-popup v-model="punchPopup.show" round position="bottom" :style="{'height':'50%'}">
      <van-datetime-picker
        v-model="punchPopup.timeSelect"
        type="time"
        :title="punchPopup.title"
        @confirm="punchConfirm"
        @cancel="punchCancel"
      />
    </van-popup>

    <!-- 调整开始时间弹出层 -->
    <van-popup v-model="startConf.show" round position="bottom" :style="{'height':'50%'}">
      <van-datetime-picker
        v-model="startConf.timeSelect"
        type="time"
        :title="startConf.title"
        @confirm="startConfConfirm"
        @cancel="startConf.show = false"
      />
    </van-popup>

    <!-- 倍率调整弹出层 -->
    <van-popup v-model="rateAction.show" round position="bottom" :style="{'height':'30%'}">
      <van-picker
        show-toolbar
        :columns="rateAction.columns"
        value-key="name"
        :default-index="rateAction.defaultIndex"
        @cancel="rateAction.show = false"
        @confirm="rateActionConfirm"
      />
    </van-popup>

    <!-- 岗位工资弹出层 -->
    <van-dialog v-model="salaryConf.show" title="岗位薪资" show-cancel-button @confirm="salaryConfirm">
      <van-field
        v-model="salaryConf.postSalary"
        type="number"
        label="金额"
        placeholder="请输入薪资金额"
        size="large"
        label-align="center"
        label-width="5em"
        input-align="right"
        clearable
        clickable />
    </van-dialog>

    <!-- 工具盒子面板 -->
    <van-action-sheet
      v-model="toolBox.show"
      description="设置"
      cancel-text="取消"
      :actions="toolBox.actions"
      @select="toolBoxSelect" />
  </div>
</template>

<script>

import {formatDate} from '@/utils/DateUtil'
import {mapGetters} from 'vuex'
// import morningImg from 'img/morning.png'

export default {
  name: 'PunchOperation',
  props: [
    'recordList'
  ],
  data () {
    return {
      // morningImg: morningImg,
      punchRecord: this.recordList,
      // 打卡弹窗
      punchPopup: {
        show: false,
        title: '',
        timeSelect: '',
        timeConfirm: ''
      },
      // 工具盒子
      toolBox: {
        show: false,
        actions: [
          {
            name: '开始时间',
            code: 'start'
          },
          {
            name: '取消打卡',
            code: 'delete'
          },
          {
            name: '节假倍率',
            code: 'rate'
          },
          {
            name: '岗位工资',
            code: 'salary'
          }
        ]
      },
      // 调整开始时间弹窗
      startConf: {
        show: false,
        title: '',
        timeSelect: '',
        timeConfirm: ''
      },
      // 倍率调整
      rateAction: {
        show: false,
        defaultIndex: 0,
        columns: [
          {
            name: '1.5倍',
            value: 1.5
          },
          {
            name: '2倍',
            value: 2.0
          },
          {
            name: '3倍',
            value: 3.0
          }
        ]
      },
      // 岗位工资
      salaryConf: {
        show: false,
        postSalary: 0
      }
    }
  },
  watch: {
    recordList () {
      this.punchRecord = this.recordList
    }
  },
  methods: {
    ...mapGetters(['getUserToken', 'getOperationSelectDate', 'getUserPostSalary']),
    // 前往登录页
    gotoLogin () {
      console.log('前往登录页')
      this.$router.push('/')
    },
    /** 打卡 **/
    // 查找结果集的数据
    findRecord (day) {
      const formatDay = formatDate(day, '/')
      if (formatDay in this.punchRecord) {
        return this.punchRecord[formatDay]
      }
      return null
    },
    punchClick () {
      this.punchPopup.title = formatDate(this.getOperationSelectDate(), '-')
      // 调整当前时间选择器的时间
      const record = this.findRecord(this.getOperationSelectDate())
      if (record) {
        if (record['endTime']) {
          this.punchPopup.timeSelect = record['endTime'].split(' ')[1].substring(0, 5)
        }
      } else {
        let now = new Date()
        this.punchPopup.timeSelect = now.getHours() + ':' + now.getMinutes()
      }
      this.punchPopup.show = true
    },
    punchCancel () {
      this.punchPopup.show = false
    },
    punchConfirm () {
      this.punchPopup.timeConfirm = this.punchPopup.timeSelect
      console.log('timeConfirm: ' + this.punchPopup.timeConfirm)

      // 早上 08:30 之前的算前一天
      let punchDate = new Date(this.getOperationSelectDate())
      if (this.punchPopup.timeConfirm.split(':')[0] <= '08' && this.punchPopup.timeConfirm.split(':')[1] < '30') {
        punchDate.setDate(punchDate.getDate() - 1)
      }

      this.punchPopup.show = false

      this.$emit('showLoading')
      this.$axios.post('/calendar-ms/punchRecord/updateEndTime',
        {
          punchDate: formatDate(punchDate, '/'),
          endTime: formatDate(this.getOperationSelectDate(), '/') + ' ' + this.punchPopup.timeConfirm + ':00'
        },
        {
          headers: {
            'C-TOKEN': this.getUserToken()
          }
        }
      ).then(res => {
        this.$emit('hideLoading')
        if (res.data.status === 1) {
          this.$notify({type: 'success', message: '打卡成功'})
          setTimeout(this.gotoLogin(), 1000)
        } else {
          this.$toast.fail(res.data.msg)
        }
      }).catch(function (error) {
        console.log(error)
        alert(error)
      })
    },
    /**
     * 工具盒子
     */
    toolBoxClick () {
      this.toolBox.show = true
    },
    toolBoxSelect (item) {
      this.toolBox.show = false

      // 开始时间
      if (item.code === 'start') {
        this.startConfClick()
      }

      // 取消打卡
      if (item.code === 'delete') {
        this.deletePunch()
      }

      // 倍率
      if (item.code === 'rate') {
        this.rateActionShow()
      }

      // 岗位薪资
      if (item.code === 'salary') {
        this.salaryShow()
      }
    },
    /**
     * 调整开始时间
     */
    startConfClick () {
      this.startConf.title = formatDate(this.getOperationSelectDate(), '-')
      // 调整当前时间选择器的时间
      const record = this.findRecord(this.getOperationSelectDate())
      if (record) {
        if (record['startTime']) {
          this.startConf.timeSelect = record['startTime'].split(' ')[1].substring(0, 5)
        }
      } else {
        this.startConf.timeSelect = '18:00'
      }
      this.startConf.show = true
    },
    startConfConfirm () {
      this.startConf.timeConfirm = this.startConf.timeSelect
      console.log('timeConfirm: ' + this.startConf.timeConfirm)

      // 早上 08:30 之前的算前一天
      let punchDate = new Date(this.getOperationSelectDate())
      if (this.startConf.timeConfirm.split(':')[0] <= '08' && this.startConf.timeConfirm.split(':')[1] < '30') {
        this.startConf.setDate(punchDate.getDate() - 1)
      }
      console.log(punchDate)

      this.startConf.show = false

      this.$emit('showLoading')
      this.$axios.post('/calendar-ms/punchRecord/updateStartTime',
        {
          punchDate: formatDate(punchDate, '/'),
          startTime: formatDate(this.getOperationSelectDate(), '/') + ' ' + this.startConf.timeConfirm + ':00'
        },
        {
          headers: {
            'C-TOKEN': this.getUserToken()
          }
        }
      ).then(res => {
        this.$emit('hideLoading')
        if (res.data.status === 1) {
          this.$notify({type: 'success', message: '调整成功'})
          setTimeout(this.gotoLogin(), 1000)
        } else {
          this.$toast.fail(res.data.msg)
        }
      }).catch(function (error) {
        console.log(error)
        alert(error)
      })
    },
    /**
     * 取消打卡
     */
    deletePunch () {
      // 是否有记录
      const record = this.findRecord(this.getOperationSelectDate())
      if (!record) {
        this.$toast.fail('当天没有打卡记录哦~~')
        return
      }

      // 提醒弹窗
      this.$dialog.confirm({
        title: '再次确认',
        message: '即将取消【' + formatDate(this.getOperationSelectDate(), '-') + '】的打卡，要确认一下日期哦~~',
        confirmButtonText: '确认',
        cancelButtonText: '取消操作'
      })
        .then(() => {
          // on confirm
          this.$axios.post('/calendar-ms/punchRecord/delete',
            {
              punchDate: formatDate(this.getOperationSelectDate(), '/')
            },
            {
              headers: {
                'C-TOKEN': this.getUserToken()
              }
            }
          ).then(res => {
            this.$emit('hideLoading')
            if (res.data.status === 1) {
              this.$notify({type: 'success', message: '调整成功'})
              setTimeout(this.gotoLogin(), 1000)
            } else {
              this.$toast.fail(res.data.msg)
            }
          }).catch(function (error) {
            console.log(error)
            alert(error)
          })
        })
        .catch(() => {
          // on cancel：do nothing
        })
    },
    /**
     * 倍率调整
     */
    // 设置默认值并弹出
    rateActionShow () {
      // 设置默认值
      const record = this.findRecord(this.getOperationSelectDate())
      if (record) {
        if (record['multiplyRate']) {
          if (record['multiplyRate'] === 1.5) {
            this.rateAction.defaultIndex = 0
          } else if (record['multiplyRate'] === 2.0) {
            this.rateAction.defaultIndex = 1
          } else if (record['multiplyRate'] === 3.0) {
            this.rateAction.defaultIndex = 2
          } else {
            this.rateAction.defaultIndex = 0
          }
        }
      }
      this.rateAction.show = true
    },
    // 倍率确认
    rateActionConfirm (item) {
      this.rateAction.show = false

      this.$emit('showLoading')
      this.$axios.post('/calendar-ms/punchRecord/updateMultiplyRate',
        {
          punchDate: formatDate(this.getOperationSelectDate(), '/'),
          multiplyRate: item.value
        },
        {
          headers: {
            'C-TOKEN': this.getUserToken()
          }
        }
      ).then(res => {
        this.$emit('hideLoading')
        if (res.data.status === 1) {
          this.$notify({type: 'success', message: '调整成功'})
          setTimeout(this.gotoLogin(), 1000)
        } else {
          this.$toast.fail(res.data.msg)
        }
      }).catch(function (error) {
        console.log(error)
        alert(error)
      })
    },
    /**
     * 岗位工资调整
     */
    salaryShow () {
      if (this.getUserPostSalary()) {
        this.salaryConf.postSalary = this.getUserPostSalary()
      }
      this.salaryConf.show = true
    },
    salaryConfirm () {
      this.salaryConf.show = false

      this.$emit('showLoading')
      this.$axios.post('/calendar-ms/user/updatePostSalary',
        {
          postSalary: this.salaryConf.postSalary
        },
        {
          headers: {
            'C-TOKEN': this.getUserToken()
          }
        }
      ).then(res => {
        this.$emit('hideLoading')
        if (res.data.status === 1) {
          this.$notify({type: 'success', message: '设置成功'})
          setTimeout(this.gotoLogin(), 1000)
        } else {
          this.$toast.fail(res.data.msg)
        }
      }).catch(function (error) {
        console.log(error)
        alert(error)
      })
    },
    /**
     * 报表
     */
    clickReport () {
      this.$toast.fail('报表功能开发中哦~~~')
    }
  }
}
</script>

<style scoped>

</style>
