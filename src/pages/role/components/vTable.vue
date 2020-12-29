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
        label="角色编号"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="rolename"
        label="角色名称"
        sortable
        width="180">
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status===1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row)">编辑</el-button>
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
    edit(data) {
      this.$emit('edit', data);
    },
    del(id) {
      this.$emit('del', id)
    }
  }
}
</script>

<style scoped>

</style>
