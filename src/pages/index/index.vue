<template>
  <div id="index">
    <el-container class="box">
      <el-aside class="left">
        <left></left>
      </el-aside>
      <el-container class="con">
        <el-header class="header">
          <v-header></v-header>
        </el-header>
        <el-main class="main">
          <router-view class="con"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import left from './components/left';
import vHeader from './components/header'

export default {
  name: "index",
  components: {
    left,
    vHeader
  },
  data() {
    return {}
  }

}
</script>

<style scoped>
#index {
  height: 100vh;
}
.box{
  height: 100%;
  
}
.left {
  height: 100vh;
}

.con {
  padding: 0;
}

.header {
  padding: 0;
}


</style>
