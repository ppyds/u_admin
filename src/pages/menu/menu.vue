<template>
  <div>
    <v-form @close="close"
            @addShow="addShow"
            @editData="editData"
            :isFormShow="isFormShow"
            :userStr="JSON.stringify(user)"
            :formdata="tableData"
            @add="add"
    ></v-form>
    <div class="box">
      <v-table :tableData="tableData" @edit="editShow" @del="del"></v-table>
    </div>
  </div>
</template>

<script>
import vTable from "./components/vTable";
import {addMenuListItem, delMenuListItem, editMenuListItem, getMenuList} from "../../utils/http";
import vForm from "./components/vForm";
import {okAlert} from "../../utils/alert";

export default {
  name: "menu",
  components: {
    vTable,
    vForm
  },
  mounted() {
    this.getData()
  },
  data() {
    return {
      tableData: [],
      isFormShow: {
        show: false,
        add: true,
        name: "添加"
      },
      user: {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1
      },
      oldUser: {}
    }
  },
  methods: {
    close(data) {
      if (!data.add) {
        this.user = {
          pid: 0,
          title: "",
          icon: "",
          type: 1,
          url: "",
          status: 1
        }
      }
    },
    del(id) {
      delMenuListItem(id)
        .then(res => {
          if (res.code === 200) {
            okAlert(res.msg);
            this.getData();
          }
          this.isFormShow.show = false;
        })
    },
    getData() {
      getMenuList().then(res => {
        if (res.code === 200) {
          this.tableData = res.list;
        }
      })
    },
    addShow() {
      this.isFormShow = {
        show: true,
        add: true,
        name: "添加"
      }
    },
    add(user) {
      addMenuListItem(user).then(res => {
        if (res.code === 200) {
          okAlert(res.msg);
        }
        this.isFormShow.show = false;
        this.getData();
      });
    },
    editShow(data) {
      this.user = data;
      this.oldUser = data;
      this.isFormShow = {
        show: true,
        add: false,
        name: "修改"
      }
    },
    editData(data) {
      editMenuListItem(data).then(res => {
        if (res.code === 200) {
          this.user = {
            pid: 0,
            title: "",
            icon: "",
            type: 1,
            url: "",
            status: 1
          }
          this.getData();
          okAlert(res.msg);
          this.isFormShow.show = false;
        }
      })
    }
  }
}
</script>

<style scoped>
.box {
  overflow-y: auto;
  height: 100%;
}
</style>
