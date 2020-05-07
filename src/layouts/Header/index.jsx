import { connect } from 'dva'
import { Tooltip, Icon } from 'ii-ui'

import './style/index.less'

const Header = ({ account , exit }) => {
  const { nickName, avatar } = account

  return <div className="header-container right">
 {
  //  <Icon icon="iconsousuo" />
  //  <Icon icon="iconxiaoxi" />
  }
  <div
  className="account-info"
  >
  <img src={ avatar } alt="头像" />
    <Tooltip
      title={() => <span className="span-btn" onClick={exit}>退出</span>}
    >
      <span>
        <span
        className="text-ellipsis"
        style={{
          maxWidth: 200,
        }}
        >
          { nickName }
        </span>
      <Icon
        icon="iconxiangxia"
        style={{
          width: 12,
          height: 12,
          marginLeft: 4,
        }}
      />
      </span>
    </Tooltip>
  </div> 
</div>
}

const mapState = state => {
  const { account = {} } = state

  return {
    account
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    exit: () => dispatch({ type: 'account/exit' })
  }
}

export default connect(mapState, mapDispatchToProps)(Header)
