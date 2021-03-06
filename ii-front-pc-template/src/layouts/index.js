import { IILayout } from 'ii-ui'
import { useEffect } from 'react'
import { connect } from 'dva'
import { createBreadcrumbs } from 'ii-ui/lib/breadcrumbs'
import { withRouter } from 'umi'
import routes from '../../config/routes'
import Header from './Header'

import './style/index.less'

const Logo = () => <div className="dl-logo flex-row">
  <img src="https://110.ai-indeed.com/favicon.ico" alt="logo" className="logo-img"/>
  <div className="logo-text flex-column">
    <span>实在智能</span>
    <span>实在智能中后台产品</span>
  </div>
</div>


const Breadcrumbs = createBreadcrumbs(routes[1].routes, [
  '/',
])

const menuRoutes = routes[1].routes

const Layout = ({ location, children, fetchAccount,token }) => {

  useEffect(() => {
    fetchAccount()
  }, [])

  return <IILayout
  routes={menuRoutes}
  logo={<Logo />}
  location={location}
  header={<Header />}
>
  <Breadcrumbs />
  <div className="main-content">
    { children }
  </div>
</IILayout>
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchAccount: () => dispatch({ type: 'account/fetch'})
  }
}

export default withRouter(connect(null, mapDispatchToProps)(Layout))

