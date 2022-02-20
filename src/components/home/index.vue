<template>
  <div>
    <punch-calendar :p-name="name"></punch-calendar>
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
  data () {
    return {
      name: 'oysq'
    }
  },
  components: {
    PunchCalendar, PunchOperation, PunchDetail
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this punchCalendar only -->
<style scoped>
</style>
