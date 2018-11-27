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
        <el-input
          class="searchInput"
          clearable
          placeholder="请输入内容"
          v-model="query"
          @clear="loadData()"
        >
          <el-button slot="append" icon="el-icon-search" @click="searchUsers()"></el-button>
        </el-input>
        <el-button type="success" plain @click="DialogFormVisibleAdd = true">添加用户</el-button>
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
          <el-button plain size="mini" type="primary" icon="el-icon-edit" circle @click="shoeEdit(scope.row)"></el-button>
          <el-button
            plain
            size="mini"
            type="danger"
            icon="el-icon-delete"
            circle
            @click="showdel(scope.row.id)"
          ></el-button>
          <el-button plain size="mini" type="success" icon="el-icon-check" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 4 ,6 ,8]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <!-- 添加表单 -->
    <el-dialog title="添加用户" :visible.sync="DialogFormVisibleAdd">
      <el-form label-width="100px" :model="form">
        <el-form-item label="用户名">
          <el-input v-model="form.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="form.mobile" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="DialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="addusers()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑 -->
    <el-dialog title="编辑用户" :visible.sync="DialogFormVisibleEdit">
      <el-form ref="myform"  label-width="100px" :model="form">
        <el-form-item label="用户名" prop="username">
          <el-input disabled v-model="form.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="form.mobile" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="DialogFormVisibleEdit = false">取 消</el-button>
        <el-button type="primary" @click="editForm()">确 定</el-button>
      </div>
    </el-dialog>
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
      }],
      DialogFormVisibleAdd: false,
      DialogFormVisibleEdit: false,
      pagenum: 1,
      pagesize: 3,
      query: '',
      total: 10,
      form: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      }
    };
  },
  mounted() {
    this.loadData()
  },
  methods: {
    showEdit(lit){
       this.DialogFormVisibleEdit = true
       this.form = lit
    },
    showdel(userID) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$http.delete(`/users/${userID}`)
        const { meta: { status, msg } } = res.data
        if (status === 200) {
          this.loadData()
          this.pagenum = 1
        } else {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    async addusers() {
      const res = await this.$http.post(`/users`, this.form)
      console.log(res);
      const { meta: { status, msg }, data } = res.data
      if (status === 201) {
        this.loadData()
        this.DialogFormVisibleAdd = false
        this.$message.success(msg)
        for (const key in this.form) {
          this.form[key] = ''
        }
      } else {
        this.$message.error(msg)
      }

    },
    searchUsers() {
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
