<template>
  <el-menu
    class="el-menu-vertical-demo"
    background-color="#20222a"
    text-color="#ccc"
    active-text-color="#fff"
    unique-opened
    router
  >
    <el-menu-item index="/index">
      <i class="el-icon-menu"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <div  v-for="item in userInfo.menus">
      <el-submenu :index="item.url" v-if="item.children">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{ item.title }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item v-for="i in item.children" :index="'/index/'+ i.url">{{ i.title }}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item v-else  :index="'/index/'+ item.url">{{ item.title }}</el-menu-item>
    </div>
  </el-menu>
</template>

<script>
import {mapGetters} from "vuex";

export default {
name: "left",
  computed:{
  ...mapGetters({
    "userInfo":"userInfo"
  })
  }
}
</script>

<style scoped>
.el-menu-vertical-demo{
  height: 100%;
}
</style>
