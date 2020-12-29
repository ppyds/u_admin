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
        <br/>
        <el-form-item label="标题" :label-width="width">
          <el-input v-model="form.title" placeholder="标题"></el-input>
        </el-form-item>
        <br>
        <el-form-item v-if="form.pid !==0" label="图片" :label-width="width">
          <div class="file_box">
            <input v-if="isFormShow.show" accept="image/*" @change="changeFile" type="file">
            <img v-if="bgUrl || form.img" :src="bgUrl|| URL +  form.img" alt="">
          </div>
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
      form: {},
      bgUrl: ""
    }
  },
  methods: {
    formShow() {
      this.isFormShow.show = true
    },
    close() {
      this.$emit('close', true)
    },
    open() {
      this.$emit('open')
    },
    edit() {
      this.$emit('edit', this.form);
    },
    add() {
      this.$emit('add', this.form);

    },
    changeFile(e) {
      const file = e.target.files[0];
      this.bgUrl = URL.createObjectURL(file);
      this.form.img = file;
    }
  },
  watch: {
    formData() {
      this.form = JSON.parse(this.formData);
    }
  },
  computed: {},
}
</script>

<style scoped>
.file_box {
  width: 150px;
  height: 150px;
  border: 1px #ccc dashed;
  overflow: hidden;
  position: relative;
}

.file_box input {
  width: 100%;
  height: 100%;
  display: block;
  padding: 200px;
  position: absolute;
  z-index: 2;
}

.file_box img {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: #fff;
  z-index: 1;
}

.file_box:before {
  content: '+';
  display: block;
  height: 100%;
  width: 100%;
  font-size: 50px;
  font-weight: 0;
  position: absolute;
  top: 0;
  line-height: 150px;
  text-align: center;
}
</style>
