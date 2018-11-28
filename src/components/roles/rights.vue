<template>
  <el-card class="box-card">
    <my-bread level1="权限管理" level2="权限列表"></my-bread>

    <!-- 表格 -->
    <el-table :data="list" height="250" border style="width: 100%" class="td">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column label="权限名称" width="180" prop="authName"></el-table-column>
      <el-table-column label="路径" width="180" prop="path"></el-table-column>
      <el-table-column label="层级" prop="level">
        <template slot-scope="scope">
          <span v-if="scope.row.level == 0">一级</span>
          <span v-if="scope.row.level == 1">二级</span>
          <span v-if="scope.row.level == 2">三级</span>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      list: []
    }
  },
  mounted() {
    this.showData()
  },
  methods: {
    async showData() {
      const res = await this.$http.get('/rights/list')
      const data = res.data
      //    console.log(data);
      this.list = data.data

    }
  }
}
</script>

<style>
.box-card {
  height: 100%;
  /* overflow: auto; */
}
.td {
  margin-top: 20px;
}
</style>
