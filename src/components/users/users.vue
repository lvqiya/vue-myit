<template>
  <el-card class="box-card">
    <!-- 面包 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="/">用户管理</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <el-row class="searchArea">
      <el-col :span="24">
        <el-input class="searchInput" clearable placeholder="请输入内容" v-model="query"  @clear="loadData()">
          <el-button slot="append" icon="el-icon-search" @click="searchUsers()"></el-button>
        </el-input>
        <el-button type="success" plain>添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="list" style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话" width="180"></el-table-column>
      <el-table-column prop="mobile" label="创建日期" width="180">
        <template slot-scope="scope">{{scope.row.create_time | fmtdate}}</template>
      </el-table-column>
      <el-table-column prop="mg_state" label="用户状态" width="180">
        <template slot-scope="scope">
          <!-- scope.row就是当前绑定的数据对象 -->
          <el-switch active-color="#13ce66" inactive-color="#ff4949" v-model="scope.row.mg_state"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="300">
        <template slot-scope="scope">
          <el-button plain size="mini" type="primary" icon="el-icon-edit" circle></el-button>
          <el-button plain size="mini" type="danger" icon="el-icon-delete" circle></el-button>
          <el-button plain size="mini" type="success" icon="el-icon-check" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page=pagenum
      :page-sizes="[2, 4 ,6 ,8]"
      :page-size=pagesize
      layout="total, sizes, prev, pager, next, jumper"
      :total=total
    ></el-pagination>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      list: [{
        create_time: "",
        email: "",
        id: '',
        mg_state: "",
        mobile: "",
        role_name: "",
        username: ""
      }

      ],
      pagenum: 1,
      pagesize: 3,
      query: '',
      total: 10
    };
  },
  mounted() {
    this.loadData()
  },
  methods: {
    searchUsers(){
        this.loadData()
        this.pagenum = 1
    },
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pagesize = val
        this.loadData()
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.pagenum = val
        this.loadData()
      },
    async loadData() {
      const AUTH_TOKEN = localStorage.getItem("token");
      this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      const res = await this.$http.get(
        `/users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${
        this.pagesize
        } `
      );

      const data = res.data;
      console.log(res);

      const {
        meta: { msg, status },
        data: { total, users }
      } = data;
      if (status === 200) {
        const {
          data: { users }
        } = data;
        this.total = total;
        this.list = users;
      } else {
        this.$message.error(msg);
      }
    },

  }
}
</script>

<style>
.box-card {
  height: 100%;
}

.searchArea {
  margin-top: 10px;
  margin-bottom: 10px;
}

.searchArea .searchInput {
  width: 350px;
}
</style>
