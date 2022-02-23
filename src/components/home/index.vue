<template>
  <div>
    <punch-calendar :p-name="name" @numAdd="handlerNumAdd"></punch-calendar>
    <br />
    <punch-operation :num="resNum"></punch-operation>
    <br />
    <punch-detail></punch-detail>
  </div>
</template>

<script>

import PunchCalendar from './punchCalendar'
import PunchOperation from './punchOperation'
import PunchDetail from './punchdDetail'

export default {
  name: 'Home',
  components: {
    PunchCalendar, PunchOperation, PunchDetail
  },
  data () {
    return {
      name: '标签式跳转',
      resNum: 0
    }
  },
  methods: {
    handlerNumAdd (num) {
      this.resNum = num
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this punchCalendar only -->
<style scoped>
</style>
