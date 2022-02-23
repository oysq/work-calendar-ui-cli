let localMsg = '默认消息'
try {
  if (localStorage.msg) {
    localMsg = localStorage.msg
  }
} catch (e) {}

export default {
  msg: localMsg
}
