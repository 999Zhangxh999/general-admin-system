// 从 Redux Toolkit 导入 createSlice 函数
import { createSlice, current } from "@reduxjs/toolkit"

// 使用 createSlice 创建一个 slice，这是一个简化的 reducer 创建方式
const tabSlice = createSlice({
  name: "tab", // 给这个 slice 命名，用于调试和识别
  initialState: {
    isCollapse: false, // 定义初始状态，这里只有一个属性 isCollapse，初始值为 false
    tabList: [
      {
        path: "/",
        name: "home",
        label: "首页",
      },
    ], // 定义一个 tabList 数组，用于存储标签页的信息
    currentMenu:{

    }
  },
  reducers: {
    // 定义 slice 中的 reducer 函数，用于修改状态
    collapseMenu: (state) => {
      state.isCollapse = !state.isCollapse
    }, // 定义一个名为 collapseMenu 的 reducer
    // 这个 reducer 会切换 isCollapse 的布尔值，实现菜单的展开和收起
    selectMenuList: (state, { payload: val }) => {
      if (val.name !== "home") {
        state.isCollapse =! state.isCollapse
        // 如果传入的标签页名称不是 'home'，则将其添加到 tabList 数组中
        const ressult = state.tabList.findIndex(
          (item) => item.name === val.name,
        )
        if (ressult === -1) {
          state.tabList.push(val)
        }
      }else if (val.name === "home"&&state.tabList.length === 1) {
        state.currentMenu={} 

      }

    }, // 定义一个名为 selectMenuList 的 reducer
    closeTab:(state,{pauyload:val})=>{
  let res =   state.tabList.findIndex(item=> item.name === val.name)
   state.tabList.splice(res,1)
},
setCurrentMenu:(state,{payload:val})=>{
  if(val.name === "home"){
    state.currentMenu = {}
  }else{
    state.currentMenu = val
  }
}
  },
})

// 导出 slice 中定义的 actions
// 导出这个 slice 的 reducer，用于在 Redux store 中使用
export const { collapseMenu, selectMenuList ,closeTab,setCurrentMenu} = tabSlice.actions
export default tabSlice.reducer // 导出 reducer
