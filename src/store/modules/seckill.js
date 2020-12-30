const form = {
    title: "",
    begintime: "",
    endtime: "",
    first_cateid: "",
    second_cateid: "",
    goodsid: "",
    status: 1
  },
  isFormShow = {
    show: true,
    add: true,
    name: "添加"
  }
let state = {
  form,
  isFormShow
}
let mutations = {
  setForm(state, data) {
    state.form = data;
  },
  setIsFormShow(state, data) {
    state.isFormShow = data;
  }
}
let getters = {
  isFormShow(state) {
    return state.isFormShow;
  },
  form(state) {
    return state.form;
  }
}
let actions = {}

export default {
  state,
  mutations,
  actions,
  getters,
  //命名空间
  namespaced: true
}
