<template>
  <div>
    {{ tableData }}
    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column
        prop="id"
        label="商品编号"
        sortable
        min-width="100">
      </el-table-column>
      <el-table-column
        prop="goodsname"
        label="商品名称"
        sortable
        min-width="200">
      </el-table-column>
      <el-table-column
        prop="price"
        label="商品价格"
        sortable
        min-width="200">
      </el-table-column>

      <el-table-column
        prop="market_price"
        label="市场价格"
        sortable
        min-width="200">
      </el-table-column>
      <el-table-column
        prop="market_price"
        label="图片"
        sortable
        min-width="200">
        <template slot-scope="scope">
          <!--          {{scope.row.img}}-->
          <img :src="'http://127.0.0.1:3000'+scope.row.img" alt="">
          <v-img :src="'http://127.0.0.1:3000/uploads/ba495e20-496f-11eb-a7bc-bd800f437adb.jpg'"></v-img>
        </template>
      </el-table-column>
      <el-table-column label="是否新品" min-width="100px">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.isnew===1">新品</el-button>
          <el-button type="info" v-else>否</el-button>
        </template>
      </el-table-column>
      <el-table-column label="是否热卖" min-width="100px">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.ishot===1">是</el-button>
          <el-button type="info" v-else>否</el-button>
        </template>
      </el-table-column>
      <el-table-column label="状态" min-width="100px">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status===1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="200">
        <template slot-scope="scope">
          <el-button type="primary" @click="editOpen(scope.row.id)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    {{ pages }}
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="pages.size"
      :total="pages.listLength"
      @current-change="pageChange"
      style="float: right"
      :hide-on-single-page="pages.size >= pages.listLength"
    >
    </el-pagination>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import vImg from "../../../components/vImg";

export default {
  name: "vTable",
  methods: {
    ...mapActions({
      "getList": "goods/getList",
      "editOpen": "goods/editOpen",
      "del": "goods/del",
      "pageChange": "goods/pageChange"
    })

  },
  components: {
    vImg
  },
  computed: {
    ...mapGetters({
      "tableData": "goods/tableData",
      "pages": "goods/pages",
    })
  },
  mounted() {
    this.getList(this.pages)
  }
}
</script>

<style scoped>
/*.el-table::before{*/
/*  height: 0;*/
/*}*/
img {
  width: 100px;
  height: 100px;
}
</style>
