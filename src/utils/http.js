import axios from "axios";
import qs from "qs";
import {errAlert} from "./alert";
import Vue from "vue";

import {confirm} from "./alert"
import store from "../store"

Vue.prototype.URL = 'http://localhost:3000'
const base = "/api";


axios.interceptors.response.use(res => {
  //18.统一处理失败
  if (res.data.code !== 200) {
    errAlert(res.data.msg)
  }
  return res.data
})

axios.interceptors.request.use(async config => {
  if (config.url !== base + "/api/userlogin") {
    config.headers.authorization = store.state.userInfo.token
  }
  //统一删除确认
  if (config.url.includes("del")) {
    const res = await confirm("此操作将永久删除该条数据, 是否删除");
    if (res[1]) {//此处return 一个 Promise实例 是为了防止 axios 报错
      return new Promise(() => 5);
    }
  }
  return config;
})

export const getMenuList = () => axios({
  url: base + "/api/menulist",
  method: "get",
  params: {
    istree: true
  }
});

export const delMenuListItem = id => axios({
  url: base + '/api/menudelete',
  method: "post",
  data: {
    id
  }
});

export const addMenuListItem = data => axios({
  url: base + '/api/menuadd',
  method: "post",
  data
});

export const editMenuListItem = data => axios({
  url: base + '/api/menuedit',
  method: "post",
  data
});

export const addRoleListItem = data => axios({
  url: base + "/api/roleadd",
  method: "post",
  data
});


//会员-----------------------------------------------------------------------------------
export const getRoleList = () => axios({
  url: base + "/api/rolelist",
  method: "get"
});

export const delRoleListItem = id => axios({
  url: base + '/api/roledelete',
  method: "post",
  data: {
    id
  }
});
export const setRoleListItem = data => axios({
  url: base + '/api/roleedit',
  method: "post",
  data
});

//管理员----------------------------------------------------------------------------------


export const addManageListItem = data => axios({
  url: base + '/api/useradd',
  method: "post",
  data
});
export const getManageListLength = () => axios({
  url: base + "/api/usercount",
  method: "get"
})
export const getManageList = params => axios({
  url: base + '/api/userlist',
  method: "get",
  params
});

export const delManageListItem = uid => axios({
  url: base + "/api/userdelete",
  method: "post",
  data: {
    uid
  }
});

export const setMangeListItem = data => axios({
  url: base + '/api/useredit',
  method: "post",
  data
});


// 分类-----------------------------------------------------------------

const dataToFormData = (data) => {
  let formData = new FormData()
  for (const dataKey in data) {
    if (data.hasOwnProperty(dataKey))
      formData.append(dataKey, data[dataKey]);
  }
  return formData;
}

export const addCateListItem = data => {
  if (!data.img) data.img = null;
  return axios({
    url: base + "/api/cateadd",
    method: "post",
    data: dataToFormData(data)
  })
};

export const getCateList = () => axios({
  url: base + "/api/catelist",
  method: "get",
  params: {
    istree: true
  }
});

export const delCateListItem = id => axios({
  url: base + "/api/catedelete",
  method: "post",
  data: {
    id
  }
})

export const setCateListItem = data => axios({
  url: base + '/api/cateedit',
  method: "post",
  data: dataToFormData(data)
});


//banner

export const addBannerListItem = data => axios({
  url: base + "/api/banneradd",
  method: "post",
  data: dataToFormData(data)
});

export const getBannerList = () => axios({
  url: base + "/api/bannerlist",
  method: "get"
});
export const delBannerListItem = id => axios({
  url: base + "/api/bannerdelete",
  method: "post",
  data: {
    id
  }
});
export const setBannerListItem = data => axios({
  url: base + "/api/banneredit",
  method: "post",
  data: dataToFormData(data)
});

//会员管理
export const getMemberList = () => axios({
  url: base + "/api/memberlist",
  method: "get"
});

export const setMemberListItem = data => axios({
  url: base + "/api/memberedit",
  method: "post",
  data: qs.stringify(data)
});


//规格------------------------------------------------------------------------

export const getSpecsListLength = () => axios({
  url: base + "/api/specscount",
  method: "get"
})

export const getSpecsList = params => axios({
  url: base + "/api/specslist",
  method: "get",
  params
});


export const addSpecsListItem = data => axios({
  url: base + "/api/specsadd",
  method: "post",
  data: qs.stringify(data)
});

export const getSpecsListItem = id => axios({
  url: base + "/api/specsinfo",
  method: "get",
  params: {
    id
  }
})


export const setSpecsListItem = data => axios({
  url: base + "/api/specsedit",
  method: "post",
  data: qs.stringify(data)
});


export const removeSpecsListItem = id => axios({
  url: base + "/api/specsdelete",
  method: "post",
  data: qs.stringify({
    id
  })
});
// 商品分类
export const addGoodsListItem = data => axios({
  url: base + "/api/goodsadd",
  method: "post",
  data: dataToFormData(data)
})
export const getGoodsListLength = () => axios({
  url: base + "/api/goodscount",
  method: "get"
})
export const getGoodsList = params => axios({
  url: base + "/api/goodslist",
  method: "get",
  params
})
export const getGoodsListItem = id => axios({
  url: base + "/api/goodsinfo",
  method: "get",
  params: {
    id
  }
})
export const setGoodsListItem = data => axios({
  url: base + "/api/goodsedit",
  method: "post",
  data: dataToFormData(data)
})

export const delGoodsListItem = id => axios({
  url: base + "/api/goodsdelete",
  method: "post",
  data: qs.stringify({
    id
  })
});
//限时秒杀
export const getInfoGoodsList = fid => axios({
  url: base + "/api/getgoods",
  method: "get",
  params: {
    fid
  }
});
export const addSeckillListItem = data => axios({
  url: base + "/api/seckadd",
  method: "post",
  data: qs.stringify(data)
});

export const getSeckillList = () => axios({
  url: base + "/api/secklist",
  method: "get"
});

export const getSeckillListItem = id => axios({
  url: base + "/api/seckinfo",
  method: "get",
  params: {
    id
  }
});

export const setSeckillListItem = data => axios({
  url: base + "/api/seckedit",
  method: "post",
  data: qs.stringify(data)
});
export const delSeckillListItem = id => axios({
  url: base + "/api/seckdelete",
  method: "post",
  data: qs.stringify({
    id
  })
});


//登录--------------------------------------------------------------------
export const login = data => axios({
  url: base + "/api/userlogin",
  method: "post",
  data: data
})

