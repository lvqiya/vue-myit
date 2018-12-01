<template>
<el-card class="box-card">
    <!-- 面包 -->
    <my-bread level1="商品管理" level2="商品列表"></my-bread>
    <!-- alert提示框 -->
    <el-alert title="添加商品信息" type="info" class="alert" center :closable="false" show-icon>
    </el-alert>
    <!-- 步骤条 -->
    <el-steps class="steps" :space="400" align-center :active="active-0" finish-status="success">
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
    </el-steps>
    <!-- 选项卡 -->
    <el-form class="form" label-position="left" :model="form" label-width="80px" style="height: 350px;">
        <el-tabs class="tabs" v-model="active" tab-position="left" @tab-click="tabchange()">

            <el-tab-pane name="1" label="基本信息">
                <el-form-item label="商品名称">
                    <el-input></el-input>
                </el-form-item>
                <el-form-item label="商品价格">
                    <el-input></el-input>
                </el-form-item>
                <el-form-item label="商品重量">
                    <el-input></el-input>
                </el-form-item>
                <el-form-item label="商品数量">
                    <el-input></el-input>
                </el-form-item>
                <el-form-item label="商品数量">
                    <el-cascader expand-trigger="hover" :options="options" v-model="selectedOptions" @change="handleChange" :props="defaultProps">
                    </el-cascader>
                </el-form-item>
            </el-tab-pane>


            <el-tab-pane name="2" label="商品参数">商品参数

            </el-tab-pane>
            <el-tab-pane name="3" label="商品属性">商品属性</el-tab-pane>
            <el-tab-pane name="4" label="商品图片">商品图片</el-tab-pane>
            <el-tab-pane name="5" label="商品内容">商品内容</el-tab-pane>
        </el-tabs>
    </el-form>
</el-card>
</template>

<script>
export default {
    data() {
        return {
            active: "1",
            form: {},
            options: [],
            selectedOptions: [],
            defaultProps: {
                label:'cat_name',
                value:'cat_id',
                children:'children'
            }
        }
    },
    created() {
        this.getgoodslist()
    },
    methods: {
        async tabchange(){
            if (this.selectedOptions.length !== 3) {
                this.$message.warning('请先选择三级分类')
            }
            if (this.active === '2') {
                // const res = await this.$http.
            }
            
        },
        handleChange() {

        },
        async getgoodslist() {
            const res = await this.$http.get(`categories?type=3`)
            // console.log(res);
            
            this.options = res.data.data
        }
    }
}
</script>

<style>
.alert {
    margin-top: 26px;
    margin-bottom: 10px;
}

.form {
    height: 400px;
    overflow: auto;
}

.ff-btn {
    margin-top: 10px;
    margin-bottom: 20px;
}

.ql-editor {
    min-height: 300px;
}
</style>
