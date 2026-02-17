// store/reducers/tab.js

import { createSlice } from "@reduxjs/toolkit"

const tabSlice = createSlice({
  name: "tab",
  initialState: {
    isCollapse: false,  // 只有固定按钮能控制这个
    tabList: [
      {
        path: "/",
        name: "home",
        label: "首页",
      },
    ],
    currentMenu: {}
  },
  reducers: {
    // 只有这个 reducer 能切换侧边栏展开/收起
    collapseMenu: (state) => {
      state.isCollapse = !state.isCollapse
    },
    
    // 只处理标签页逻辑，不碰 isCollapse
    selectMenuList: (state, { payload: val }) => {
      if (val.name !== "home") {
        // 删除 state.isCollapse = !state.isCollapse
        const result = state.tabList.findIndex(
          (item) => item.name === val.name,
        )
        if (result === -1) {
          state.tabList.push(val)
        }
      } else if (val.name === "home" && state.tabList.length === 1) {
        state.currentMenu = {}
      }
    },
    
    closeTab: (state, { payload: val }) => {
      const res = state.tabList.findIndex(item => item.name === val.name)
      if (res !== -1) {
        state.tabList.splice(res, 1)
      }
    },
    
    setCurrentMenu: (state, { payload: val }) => {
      if (val.name === "home") {
        state.currentMenu = {}
      } else {
        state.currentMenu = val
      }
    }
  },
})

export const { collapseMenu, selectMenuList, closeTab, setCurrentMenu } = tabSlice.actions
export default tabSlice.reducer