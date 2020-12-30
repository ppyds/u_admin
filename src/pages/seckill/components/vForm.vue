<template>
  <div class="form">
    <el-button
      type="primary"
      @click="formShow(true)"
    >添加
    </el-button>
    <el-dialog
      width="500px"
      @close="close"
      @opened="opened"
      @open="open"
      class="alert"
      :title="isFormShow.name"
      :visible.sync="isFormShow.show"
    >
      <el-form :model="form">
        <div>form:{{ form }}</div>
        <el-form-item label="活动名称" label-width="100px">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="活动期限" label-width="100px">
          <el-time-picker
            is-range
            v-model="value"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围">
          </el-time-picker>
        </el-form-item>
        <el-form-item label="一级分类" label-width="100px">
          <el-select v-model="form.first_cateid">
            <el-option label="--请选择一级分类--" value disabled></el-option>
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" label-width="100px">
          <el-select v-model="form.second_cateid">
            <el-option label="--请选择二级分类--" value disabled></el-option>
            <el-option
              v-for="item in secondCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品" label-width="100px">
          <el-select v-model="form.goodsid">
            <el-option label="--请选择商品--" value disabled></el-option>
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" label-width="100px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
        <el-form-item label="" :label-width="width">
          <el-button type="primary" v-if="isFormShow.add"
                     @click="add({...form,'specsattr':JSON.stringify(form.specsattr),'description':editor.txt.html()})">
            添加
          </el-button>
          <el-button type="primary" v-else
                     @click="edit({...form,'specsattr':JSON.stringify(form.specsattr),'description':editor.txt.html()})">
            修改
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import E from "wangeditor";

export default {
  name: "vForm",
  data() {
    return {
      width: '100px',
      secondCateList: [],
      value: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
      goods: []
    }
  },
  methods: {
    ...mapActions({
      "formShow": "goods/formShow",
      "add": "goods/add",
      "open": "goods/open",
      "edit": "goods/edit",
      "getCateList": "goods/getCateList",
      "close": "goods/close"
    }),
    opened() {

    }

  },
  computed: {
    ...mapGetters({
      "form": "seckill/form",
      "isFormShow": "seckill/isFormShow",
      "cateList": "goods/cateList",
      "goodsList": "goods/goodsList"
    }),
  },
  watch: {
    "form.first_cateid"() {
      this.secondCateList = this.cateList.find(item => {
        return this.form.first_cateid === item.id;
      }).children;
    }
  }
}
</script>

<style scoped>
</style>
