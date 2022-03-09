<template>
  <div>
    <h1>This is report</h1>
    <!-- 注意，这里不是 $router -->
    <h1>id -> {{this.$route.params.id}}</h1>
  </div>
</template>

<script>
export default {
  name: 'Report'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this punchCalendarBack only -->
<style scoped>
</style>
