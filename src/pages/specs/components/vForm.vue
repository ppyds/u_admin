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
        <el-form-item label="规格名称" :label-width="width">
          <el-input v-model="form.specsname"></el-input>
        </el-form-item>
        <br>
        <el-form-item label="规格属性" :label-width="width">
          <div>
            <el-input style="width:calc(100% - 140px)" v-model="attrData"></el-input>
            <el-button style="width: 120px" @click="addAttr" type="primary">新增商品属性</el-button>
          </div>
        </el-form-item>
        <el-form-item label="规格属性" :label-width="width">
          {{ attrDataArr }}
          <div v-for="(item,index) in attrDataArr" style="line-height: 60px;">

            <el-input style="width:calc(100% - 90px)" :value="item" :key="item" disabled></el-input>
            <el-button type="danger" @click="removeAttr(index)">删除</el-button>
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
          <el-button type="primary" v-if="isFormShow.add" @click="add({...form,attrs:attrDataArr})">
            添加
          </el-button>
          <el-button type="primary" v-else @click="edit({...form,attrs:attrDataArr})">
            修改
          </el-button>
        </el-form-item>

      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "vForm",
  data() {
    return {
      width: '100px',
      attrData: '',
      attrDataArr: []
    }
  },
  methods: {
    ...mapActions({
      "formShow": "specs/formShow",
      "add": "specs/add",
      "open": "specs/open",
      "edit": "specs/edit",
    }),
    addAttr() {
      this.attrDataArr.push(this.attrData);
      this.attrData = '';
    },
    removeAttr(index) {
      this.attrDataArr.splice(index, 1);
      console.log(this.attrDataArr)
    },
    close() {
      this.attrDataArr = []
    }

  },
  computed: {
    ...mapGetters({
      "form": "specs/form",
      "isFormShow": "specs/isFormShow",

    }),
  },
  watch: {
    "form.attrs"() {
      console.log(this.attrDataArr)
      try {
        this.attrDataArr = JSON.parse(this.form.attrs)
      } catch (e) {
        this.attrDataArr = [];
      }
    }
  }
}
</script>

<style scoped>
/*^{*/
/*  !*width: calc(100 - 20px);*!*/
/*}*/
</style>
