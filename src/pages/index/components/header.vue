<template>
  <div class="header">
    <el-breadcrumb separator-class="el-icon-arrow-right" v-if="!($route.name === '首页')">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{ $route.name }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
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
  }
}
</script>

<style scoped>
.header {
  height: 100%;
  background: #b7c2e9;
}
</style>
