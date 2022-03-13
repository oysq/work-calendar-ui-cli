import {getCookie} from '../utils/CookieUtil'

/* ----- 消息通知 ----- */
let notifyMsg = ''

/* ----- 用户信息 ----- */

// 用户信息
let user = {
  available: false,
  name: '',
  password: '',
  id: '',
  token: '',
  postSalary: 0
}
// 用户信息 - 读取本地数据
try {
  if (localStorage.authToken) {
    user.token = localStorage.authToken
  } else {
    if (getCookie('authToken')) {
      user.token = getCookie('authToken')
    }
  }
} catch (e) {}

/* ----- 选中的日期 ----- */
let operation = {
  selectDate: new Date()
}

export default {
  notifyMsg: notifyMsg,
  user: user,
  operation: operation
}
