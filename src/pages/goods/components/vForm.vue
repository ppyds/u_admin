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
      @opened="opened"
      @open="open"
      class="alert"
      :title="isFormShow.name"
      :visible.sync="isFormShow.show"
    >
      <el-form :model="form">
        <div>form:{{ form }}</div>

        <el-form-item label="一级分类" label-width="100px">
          <el-select v-model="form.first_cateid">
            <el-option label="--请选择--" value disabled></el-option>
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
            <el-option label="--请选择--" value disabled></el-option>
            <el-option
              v-for="item in secondCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称" label-width="100px">
          <el-input v-model="form.goodsname"></el-input>
        </el-form-item>
        <el-form-item label="价格" label-width="100px">
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="市场价格" label-width="100px">
          <el-input v-model="form.market_price"></el-input>
        </el-form-item>
        <el-form-item label="图片" label-width="100px">
          <div class="file_box">
            <input v-if="isFormShow.show" accept="image/*" @change="changeFile" type="file">
            <v-img :src="bgUrl|| URL +  form.img"></v-img>
          </div>
        </el-form-item>
        <el-form-item label="商品规格" label-width="100px">
          <el-select v-model="form.specsid">@change="changegoodsId"
            <el-option label="--请选择--" value disabled></el-option>
            <el-option
              v-for="item in goodsList"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格属性" label-width="100px">
          <el-select v-model="form.specsattr" multiple>
            <el-option label="--请选择--" value disabled></el-option>
            <el-option v-for="(item,index ) in showgoodsAttr" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否新品" label-width="100px">
          <el-radio v-model="form.isnew" :label="1">是</el-radio>
          <el-radio v-model="form.isnew" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="是否热卖" label-width="100px">
          <el-radio v-model="form.ishot" :label="1">是</el-radio>
          <el-radio v-model="form.ishot" :label="2">否</el-radio>
        </el-form-item>

        <el-form-item label="状态" label-width="100px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
        <el-form-item label="商品描述" label-width="100px">
          <!-- 富文本编辑器 -->
          <div id="div1" v-if="isFormShow.show"></div>
        </el-form-item>
        <br>
        <el-form-item label="" :label-width="width">
          <el-button type="primary" v-if="isFormShow.add"
                     @click="add({...form,'specsattr':JSON.stringify(form.specsattr),'description':editor.txt.html()})">
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
import E from "wangeditor";

export default {
  name: "vForm",
  data() {
    return {
      width: '100px',
      attrData: '',
      attrDataArr: [],
      secondCateList: [],
      showgoodsAttr: [],
      bgUrl: "",
      editor: {}
    }
  },
  methods: {
    ...mapActions({
      "formShow": "goods/formShow",
      "add": "goods/add",
      "open": "goods/open",
      "edit": "goods/edit",
      "getCateList": "goods/getCateList"
    }),
    addAttr() {
      this.attrDataArr.push(this.attrData);
      this.attrData = '';
    },
    removeAttr(index) {
      this.attrDataArr.splice(index, 1);
      console.log(this.attrDataArr)
    },
    opened() {
      this.editor = new E('#div1')
      this.editor.create();
      console.log(this.form.description)
      if (this.form.description) {

        this.editor.txt.html(this.form.description);
      }
    },
    close() {
      this.attrDataArr = []
    },
    changeFile(e) {
      const file = e.target.files[0];
      this.bgUrl = URL.createObjectURL(file);

      this.form.img = file;
    }

  },
  computed: {
    ...mapGetters({
      "form": "goods/form",
      "isFormShow": "goods/isFormShow",
      "cateList": "goods/cateList",
      "goodsList": "goods/goodsList"
    }),
  },
  watch: {
    "form.first_cateid"() {
      this.secondCateList = this.cateList.find(item => {
        return this.form.first_cateid === item.id;
      }).children;
    },
    "form.specsid"() {
      this.showgoodsAttr = this.goodsList.map(item => {
        if (this.form.specsid === item.id) {
          return JSON.parse(item.attrs);
        }
      })[0];
    }
  },
  mounted() {

  }
}
</script>

<style scoped>
/*^{*/
/*  !*width: calc(100 - 20px);*!*/
/*}*/
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

.file_box >>> .img {
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
