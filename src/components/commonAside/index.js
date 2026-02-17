// src\components\commonAside\index.js

import React from "react"
import MenuConfig from "../../config"
import * as Icon from "@ant-design/icons"
import { Button, Layout, Menu } from "antd"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { collapseMenu, selectMenuList } from "../../store/reducers/tab"

const { Sider } = Layout

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

const CommonAside = () => {
 const navigate = useNavigate()
 const dispatch = useDispatch()
 
 // 从Redux获取侧边栏折叠状态
 const isCollapse = useSelector((state) => state.tab.isCollapse)

 // 切换侧边栏折叠（只能通过固定按钮触发）
 const toggleSider = () => {
   dispatch(collapseMenu())
 }

 // 添加数据到store
 const setTabList = (val) => {
   dispatch(selectMenuList(val))
 }

 // 点击菜单
 const selectMenu = (e) => {
   let data
   
   MenuConfig.forEach((item) => {
     // 找到当前的数据
     if (item.path === e.keyPath[e.keyPath.length - 1]) {
       data = item
       // 如果是有二级菜单
       if (e.keyPath.length > 1) {
         data = item.children.find((child) => {
           return child.path === e.key
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
   <Sider trigger={null} collapsed={isCollapse}>
     {/* 标题和固定收起按钮 */}
     <div 
       className="app-name" 
       style={{ 
         display: 'flex', 
         justifyContent: 'space-between', 
         alignItems: 'center', 
         padding: '0 16px',
         height: '64px',
         color: '#fff',
         fontSize: isCollapse ? '14px' : '18px',
         fontWeight: 'bold',
         whiteSpace: 'nowrap',
         overflow: 'hidden'
       }}
     >
       {!isCollapse && <span>通用后台管理系统</span>}
       <Button 
         type="text"
         onClick={toggleSider}
         icon={isCollapse ? <Icon.MenuUnfoldOutlined /> : <Icon.MenuFoldOutlined />}
         style={{ color: '#fff' }}
       />
     </div>
     
     <Menu
       theme="dark"
       mode="inline"
       items={items}
       onClick={selectMenu}
       style={{ height: "calc(100% - 64px)" }}
     />
   </Sider>
 )
}

export default CommonAside