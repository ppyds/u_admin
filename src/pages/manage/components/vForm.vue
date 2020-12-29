<template>
  <div class="form">
    <el-button
      type="primary"
      @click="formShow"
    >添加
    </el-button>
    <el-dialog
      width="500px"
      @close="close"
      @open="open"
      class="alert"
      :title="isFormShow.name"
      :visible.sync="isFormShow.show"
    >
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="所属角色" :label-width="width">
          <el-select v-model="form.roleid" placeholder="角色名称">
            <el-option v-for="item in juese" :key="item.id" :label="item.rolename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <br/>
        <el-form-item label="用户名" :label-width="width">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <br>
        <el-form-item label="密码" :label-width="width">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <br>
        <el-form-item label="状态" :label-width="width">
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
        <br>
        <el-form-item label="" :label-width="width">
          <el-button type="primary" v-if="isFormShow.add" @click="add">
            添加
          </el-button>
          <el-button type="primary" v-else @click="edit">
            修改
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "vForm",
  props: {
    isFormShow: {
      type: Object
    },
    juese: {
      type: Array
    },
    formData: {
      type: String
    }
  },
  data() {
    return {
      width: '100px',
      form: {}
    }
  },
  methods: {
    formShow() {
      this.isFormShow.show = true
    },
    close() {
      this.$emit('close',true)
    },
    open() {
      this.$emit('open')
    },
    edit() {
      this.$emit('edit', this.form)
    },
    add() {
      this.$emit('add', this.form)
    }
  },
  watch: {
    formData() {
      this.form = JSON.parse(this.formData);
    }
  },
  computed: {

  },
}
</script>

<style scoped>

</style>
