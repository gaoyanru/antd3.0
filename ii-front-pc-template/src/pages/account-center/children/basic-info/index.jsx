import { connect } from 'dva'

import './style/index.less'

const BasicInfo = props => {
  const { dispatch } = props
  const { nickName, avatar, id } = props.account || {}

  return <div className="user-info-container">
  <div className="content-title-bar">
    <div className="info-title">成员管理</div>
  </div>
    <div className="avatar"><img src={avatar} alt="头像" /></div>
    <div className="name" onClick={() => dispatch({ type: 'account/fetch' })}>昵称：{ nickName }</div>
    <div className="account-id">账号：{ id }</div>
  </div>
}

const mapState = state => ({
  account: state.account
})

export default connect(mapState)(BasicInfo)

