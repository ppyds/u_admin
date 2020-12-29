<template>
  <div>
    <v-form @close="close" @edit="edit" @add="add" @open="open" :juese="juese" :is-form-show="isFormShow"
            :form-data="JSON.stringify(form)"></v-form>
    <v-table :pages="pages" @editOpen="editOpen" @del="del" :table-data="tableData"></v-table>
  </div>
</template>

<script>
import vForm from "./components/vForm";
import vTable from "./components/vTable";
import {
  addManageListItem,
  delManageListItem,
  getManageList,
  getManageListLength,
  getRoleList,
  setMangeListItem
} from "../../utils/http";
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
        add: true,
        name: "添加"
      },
      form: {
        roleid: 1,
        username: "",
        password: "",
        status: 1,
        uid: ''
      },
      juese: [],
      pages: {
        size: 5,//每页显示的数量
        page: 1,//当前页码
        listLength: 0,//数据总长度
      },
      tableData: []
    }
  },
  methods: {
    open() {
      getRoleList().then(res => {
        if (res.code === 200) {
          this.juese = res.list
        }
      })
    },
    close(isClear) {
      if (isClear) {
        this.form = {
          roleid: 1,
          username: "",
          password: "",
          status: 1,
          uid: ''
        }
      }
    },
    add(data) {
      console.log(data)
      addManageListItem(data).then(res => {
        if (res.code === 200) {
          okAlert(res.msg);
          this.getList();
          this.isFormShow.show = false;
        }
      })
    },
    async getList() {
      const listLength = await getManageListLength();
      if (listLength.code === 200) {
        this.pages.listLength = listLength.list[0].total;
      }
      const list = await getManageList({
        page: this.pages.page,
        size: this.pages.size
      });
      if (list.code === 200) {
        this.tableData = list.list;
      }
    },
    del(uid) {
      delManageListItem(uid).then(res => {
        if (res.code === 200) {
          this.getList();
          okAlert(res.msg)
        }
      })
    },
    editOpen(data) {
      this.isFormShow = {
        show: true,
        add: false,
        name: "修改"
      };
      this.form = data;
    },
    edit(data) {
      setMangeListItem(data)
        .then(res => {
          if (res.code === 200) {
            okAlert(res.msg);
            this.getList();
          }
          this.isFormShow.show = false;
        })
    }
  },
  mounted() {
    this.getList()
  },
  watch: {
    "pages.page"(){
        this.getList().then(res =>{

          if (!res.data.list){
            console.log(this.pages.page ,55555555555555)
          }
        });
    }
  }
}
</script>

<style>

</style>
