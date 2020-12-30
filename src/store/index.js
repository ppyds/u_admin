import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex);

import {state, getters, mutations} from './mutations';
import {actions} from './actions';
import login from "./modules/login";
import cate from "./modules/cate";
import specs from "./modules/specs";
import goods from "./modules/goods";
import seckill from "./modules/seckill";

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    login,
    cate,
    specs,
    goods,
    seckill
  }
})
