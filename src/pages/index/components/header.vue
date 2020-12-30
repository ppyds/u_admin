<template>
  <div class="header">
    <el-breadcrumb separator-class="el-icon-arrow-right" v-if="!($route.name === '首页')">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{ $route.name }}</el-breadcrumb-item>
    </el-breadcrumb>
    <div>
      {{ userInfo.username }}
    </div>
    <el-button type="danger" @click="loginOut">推出</el-button>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "header",
  data() {
    return {
      title: ""
    }
  },
  beforeRouteUpdate(to, form, next) {
    this.title = to.name;
    console.log(this.title)
    next()
  },
  computed: {
    ...mapGetters({
      "userInfo": "userInfo"
    })
  },
  methods: {
    ...mapActions({
      loginOut: "loginOut"
    })
  }
}
</script>

<style scoped>
.header {
  height: 100%;
  background: #b7c2e9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 25px;
  padding: 0 50px;
}
</style>
