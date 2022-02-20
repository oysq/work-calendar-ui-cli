<template>
  <div>
    <h1>PunchOperation</h1>
    <h1>{{ resNum }}</h1>
  </div>
</template>

<script>
export default {
  name: 'PunchOperation',
  props: {
    num: Number
  },
  data () {
    return {
      resNum: 0
    }
  },
  watch: {
    numShow () {
      console.log(this.num)
      this.resNum = this.num
    }
  }
}
</script>

<style scoped>

</style>
