<template>
  <div>
    <h1>PunchOperation</h1>
    <h1>resNum : {{ resNum }}</h1>
    <h1>msg : {{this.currentMsg}}</h1>
    <h1>doubleMsg : {{this.currentDoubleMsg}}</h1>
  </div>
</template>

<script>

import {mapState, mapGetters} from 'vuex'

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
  computed: {
    ...mapState({
      currentMsg: 'msg'
    }),
    ...mapGetters({
      currentDoubleMsg: 'doubleMsg'
    })
  },
  watch: {
    num () {
      console.log(this.num)
      this.resNum = this.num
    }
  }
}
</script>

<style scoped>

</style>
