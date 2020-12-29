<template>
  <div class="vForm">
    <el-button type="primary" @click="formShow">添加</el-button>
    <el-dialog class="alert" :title="isFormShow.name" @close="close" :visible.sync="isFormShow.show">
      <el-form :model="user">
        <el-form-item label="菜单名称" :label-width="'120px'">
          <el-input v-model="user.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" :label-width="'120px'">
          <el-select v-model="user.pid" placeholder="请选择">
            <el-option :value="0" label="顶级菜单"></el-option>
            <el-option v-for="item in formdata" :value="item.id" :label="item.title">{{ item.title }}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型" :label-width="'120px'">
          <el-radio-group v-model="user.type">
            <el-radio :label="2">菜单</el-radio>
            <el-radio :label="1">目录</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="user.type === 1" label="目录图标" :label-width="'120px'">
          <el-select v-model="user.icon" placeholder="请选择">
            <el-option v-for="item in icon" :label="item" :value="item">
              <i :class="item"></i>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="user.type === 2" label="菜单地址" :label-width="'120px'">
          <el-select v-model="user.url" placeholder="请选择">
            <el-option v-for="item in indexRoutes" :label="'/'+item.path" :value="item.path">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" :label-width="'120px'">
          <el-radio-group>
            <el-switch
              v-model="user.status"
              active-text="启用"
              inactive-text="禁用"
              :active-value="1"
              :inactive-value="2">
            </el-switch>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="formShow">取 消</el-button>
        <el-button type="primary" @click="add(user)" v-if="isFormShow.add">确 定</el-button>
        <el-button type="primary" @click="editData(user)" v-else>修改</el-button>

      </div>
    </el-dialog>
  </div>
</template>

<script>

import {indexRoutes} from "../../../router";


export default {
  name: "vForm",
  props: {
    formdata: {
      type: Array
    },
    userStr: {
      type: String
    },
    isFormShow: {
      type: Object
    },

  },
  data() {
    return {
      icon: [
        "el-icon-setting",
        "el-icon-user-solid",
        "el-icon-camera-solid",
        "el-icon-s-platform",
        "el-icon-s-order"
      ],
      indexRoutes,
      user: {}
    }
  },
  methods: {
    formShow() {
      this.$emit('addShow', this.isFormShow);
    },
    add(data) {
      this.$emit('add', data);
    },
    editData(data) {
      this.$emit('editData', data);
    },
    close() {
      this.$emit('close', this.isFormShow)
    }
  },
  watch: {
    userStr() {
      this.user = JSON.parse(this.userStr)
    }
  }
}
</script>

<style scoped>
.alert {
  min-width: 800px;
}
</style>
