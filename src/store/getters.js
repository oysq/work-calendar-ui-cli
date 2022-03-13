export default {
  getNotifyMsg (state) {
    return state.notifyMsg
  },
  getUserAvailable (state) {
    return state.user.available
  },
  getUserName (state) {
    return state.user.name
  },
  getUserToken (state) {
    return state.user.token
  },
  getUserPostSalary (state) {
    return state.user.postSalary
  },
  getOperationSelectDate (state) {
    return state.operation.selectDate
  }
}
