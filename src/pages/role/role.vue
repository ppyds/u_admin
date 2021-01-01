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
import {okAlert, confirm} from "../../utils/alert";
import {mapGetters} from "vuex";

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
    async editData(data) {// 修改会员的数据(权限)
      if (data.id === this.userInfo.roleid) { //如果用户修改的是 本用户当前所属的角色则 让用户重新登录
        const res = await confirm("您当前修改的角色 是您的所属角色 如果修改则会为您退出登录");
        if (res[1]) {
          const res = await setRoleListItem(data)
          window.sessionStorage.removeItem("userInfo");
          await this.$router.push('/login');
          okAlert(res.msg);
        }
      }
      this.close();
    }
  },
  computed: {
    ...mapGetters({
      "userInfo": "userInfo"
    })
  }
}
</script>

<style>

</style>
