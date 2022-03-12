export default {
  doubleMsg (state) {
    return state.msg + '*2'
  },
  getUserName (state) {
    return state.user.name
  },
  getUserToken (state) {
    return state.user.token
  },
  getOperationSelectDate (state) {
    return state.operation.selectDate
  }
}
