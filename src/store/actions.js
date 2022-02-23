export default {
  addMsg (ctx, msg) {
    ctx.commit('addMsgToState', msg)
  }
}
