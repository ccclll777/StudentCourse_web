<template>
    <div class="fillcontain">
        <meta http-equiv="Cache-Control" content="no-cache,no-store,must-revlidate">
        <meta http-equiv="Expires" content="O">
        <meta http-equiv="Pragma" content="no-cache">

        <head-top></head-top>
        <el-form :model="searchForm" ref="searchForm">
            <el-row :gutter="30" style="margin-left: 30px;margin-top: 10px;width: 800px">
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <el-input v-model="searchForm.cid" placeholder="课程号">
                        </el-input>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple" style="margin-left: 20px">
                        <el-input v-model="searchForm.name" placeholder="课程名">
                        </el-input>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <el-input v-model="searchForm.fcid" placeholder="先行课课程号">
                        </el-input>
                        <!--<el-button type="primary" round @click="submitForm('searchForm')">搜索</el-button>-->
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <el-input v-model="searchForm.credit" placeholder="学分">
                        </el-input>
                        <!--<el-button type="primary" round @click="submitForm('searchForm')">搜索</el-button>-->
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="30" style="margin-left: 30px;margin-top: 10px;width: 800px">

                <el-col :span="6">
                    <div class="grid-content bg-purple">

                        <el-button type="primary" round @click="insertCourseInfo">插入</el-button>
                    </div>
                </el-col>
            </el-row>
        </el-form>

        <el-table
            :data="tableData"
            style="width: 100%">

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
    import {findAllCourse,insertCourse} from '@/api/getData'

    export default {
        data() {
            return {
                tableData: [],
                searchForm:
                    {
                        cid:'',
                        name:'',
                        fcid:'',
                        credit:''

                    },
                currentRow: null,
                offset: 0,
                limit: 10,
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
                var version = new Date().getTime();
                const res = await findAllCourse({version:version})
                if (res.status == 1) {
                    this.$message({
                        type: 'success',
                        message: '获取数据成功'
                    });
                    this.tableData = []
                    this.tableData = [];
                    this.tableData = res.courses;
                    this.count = res.courses.length;
                    this.cache = res.courses;
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
                // var version = new Date().getTime();
                // const res = await findAllCourse({version:version})
                // if (res.status == 1) {

                    this.tableData = [];
                    for (let i = this.offset; i < this.offset + this.limit; i++) {
                        if (i < this.offset + this.cache.length) {
                            const temp = {};
                            temp.cid = this.cache[i].cid;
                            temp.NAME = this.cache[i].name;
                            temp.fcid = this.cache[i].fcid;
                            temp.credit = this.cache[i].credit;
                            this.tableData.push(temp);

                        }

                    // }


                }
            },
            async insertCourseInfo()
            {
                var version = new Date().getTime();
                const res = await insertCourse({CID:this.searchForm.cid,
                    NAME:this.searchForm.name,FCID:this.searchForm.fcid,
                    CREDIT:this.searchForm.credit,version:version})
                if(res == 1)
                {
                    this.$message({
                        type: 'success',
                        message: '插入数据成功'
                    });

                }
                this.initData();
            },

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
