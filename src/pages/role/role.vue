<template>
  <div id="role">
    <v-form @open="open"
            @editData="editData"
            @add="add"
            ref="form"
            :activeData="activeData"
            :listTree="listTree"
            :is-form-show="isFormShow"
            :form-data-str="JSON.stringify(form)"
            @clear="clear"
    ></v-form>


    <v-table
      @del="del"
      @edit="edit"
      :tableData="tableData"
    ></v-table>
  </div>
</template>

<script>
import vForm from "../role/components/vForm";
import {addRoleListItem, delRoleListItem, getMenuList, getRoleList, setRoleListItem} from "../../utils/http";
import vTable from "./components/vTable";
import {okAlert} from "../../utils/alert";

export default {
  components: {
    vForm,
    vTable
  },
  data() {
    return {
      isFormShow: {
        show: false,
        name: '角色添加',
        add: true
      },
      form: {
        rolename: "",
        menus: "",
        status: 1,
        id: ''
      },
      listTree: [],
      tableData: [],
      activeData: [],
    }
  },
  mounted() {
    this.Update();
  },
  methods: {
    clear() {
      this.form = {
        rolename: "",
        menus: "",
        status: 1,
        id: ''
      }
    },
    Update() {
      // 获取权限列表
      getMenuList().then(res => {
        if (res.code === 200) {
          this.listTree = res.list;
        }
      });
      // 获取会员列表
      getRoleList().then(res => {
        if (res.code === 200) {
          this.tableData = res.list;
        }
      })
    },
    open(data) {
      if (data.add) {
        this.form = {
          rolename: "",
          menus: "",
          status: 1,
          id: ''
        }
      }
    },
    close() {
      this.isFormShow.show = false;
    },
    add(data) {
      //添加会员
      addRoleListItem(data).then(res => {
        if (res.code === 200) {
          this.Update();
          okAlert(res.msg)
        }
        this.close();
      })
    },
    //删除会员
    del(id) {
      delRoleListItem(id).then(res => {
        if (res.code === 200) {
          console.log(res.msg);
          this.Update();
        }
        this.close();

      });
    },
    //修改会员
    edit(data) {//展示修改会员界面  并渲染已选择的数据
      this.isFormShow = {
        show: true,
        name: '角色修改',
        add: false
      }
      this.form = data;
      this.$refs.form.up([data.id, JSON.parse(data.menus).map(item => ({id: item}))]);
    },
    editData(data) {// 修改会员的数据(权限)
      setRoleListItem(data).then(res => {
        if (res.code === 200) {
          okAlert(res.msg);
          this.Update()
        }
      });
      this.close();

    }
  }
}
</script>

<style>

</style>
