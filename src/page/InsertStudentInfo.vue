<template>
    <div class="fillcontain">
        <meta http-equiv="Cache-Control" content="no-cache,no-store,must-revlidate">
        <meta http-equiv="Expires" content="O">
        <meta http-equiv="Pragma" content="no-cache">

        <head-top></head-top>
        <el-form :model="searchForm" ref="searchForm">
            <el-row :gutter="24" style="margin-left: 30px;margin-top: 10px;width: 800px">
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <el-input v-model="searchForm.sid" placeholder="学号">
                        </el-input>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple" style="margin-left: 20px">
                        <el-input v-model="searchForm.name" placeholder="姓名">
                        </el-input>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <el-input v-model="searchForm.sex" placeholder="性别">
                        </el-input>
                        <!--<el-button type="primary" round @click="submitForm('searchForm')">搜索</el-button>-->
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <el-input v-model="searchForm.age" placeholder="年龄">
                        </el-input>
                        <!--<el-button type="primary" round @click="submitForm('searchForm')">搜索</el-button>-->
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="24" style="margin-left: 30px;margin-top: 10px;width: 800px">
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <el-input v-model="searchForm.birthday" placeholder="出生日期">
                        </el-input>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple" style="margin-left: 20px">
                        <el-input v-model="searchForm.dname" placeholder="所在学院">
                        </el-input>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <el-input v-model="searchForm.class" placeholder="CLASS">
                        </el-input>
                        <!--<el-button type="primary" round @click="submitForm('searchForm')">搜索</el-button>-->
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">

                        <el-button type="primary" round @click="insertStudentInfo">插入</el-button>
                    </div>
                </el-col>
            </el-row>
        </el-form>

        <el-table
            :data="tableData"
            style="width: 100%">

            <el-table-column
                property="SID"
                label="学号SID"
            >
            </el-table-column>
            <el-table-column
                property="NAME"
                label="姓名"
            >
            </el-table-column>
            <el-table-column
                property="SEX"
                label="性别">
            </el-table-column>
            <el-table-column
                property="AGE"
                label="年龄">
            </el-table-column>
            <el-table-column
                property="BIRTHDAY"
                label="生日">
            </el-table-column>
            <el-table-column
                property="DNAME"
                label="学院">
            </el-table-column>
            <el-table-column
                property="CLASS"
                label="CLASS">
            </el-table-column>
        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="limit"
            layout="total, prev, pager, next, jumper"
            :total="count">
        </el-pagination>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {baseUrl, baseImgPath} from '@/config/env'
    import {getAllstudent,insertStudent} from '@/api/getData'

    export default {
        data() {
            return {

                tableData: [],
                searchForm:
                    {
                        sid: '',
                        name: '',
                        sex: '',
                        age: '',
                        birthday: '',
                        dname: '',
                        class: ''

                    },
                currentRow: null,
                offset: 0,
                limit: 20,
                count: 0,
                currentPage: 1,
                cache:[]

            }
        },
        async created() {
            this.initData();
        },
        components: {
            headTop,
        },
        methods: {
            async initData() {

                const res = await getAllstudent({})
                if (res.status == 1) {
                    this.$message({
                        type: 'success',
                        message: '获取数据成功'
                    });
                    this.tableData = [];
                    this.tableData = res.students;
                    this.count = res.students.length;
                    this.cache = res.students;
                    this.getLists();
                }


            },

            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.offset = (val - 1) * this.limit;
                this.getLists()
            },
            async getLists() {

                // const res = await getAllstudent({})
                // if (res.status == 1) {

                    this.tableData = [];
                    for (let i = this.offset; i < this.offset + this.limit; i++) {
                        if (i < this.offset +  this.cache.length) {
                            const temp = {};
                            temp.SID =  this.cache[i].sid;
                            temp.NAME =  this.cache[i].name;
                            temp.SEX =  this.cache[i].sex;
                            temp.AGE =  this.cache[i].age;
                            temp.BIRTHDAY =  this.cache[i].birthday;
                            temp.DNAME =  this.cache[i].dname;
                            temp.CLASS =  this.cache[i].class;
                            this.tableData.push(temp);

                        }

                    }


                // }


            },
            async insertStudentInfo()
            {
                const res = await insertStudent({SID:this.searchForm.sid,
                    NAME:this.searchForm.name,SEX:this.searchForm.sex,
                    AGE:this.searchForm.age,BIRTHDAY:this.searchForm.birthday,
                    DNAME:this.searchForm.dname,CLASS:this.searchForm.class})
                if(res == 1)
                {
                    this.$message({
                        type: 'success',
                        message: '插入数据成功'
                    });

                }
                this.initData();
            }


        },

    }
</script>

<style lang="less">
    @import '../style/mixin';

    .demo-table-expand {
        font-size: 0;
    }

    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }

    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }

    .table_container {
        padding: 20px;
    }

    .Pagination {
        display: flex;
        justify-content: flex-start;
        margin-top: 8px;
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 120px;
        height: 120px;
        line-height: 120px;
        text-align: center;
    }

    .avatar {
        width: 120px;
        height: 120px;
        display: block;
    }
</style>
