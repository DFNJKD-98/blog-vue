const state = {
  needReloadMomentsList: false,
  showDeleteOneMomentResult: null,
  needReloadSummary: false
}

const mutationtypes = {

}

const mutations = {
  reloadMoment(state) {
    console.log('reload moments method clicked')
    state.needReloadMomentsList = true
  },
  resetMomentListStatus(state) {
    state.needReloadMomentsList = false
  }
}

/*
* 1, 想要达到的效果是，在某个地方调用了reload函数，之后修改了store的值为true，然后list刷新，刷新完毕之后再调用一个一个mutation，让store的值变为false*/

const actions = {



}

export default  {
  namespaced: true,
  state,
  mutations,
  actions
}
