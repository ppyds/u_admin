import {
  addSeckillListItem,
  delSeckillListItem,
  getCateList,
  getInfoGoodsList,
  getSeckillList,
  getSeckillListItem,
  setSeckillListItem
} from "../../utils/http";
import {okAlert} from "../../utils/alert";

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
    show: false,
    add: true,
    name: "添加"
  }
let state = {
  form,
  isFormShow,
  goodsList: [],
  cateList: [],
  tableData: []
}
let mutations = {
  setForm(state, data) {
    state.form = data;
  },
  setIsFormShow(state, data) {
    state.isFormShow = data;
  },
  setCateList(state, data) {
    state.cateList = data;
  },
  setGoodsList(state, data) {
    state.goodsList = data;
  },
  setTableData(state, data) {
    state.tableData = data;
  }
}
let getters = {
  isFormShow(state) {
    return state.isFormShow;
  },
  form(state) {
    return state.form;
  },
  goodsList(state) {
    return state.goodsList;
  },
  cateList(state) {
    return state.cateList;
  },
  tableData(state) {
    return state.tableData;
  }
}
let actions = {
  async open(context) {
    await context.dispatch("getCateList");
  },
  getCateList(context) {
    getCateList()
      .then(res => {
        if (res.code === 200) {
          context.commit("setCateList", res.list);
        }
      })
  },
  getGoodsList(context, id) {
    getInfoGoodsList(id).then(res => {
      if (res.code === 200) {
        context.commit("setGoodsList", res.list)
      }
    })
  },
  formShow(context, bool) {
    const isFormShow = context.state.isFormShow;
    isFormShow.show = true;
    isFormShow.add = bool;
    isFormShow.name = "添加";
    context.commit("setIsFormShow", isFormShow);
  },
  add(context, data) {
    addSeckillListItem(data).then(res => {
      if (res.code === 200) {
        okAlert(res.msg);
        context.commit("setIsFormShow", {
          show: false,
          add: false,
          name: "修改"
        });
        context.commit("setTableData", res.list);
        context.commit("setForm", form);
      }
    });
  },
  async getTableData(context) {
    let res = await getSeckillList();
    if (res.code === 200) {
      okAlert(res.msg);
      context.commit("setTableData", res.list);
    }
  },
  edit(context, data) {
    console.log(data)
    delete data.attrs;
    setSeckillListItem(data)
      .then(res => {
        if (res.code === 200) {
          okAlert(res.msg);
          context.commit("setIsFormShow", {
            show: false,
            add: false,
            name: "修改"
          });
        }
        context.dispatch("getTableData");
      })
  },
  del(context, id) {
    delSeckillListItem(id)
      .then(res => {
        if (res.code === 200) {
          context.dispatch("getTableData", context.state.pages);
          okAlert(res.msg);
        }
      })
  },
  close(context) {
    if (!context.state.isFormShow.add) {
      context.commit("setForm", form);
    }
  },
  async editOpen(context, id) {
    await context.dispatch("getCateList");
    context.commit("setIsFormShow", {
      show: true,
      add: false,
      name: "修改"
    });
    getSeckillListItem(id)
      .then(res => {
        if (res.code === 200) {
          res.list.id = id;
          context.dispatch("formShow", false).then();
          context.commit("setForm", res.list);
        }
      });
  },
}

export default {
  state,
  mutations,
  actions,
  getters,
  //命名空间
  namespaced: true
}
