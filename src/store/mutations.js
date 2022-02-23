export default {
  addMsgToState (state, msg) {
    state.msg = state.msg + ' ' + msg
    try {
      localStorage.msg = state.msg
    } catch (e) {}
  }
}
