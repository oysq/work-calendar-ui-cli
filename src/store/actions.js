export default {
  addMsg (ctx, msg) {
    ctx.commit('addMsgToState', msg)
  },
  setUser (ctx, user) {
    ctx.commit('setUserToState', user)
  },
  setOperationSelectDate (ctx, selectDate) {
    ctx.commit('setOperationSelectDateToState', selectDate)
  }
}
