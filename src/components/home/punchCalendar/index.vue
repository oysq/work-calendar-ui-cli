<template>
  <div>

    <van-calendar
      title="日历"
      :poppable="false"
      :show-confirm="false"
      :style="{ height: '500px' }"
    />

    <router-link to="/report">
      <div>{{name}}</div>
    </router-link>

    <div @click="handlerClick">数字加1</div>

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
      name: this.pName,
      num: 0
    }
  },
  mounted () {
    // this.test()
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
      })
    },
    handlerClick () {
      this.num++
      this.$emit('numAdd', this.num)
    }
  }
}
</script>

<style scoped>

</style>
