<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      :height="pages.size * 65 + 60 + 15"
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
        prop="username"
        label="用户名"
        sortable
        min-width="200">
      </el-table-column>
      <el-table-column
        prop="rolename"
        label="所属角色"
        sortable
        min-width="200">
      </el-table-column>
      <el-table-column label="状态" min-width="100px">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status===1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="200">
        <template slot-scope="scope">
          <el-button type="primary" @click="editOpen(scope.row)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.uid)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
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
export default {
  name: "vTable",
  props: {
    tableData: {
      type: Array
    },
    pages: {
      type: Object
    }
  },
  methods: {
    editOpen(data) {
      data.password = '';
      this.$emit('editOpen', data);
    },
    del(uid) {
      this.$emit('del', uid);
    },
    pageChange(index) {
      this.pages.page = index;
    }

  }
}
</script>

<style scoped>
/*.el-table::before{*/
/*  height: 0;*/
/*}*/
</style>
