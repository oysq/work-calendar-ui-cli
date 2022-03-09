<template>
  <div>

    <h1>PunchCalendar</h1>

    <van-calendar
      title="日历"
      :poppable="false"
      :show-confirm="false"
      :style="{ height: '500px' }"
    />

    <router-link to="/report/1001">
      <div>{{name}}</div>
    </router-link>

    <div @click="handlerNumClick">数字加1</div>

    <div @click="handlerMsgClickDispatch">消息异步加1</div>
    <div @click="handlerMsgClickCommit">消息直接加1</div>

    <div @click="routerClick">编程式跳转</div>

  </div>
</template>

<script>

import {mapActions, mapMutations} from 'vuex'

export default {
  name: 'PunchCalendarBack',
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
    this.test()
  },
  methods: {
    test () {
      this.$axios.post('/home-ms/user/checkToken',
        {
          token: ''
        }
      ).then(res => {
        console.log(res)
      }).catch(function (error) {
        console.log(error)
      })
    },
    handlerNumClick () {
      this.num++
      this.$emit('numAdd', this.num)
    },
    ...mapActions(['addMsg']),
    ...mapMutations(['addMsgToState']),
    handlerMsgClickDispatch () {
      this.addMsg('新')
    },
    handlerMsgClickCommit () {
      this.addMsgToState('快')
    },
    routerClick () {
      // 注意，这里不是 $route
      this.$router.push('/reportBack/1002')
    }
  }
}
</script>

<style scoped>

</style>
