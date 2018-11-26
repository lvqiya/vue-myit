<template>
    <div class="login-wrap">
        <el-form label-position="top" label-width="80px" :model="formdata" class="login-form">
            <h3>用户登录</h3>
            <el-form-item label="用户名">
                <el-input v-model="formdata.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="formdata.password"></el-input>
            </el-form-item>
            <el-button type="primary" round class="login-btn" @click="handleLogin()">登录</el-button>
        </el-form>
    </div>

</template>

<script>
export default {
  data() {
    return {
      formdata: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    async handleLogin() {
      const res = await this.$http.post(`login`, this.formdata);
      console.log(res);
      const {
        meta: { status, msg },
        data
      } = res.data;
      if (status === 200) {
        const token = localStorage.setItem("token", data.token);
        this.$router.push({ name: "home" });
        this.$message.success(msg);
      } else {
        this.$message.error(msg);
      }
    }
  }
  //   handleLogin(){
  //       this.$http.post(`login`,this.formdata)
  //       .then((res)=>{
  //           console.log(res);
  //           const{meta:{status,msg},data} = res.data
  //           if (status === 200) {
  //               this.$router.push({name:'home'})
  //               this.$message.success(msg)
  //           }else{
  //               this.$message.error(msg)
  //           }
  //       })
  //   }
};
</script>

<style>
.login-wrap {
  background-color: #324152;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-wrap .login-form {
  background-color: #fff;
  width: 400px;
  padding: 30px;
  border-radius: 5px;
}
.login-wrap .login-form h3 {
  margin: 0;
}
.login-wrap .login-form .login-btn {
  width: 100%;
}
</style>
