<template>
  <div>
    <punch-calendar :p-name="name" @numAdd="handlerNumAdd"></punch-calendar>
    <punch-operation :num="resNum"></punch-operation>
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
      name: 'oysq',
      resNum: 0
    }
  },
  methods: {
    handlerNumAdd (num) {
      console.log(num)
      this.resNum = num
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this punchCalendar only -->
<style scoped>
</style>
