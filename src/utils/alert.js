import Vue from "vue";

const vm = new Vue();

//ok
export const okAlert = message =>
  vm.$message({
    message,
    type: "success"
  });

// err
export const errAlert = message =>
  vm.$message({
    message,
    type: "warning"
  })
