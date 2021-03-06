import {setCookie} from '../utils/CookieUtil'

export default {
  addMsgToState (state, msg) {
    state.notifyMsg = msg
  },
  setUserToState (state, user) {
    state.user = user
    // 写入本地数据
    try {
      localStorage.authToken = user.token
      setCookie('authToken', user.token, 7)
    } catch (e) {}
  },
  setOperationSelectDateToState (state, selectDate) {
    state.operation.selectDate = selectDate
  }
}
