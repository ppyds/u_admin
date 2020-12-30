<template>
  <div id="login">
    <div id="form">
      <h1>登录</h1>
      <el-form :model="user" status-icon label-width="50px" class="demo-ruleForm">
        <el-form-item label="账号" prop="pass">
          <el-input type="text" v-model="user.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="checkPass">
          <el-input type="password" v-model="user.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login(user)" style="margin-left: -50px">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>


import {mapActions} from "vuex";

export default {
  name: "login",
  data() {
    return {
      user: {
        username: "",
        password: ""
      }
    }
  },
  methods: {
    ...mapActions({
      "login":"login"
    })
  }

}
</script>

<style scoped>
#login {
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(to right, #533444, #403a53, #2f3d60);
}

#login #form {
  box-sizing: border-box;
  width: 500px;
  height: auto;
  padding: 40px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 1);
  border-radius: 20px;
  text-align: center;
}

#login #form h1 {
  height: 60px;
  line-height: 60px;
  font-size: 25px;
  font-weight: 400;
  text-align: center;
}
</style>
