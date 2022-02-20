<template>
  <div>
    <punch-calendar></punch-calendar>
    <punch-operation></punch-operation>
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this punchCalendar only -->
<style scoped>
</style>
