<template>
  <el-card class="box-card">
    <my-bread level1="权限管理" level2="角色列表"></my-bread>
    <el-row class="row-add">
      <el-col :span="24">
        <el-button>添加角色</el-button>
      </el-col>
    </el-row>

    <el-table :data="list" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-row v-for="(item1,i) in scope.row.children" :key="i">
            <el-col :span=4>
                <el-tag closable @close="delright(scope.row,item1.id)">{{item1.authName}}</el-tag>
                <i class="el-icon-arrow-right"></i>
            </el-col>
            <el-col :span=20>
              <el-row v-for="(item2,index) in item1.children" :key="index">
                <el-col :span=4>
                     <el-tag type="success" closable>{{item2.authName}}</el-tag>
                     <i class="el-icon-arrow-right"></i>
                </el-col>
                <el-col :span=20>
                    <el-tag v-for="(item3,ind) in item2.children" :key="ind"  type="error" closable>{{item3.authName}}</el-tag>
                    <i class="el-icon-arrow-right"></i>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row v-if="scope.row.children.length===0">
              未分配权限
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column label="角色名称" width="180" prop="roleName"></el-table-column>
      <el-table-column label="角色描述" width="180" prop="roleDesc"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button plain size="mini" type="primary" icon="el-icon-edit" circle></el-button>
          <el-button plain size="mini" type="danger" icon="el-icon-delete" circle></el-button>
          <el-button plain size="mini" type="success" icon="el-icon-check" circle></el-button>
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
  created() {
    this.showroles()
  },
  methods: {
    async delright(role,rightId){
      
      const res = await this.$http.delete(`roles/${role.id}/rights/${rightId}`)
      console.log(111);

      const {data:resData} = res
      const {meta:{status,msg},data} = resData
      if (status === 200) {
        this.$message.success(msg)
        role.children = data
      }else{
        this.$message.error(msg)
      }
    },
    async showroles() {
      const res = await this.$http.get(`/roles`)
      console.log(res);

      const { data: resData } = res
      const { meta: { status, msg }, data } = resData
      if (status === 200) {
        this.list = data
      }
    }
  }
}
</script>

<style>
.row-add {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
