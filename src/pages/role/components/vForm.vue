<template>
  <div>
    <el-button
      type="primary"
      @click="formShow"
    >添加
    </el-button>
    <el-dialog @close="close" @open="open" :title="isFormShow.name" :visible.sync="isFormShow.show">
      <el-form :model="addRole">
        <el-form-item label="角色名称" label-width="120px">
          <el-input v-model="addRole.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" label-width="120px">
          <el-tree
            :data="listTree"
            show-checkbox
            ref="tree"
            node-key="id"
            :default-expanded-keys="[1, 2, 3]"
            :props="defaultProps"
            @check-change="handleCheckChange"
          >
          </el-tree>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-switch
            v-model="addRole.status"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="isFormShow.add">添加</el-button>
        <el-button type="primary" @click="modify" v-else>修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
// 获取一页
export default {
  props: ['formDataStr', "isFormShow", "listTree"],
  data() {
    return {
      addRole: {},
      defaultProps: {
        children: 'children',
        label: 'title'
      }
    }
  },
  methods: {
//添加数据
    add() {
      this.$emit("add", this.addRole)
    },

// 好强
    handleCheckChange() {
      let res = this.$refs.tree.getCheckedNodes()
      this.addRole.menus = JSON.stringify(res.map(item => item.id))
    },

// 更强
    setCheckedNodes(a) {
      this.$refs.tree.setCheckedNodes(a)
    },
// 修改
    modify() {
      this.$emit('editData', this.addRole)
    },
    cancel() {
      this.isFormShow.show = false
    },
    close() {
      this.$emit("close")
    }
    ,
    up(data) {
      setTimeout(() => {
        console.log(data[1])
        this.$refs.tree.setCheckedNodes(data[1])
      },0)
    },
    formShow() {
      this.isFormShow.show = true;
      this.isFormShow.name = "添加";
      this.isFormShow.add = true;
      this.$refs.tree.setCheckedNodes(new Array());
    },
    open() {
      this.$emit("open", this.isFormShow);
    }
  },
  watch: {
    formDataStr() {
      this.addRole = JSON.parse(this.formDataStr);
    }
  }
}
</script>
<style scoped></style>
