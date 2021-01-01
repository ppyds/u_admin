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
// 警告弹窗
export const confirm = msg =>
  new Promise((res, reg) =>
    vm.$confirm(msg, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      res([false, true])
    }).catch(() => {
      res([true, false])
    })
  );


