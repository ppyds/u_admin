<template>
  <div>
    <v-form @close="close" @edit="edit" @add="add" @open="open" :juese="tableData" :is-form-show="isFormShow"
            :form-data="JSON.stringify(form)"></v-form>
    <v-table @editOpen="editOpen" @del="del" :table-data="tableData"></v-table>
  </div>
</template>

<script>

import vForm from "./components/vForm";
import {addCateListItem, delCateListItem, getCateList, setCateListItem} from "../../utils/http";
import vTable from "./components/vTable";
import {okAlert} from "../../utils/alert";

export default {
  components: {
    vForm,
    vTable
  },
  data() {
    return {
      form: {
        pid: '',
        catename: '',
        img: null,
        status: 1,
        id: ''
      },
      isFormShow: {
        show: false,
        add: true,
        name: "添加"
      },
      juese: [],
      tableData: []
    }
  },
  methods: {
    edit(data) {
      setCateListItem(data)
        .then(res => {
          if (res.code === 200) {
            okAlert(res.msg);
            this.getData();
            this.isFormShow.show = false;
          }
        })
    },
    add(data) {
      addCateListItem(data).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.getData();
          okAlert(res.msg);
          this.isFormShow.show = false;
        }

        console.log(this.tableData)
      })
    },
    del(id) {
      delCateListItem(id)
        .then(res => {
          if (res.code === 200) {
            okAlert(res.msg);
            this.getData();
          }
        })
    },
    close() {
      if (!this.isFormShow.add) {
        this.form = {
          pid: '',
          catename: '',
          img: null,
          status: 1,
          id: ''
        }
      }
    },
    open() {

    },
    editOpen(data) {
      this.isFormShow = {
        show: true,
        add: false,
        name: "修改"
      }
      this.form = data
    },
    getData() {
      getCateList().then(res => {
        if (res.code === 200) {
          this.tableData = res.list;
        }
      })
    }
  },
  mounted() {
    this.getData()
  }
}
</script>

<style>

</style>
