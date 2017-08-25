export const state = {
  reloadShuoshuoList: false
}

/**
 * 说说页面需要跨组件的有两个：
 * 1，刷新说说列表的状态
 * 2，获取天气信息
 *
 * Blog
 * */

export const mutations = {

  /*
  * 登录状态改变的时候刷新  -- 2
  * 发表一个新的时候刷新    -- 1
  * 修改和删除说说的时候刷新 -- 2
  *
  * */
  reload(state, flag=true) {
    state = flag
  }
}
