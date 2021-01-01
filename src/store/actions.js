import {confirm, okAlert} from "../utils/alert";
import {getRoleListItem, login} from "../utils/http";
import $router from "../router";

export let actions = {
  async login(context, data) {
    const res = await login(data);
    if (res.code === 200) {
      okAlert(res.msg);
      context.commit("setUserInfo", res.list);
      const juese = await getRoleListItem(res.list.roleid);
      res.list.juese = juese.list;
      window.sessionStorage.setItem("userInfo", JSON.stringify(res.list));
      context.commit("setUserInfo", res.list);
      await $router.push('/index');
    }
  },
  async loginOut() {
    const res = await confirm('确定要退出吗');
    if (res[1]) {
      await window.sessionStorage.removeItem("userInfo");
      await $router.push('/login');
    }
  }
}
