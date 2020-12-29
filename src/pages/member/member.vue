<template>
  <div>
    <v-form @close="close" @edit="edit" @add="add" @open="open" :juese="tableData" :is-form-show="isFormShow"
            :form-data="JSON.stringify(form)"></v-form>
    <v-table @editOpen="editOpen" :table-data="tableData"></v-table>
  </div>
</template>

<script>
import vForm from "./components/vForm";
import vTable from "./components/vTable";
import {getMemberList, setCateListItem, setMemberListItem} from "../../utils/http";
import {okAlert} from "../../utils/alert";

export default {
  components: {
    vForm,
    vTable
  },
  data() {
    return {
      form: {
        uid: "",
        nickname: "",
        phone: "",
        password: "",
        status: ""
      },
      tableData: [],
      isFormShow: {
        show: false,
        add: false,
        name: "修改"
      }
    }
  },
  methods: {
    getList() {
      getMemberList()
        .then(res => {
          if (res.code === 200) {
            this.tableData = res.list;
          }
        });
    },
    editOpen(data) {
      this.isFormShow = {
        show: true,
        add: false,
        name: "修改"
      }
      this.form = data
    },
    edit(data) {
      setMemberListItem(data)
        .then(res => {
          if (res.code === 200) {
            okAlert(res.msg);
            this.getList();
            this.isFormShow.show = false;
          }
        });
    },
    open() {

    },
    close() {

    },
    add() {

    }
  },
  mounted() {
    this.getList()
  }
}
</script>

<style>

</style>
