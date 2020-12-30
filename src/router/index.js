import Vue from 'vue';
import Router from 'vue-router';
import store from "../store"

export const indexRoutes = [
  {
    path: "menu",
    component: () => import("../pages/menu/menu.vue"),
    name: "菜单管理"
  },
  {
    path: "role",
    component: () => import("../pages/role/role.vue"),
    name: "角色管理"
  },
  {
    path: "manage",
    component: () => import("../pages/manage/manage.vue"),
    name: "管理员管理"
  },
  {
    path: "cate",
    component: () => import("../pages/cate/cate.vue"),
    name: "商品分类"
  },
  {
    path: "specs",
    component: () => import("../pages/specs/specs.vue"),
    name: "商品规格"
  },
  {
    path: "goods",
    component: () => import("../pages/goods/goods.vue"),
    name: "商品管理"
  },
  {
    path: "member",
    component: () => import("../pages/member/member.vue"),
    name: "会员管理"
  },
  {
    path: "banner",
    component: () => import("../pages/banner/banner.vue"),
    name: "轮播图管理"
  },
  {
    path: "seckill",
    component: () => import("../pages/seckill/seckill.vue"),
    name: "秒杀活动"
  },
]
Vue.use(Router);


const router = new Router({
  routes: [
    {
      path: "/login",
      component: () => Promise.resolve(import("../pages/login/login")),
      name: "登录"
    },
    {
      path: "/index",
      component: () => Promise.resolve(import("../pages/index/index")),
      name: "首页",
      children: [...indexRoutes]
    },
    {
      path: '/*',
      redirect: "/index"
    }

  ]
});
router.beforeEach((to, from, next) => {
  try {
    store.commit("setUserInfo", JSON.parse(window.sessionStorage.getItem("userInfo")))
  } catch (e) {
    store.commit("setUserInfo", {})
  }
  console.log(store.state.userInfo)
  if (!(to.path === '/login')) {
    let urlArr = ''
    let arr = store.state.userInfo ? store.state.userInfo.menus_url : [];
    arr.push('index');
    urlArr = JSON.stringify(arr);
    if (urlArr.includes(to.path.slice(to.path.lastIndexOf('/') + 1))) {
      if (store.state.userInfo) {
        next();
        return;
      }
      next('/login');
      return;
    }
    next('/login');
    return;
  }
  next()
})
export default router;



