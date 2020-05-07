import { Button } from 'ii-ui'
import qs from 'qs'
import { useEffect } from 'react'
import { connect } from 'dva'
import Cookies from 'js-cookie'

import './style.less'


const title = '实在智能中后台登录页'
const userLoginCenterWithCallBack = `${__USER_CENTER__}?oauth_callback=${window.location.origin}/login`


const Login = ({ dispatch }) => {
  
  // 在login页面从url中拿到token保存到cookie中传给应用
  useEffect(() => {
    const { oauth_token = ''} = qs.parse(window.location.href.replace(/^.+?\?/, ''))
    if (oauth_token !== '' ) {
      Cookies.set('oauth_token', oauth_token)
      // 重新加载页面，通过cookie将token传递给request
      window.location.href = `${window.location.origin}`
    }
  })

  const gotoLogin = () => window.location.href = userLoginCenterWithCallBack

  return <div className="login-container full">
  <div className="login-container-inner">
    <div className="login-title">{ title }</div>
    <Button
      className="login-btn"
      type="primary"
      onClick={gotoLogin}
    >登录</Button>
  </div>
  </div>
}

export default connect()(Login)
