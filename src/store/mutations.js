export let state = {
  userInfo: {}
}

export let mutations = {
  setUserInfo(state, data) {
    state.userInfo = data;
  }
}

export let getters = {
  userInfo(state, data) {
    return state.userInfo
  }
}
