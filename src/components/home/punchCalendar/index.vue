<template>
  <div>

    <div>{{name}}</div>

    <van-calendar
      title="日历"
      :poppable="false"
      :show-confirm="false"
      :style="{ height: '500px' }"
    />

  </div>
</template>

<script>
export default {
  name: 'PunchCalendar',
  props: {
    pName: String
  },
  data () {
    return {
      name: this.pName
    }
  },
  mounted () {
    this.test()
  },
  methods: {
    test () {
      this.$axios.post('/user/checkToken',
        {
          token: ''
        }
      ).then(res => {
        console.log(res)
      }).catch(function (error) {
        console.log(error)
        alert(error)
      })
    }
  }
}
</script>

<style scoped>

</style>
