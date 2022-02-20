<template>
  <div>
    <calendar></calendar>
    <operation></operation>
    <detail></detail>
  </div>
</template>

<script>

import calendar from './calendar'
import operation from './operation'
import detail from './detail'

export default {
  name: 'Home',
  components: {
    calendar, operation, detail
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this calendar only -->
<style scoped>
</style>
