import {okAlert} from "../utils/alert";
import {login} from "../utils/http";
import $router from "../router"

export let actions = {
  async login(context, data) {
    const res = await login(data);
    if (res.code === 200) {
      okAlert(res.msg);
      context.commit("setUserInfo", res.list);
      window.sessionStorage.setItem("userInfo", JSON.stringify(res.list));
      $router.push('/index');
    }
  },
  async loginOut() {
    await window.sessionStorage.removeItem("userInfo");
    await $router.push('/login');
  }
}
