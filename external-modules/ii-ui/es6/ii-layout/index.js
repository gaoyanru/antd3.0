import { Layout, Menu } from 'antd'
import Icon from '../icon'
import PropTypes from 'prop-types'
import { router } from 'umi'
import React, { useState, useCallback, useEffect, useMemo } from 'react'

const { Header, Content, Sider } = Layout
const { Item, SubMenu } = Menu

// 菜单标题
const NameSpan = ({ name = '', icon = '' }) => <span className="menu-item-title-wrapper">
  <Icon
    icon={icon}
    style={{
      width: 16,
      height: 16
    }}
  />
  <span >{name}</span>
</span>

/**
 * 
 * @param {Array} routes 
 * @param {boolean} collapsed 
 * @param {number} deep  // 菜单层级
 */
const mapMenuItemFromRoute = (routes = []) => routes.reduce((menuItemList, item) => {
  const { name = '', path = '/', routes: itemRoutes = [], icon = '', isMenuItem = false } = item
  if (name && isMenuItem) {
    menuItemList.push(
      // 存在子路由数组并且子路由元素至少包含一个带名字的路由就显示子路由对应的子菜单
      // 此处默认不显示不带名字的路由
    (itemRoutes.length > 0 && itemRoutes.some(item => item.isMenuItem && !!name))
    ? <SubMenu key={path} title={<NameSpan name={name} icon={icon} />}>
      { mapMenuItemFromRoute(itemRoutes) }
    </SubMenu>
    : <Item key={path}><NameSpan name={name} icon={icon} /></Item>)
  }

  return menuItemList

}, [])

const defaultToggleButtonRender = collapsed => <Icon
icon={collapsed ? 'iconzhankaicaidan' : 'iconshouqicaidan'}
size={32}
/>

const IILayout = props => {
  const { routes = [], siderWidth= 256, header = 'logo', logo = 'logo', location = '', theme = 'dark', onCollapse = noop,
    renderToggleButton = defaultToggleButtonRender
  } = props
  const [ collapsed, setCollapsed ] = useState(false)
  const onItemClick = useCallback(data =>  {
     router.push(data.key)
  }, [])

  const currentkeys = useMemo(() => location.pathname.split('/').slice(1).reduce((res, item, index) => {
    const current = index === 0 ? `/${item}` : `${res[index - 1]}/${item}`
    res[index] = current
    return res
  }, []), [ location ])

  const onCollapseClick = useCallback(() => {
    setCollapsed(!collapsed)
    onCollapse(!collapsed)
    setTimeout(() => {
      // 触发rezise，比如一些tooltips依赖resize重新定位
      window.dispatchEvent(new Event('resize'))
    }, 200) // 延迟发送，等待dom修改完毕
  }, [ collapsed ])

  const toggleButton = React.cloneElement(renderToggleButton(collapsed), {
    onClick: onCollapseClick,
    className: "collapse-btn"
  })
  
  return <Layout className={`${collapsed ? 'collapsed' : ''} ii-basic-layout ii-layout-theme-${theme}`}>
    <Sider
      collapsible
      collapsed={collapsed}
      width={siderWidth}
      collapsedWidth="64"
      theme={theme}
    >
      <div className="logo-section">{ logo }</div>
      <Menu
        defaultSelectedKeys={currentkeys}
        defaultOpenKeys={currentkeys}
        mode="inline"
        theme={theme}
        onClick={onItemClick}
      >
        {mapMenuItemFromRoute(routes)}
      </Menu>
      {toggleButton}
    </Sider>
    <Layout>
      <Header>{ header }</Header>
      <Content>
        { props.children }
      </Content>
    </Layout>
  </Layout>
}

IILayout.propTypes = {
  routes: PropTypes.array.isRequired,
  header: PropTypes.node.isRequired,
  logo: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
  theme: PropTypes.oneOf(['dark', 'light'])
}

export default IILayout
