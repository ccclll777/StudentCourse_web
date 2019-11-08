<template>
    <div class="fillcontain">
        <meta http-equiv="Cache-Control" content="no-cache,no-store,must-revlidate">
        <meta http-equiv="Expires" content="O">
        <meta http-equiv="Pragma" content="no-cache">

        <head-top></head-top>
        <el-form :model="searchForm" ref="searchForm">
            <el-row :gutter="20" style="margin-left: 300px;margin-top: 10px;width: 800px">
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <el-input v-model="searchForm.age" placeholder="年龄">
                        </el-input>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <el-button type="primary" round @click="findTeacherAge">找出所有大于xx岁的老师</el-button>
                    </div>
                </el-col>

            </el-row>
        </el-form>

        <el-form :model="searchForm" ref="searchForm">
            <el-row :gutter="20" style="margin-left: 300px;margin-top: 10px;width: 800px">
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <el-input v-model="searchForm.sex" placeholder="性别">
                        </el-input>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <el-button type="primary" round @click="findTeacherBySex">找出所有性别为x的老师</el-button>
                    </div>
                </el-col>

            </el-row>
        </el-form>

        <el-form :model="searchForm" ref="searchForm">
            <el-row :gutter="20" style="margin-left: 300px;margin-top: 10px;width: 800px">
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <el-input v-model="searchForm.dname" placeholder="学院">
                        </el-input>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <el-button type="primary" round @click="findTeacherByname">找出xx学院的老师</el-button>
                    </div>
                </el-col>

            </el-row>
        </el-form>
        <div class="table_container">
            <el-table
                :data="tableData"
                style="width: 100%"
                row-key="tid"
            >

                <el-table-column
                    label="教师编号"
                    prop="tid">
                </el-table-column>
                <el-table-column
                    label="教师名称"
                    prop="name">
                </el-table-column>
                <el-table-column
                    label="性别"
                    prop="sex">
                </el-table-column>
                <el-table-column
                    label="年龄"
                    prop="age">
                </el-table-column>
                <el-table-column
                    label="所属学院"
                    prop="dname">
                </el-table-column>

            </el-table>
            <div class="Pagination" style="text-align: left;margin-top: 10px;">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="limit"
                    layout="total, prev, pager, next, jumper"
                    :total="count">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {baseUrl, baseImgPath} from '@/config/env'
    import {findTeacherAgeThan, findAllTeacher, findTeacherSexIs,findDnameIs} from '@/api/getData'

    export default {
        data() {
            return {

                tableData: [],

                searchForm:
                    {
                        age: "",
                        sex: ""

                    },
                test1: true,
                test2: false,
                test3: false,
                test4: false,
                currentRow: null,
                offset: 0,
                limit: 20,
                count: 0,
                currentPage: 1,

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
                this.test3 = false;
                this.test1 = true;
                this.test2 = false;
                this.test4 = false;
                const res = await findAllTeacher({})
                if (res.status == 1) {
                    this.$message({
                        type: 'success',
                        message: '获取数据成功'
                    });
                    console.log(res.teachers)
                    this.tableData = []
                    this.tableData = [];
                    this.tableData = res.teachers;
                    this.count = res.teachers.length;
                    this.getLists();
                }


            },
            async findTeacherAge() {
                this.test3 = false;
                this.test1 = false;
                this.test2 = true;
                this.test4 = false;
                const res = await findTeacherAgeThan({age: this.searchForm.age})
                if (res.status == 1) {
                    this.$message({
                        type: 'success',
                        message: '获取数据成功'
                    });
                    console.log(res.teachers)
                    this.tableData = []
                    this.tableData = [];
                    this.tableData = res.teachers;
                    this.count = res.teachers.length;
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
                if (this.test1 == true) {
                    const res = await findAllTeacher({})
                    if (res.status == 1) {

                        this.tableData = [];
                        for (let i = this.offset; i < this.offset + this.limit; i++) {
                            if (i < this.offset + res.teachers.length) {

                                this.tableData.push(res.teachers[i]);

                            }

                        }


                    }
                }
                if (this.test2 == true) {
                    const res = await findTeacherAgeThan({age: this.searchForm.age})
                    if (res.status == 1) {

                        this.tableData = [];
                        for (let i = this.offset; i < this.offset + this.limit; i++) {
                            if (i < this.offset + res.teachers.length) {

                                this.tableData.push(res.teachers[i]);

                            }

                        }


                    }
                }
                if (this.test3 == true) {
                    const res = await findTeacherSexIs({sex: this.searchForm.sex})
                    if (res.status == 1) {

                        this.tableData = [];
                        for (let i = this.offset; i < this.offset + this.limit; i++) {
                            if (i < this.offset + res.teachers.length) {

                                this.tableData.push(res.teachers[i]);

                            }

                        }


                    }
                }
                if (this.test4 == true) {
                    const res = await findDnameIs({dname: this.searchForm.dname})
                    if (res.status == 1) {

                        this.tableData = [];
                        for (let i = this.offset; i < this.offset + this.limit; i++) {
                            if (i < this.offset + res.teachers.length) {

                                this.tableData.push(res.teachers[i]);

                            }

                        }


                    }
                }
            },
            async findTeacherBySex() {
                this.test3 = true;
                this.test1 = false;
                this.test2 = false;
                this.test4 = false;
                const res = await findTeacherSexIs({sex: this.searchForm.sex})
                if (res.status == 1) {
                    this.$message({
                        type: 'success',
                        message: '获取数据成功'
                    });

                    this.tableData = []
                    this.tableData = [];
                    this.tableData = res.teachers;
                    this.count = res.teachers.length;
                    this.getLists();
                }
            },
            async findTeacherByname()
            {
                this.test3 = false;
                this.test1 = false;
                this.test2 = false;
                this.test4 = true;
                const res = await findDnameIs({dname: this.searchForm.dname})
                if (res.status == 1) {
                    this.$message({
                        type: 'success',
                        message: '获取数据成功'
                    });

                    this.tableData = []
                    this.tableData = [];
                    this.tableData = res.teachers;
                    this.count = res.teachers.length;
                    this.getLists();
                }
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
