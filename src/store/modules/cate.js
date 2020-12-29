// import {getCateList} from "../../utils/http";
//
// let state = {
//   list: [],
//   isFormShow: {
//     show: true,
//     name: "添加",
//     add: true
//   }
// }
// let mutations = {
//   list(state, data) {
//     state.list = data
//   }
// }
// let getters = {
//   list(state) {
//     return state.list;
//   }
// }
// let actions = {
//   getList(context) {
//     getCateList().then(res => {
//       if (res.code === 200) {
//         context.state.list = res.list;
//       }
//     });
//   },
//   setList(){
//
//   }
// }
//
// export default {
//   state,
//   mutations,
//   actions,
//   getters,
//   //命名空间
//   namespaced: true
// }
