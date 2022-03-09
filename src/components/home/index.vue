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
import PunchDetail from './punchDetail'

export default {
  name: 'Home',
  components: {PunchDetail, PunchOperation, PunchCalendar}
}
</script>

<style scoped>

</style>
