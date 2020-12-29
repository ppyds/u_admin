import {
  addSpecsListItem, getCateList,
  getSpecsList,
  getSpecsListItem,
  getSpecsListLength,
  removeSpecsListItem,
  setSpecsListItem,
  addGoodsListItem, getGoodsListLength,
  getGoodsList, getGoodsListItem
} from "../../utils/http";
import {errAlert, okAlert} from "../../utils/alert";
import E from 'wangeditor'

let state = {
  form: {
    first_cateid: "",
    second_cateid: "",
    goodsname: "",
    price: "",
    market_price: "",
    img: "",
    description: "",
    specsid: "",
    specsattr: "[]",
    isnew: "",
    ishot: "",
    status: ""
  },
  isFormShow: {
    show: false,
    add: true,
    name: "添加"
  },
  pages: {
    size: 1,//每页显示的数量
    page: 1,//当前页码
    listLength: 0,//数据总长度
  },
  tableData: [],
  cateList: [],
  goodsList: []
}
let mutations = {
  setForm(state, data) {
    state.form = data;
  },
  setIsFormShow(state, data) {
    state.isFormShow = data;
  },
  setPages(state, data) {
    state.pages = data;
  },
  setTableData(state, data) {
    state.tableData = data;
  },
  setCateList(state, data) {
    state.cateList = data;
  },
  setGoodsList(state, data) {
    state.goodsList = data;
  }
}
let getters = {
  form(state) {
    return state.form;
  },
  isFormShow(state) {
    return state.isFormShow;
  },
  pages(state) {
    return state.pages;
  },
  tableData(state) {
    return state.tableData;
  },
  cateList(state) {
    return state.cateList;
  },
  goodsList(state) {
    return state.goodsList;
  }
}
let actions = {
  getCateList(context) {
    getCateList()
      .then(res => {
        if (res.code === 200) {
          context.commit("setCateList", res.list);
        }
      })
  },
  getSpecsList(context) {
    getSpecsList().then(res => {
      if (res.code === 200) {
        context.commit("setGoodsList", res.list)
      }
    })
  },
  formShow(context) {
    const isFormShow = context.state.isFormShow;
    isFormShow.show = true;
    context.commit("setIsFormShow", isFormShow);
  },
  showFalse(context) {
    const isFormShow = context.state.isFormShow;
    isFormShow.show = false;
    context.commit("setIsFormShow", isFormShow);
    context.dispatch("getList", context.state.pages)

  },
  close() {

  },
  open(context) {
    context.dispatch("getCateList");
    context.dispatch("getSpecsList");
  },
  editOpen(context, id) {
    context.dispatch("getCateList");
    context.dispatch("getSpecsList");
    context.commit("setIsFormShow", {
      show: true,
      add: false,
      name: "修改"
    });
    getGoodsListItem(id)
      .then(res => {
        if (res.code === 200) {
          console.log(res.list)
          context.dispatch("formShow", context).then();
          context.commit("setForm", res.list);
        }
      });
  },
  edit(context, data) {
    data.attrs = JSON.stringify(data.attrs);
    setSpecsListItem(data)
      .then(res => {
        if (res.code === 200) {
          okAlert(res.msg);
          context.dispatch("showFalse", context);
        }
      })
  },
  add(context, data) {
    addGoodsListItem(data).then(res => {
      if (res.code === 200) {
        okAlert(res.msgs)
      }
    });
    // data.attrs = JSON.stringify(data.attrs);
    // addSpecsListItem(data).then(res => {
    //   if (res.code === 200) {
    //     okAlert(res.msg);
    //     context.dispatch("showFalse", context).then();
    //   }
    // })
  },
  del(context, id) {
    removeSpecsListItem(id)
      .then(res => {
        if (res.code === 200) {
          context.dispatch("getList", context.state.pages)
          okAlert(res.msg);

        }
      })
  },
  async getList(context, pages) {
    // 获取总数量
    const listLength = await getGoodsListLength();

    //赋值
    if (listLength.code === 200) {
      const data = context.state.pages;
      data.listLength = listLength.list[0].total;
      context.commit('setPages', data);
    } else {
      errAlert('网络错误,请稍后再试');
    }
    // 请求列表数据
    const listData = await getGoodsList(pages);
    // 数据赋值
    if (listData.code === 200) {
      // 由于前端要的是数组 所以要转车数组
      listData.list.forEach(item => {
        try {
          item.attrs = JSON.parse(item.attrs);
        } catch (e) {
          item.attrs = []
        }
      })
      context.commit('setTableData', listData.list)
    }
  },
  pageChange(context, index) {
    const pages = context.state.pages;
    pages.page = index;
    context.commit("setPages", pages)
    context.dispatch("getList", context.state.pages)
  }
}

export default {
  state,
  mutations,
  actions,
  getters,
  //命名空间
  namespaced: true
}
