import {getCookie} from '../utils/CookieUtil'

// 消息通知
let localMsg = '默认消息'
try {
  if (localStorage.msg) {
    localMsg = localStorage.msg
  }
} catch (e) {}

// 用户信息
let user = {
  name: '',
  password: '',
  id: '',
  token: '',
  postSalary: 0
}
// 读取本地数据
try {
  if (localStorage.authToken) {
    user.token = localStorage.authToken
  } else {
    if (getCookie('authToken')) {
      user.token = getCookie('authToken')
    }
  }
} catch (e) {}

export default {
  msg: localMsg,
  user: user
}
