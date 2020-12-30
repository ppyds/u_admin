<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column
        label="活动名称"
        prop="title"
        sortable
        min-width="100">
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
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import vImg from "../../../components/vImg";

export default {
  name: "vTable",
  methods: {
    ...mapActions({
      "getTableData": "seckill/getTableData",
      "editOpen": "seckill/editOpen",
      "del": "seckill/del"
    })

  },
  components: {
    vImg
  },
  computed: {
    ...mapGetters({
      "tableData": "seckill/tableData",
      "pages": "goods/pages",
    })
  },
  mounted() {
    this.getTableData(this.pages)
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
