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
        label="分类编号"
        sortable
        min-width="100">
      </el-table-column>
      <el-table-column
        prop="catename"
        label="分类名称"
        sortable
        min-width="200">
      </el-table-column>
      <el-table-column
        prop="rolename"
        label="图片"
        sortable
        min-width="200">
        <template v-if="scope.row.img !== 'null' && scope.row.img !== null" slot-scope="scope">
          <img :src="URL +scope.row.img" alt="">
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
          <el-button type="primary" @click="editOpen(scope.row)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "vTable",
  props: {
    tableData: {
      type: Array
    }
  },
  methods: {
    editOpen(data) {
      this.$emit('editOpen', data);
    },
    del(id) {
      this.$emit('del', id);
    }

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
