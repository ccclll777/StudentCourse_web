<template>
    <div class="fillcontain">
        <meta http-equiv="Cache-Control" content="no-cache,no-store,must-revlidate">
        <meta http-equiv="Expires" content="O">
        <meta http-equiv="Pragma" content="no-cache">
        <head-top></head-top>
        <div class="table_container">
            <el-form :model="searchForm" ref="searchForm">
                <el-row :gutter="20" style="margin-top: 10px">
                    <el-col :span="4">
                        <div class="grid-content bg-purple">
                            <el-input v-model="searchForm.age" placeholder="年龄">
                            </el-input>
                        </div>
                    </el-col>
                    <el-col :span="4">
                        <div class="grid-content bg-purple">
                            <el-button type="primary" round @click="findStudentlessThan()">年龄小于xx的学生</el-button>
                        </div>
                    </el-col>
                    <el-col :span="4">
                        <div class="grid-content bg-purple">
                            <el-button type="primary" round @click="showAll()">显示所有学生</el-button>
                        </div>
                    </el-col>
                    <el-col :span="4">
                        <div class="grid-content bg-purple">
                            <el-button type="primary" round @click="findStudentNameAndAge">所有学生的姓名年龄</el-button>
                        </div>
                    </el-col>
                </el-row>
            </el-form>
            <el-form :model="searchForm" ref="searchForm">
                <el-row :gutter="20" style="margin-top: 10px">
                    <el-col :span="4">
                        <div class="grid-content bg-purple">
                            <el-input v-model="searchForm.age2" placeholder="年龄">
                            </el-input>
                        </div>
                    </el-col>
                    <el-col :span="4">
                        <div class="grid-content bg-purple">
                            <el-input v-model="searchForm.dname" placeholder="学院">
                            </el-input>
                        </div>
                    </el-col>
                    <el-col :span="4">
                        <div class="grid-content bg-purple">
                            <el-button type="primary" round @click="findStudentLessThanandDname">年龄小于xx的xx学院的学生
                            </el-button>
                        </div>
                    </el-col>

                </el-row>
            </el-form>

            <el-form :model="searchForm" ref="searchForm">
                <el-row :gutter="20" style="margin-top: 10px">
                    <el-col :span="4">
                        <div class="grid-content bg-purple">
                            <el-input v-model="searchForm.age3" placeholder="年龄">
                            </el-input>
                        </div>
                    </el-col>

                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            <el-button type="primary" round @click="findNameSex">年龄小于xx的学生的姓名和性别</el-button>
                        </div>
                    </el-col>
                </el-row>
            </el-form>
            <el-table
                :data="tableData"
                highlight-current-row
                style="width: 100% ;margin-top: 20px">
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
    import {
        getAllstudent,
        findStudentLessThan,
        findStudentLessThanAndDNAME,
        findAllNameAndAge,
        findNameSex
    } from '@/api/getData'

    export default {
        data() {
            return {
                tableData: [], searchForm:
                    {
                        age: '',
                        dname: '',
                        age2: '',
                        age3: ''
                    }
                ,
                currentRow: null,
                offset: 0,
                limit: 20,
                count: 0,
                currentPage: 1,
                test1: false,
                test2: false,
                test3: true,
                test4: false,
                test5: false,


            }
        },
        components: {
            headTop,
        },
        created() {
            this.initData();
        },
        methods: {
            async initData() {
                this.test3 = true;
                this.test1 = false;
                this.test2 = false;
                this.test4 = false;
                this.test5 = false;


                const res = await getAllstudent({})
                if (res.status == 1) {
                    this.$message({
                        type: 'success',
                        message: '获取数据成功'
                    });
                    console.log(res.students)
                    this.tableData = []
                    this.tableData = [];
                    this.tableData = res.students;
                    this.count = res.students.length;
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

                if (this.test3 == true) {
                    const res = await getAllstudent({})
                    if (res.status == 1) {

                        this.tableData = [];
                        for (let i = this.offset; i < this.offset + this.limit; i++) {
                            if (i < this.offset + res.students.length) {
                                const temp = {};
                                temp.SID = res.students[i].sid;
                                temp.NAME = res.students[i].name;
                                temp.SEX = res.students[i].sex;
                                temp.AGE = res.students[i].age;
                                temp.BIRTHDAY = res.students[i].birthday;
                                temp.DNAME = res.students[i].dname;
                                temp.CLASS = res.students[i].class;
                                this.tableData.push(temp);

                            }

                        }


                    }
                }
                if (this.test1 == true) {
                    const res = await findStudentLessThan({age: this.searchForm.age})
                    if (res.status == 1) {

                        this.tableData = [];
                        for (let i = this.offset; i < this.offset + this.limit; i++) {
                            if (i < this.offset + res.students.length) {
                                const temp = {};
                                temp.SID = res.students[i].sid;
                                temp.NAME = res.students[i].name;
                                temp.SEX = res.students[i].sex;
                                temp.AGE = res.students[i].age;
                                temp.BIRTHDAY = res.students[i].birthday;
                                temp.DNAME = res.students[i].dname;
                                temp.CLASS = res.students[i].class;
                                this.tableData.push(temp);
                            }

                        }


                    }
                }
                if (this.test2 == true) {
                    const res = await findStudentLessThanAndDNAME({
                        age: this.searchForm.age2,
                        dname: this.searchForm.dname
                    })
                    if (res.status == 1) {

                        this.tableData = [];
                        for (let i = this.offset; i < this.offset + this.limit; i++) {
                            if (i < this.offset + res.students.length) {
                                const temp = {};
                                temp.SID = res.students[i].sid;
                                temp.NAME = res.students[i].name;
                                temp.SEX = res.students[i].sex;
                                temp.AGE = res.students[i].age;
                                temp.BIRTHDAY = res.students[i].birthday;
                                temp.DNAME = res.students[i].dname;
                                temp.CLASS = res.students[i].class;
                                this.tableData.push(temp);
                            }

                        }


                    }
                }
                if (this.test4 == true) {
                    const res = await findAllNameAndAge()
                    if (res.status == 1) {

                        this.tableData = [];
                        for (let i = this.offset; i < this.offset + this.limit; i++) {
                            if (i < this.offset + res.students.length) {
                                const temp = {};
                                temp.NAME = res.students[i].name;

                                temp.AGE = res.students[i].age;
                                this.tableData.push(temp);
                            }

                        }


                    }
                }

                if (this.test5 == true) {
                    const res = await findNameSex({age: this.searchForm.age3})
                    if (res.status == 1) {

                        this.tableData = [];
                        for (let i = this.offset; i < this.offset + this.limit; i++) {
                            if (i < this.offset + res.students.length) {
                                const temp = {};
                                temp.NAME = res.students[i].name;

                                temp.SEX = res.students[i].sex;
                                this.tableData.push(temp);
                            }

                        }


                    }
                }

            },
            async findStudentlessThan() {
                this.test3 = false;
                this.test1 = true;
                this.test2 = false;
                this.test4 = false;
                this.test5 = false;

                const res = await findStudentLessThan({age: this.searchForm.age})
                if (res.status == 1) {
                    this.tableData = [];
                    this.tableData = res.students;
                    this.count = res.students.length;
                    this.getLists();

                }
            },
            async findStudentLessThanandDname() {
                this.test3 = false;
                this.test1 = false;
                this.test2 = true;
                this.test4 = false;
                this.test5 = false;

                const res = await findStudentLessThanAndDNAME({age: this.searchForm.age2, dname: this.searchForm.dname})
                if (res.status == 1) {
                    this.tableData = [];
                    this.tableData = res.students;
                    this.count = res.students.length;
                    this.getLists();

                }
            },
            async findStudentNameAndAge() {
                this.test3 = false;
                this.test1 = false;
                this.test2 = false;
                this.test4 = true;
                this.test5 = false;

                const res = await findAllNameAndAge()
                if (res.status == 1) {
                    this.tableData = [];
                    this.tableData = res.students;
                    this.count = res.students.length;
                    this.getLists();

                }
            },
            async findNameSex() {
                this.test3 = false;
                this.test1 = false;
                this.test2 = false;
                this.test4 = false;
                this.test5 = true;

                console.log("sfafasf")
                const res = await findNameSex({age: this.searchForm.age3})
                if (res.status == 1) {
                    this.tableData = [];
                    this.tableData = res.students;
                    this.count = res.students.length;
                    this.getLists();

                }
            },
            async showAll() {
                this.test3 = true;
                this.test1 = false;
                this.test2 = false;
                this.test4 = false;
                this.test5 = false;

                this.initData();

            },

        },
    }
</script>

<style lang="less">
    @import '../style/mixin';

    .table_container {
        padding: 20px;
    }
</style>
