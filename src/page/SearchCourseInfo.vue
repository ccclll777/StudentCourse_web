<template>
    <div class="fillcontain">
        <meta http-equiv="Cache-Control" content="no-cache,no-store,must-revlidate">
        <meta http-equiv="Expires" content="O">
        <meta http-equiv="Pragma" content="no-cache">

        <head-top></head-top>
        <el-form :model="searchForm" ref="searchForm">
            <el-row :gutter="20" style="margin-left: 180px;margin-top: 10px;width: 1000px">
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <el-input v-model="searchForm.fcid" placeholder="先行课号">
                        </el-input>
                    </div>
                </el-col>

                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <el-button type="primary" round @click="findCourse">检索先行课号为xxxxx的课程名</el-button>
                    </div>
                </el-col>

                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <el-button type="primary" round @click="initData">所有课程情况</el-button>
                    </div>
                </el-col>
            </el-row>
        </el-form>
        <div class="table_container">
            <el-table
                :data="tableData"
                style="width: 100%"
            >

                <el-table-column
                    label="课程号"
                    prop="cid">
                </el-table-column>
                <el-table-column
                    label="课程名称"
                    prop="NAME">
                </el-table-column>
                <el-table-column
                    label="先行课号"
                    prop="fcid">
                </el-table-column>
                <el-table-column
                    label="学分"
                    prop="credit">
                </el-table-column>
            </el-table>
            <!-- Table -->
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
    import {findAllCourse,findCourseByFcid} from '@/api/getData'
    import {TickerOrder} from "../router/index"

    export default {
        data() {
            return {
                value1: false,
                tableData: [],
                selectTable: {},
                searchForm:
                    {
                        fcid: ''

                    },
                currentRow: null,
                offset: 0,
                limit: 10,
                count: 0,
                currentPage: 1,
                test1:true,
                test2:false
            }
        },
        async created() {
            this.initData();
        },
        components: {
            headTop,
        },
        methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.offset = (val - 1) * this.limit;
                this.getLists()
            },

            async findCourse()
            {
                this.test1 = false;
                this.test2 = true;
                const res = await findCourseByFcid({fcid:this.searchForm.fcid})
                if (res.status == 1) {
                    this.$message({
                        type: 'success',
                        message: '获取数据成功'
                    });
                    this.tableData = []
                    this.tableData = [];
                    this.tableData = res.courses;
                    this.count = res.courses.length;
                    this.getLists();
                    console.log("getLists")
                }


            },
            async initData() {
                this.test1 = true;
                this.test2 = false;
                const res = await findAllCourse()
                if (res.status == 1) {
                    this.$message({
                        type: 'success',
                        message: '获取数据成功'
                    });
                    this.tableData = []
                    this.tableData = [];
                    this.tableData = res.courses;
                    this.count = res.courses.length;
                    this.getLists();
                }


            },
            async getLists() {
                if(this.test1 == true)
                {
                    const res = await findAllCourse()
                    if (res.status == 1) {

                        this.tableData = [];
                        for (let i = this.offset; i < this.offset + this.limit; i++) {
                            if (i < this.offset + res.courses.length) {
                                const temp = {};
                                temp.cid = res.courses[i].cid;
                                temp.NAME = res.courses[i].name;
                                temp.fcid = res.courses[i].fcid;
                                temp.credit = res.courses[i].credit;
                                this.tableData.push(temp);

                            }

                        }


                    }
                }
                if(this.test2 == true)
                { console.log("findCourseByFcid")
                    const res = await findCourseByFcid({fcid:this.searchForm.fcid})
                    if (res.status == 1) {

                        this.tableData = [];
                        for (let i = this.offset; i < this.offset + this.limit; i++) {
                            if (i < this.offset + res.courses.length) {
                                const temp = {};

                                temp.NAME = res.courses[i].substring(55,res.courses[i].length -2);
                                console.log(res.courses[i].substring(55,res.courses[i].length -2))
                                this.tableData.push(temp);

                            }

                        }


                    }
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
