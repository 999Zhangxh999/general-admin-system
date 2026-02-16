import React from "react"
import MenuConfig from "../../config"
import * as Icon from "@ant-design/icons"
import { Button, Layout, Menu, theme } from "antd"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { selectMenuList } from "../../store/reducers/tab"

const { Header, Sider, Content } = Layout

// 动态获取icon
const icontoElement = (name) => React.createElement(Icon[name])

// 处理菜单的数据
const items = MenuConfig.map((icon) => {
  // 没有子菜单
  const child = {
    key: icon.path,
    icon: icontoElement(icon.icon),
    label: icon.label,
  }
  // 有子菜单
  if (icon.children) {
    child.children = icon.children.map((child) => {
      return {
        key: child.path,
        icon: icontoElement(child.icon),
        label: child.label,
      }
    })
  }
  return child
})

const CommonAside = ({ collapsed }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // 添加数据到store
  const setTabList = (val) => {
    dispatch(selectMenuList(val))
  }
  // 点击菜单
  const selectMenu = (e) => {
    console.log(e, "e")
    let data
    MenuConfig.forEach((item) => {
      // 找到当前的数据
      if (item.path === e.keyPath[e.keyPath.length - 1]) {
        data = item
        // 如果是有二级菜单
        if (e.keyPath.length > 1) {
          data = item.children.find((child) => {
            return child.path == e.key
          })
        }
      }
    })
    setTabList({
      path: data.path,
      name: data.name,
      label: data.label,
    })
    navigate(e.key)
  }
  return (
    <Sider trigger={null} collapsed={collapsed}>
      <h3 className="app-name">通用后台管理系统</h3>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={items}
        style={{ height: "100%" }}
        onClick={selectMenu}
      />
    </Sider>
  )
}
export default CommonAside
