import axios from "axios";
import qs from "qs";
import $ from 'jquery';
import {errAlert} from "./alert";
import {formatDate} from "element-ui/src/utils/date-util";
import Vue from "vue";

Vue.prototype.URL = 'http://localhost:3000'
const base = "/api";


// const ajax = (obj) =>
//   new Promise(((resolve, reject) => {
//     obj.success = function (data) {
//       resolve(data);
//     }
//     obj.error = function (err) {
//       reject(err);
//     }
//     $.axios(obj);
//   }));


axios.interceptors.response.use(res => {
  // console.group("本次请求地址是：" + res.config.url)
  console.log(res);
  console.groupEnd()
  //18.统一处理失败
  if (res.data.code !== 200) {
    errAlert(res.data.msg)
  }
  return res.data
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
  return formData
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
  method: "get",
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
  method: "get",
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
  url:base + "/api/goodsadd",
  method:"post",
  data:dataToFormData(data)
})
export const getGoodsListLength = () =>axios({
  url:base + "/api/goodscount",
  method:"get"
})
export const getGoodsList = params =>axios({
  url:base +"/api/goodslist",
  method:"get",
  params
})
export const getGoodsListItem = id =>axios({
  url:base +"/api/goodsinfo",
  method:"get",
  params:{
    id
  }
})
export const setGoodsListItem = data => axios({
  url:base + "/api/goodsedit",
  method:"post",
  data:dataToFormData(data)
})

