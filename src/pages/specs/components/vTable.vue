<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column
        prop="id"
        label="用户编号"
        sortable
        min-width="100">
      </el-table-column>
      <el-table-column
        prop="specsname"
        label="规格名称"
        sortable
        min-width="200">
      </el-table-column>
      <el-table-column
        prop="rolename"
        label="规格属性"
        sortable
        min-width="200">
       <template slot-scope="scope">
         <el-tag style="margin: 5px" v-for="item in scope.row.attrs" type="success">{{item}}</el-tag>
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
    {{tableData}}
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

export default {
  name: "vTable",
  methods: {
    ...mapActions({
      "getList":"specs/getList",
      "editOpen":"specs/editOpen",
      "del":"specs/del",
      "pageChange":"specs/pageChange"
    })

  },
  computed:{
    ...mapGetters({
      "tableData":"specs/tableData",
      "pages":"specs/pages",
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
</style>
