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

    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>系统设置</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/index/menu">菜单管理</el-menu-item>
        <el-menu-item index="/index/role">角色管理</el-menu-item>
        <el-menu-item index="/index/manage">管理员管理</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>商城管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/index/cate">商品分类</el-menu-item>
        <el-menu-item index="/index/specs">商品规格</el-menu-item>
        <el-menu-item index="/index/goods">商品管理</el-menu-item>
        <el-menu-item index="/index/member">会员管理</el-menu-item>
        <el-menu-item index="/index/banner">轮播图管理</el-menu-item>
        <el-menu-item index="/index/seckill">秒杀活动</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
name: "left"
}
</script>

<style scoped>
.el-menu-vertical-demo{
  height: 100%;
}
</style>
